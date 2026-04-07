/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");
const workerURL = "https://mute-hill-84d7.archergames7.workers.dev/";

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // When using Cloudflare, you'll need to POST a `messages` array in the body,
  // and handle the response using: data.choices[0].message.content

  // Show message
  chatWindow.innerHTML = "Connecting to the OpenAI API for a response...";
  prompt =
    "You are a helpful assistant that helps users discover and understand L’Oréal’s extensive range of products—makeup, skincare, haircare, and fragrances—as well as provide personalized routines and recommendations. Only mention L’Oréal products and services in your responses. If you don’t know the answer, say you don’t know. Always ask follow-up questions to better understand the user’s needs and preferences, and provide detailed, informative answers that highlight the unique features and benefits of L’Oréal’s offerings. Be friendly, engaging, and professional in your tone.";

  prompt += " User input: " + userInput.value;

  try {
    fetch(workerURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: userInput.value,
          },
          {
            role: "system",
            content: prompt,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        message = "You: " + userInput.value + "\n\n";
        message += "Response: " + data.choices[0].message.content;
        chatWindow.textContent = message;
      })
      .catch((error) => {
        console.error("Error:", error);
        chatWindow.textContent =
          "An error occurred while fetching the response.";
      });
  } catch (error) {
    console.error("Error:", error);
    chatWindow.textContent = "An error occurred while fetching the response.";
  }
});
