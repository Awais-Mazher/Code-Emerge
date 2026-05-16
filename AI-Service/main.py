from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import json
import re
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Submission(BaseModel):
    problem_title: str
    problem_description: str
    code: str
    language: str

@app.post("/analyze")
def analyze_code(submission: Submission):

    prompt = f"""
You are an expert code reviewer for a coding practice platform.

A user has submitted a solution to a programming problem. Analyze it carefully.

---
Problem Title: {submission.problem_title}

Problem Description:
{submission.problem_description}

Submitted Code ({submission.language}):
{submission.code}
---

Your job:
1. Check if the code correctly solves the problem.
2. Respond ONLY with a valid JSON object — no markdown, no explanation outside the JSON.

JSON format:
{{
  "description": "A short paragraph (3-5 sentences). If the solution is INCORRECT: explain what is wrong and give clear guidance to fix it. If the solution is CORRECT: skip errors and instead suggest how to improve efficiency, readability, or edge case handling.",
  "weak_areas": [
    "Weakness 1 (one short line)",
    "Weakness 2 (one short line)",
    "Weakness 3 (one short line)",
    "Weakness 4 (one short line)"
  ],
  "suggestions": [
    "Suggestion to fix Weakness 1",
    "Suggestion to fix Weakness 2",
    "Suggestion to fix Weakness 3",
    "Suggestion to fix Weakness 4"
  ]
}}

Rules:
- weak_areas and suggestions must have the same number of items (3 to 4).
- Each suggestion must directly correspond to its matching weakness.
- Keep all text concise and developer-friendly.
- Do NOT include markdown code fences or any text outside the JSON.
"""

    try:
        client = Groq(api_key=os.getenv("GROQ_API_KEY"))
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1000
        )
        raw = response.choices[0].message.content.strip()
        raw = re.sub(r"^```(?:json)?\s*", "", raw)
        raw = re.sub(r"\s*```$", "", raw)

        result = json.loads(raw)

        if not all(k in result for k in ("description", "weak_areas", "suggestions")):
            return {"error": "Unexpected response format. Please try again."}

        return {
            "description": result["description"],
            "weak_areas": result["weak_areas"],
            "suggestions": result["suggestions"]
        }

    except json.JSONDecodeError:
        return {"error": "AI response could not be parsed. Please try again."}
    except Exception as e:
        return {"error": "AI service error.", "details": str(e)}