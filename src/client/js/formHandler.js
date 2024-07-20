import { checkForName } from "./nameChecker";
import {validateUrl} from "./validateUrl"
const form = document.getElementById("urlForm");
// Define the handleSubmit function
 async function handleSubmit(event) {
  event.preventDefault();
  // Get the URL from the input field
  const inputUrl = document.getElementById("name").value;
if(!validateUrl(inputUrl)){
alert(`Please enter a valid url for a real blog like :
https://www.example.com`);
return;
}
  // Select the result element
  const result = document.getElementById("results");
  try {
    // Send the URL to the server and get the response
    let response = await checkForName({ url: inputUrl });
// Debugging: Log the response
console.log("Response:", response);

// Ensure the response contains customeData
if (response) {
  showResults(response);
  //result.textContent = JSON.stringify(response); // Use customeData field from server
} else {
  result.textContent = "No custom data available.";
}
} catch (error) {
    // Update the result element with the error message
    result.textContent = `Error: ${error.message}`;
  }
}

function showResults(data){
const resultList=document.querySelectorAll("#resultList li");
   for(let item of resultList){
    let propertyName=item.getAttribute("class");
    console.log(propertyName);
    item.textContent=`     }`;
    item.innerHTML=`<strong>${propertyName.toUpperCase()}: </strong> <span class="greenFont">${data[propertyName]}</span>`
   }
}


// Export the handleSubmit function
export { handleSubmit };