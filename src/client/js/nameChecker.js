async function checkForName(inputUrl) {
  const serverPostURL = "http://localhost:8080/analyze";
  const response = await fetch(serverPostURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputUrl), // Send URL as JSON
  });
     
  if (!response.ok) {
    // Throw an error if the response is not OK
    const errorData = await response.json();
    throw new Error(errorData.error || "Something went wrong"); // Use error field from server
  }

  const data = await response.json();
  return data;
}

module.exports = { checkForName };
