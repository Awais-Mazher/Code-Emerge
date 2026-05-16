import axios from "axios";

const analyzeCode = async (req, res) => {
  const { code, language, problem_title, problem_description } = req.body;

  if (!code || !language || !problem_title || !problem_description) {
    return res.status(400).json({
      success: false,
      message: "Problem title, description, code and language are required." 
    });
  }

  try {
    const response = await axios.post(`${process.env.FASTAPI_URL}/analyze`, {
      code,
      language,
      problem_title,
      problem_description
    });

    return res.json({
        success: true,
        results: response.data
    });

  } catch (error) {
    console.error("FastAPI error:", error.message);
    return res.json({
        success: false,
        message: "Could not reach the Analysis Service.",
    });
  }
};

export { analyzeCode }