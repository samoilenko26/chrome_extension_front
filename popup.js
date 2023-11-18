// Initially, set the default mode to "Translate"
let selectedMode = "Translate";

const modeButtons = document.querySelectorAll(".mode-button");

modeButtons.forEach(button => {
  button.addEventListener("click", function() {
    // Remove the "selected" class from all mode buttons
    modeButtons.forEach(btn => btn.classList.remove("selected"));

    // Add the "selected" class to the clicked button
    button.classList.add("selected");

    // Update the selected mode
    selectedMode = button.getAttribute("data-mode");
  });
});

document.getElementById("translateButton").addEventListener("click", function() {
  // Get the input text
  const inputText = document.getElementById("inputText").value;

  // Define the endpoint URL for your backend
  const backendEndpoint = "http://127.0.0.1:8000/api/submit_text/";

  // Create a data object to send
  const data = {
    action: selectedMode,
    input_text: inputText
  };

  // Send a POST request to the backend
  fetch(backendEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(responseData => {
      // Handle the response from the backend
      // Display the response in the extension's popup or perform any other desired action
      document.getElementById("translationResult").textContent = responseData.result;
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
