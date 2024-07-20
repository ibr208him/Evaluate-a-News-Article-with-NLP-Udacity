const axios = require("axios");
const FormData = require("form-data");
const base_url = "https://api.meaningcloud.com/sentiment-2.1";

class CustomError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "CustomError";
    this.errorCode = errorCode;
  }
}

function handleError(error) {
  if (error.response) {
    // Axios response errors
    return { status: error.response.status, error: error.response.data.status.msg };
  } else if (error.request) {
    // Axios request errors
    return { status: 500, error: "No response received from the server" };
  } else if (error instanceof CustomError) {
    // Custom application errors
    const statusCode = error.errorCode >= 400 && error.errorCode < 500 ? error.errorCode : 400;
    return { status: statusCode, error: error.message };
  } else {
    // General errors
    return { status: 500, error: error.message };
  }
}

async function analyze(url, key) {
    const lang = "en";
    const params = new FormData();
    params.append("key", key);
    params.append("lang", lang);
    params.append("url", url);

    try {
      const response = await axios.post(base_url, params);
      const data = response.data;

      if (data.status.msg !== "OK") {
        throw new CustomError(data.status.msg, data.status.code);
      }
      
      const customeData = customeResponse(data);
      return { status: 200, customeData }; // Successful response
    } catch (error) {
      return handleError(error); // Return error details
    }
}

function customeResponse(data) {
    const { score_tag, agreement, subjectivity, confidence, irony } = data;
    const { code, credits,remaining_credits,msg } = data.status;
    const customeData = {
        code,
        msg,
        credits,
        remaining_credits,
        score_tag,
        agreement,
        subjectivity,
        confidence,
        irony,
    };
    return customeData;
}

module.exports = { analyze };