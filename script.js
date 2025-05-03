// Import the generateConfetti function from the package
import { generateConfetti } from "./vanillaConfetti-main/vanillaConfetti.min.js";

// Create and insert styles
const style = document.createElement('style');
style.textContent = `
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'MV Boli', sans-serif;
    background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
    background-size: 400% 400%;
    animation: gradientFlow 20s ease infinite;
    overflow: hidden;
  }

  * {
    font-family: 'MV Boli', sans-serif;
    box-sizing: border-box;
  }

  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .countdown-container, .second-container {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 20px;
    padding: 5vw; /* Use relative padding */
    height: 50vh; /* Adjust height for responsiveness */
    width: 80vw; /* Adjust width for responsiveness */
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: none;
  }

  .countdown-container.show, .second-container.show {
    opacity: 1;
    animation: fallAndBounce 2.2s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
  }

  h1, h2 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  h1 {
    font-size: 5vw; /* Responsive font size */
    color: #EF0BBD;
  }

  h2 {
    font-size: 4vw; /* Responsive font size */
    color: #F524C7;
  }

  #loading-screen {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: #fff8fb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    z-index: 9999;
  }

  @keyframes fallAndBounce {
    0% {
      top: -100%;
      opacity: 0;
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      top: 52.5%;
      opacity: 1;
      transform: translate(-50%, -50%) scale(0.996);
    }
    70% {
      top: 48.5%;
      transform: translate(-50%, -50%) scale(1.002);
    }
    85% {
      top: 50.3%;
      transform: translate(-50%, -50%) scale(0.999);
    }
    95% {
      top: 49.9%;
      transform: translate(-50%, -50%) scale(1.0005);
    }
    100% {
      top: 50%;
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  /* Floating emoji style */
  .floating-emoji {
    position: absolute;
    animation: floatEmojis 8s ease-in-out infinite;
    z-index: 0;
    pointer-events: none;
    opacity: 0.4;
  }

  @keyframes floatEmojis {
    0% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-50px) rotate(20deg);
    }
    100% {
      transform: translateY(0) rotate(0deg);
    }
  }

  @media (max-width: 768px) {
    .countdown-container, .second-container {
      width: 90vw; /* Adjust width for smaller screens */
      height: 60vh; /* Adjust height for smaller screens */
      padding: 4vw; /* Adjust padding for smaller screens */
    }

    h1 {
      font-size: 6vw; /* Larger font size for smaller screens */
    }

    h2 {
      font-size: 5vw; /* Larger font size for smaller screens */
    }

    .floating-emoji {
      font-size: 3vw; /* Adjust emoji size */
    }
  }

  @media (max-width: 480px) {
    .countdown-container, .second-container {
      width: 75vw; /* Full width for very small screens */
      height: 65vh; /* Adjust height for very small screens */
      padding: 3vw; /* Adjust padding for very small screens */
    }

    h1 {
      font-size: 7vw; /* Larger font size for very small screens */
    }

    h2 {
      font-size: 6vw; /* Larger font size for very small screens */
    }

    .floating-emoji {
      font-size: 4vw; /* Adjust emoji size */
    }
  }

  #ribbon {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 2rem;
    opacity: 0;
    transform: scale(0);
    transition: all 1s ease;
  }

  #ribbon.reveal {
    opacity: 1;
    transform: scale(1);
  }

  #countdown {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 20px;
  }

  .time-box {
    background: #ffffff;
    border-radius: 15px;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgb(253, 125, 236);
    outline: 2px solid #fe5aa7;
  }

  .time-value {
    font-size: 2rem;
    font-weight: bold;
  }

  .time-label {
    font-size: 1rem;
    color: #444;
  }

  .extra-message-box {
    background: #ffe0f0;
    border-radius: 15px;
    padding: 15px 20px;
    text-align: center;
    margin-top: 40px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-size: 1.5rem;
    color: #444;
  }

  .celebrate {
    font-size: 2rem;
    text-align: center;
    animation: pop 1s ease-out;
  }

  @keyframes pop {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  .countdown-container.fall-down {
    animation: fallDown 1s forwards;
  }

  @keyframes fallDown {
    0% {
      top: 50%;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    100% {
      top: 150%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
`;

document.head.appendChild(style);

// Create loading screen
const loadingScreen = document.createElement('div');
loadingScreen.id = 'loading-screen';
const loadingText = document.createElement('div');
loadingText.className = 'loading-text';
loadingText.textContent = 'Loading...';
loadingScreen.appendChild(loadingText);
document.body.appendChild(loadingScreen);

// Animate loading dots
let dots = ['.', '..', '...'];
let dotIndex = 0;
setInterval(() => {
  loadingText.textContent = 'Loading' + dots[dotIndex];
  dotIndex = (dotIndex + 1) % dots.length;
}, 500);

// Create countdown container
const container = document.createElement('div');
container.className = 'countdown-container';
container.id = 'countdown-box';

const ribbon = document.createElement('div');
ribbon.id = 'ribbon';
ribbon.textContent = '🎀';
container.appendChild(ribbon);

const countdownEl = document.createElement('div');
countdownEl.id = 'countdown';
container.appendChild(countdownEl);

// Create extra message box
const extraMessageBox = document.createElement('div');
extraMessageBox.className = 'extra-message-box';
extraMessageBox.innerHTML = "Just a little more....<br>a special gift for my favourite person";
container.appendChild(extraMessageBox);

// Create a button below the countdown box
const nextButton = document.createElement('button');
nextButton.textContent = "Show Next";
nextButton.style.marginTop = "40px";
nextButton.style.padding = "10px 20px";
nextButton.style.fontSize = "1rem";
nextButton.style.cursor = "pointer";
nextButton.style.border = "none";
nextButton.style.borderRadius = "5px";
nextButton.style.backgroundColor = "#fe5aa7";
nextButton.style.color = "#fff";
nextButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
nextButton.style.transition = "background-color 0.3s ease";
nextButton.onmouseover = () => nextButton.style.backgroundColor = "#e04a8c";
nextButton.onmouseout = () => nextButton.style.backgroundColor = "#fe5aa7";

// Style the button and hide it initially
nextButton.style.display = "block"; // Reserve space for the button
nextButton.style.margin = "40px auto"; // Center horizontally
nextButton.style.textAlign = "center";
nextButton.style.opacity = "0"; // Start with 0 opacity
nextButton.style.transition = "opacity 0.5s ease-in"; // Add ease-in animation
nextButton.style.visibility = "hidden"; // Initially hidden but space is reserved

// Append the button to the countdown container
container.appendChild(nextButton);

// Add event listener to the button
nextButton.addEventListener("click", () => {
  // Trigger fall animation for the first container
  container.classList.add('fall-down');

  // Show the second container after the first one falls
  setTimeout(() => {
    secondContainer.classList.add('show');

    // Trigger confetti effect when the second container is shown
    const confettiConfigObj = {
      colorsArray: [
        "rgba(255, 180, 185, 1)", // Light pink
        "rgba(255, 220, 185, 1)", // Light peach
        "rgba(255, 255, 185, 1)", // Light yellow
        "rgba(185, 255, 200, 1)", // Light green
        "rgb(170, 214, 247)",     // Light blue
        "rgb(167, 114, 236)",     // Light purple
        "rgba(200, 80, 100, 1)",  // Darker pink
        "rgb(46, 114, 241)",      // Darker peach
        "rgb(198, 198, 67)"       // Darker yellow
      ],
      velocity: 0.0005,
      quantity: 750,
      minSize: 4,
      maxSize: 12,
      minOpacity: 0.9,
      maxOpacity: 1,
      infiniteLoop: false
    };

    // Call the generateConfetti function with the configuration and canvas ID
    generateConfetti(confettiConfigObj, "vanillaConfettiCanvas");
  }, 1500); // Delay to match the confetti timing
});

document.body.appendChild(container);

// Create second countdown container (empty box)
const secondContainer = document.createElement('div');
secondContainer.className = 'second-container';
secondContainer.id = 'second-countdown-box';
document.body.appendChild(secondContainer);

// Add content to the second container
const secondContainerContent = document.createElement('div');
secondContainerContent.style.textAlign = 'center';
secondContainerContent.style.padding = '5%'; // Use percentage for padding
secondContainerContent.style.lineHeight = '1.5'; // Adjust line height for readability

// Add "Happy Birthday!" text
const happyBirthdayText = document.createElement('h1');
happyBirthdayText.textContent = "Happy Birthday!";
happyBirthdayText.style.fontSize = '5vw'; // Use viewport width for font size
happyBirthdayText.style.color = '#EF0BBD';
happyBirthdayText.style.marginBottom = '2%'; // Use percentage for spacing
happyBirthdayText.style.marginTop = '0px'; // Move closer to the top
secondContainerContent.appendChild(happyBirthdayText);

// Add emojis
const emojisLine = document.createElement('div');
emojisLine.textContent = "🎉🎂🎁✨💖";
emojisLine.style.fontSize = '4vw'; // Use viewport width for font size
emojisLine.style.marginBottom = '2%'; // Use percentage for spacing
secondContainerContent.appendChild(emojisLine);

// Add "To My Cutiepie" text
const cutiepieText = document.createElement('h2');
cutiepieText.textContent = "To My Cutiepie...";
cutiepieText.style.fontSize = '4vw'; // Use viewport width for font size
cutiepieText.style.color = '#F524C7';
cutiepieText.style.marginTop = '1%'; // Use percentage for spacing
cutiepieText.style.marginBottom = '2%'; // Use percentage for spacing
secondContainerContent.appendChild(cutiepieText);

// Append the content to the second container
secondContainer.appendChild(secondContainerContent);

// Floating Emojis behind the page
const emojis = ['💖','💗','🔷', '💖', '🌟','🥟'];
const emojiWrapper = document.createElement('div');
emojiWrapper.style.position = 'fixed';
emojiWrapper.style.top = '0';
emojiWrapper.style.left = '0';
emojiWrapper.style.width = '100vw';
emojiWrapper.style.height = '100vh';
emojiWrapper.style.zIndex = '0'; // Ensure it's behind everything but remains visible
emojiWrapper.style.pointerEvents = 'none'; // Make sure it doesn't interfere with user interactions
document.body.appendChild(emojiWrapper);

// Create random floating emojis with more spread
for (let i = 0; i < 15; i++) {
  const emojiElement = document.createElement('div');
  emojiElement.classList.add('floating-emoji');
  emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Set random initial position for each emoji, spread out more
  emojiElement.style.left = `${Math.random() * 100}vw`; // Wider horizontal range
  emojiElement.style.top = `${Math.random() * 100}vh`; // Wider vertical range

  // Add the emoji to the background layer
  emojiWrapper.appendChild(emojiElement);
}

// Add the special "✨" emoji at the top right corner of the container
const specialEmoji = document.createElement('div');
specialEmoji.classList.add('floating-emoji');
specialEmoji.textContent = '✨';
specialEmoji.style.left = 'calc(100% - 2rem)'; // Positioned at the top-right corner
specialEmoji.style.top = '0';
emojiWrapper.appendChild(specialEmoji);

// Ensure the emoji wrapper stays behind the containers but remains visible
emojiWrapper.style.zIndex = '0'; // Set z-index to 0 to keep it visible but behind other elements

// Ensure the containers have a higher z-index
container.style.zIndex = '1'; // Set a higher z-index for the countdown container
secondContainer.style.zIndex = '2'; // Set a higher z-index for the second container

// Create a mute/unmute button
const muteButton = document.createElement('button');
muteButton.textContent = "Mute"; // Default text for mute
muteButton.style.position = "fixed";
muteButton.style.top = "20px"; // Position at the top corner
muteButton.style.right = "20px"; // Position at the right corner
muteButton.style.padding = "10px 20px"; // Adjust padding for rounded rectangle shape
muteButton.style.fontSize = "1.2rem";
muteButton.style.cursor = "pointer";
muteButton.style.border = "none";
muteButton.style.borderRadius = "15px"; // Rounded rectangle shape
muteButton.style.backgroundColor = "rgba(255, 255, 255, 0.6)"; // Semi-transparent background
muteButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)"; // Shadow effect
muteButton.style.transition = "background-color 0.3s ease, transform 0.2s ease";
muteButton.onmouseover = () => muteButton.style.backgroundColor = "rgba(240, 240, 240, 0.8)";
muteButton.onmouseout = () => muteButton.style.backgroundColor = "rgba(255, 255, 255, 0.6)";
muteButton.onmousedown = () => muteButton.style.transform = "scale(0.95)";
muteButton.onmouseup = () => muteButton.style.transform = "scale(1)";

// Add event listener to toggle text between "Mute" and "Unmute"
muteButton.addEventListener("click", () => {
  if (muteButton.textContent === "Mute") {
    muteButton.textContent = "Unmute";
  } else {
    muteButton.textContent = "Mute";
  }
});

// Append the mute/unmute button to the body
document.body.appendChild(muteButton);

// Logic
const birthday = new Date("2025-05-03T20:12:00");

function createTimeBox(value, label) {
  return `
    <div class="time-box">
      <div class="time-value">${value}</div>
      <div class="time-label">${label}</div>
    </div>
  `;
}

window.onload = () => {
  setTimeout(() => {
    loadingScreen.remove();
    container.classList.add('show');
    setTimeout(() => ribbon.classList.add('reveal'), 2000);
  }, 3000);
};

const now = new Date();
let diff = birthday - now;

if (diff <= 0) {
  let fakeSeconds = 5;
  const interval = setInterval(() => {
    countdownEl.innerHTML = createTimeBox(fakeSeconds, 'Seconds');
    fakeSeconds--;

    if (fakeSeconds < 0) {
      clearInterval(interval);

      // Show the button with ease-in animation
      nextButton.style.visibility = "visible"; // Make the button visible
      setTimeout(() => {
        nextButton.style.opacity = "1"; // Fade in the button
      }, 50); // Small delay to ensure visibility is applied before opacity
    }
  }, 1000);
} else {
  function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
      clearInterval(interval);

      // Show the button with ease-in animation
      nextButton.style.visibility = "visible"; // Make the button visible
      setTimeout(() => {
        nextButton.style.opacity = "1"; // Fade in the button
      }, 50); // Small delay to ensure visibility is applied before opacity
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownEl.innerHTML =
      createTimeBox(days, 'Days') +
      createTimeBox(hours, 'Hours') +
      createTimeBox(minutes, 'Minutes') +
      createTimeBox(seconds, 'Seconds');
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Adjust countdown container styles
const countdownContainer = document.querySelector('.countdown-container');
countdownContainer.style.padding = '40px 40px'; // Adjust padding
countdownContainer.style.height = '47vh'; // Adjust height
