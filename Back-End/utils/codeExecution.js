import axios from "axios"

const codeExecution = async (testCases, functionName, languageId, userCode)=>{

    const results = [];

    try {
      for (const testCase of testCases) {
        let finalCode;
        
        if(languageId === 63){
          finalCode = `
            ${userCode}

            const args = ${JSON.stringify(testCase.input)};
            const result = ${functionName}(...args);

            console.log(JSON.stringify(result));
          `;
        }
        else{
          finalCode = 
`${userCode.replace(/\r\n/g, "\n").replace(/\t/g, "    ").trim()}
import json
if __name__ == "__main__":
    args = ${JSON.stringify(testCase.input)}
    result = ${functionName}(*args)
    print(json.dumps(result))`;
        }

        const options = {
          method: "POST",
          url: "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          data: {
            source_code: finalCode,
            language_id: languageId,
            stdin: "",
          },
        };
  
        let resultObj = {};

        try {
          const response = await axios.request(options);
          const data = response.data;

          // Checking Output

          let output = "No output or unknown error.";
          if (data.stdout) {
            output = data.stdout.trim();
          } else if (data.stderr) {
            output = `Runtime Error: ${data.stderr}`;
          } else if (data.compile_output) {
            output = `Compilation Error: ${data.compile_output}`;
          }

          // Comparing Output

          function normalize(value) {
            if (typeof value === "string") {
              try {
                return JSON.parse(value);
              } catch {
                return value.trim();
              }
            }
            return value;
          }
          
          const expectedOutput = normalize(testCase.output);
          const actualOutput = normalize(output);
          
          const isEqual = JSON.stringify(expectedOutput) === JSON.stringify(actualOutput);

          // Creating Result Object
          
          if (data.stdout && isEqual) {
            resultObj = { input: testCase.input, result: "Accepted", output };
          } else if (data.stdout) {
            resultObj = { input: testCase.input, result: "Rejected", output };
          } else {
            resultObj = { input: testCase.input, result: "Error", output };
          }

        } catch (apiError) {
          console.error("API Error:", apiError.message);
          resultObj = {
            input: testCase.input,
            result: "Error",
            output: apiError.message,
          };
        }
  
        results.push(resultObj);
      }

      return results;

    } catch (error) {
      console.error("Execution Error:", error);
      return "Execution error";
    }
}

export default codeExecution;