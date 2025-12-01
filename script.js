// Import the generateConfetti function from the package
import { generateConfetti } from "./vanillaConfetti-main/vanillaConfetti.min.js";
// Create and insert styles
const style = document.createElement('style');
style.textContent = `
  html, body {
    margin: 0;
    padding: 0;
    width: 100%; 
    height: 100%;
    overflow: hidden; /* Prevent scrollbars */
    font-family: 'Sour Gummy', sans-serif; /* Default font */
    background: linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb, #a18cd1);
    background-size: 400% 400%;
    animation: gradientFlow 20s ease infinite;
    overflow: hidden;
  }

  * {
    font-family: 'Sour Gummy', sans-serif; /* Default font */
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

  h1 {
    font-family: 'Pacifico', cursive; /* Font for "Happy Birthday" */
    font-size: 5vw; /* Responsive font size */
    color: #EF0BBD;
  }

  h2 {
    font-family: 'Caveat', cursive; /* Font for "To My Cutiepie" */
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
    opacity: 0.3;
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

  @keyframes floatImage {
    0%   { transform: rotate(-15deg) scale(1); }
    5%   { transform: rotate(-12deg) scale(1.03); }
    10%  { transform: rotate(-9deg)  scale(1.06); }
    15%  { transform: rotate(-6deg)  scale(1.08); }
    20%  { transform: rotate(-3deg)  scale(1.1); }
    25%  { transform: rotate(0deg)   scale(1.12); }
    30%  { transform: rotate(3deg)   scale(1.13); }
    35%  { transform: rotate(6deg)   scale(1.12); }
    40%  { transform: rotate(9deg)   scale(1.1); }
    45%  { transform: rotate(12deg)  scale(1.08); }
    50%  { transform: rotate(15deg)  scale(1.06); }
    55%  { transform: rotate(12deg)  scale(1.03); }
    60%  { transform: rotate(9deg)   scale(1); }
    65%  { transform: rotate(6deg)   scale(0.97); }
    70%  { transform: rotate(3deg)   scale(0.94); }
    75%  { transform: rotate(0deg)   scale(0.92); }
    80%  { transform: rotate(-3deg)  scale(0.91); }
    85%  { transform: rotate(-6deg)  scale(0.92); }
    90%  { transform: rotate(-9deg)  scale(0.94); }
    95%  { transform: rotate(-12deg) scale(0.97); }
    100% { transform: rotate(-15deg) scale(1); }
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
    height: 14vw;
    width: 14vw;
    text-align: center;
    box-shadow: 0 4px 10px rgb(253, 125, 236);
    outline: 2px solid #fe5aa7;
    display: flex; /* Use flexbox for positioning */
    flex-direction: column; /* Stack elements vertically */
    justify-content: center; /* Center elements vertically */
    align-items: center; /* Center elements horizontally */
    position: relative; /* Enable absolute positioning for child elements */
  }

  .time-value {
    font-family: 'Kalam', cursive; /* Font for time value */
    font-size: 2rem; /* Increase font size for better visibility */
    font-weight: bold;
    position: absolute; /* Allow precise positioning */
    top: 40%; /* Adjust vertical position downward */
    left: 50%; /* Center horizontally */
    transform: translate(-50%, -50%); /* Center the element */
    color: rgb(153, 102, 204); /* Change color to pink */
  }

  .time-label {
    font-family: 'Leckerli One', cursive; /* Font for time label */
    font-size: 1rem;
    color:rgb(255, 0, 128); /* Change color to pink */
    position: absolute; /* Allow precise positioning */
    bottom: 12%; /* Adjust vertical position upward */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Center the element */
  }

  @media (max-width: 768px) {
    .time-box {
      height: 18vw; /* Adjust height for smaller screens */
      width: 18vw; /* Adjust width for smaller screens */
    }

    .time-value {
      font-size: 2rem; /* Adjust font size for smaller screens */
      top: 40%; /* Adjust vertical position */
    }

    .time-label {
      font-size: 1rem; /* Adjust font size for smaller screens */
      bottom: 12%; /* Adjust vertical position */
    }
  }

  @media (max-width: 480px) {
    .time-box {
      height: 22vw; /* Adjust height for very small screens */
      width: 22vw; /* Adjust width for very small screens */
    }

    .time-value {
      font-size: 2rem; /* Adjust font size for very small screens */
      top: 40%; /* Adjust vertical position */
    }

    .time-label {
      font-size: 1rem; /* Adjust font size for very small screens */
      bottom: 12%; /* Adjust vertical position */
    }
  }

  .extra-message-box {
    background: #ffe0f0;
    border-radius: 15px;
    padding: 15px 20px;
    text-align: center;
    margin-top: 40px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Sour Gummy', sans-serif; /* Default font */
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

  .reveal-box {
    position: relative;
    width: 40vw; /* Responsive width */
    max-width: 300px; /* Limit max width */
    height: 20vw; /* Responsive height */
    max-height: 150px; /* Limit max height */
    margin: 20px auto;
    perspective: 1000px; /* Enable 3D perspective */
  }

  .reveal-box-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.8s;
    cursor: pointer;
  }

  .reveal-box-front, .reveal-box-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vw; /* Responsive font size */
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .reveal-box.flipped .reveal-box-inner {
    transform: rotateX(180deg); /* Flip vertically */
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .reveal-box {
      width: 60vw; /* Adjust width for smaller screens */
      height: 30vw; /* Adjust height for smaller screens */
    }

    .reveal-box-front, .reveal-box-back {
      font-size: 3vw; /* Adjust font size for smaller screens */
    }
  }

  @media (max-width: 480px) {
    .reveal-box {
      width: 80vw; /* Adjust width for very small screens */
      height: 40vw; /* Adjust height for very small screens */
    }

    .reveal-box-front, .reveal-box-back {
      font-size: 4vw; /* Adjust font size for very small screens */
    }
  }

  .reveal-box-front {
    background: linear-gradient(135deg,hsl(287, 90.70%, 57.80%),rgb(216, 62, 236) ,rgb(230, 62, 169)); /* Gradient colors */
    background-size: 200% 200%; /* Larger background for animation */
    color: #fff;
    animation: shineEffect 3s linear infinite; /* Add animation */
  }

  @keyframes shineEffect {
    0% {
      background-position: 0% 50%; /* Start position */
    }
    50% {
      background-position: 100% 50%; /* Middle position */
    }
    100% {
      background-position: 0% 50%; /* End position */
    }
  }

  @keyframes gradientMove {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .reveal-box {
    position: relative;
    width: 80vw; /* Adjust width (e.g., 50% of the viewport width) */
    max-width: 400px; /* Set a maximum width */
    height: 25vw; /* Adjust height (e.g., 25% of the viewport width) */
    max-height: 200px; /* Set a maximum height */
    margin: 20px auto;
    perspective: 1000px; /* Enable 3D perspective */
  }

  .reveal-box-inner {
    position: absolute;
    width: 80%; /* Match the size of the parent */
    height: 100%; /* Match the size of the parent */
    transform-style: preserve-3d;
    transition: transform 0.8s;
    cursor: pointer;
  }

  .reveal-box-front, .reveal-box-back {
    position: absolute;
    width: 80%; /* Match the size of the parent */
    height: 100%; /* Match the size of the parent */
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5vw; /* Adjust font size for responsiveness */
    font-weight: bold;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  /* Responsive adjustments for smaller screens */
  @media (max-width: 768px) {
    .reveal-box {
      width: 70vw; /* Increase width for smaller screens */
      height: 35vw; /* Adjust height proportionally */
    }
  }

  @media (max-width: 480px) {
    .reveal-box {
      width: 90vw; /* Use almost full width for very small screens */
      height: 45vw; /* Adjust height proportionally */
    }
  }

  /* Font for the button */
  button {
    font-family: 'Lobster', cursive; /* Font for buttons */
    font-size: 1rem;
    font-weight: bold;
  }

  .reveal-box-back {
    background: rgb(248, 237, 212); /* Existing background color */
    color: blue; /* Change font color to blue */
    font-size: 0.8rem;
    transform: rotateX(180deg); /* Flip vertically */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 15px; /* Ensure proper spacing */
  }

  .second-container.fall-down {
  animation: fallDown 1s forwards;
  } 
`;

document.head.appendChild(style);

// Add Google Fonts dynamically
const fontLink = document.createElement('link');
fontLink.rel = 'stylesheet';
fontLink.href = 'https://fonts.googleapis.com/css2?family=Pacifico&family=Caveat:wght@400;700&family=Lobster&family=Kalam:wght@400;700&family=Leckerli+One&family=Sour+Gummy:wght@500&display=swap';
document.head.appendChild(fontLink);

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

// Add "Birthday Countdown" text
const countdownTitle = document.createElement('h3');
countdownTitle.textContent = "Birthday Countdown 🎂";
countdownTitle.style.textAlign = 'center';
countdownTitle.style.fontFamily = "'Pacifico', cursive";
countdownTitle.style.fontSize = '1.5rem';
countdownTitle.style.color = '#ff1493';
countdownTitle.style.marginTop = '-10px'; // Add spacing below the title
container.appendChild(countdownTitle);

const countdownEl = document.createElement('div');
countdownEl.id = 'countdown';
container.appendChild(countdownEl);

// Create extra message box
const extraMessageBox = document.createElement('div');
extraMessageBox.className = 'extra-message-box';
extraMessageBox.innerHTML = "Just a little more....<br>Specially for You💖";
extraMessageBox.style.fontSize = "1rem";
container.appendChild(extraMessageBox);

// Add animated loading dots below the message box
const countdownLoadingDots = document.createElement('div');
countdownLoadingDots.id = 'countdown-loading-dots';
countdownLoadingDots.style.textAlign = 'center';
countdownLoadingDots.style.fontSize = '4rem';
countdownLoadingDots.style.marginTop = '10px';
countdownLoadingDots.style.color = '#ff1493';
container.appendChild(countdownLoadingDots);

// Animate the loading dots
let countdownDots = ['.', '..', '...'];
let countdownDotIndex = 0;
setInterval(() => {
  countdownLoadingDots.textContent = countdownDots[countdownDotIndex];
  countdownDotIndex = (countdownDotIndex + 1) % countdownDots.length;
}, 500);

// Create a button below the countdown box
const nextButton = document.createElement('button');
nextButton.textContent = "For You 🍀💘";
nextButton.style.marginTop = "40px";
nextButton.style.padding = "10px 20px";
nextButton.style.fontSize = "1rem";
nextButton.style.cursor = "pointer";
nextButton.style.border = "none";
nextButton.style.borderRadius = "5px";
nextButton.style.background = "linear-gradient(90deg, #6a0dad, #ff69b4, #ff1493, #6a0dad)";
nextButton.style.backgroundSize = "200% 200%";
nextButton.style.color = "#fff";
nextButton.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
nextButton.style.animation = "gradientMove 3s linear infinite";
nextButton.onmouseover = () => nextButton.style.background = "linear-gradient(90deg, #5a009d, #3a0062)";
nextButton.onmouseout = () => nextButton.style.background = "linear-gradient(90deg, #6a0dad, #4b0082)";

// Style the button and hide it initially
nextButton.style.display = "block"; // Reserve space for the button
nextButton.style.margin = "40px auto"; // Center horizontally
nextButton.style.textAlign = "center";
nextButton.style.opacity = "0"; // Start with 0 opacity
nextButton.style.transition = "opacity 0.5s ease-in"; // Add ease-in animation
nextButton.style.visibility = "hidden"; // Initially hidden but space is reserved

// Append the button to the countdown container
container.appendChild(nextButton);

// Add the ribbon to the first container
const ribbon = document.createElement('div');
ribbon.id = 'ribbon';
ribbon.textContent = '🎀';
ribbon.style.position = 'absolute';
ribbon.style.bottom = '-20px'; // Position at the bottom
ribbon.style.right = '-20px'; // Position at the right
ribbon.style.fontSize = '5rem';
ribbon.style.fontWeight = 'bold';
ribbon.style.color = '#fff';
ribbon.style.opacity = '0'; // Initially hidden
ribbon.style.transform = 'scale(0) rotate(-10deg)'; // Start with scale 0 and tilted
ribbon.style.transition = 'transform 1s ease, opacity 0.5s ease'; // Smooth transition

// Append the ribbon to the countdown container
container.appendChild(ribbon);

// Show the ribbon after the container stabilizes
setTimeout(() => {
  ribbon.style.opacity = '1'; // Make it visible
  ribbon.style.transform = 'scale(1) rotate(-15deg)'; // Zoom in and tilt slightly
}, 6500); // Delay to match the container's fall and stabilization

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
      infiniteLoop: false,
      velocity: 0.0005,
      quantity: 500,
      minSize: 4,
      maxSize: 12,
      minOpacity: 0.9,
      maxOpacity: 1,
      infiniteLoop: false
    };
    // Call the generateConfetti function with the configuration and canvas ID
    generateConfetti(confettiConfigObj, "vanillaConfettiCanvas");

    // Ensure the confetti canvas appears above everything
    const confettiCanvas = document.getElementById("vanillaConfettiCanvas");
    if (confettiCanvas) {
      confettiCanvas.style.position = "fixed"; // Ensure it stays in place
      confettiCanvas.style.top = "0";
      confettiCanvas.style.left = "0";
      confettiCanvas.style.width = "100vw";
      confettiCanvas.style.height = "100vh";
      confettiCanvas.style.zIndex = "9999"; // Set a very high z-index
      confettiCanvas.style.pointerEvents = "none"; // Prevent interaction with the canvas
    }
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

// --- Add your custom image here ---
const customImage = document.createElement('img');
customImage.src = './birthday-gift.jpg'; // Use your local image file name
customImage.alt = 'Custom Image';
customImage.style.width = '60px'; 
customImage.style.height = '50px'; // Add this line for consistent aspect ratio
customImage.style.borderRadius = '15px'; // Optional: rounded corners
customImage.style.marginBottom = '-40px'; // Center and add spacing
customImage.style.animation = 'floatImage 3s ease-in-out infinite'; // Add this line
customImage.style.display = 'none'; // <-- Hide by default
secondContainerContent.appendChild(customImage);

// Make the image act as a button to trigger fall-down animation
customImage.style.cursor = 'pointer'; // Show pointer on hover/tap
customImage.addEventListener('click', () => {
  secondContainer.classList.add('fall-down');
   setTimeout(() => {
    secondContainer.style.display = 'none';
  }, 1000); // Match the animation duration
});
// --- End custom image ---

// Add "Happy Birthday!" text
const happyBirthdayText = document.createElement('h1');
happyBirthdayText.textContent = "Happy Birthday!";
happyBirthdayText.style.fontSize = '5vw'; // Larger font size
happyBirthdayText.style.fontWeight = 'bold'; // Make it bold
happyBirthdayText.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)'; // Add shadow for emphasis
happyBirthdayText.style.color = '#ff3053';
happyBirthdayText.style.marginBottom = '2%'; // Use percentage for spacing
happyBirthdayText.style.marginTop = '0px'; // Move closer to the top
secondContainerContent.appendChild(happyBirthdayText);

// Add emojis
const emojisLine = document.createElement('div');
emojisLine.textContent = "🎉🎂🌟🎁💖";
emojisLine.style.fontSize = '4vw'; // Larger font size for emojis
emojisLine.style.marginBottom = '3%'; // Add more spacing below emojis
secondContainerContent.appendChild(emojisLine);

// Add "To My Cutiepie" text
const cutiepieText = document.createElement('h2');
cutiepieText.textContent = "To My Cutiepie...";
cutiepieText.style.fontSize = '3.5vw'; // font size
cutiepieText.style.fontWeight = '600'; // Semi-bold
cutiepieText.style.textShadow = '1px 1px 3px rgba(0, 0, 0, 0.2)'; // Add subtle shadow
cutiepieText.style.color = '#fa0c68';
cutiepieText.style.marginTop = '1%'; // Use percentage for spacing
cutiepieText.style.marginBottom = '2%'; // Use percentage for spacing
secondContainerContent.appendChild(cutiepieText);

// Append the content to the second container
secondContainer.appendChild(secondContainerContent);

// Create the "Tap to Reveal" box
const revealBox = document.createElement('div');
revealBox.className = 'reveal-box';
revealBox.innerHTML = `
  <div class="reveal-box-inner">
    <div class="reveal-box-front">Tap to Reveal Your Card</div>
    <div class="reveal-box-back"></div>
  </div>
`;

// Change the color of the reveal box back text
const revealBoxBack = revealBox.querySelector('.reveal-box-back');
revealBoxBack.innerHTML = `
  <span style="color: violet;">Just wanted to tell you that- you are my favourite person. Whenever I talk to you my day becomes Better</span><br>
  <span style="color: #ff1493;">I Hope your birthday is filled with SWEET Fragrance of Love, Magic and Happiness! which make you smile ❣️</span>
`;
revealBoxBack.style.background = 'rgb(255, 246, 217)'; 
// Style the reveal box for flexible positioning and shape
revealBox.style.margin = '50vw 5vw'; // Center horizontally
revealBox.style.marginTop = '4%'; // Add spacing from the top
revealBox.style.marginBottom = '60%'; // Add spacing from the bottom
revealBox.style.width = '100vw'; // Adjust width
revealBox.style.maxWidth = '500px'; // Limit maximum width
revealBox.style.height = '40vw'; // Adjust height
revealBox.style.maxHeight = '200px'; // Limit maximum height
revealBox.style.borderRadius = '15px'; // Add rounded corners
revealBox.style.perspective = '1000px'; // Enable 3D perspective

// Style the front text of the reveal card
const revealBoxFront = revealBox.querySelector('.reveal-box-front');
revealBoxFront.style.padding = '10px'; // Add padding for spacing
revealBoxFront.style.overflow = 'hidden'; // Prevent text overflow
revealBoxFront.style.textAlign = 'center'; // Center-align text
revealBoxFront.style.lineHeight = '1.5'; // Adjust line height for readability
revealBoxFront.style.fontSize = '1rem'; // Adjust font size for better fit
revealBoxFront.style.transform = 'rotate(5deg) translateY(-10px)'; // Tilt slightly to the right and move up
revealBoxFront.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'; // Add a shadow for the floating effect
revealBoxFront.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease'; // Smooth transition for hover effect
revealBoxFront.style.background = 'linear-gradient(135deg, #6a0dad, #ff69b4)'; // Same gradient as the footnote button
revealBoxFront.style.backgroundSize = '200% 200%'; // Ensure smooth gradient animation
revealBoxFront.style.color = '#fff'; // Keep the text color white for contrast
revealBoxFront.style.animation = 'shineEffect 3s linear infinite'; // Add animation if needed

// Add hover effect to enhance the floating appearance
revealBoxFront.addEventListener('mouseover', () => {
  revealBoxFront.style.transform = 'rotate(8deg) translateY(-15px)'; // Increase tilt and lift on hover
  revealBoxFront.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)'; // Enhance shadow on hover
});

revealBoxFront.addEventListener('mouseout', () => {
  revealBoxFront.style.transform = 'rotate(5deg) translateY(-10px)'; // Reset tilt and lift
  revealBoxFront.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)'; // Reset shadow
});

// Append the "Tap to Reveal" box to the second container
secondContainerContent.appendChild(revealBox);

// Add event listener for the flip animation
revealBox.addEventListener('click', () => {
  revealBox.classList.toggle('flipped');
  // Fade in/out the additional texts based on flip state
  if (revealBox.classList.contains('flipped')) {
    additionalTextsContainer.style.opacity = '1';
    additionalTextsContainer.style.pointerEvents = 'auto';
    customImage.style.display = 'block'; // <-- Show gift when revealed
  } else {
    additionalTextsContainer.style.opacity = '0';
    additionalTextsContainer.style.pointerEvents = 'none';
    customImage.style.display = 'none'; // <-- Hide gift if flipped back
  }
});

// Add additional texts below the reveal box (wrap in a container)
const additionalTextsContainer = document.createElement('div');
additionalTextsContainer.id = 'additional-texts';
// Start hidden and transparent, but keep in layout for transition
additionalTextsContainer.style.opacity = '0';
additionalTextsContainer.style.transition = 'opacity 0.8s ease';
additionalTextsContainer.style.pointerEvents = 'none'; // Prevent interaction when hidden

const additionalText1 = document.createElement('p');
additionalText1.textContent = "Wishing you all the happiness in the world!";
additionalText1.style.fontSize = '0.8rem';
additionalText1.style.textAlign = 'center';
additionalText1.style.marginTop = '-160px';
additionalText1.style.color = '#ff1493';

const additionalText2 = document.createElement('p');
additionalText2.textContent = "May your day be filled with love, laughter, and joy, And every wish you make may come true.";
additionalText2.style.fontSize = '0.8rem';
additionalText2.style.textAlign = 'center';
additionalText2.style.marginTop = '0';
additionalText2.style.color = 'violet';

const additionalText3 = document.createElement('p');
additionalText3.textContent = "You Deserve a lot and I'll be here to remind you of that 🫶";
additionalText3.style.fontSize = '0.8rem';
additionalText3.style.textAlign = 'center';
additionalText3.style.marginTop = '0';
additionalText3.style.color = '#ff1493';

// Append the texts to the container
additionalTextsContainer.appendChild(additionalText1);
additionalTextsContainer.appendChild(additionalText2);
additionalTextsContainer.appendChild(additionalText3);

// Append the container to the second container content
secondContainerContent.appendChild(additionalTextsContainer);

// Floating Emojis behind the page
const emojis = [,'💖','🥟','📒','🌟','🌸','💙'];
const emojiWrapper = document.createElement('div');
emojiWrapper.style.position =
emojiWrapper.style.top = '0';
emojiWrapper.style.left = '0';
emojiWrapper.style.width = '100vw';
emojiWrapper.style.height = '100vh';
emojiWrapper.style.zIndex = '0'; // Ensure it's behind everything but remains visible
emojiWrapper.style.pointerEvents = 'none'; // Make sure it doesn't interfere with user interactions
document.body.appendChild(emojiWrapper);

// Create random floating emojis with more spread
for (let i = 0; i < 20; i++) {
  const emojiElement = document.createElement('div');
  emojiElement.classList.add('floating-emoji');
  emojiElement.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Set random initial position for each emoji, spread out more
  emojiElement.style.left = `${Math.random() * 100}vw`; // Wider horizontal range
  emojiElement.style.top = `${Math.random() * 100}vh`; // Wider vertical range

  // Add the emoji to the background layer
  emojiWrapper.appendChild(emojiElement);
}

// Add fixed maple leaves to the background
const mapleLeaves = ['🍁', '🍂'];
const mapleLeafWrapper = document.createElement('div');
mapleLeafWrapper.style.position = 'fixed';
mapleLeafWrapper.style.top = '0';
mapleLeafWrapper.style.left = '0';
mapleLeafWrapper.style.width = '100vw';
mapleLeafWrapper.style.height = '100vh';
mapleLeafWrapper.style.zIndex = '0'; // Ensure it's behind everything
mapleLeafWrapper.style.pointerEvents = 'none'; // Prevent interaction
document.body.appendChild(mapleLeafWrapper);

for (let i = 0; i < 10; i++) { // Add 10 maple leaves
  const mapleLeaf = document.createElement('div');
  mapleLeaf.textContent = mapleLeaves[Math.floor(Math.random() * mapleLeaves.length)];
  mapleLeaf.style.position = 'absolute';
  mapleLeaf.style.left = `${Math.random() * 100}vw`; // Random horizontal position
  mapleLeaf.style.top = `${Math.random() * 100}vh`; // Random vertical position
  mapleLeaf.style.fontSize = `${Math.random() * 3 + 2}vw`; // Random size between 2vw and 5vw
  mapleLeaf.style.opacity = '0.7'; // Slight transparency
  mapleLeafWrapper.appendChild(mapleLeaf);
}

// Ensure the emoji wrapper stays behind the containers but remains visible
emojiWrapper.style.zIndex = '0'; // Set z-index to 0 to keep it visible but behind other elements

// Ensure the containers have a higher z-index
container.style.zIndex = '1'; // Set a higher z-index for the countdown container
secondContainer.style.zIndex = '2'; // Set a higher z-index for the second container

// Add fixed emojis to the background
const fixedEmojiLeft = document.createElement('div');
// fixedEmojiLeft.textContent = '💗';
const heartImg = document.createElement('img');
heartImg.src = './heart.png'; // Make sure 'heart.png' exists in your folder
heartImg.alt = 'Heart';
heartImg.style.width = '20vw';
heartImg.style.height = '20vw';
heartImg.style.display = 'block';
fixedEmojiLeft.appendChild(heartImg);
fixedEmojiLeft.style.position = 'fixed';
fixedEmojiLeft.style.left = '5%'; // Fixed position on the left
fixedEmojiLeft.style.top = '10%'; // Center vertically
fixedEmojiLeft.style.fontSize = '13vw'; // Increase size
fixedEmojiLeft.style.transform = 'translateY(-50%)'; // Center alignment
fixedEmojiLeft.style.zIndex = '0'; // Ensure it's behind other elements
fixedEmojiLeft.style.pointerEvents = 'none'; // Prevent interaction
fixedEmojiLeft.style.opacity = '0.7'; // Slightly transparent
document.body.appendChild(fixedEmojiLeft);

const fixedEmojiRight = document.createElement('div');
// fixedEmojiRight.textContent = '✨';
const starImg = document.createElement('img');
starImg.src = './star.png'; // Make sure 'star.png' exists in your folder
starImg.alt = 'Star';
starImg.style.width = '15vw';
starImg.style.height = '15vw';
starImg.style.display = 'block';
fixedEmojiRight.appendChild(starImg);
fixedEmojiRight.style.position = 'fixed';
fixedEmojiRight.style.right = '15%'; // Fixed position on the right
fixedEmojiRight.style.top = '12%'; // Center vertically
fixedEmojiRight.style.fontSize = '10vw'; // Increase size
fixedEmojiRight.style.transform = 'translateY(-50%)'; // Center alignment
fixedEmojiRight.style.zIndex = '0'; // Ensure it's behind other elements
fixedEmojiRight.style.pointerEvents = 'none'; // Prevent interaction
document.body.appendChild(fixedEmojiRight);

// Add floating animation to the fixed emoji on the right
fixedEmojiRight.style.animation = 'floatRight 3s ease-in-out infinite';

// Define the floating animation using CSS
const floatingStyle = document.createElement('style');
floatingStyle.textContent = `
  @keyframes floatRight {
    0% {
      transform: translateY(-10px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(-10px);
    }
  }
`;
document.head.appendChild(floatingStyle);

// countdown
const birthday = new Date("2026-06-07T00:00:00");

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
    if (document.getElementById('loading-screen')) {
      loadingScreen.remove(); // Remove the loading screen
    }
    container.classList.add('show'); // Show the countdown container
    backgroundAudio.play().catch((error) => {
      console.error("Audio playback failed:", error);
    }); // Start playing the audio
    setTimeout(() => ribbon.classList.add('reveal'), 2000); // Reveal the ribbon
  }, 3000); // Adjust the timeout as needed
};

// Fallback to ensure the loading screen is removed after a maximum timeout
setTimeout(() => {
  if (document.getElementById('loading-screen')) {
    loadingScreen.remove(); // Remove the loading screen
    backgroundAudio.play(); // Start playing the audio
  }
}, 10000); // Fallback timeout (10 seconds)

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
        countdownLoadingDots.style.display = "none"; // Hide the loading dots
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
        countdownLoadingDots.style.display = "none"; // Hide the loading dots
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
countdownContainer.style.height = '55vh'; // Adjust height

// Create the footnote button
const footnoteButton = document.createElement('div');
footnoteButton.id = 'footnote-button';
footnoteButton.textContent = '▲ Footnote';
footnoteButton.style.position = 'fixed';
footnoteButton.style.bottom = '40px';
footnoteButton.style.right = '20px';
footnoteButton.style.cursor = 'pointer';
footnoteButton.style.fontSize = '0.8rem';
footnoteButton.style.padding = '4px 8px';
footnoteButton.style.background = 'linear-gradient(135deg, #6a0dad, #ff69b4)';
footnoteButton.style.color = '#fff';
footnoteButton.style.borderRadius = '5px';
footnoteButton.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
footnoteButton.style.zIndex = '1000';
footnoteButton.style.transition = 'transform 0.3s ease';
footnoteButton.style.opacity = '0.5'; // Slightly transparent

// Add hover effect
footnoteButton.onmouseover = () => footnoteButton.style.transform = 'scale(1.1)';
footnoteButton.onmouseout = () => footnoteButton.style.transform = 'scale(1)';

// Create the footnote box
const footnoteBox = document.createElement('div');
footnoteBox.id = 'footnote-box';
footnoteBox.style.position = 'fixed';
footnoteBox.style.bottom = '70px';
footnoteBox.style.right = '20px';
footnoteBox.style.width = '250px';
footnoteBox.style.padding = '10px';
footnoteBox.style.background = '#fff';
footnoteBox.style.border = '1px solid #ccc';
footnoteBox.style.borderRadius = '5px';
footnoteBox.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
footnoteBox.style.fontSize = '0.8rem';
footnoteBox.style.color = '#444';
footnoteBox.style.display = 'none'; // Initially hidden
footnoteBox.style.zIndex = '1000';
footnoteBox.style.opacity = '0.5'; // Slightly transparent

// Add footnote content
footnoteBox.innerHTML = `
  <ul style="margin: 0; padding: 0 0 0 15px; list-style: disc;">
    <li>Sorry, I can't give you any physical gift, So... I made this.</li>
    </li>
  </ul>
`;

// Toggle footnote box visibility on button click
footnoteButton.addEventListener('click', () => {
  footnoteBox.style.display = footnoteBox.style.display === 'none' ? 'block' : 'none';
});

// Append the button and box to the document body
document.body.appendChild(footnoteButton);
document.body.appendChild(footnoteBox);

// 1. Create the open book container (hidden by default)
const bookContainer = document.createElement('div');
bookContainer.className = 'open-book-container';
bookContainer.id = 'open-book-container';
bookContainer.style.position = 'absolute';
bookContainer.style.top = '-100%'; // Start above the viewport
bookContainer.style.left = '50%';
bookContainer.style.transform = 'translate(-50%, -50%)';
bookContainer.style.opacity = '0';
bookContainer.style.transition = 'none';
bookContainer.style.zIndex = '3'; // Above the other containers

// Book HTML structure with flipable pages
bookContainer.innerHTML = `
  <div class="book" style="position:relative;">
    <div class="book-cover"></div>
    <div class="book-page book-left book-flip" id="book-page-left">
      <div class="book-content" style="height:100%;position:relative;">
        <div class="book-page-number" id="left-page-number" style="
          position: absolute;
          top: 2px;      /* Move closer to the very top */
          left: 6px;     /* Move closer to the very left */
          font-size: 0.9rem;
          color: #bdbdbd;
          z-index: 10;
          pointer-events: none;
        ">1</div>
        <div id="left-page-content">
          <h2 style="color:#333; margin-bottom:10px;">A Little Note</h2>
          <p style="font-size:1.1rem; color:#444;">
            You are the story I want to read again and again.<br>
            Thank you for being you. Happy Birthday!
          </p>
        </div>
      </div>
    </div>
    <div class="book-spine"></div>
    <div class="book-page book-right book-flip" id="book-page-right">
      <div class="book-content" style="height:100%;position:relative;">
        <div class="book-page-number" id="right-page-number" style="
          position: absolute;
          top: 2px;      /* Move closer to the very top */
          right: 6px;    /* Move closer to the very right */
          font-size: 0.9rem;
          color: #bdbdbd;
          z-index: 10;
          pointer-events: none;
        ">2</div>
        <div id="right-page-content">
          <h2 style="color:#333; margin-bottom:10px;">Favourites</h2>
          <ul style="font-size:0.8rem; color:#444; text-align:left; margin:0 0 0 1.2em; padding:0;">
            <li>Her favourite Place is 'Saraswati Ghat'.</li>
            <li>Favourite thing is her 'Teddy'.</li>
            <li>Favourite food is 'Momos'. <span style="font-size:0.9em; color:#888;">(somehow dal chawal too....)</span></li>
            <li>She Loves BOOKS, especially those by "Aan Huang".</li>
          </ul>
          <div style="text-align:center; margin-top:8px;">
            <span style="font-size:2rem;">💖✨</span>
          </div>
        </div>
        <div id="right-page-arrow" style="
          position: absolute;
          bottom: 10px;
          right: 20px;
          font-size: 2rem;
          color: #b97a56;
          cursor: pointer;
          user-select: none;
          transition: transform 0.2s;
          z-index: 10;
        " title="Next">&#8594;</div>
      </div>
    </div>
  </div>
`;

// 1. Create the END button
const endButton = document.createElement('button');
endButton.textContent = 'END';
endButton.style.position = 'absolute';
endButton.style.bottom = '18px';
endButton.style.right = '28px';
endButton.style.fontWeight = 'bold';
endButton.style.fontSize = '1rem';
endButton.style.background = '#fff';
endButton.style.color = '#b97a56';
endButton.style.border = '2px solid #b97a56';
endButton.style.borderRadius = '6px';
endButton.style.padding = '4px 14px';
endButton.style.cursor = 'pointer';
endButton.style.zIndex = '20';
endButton.style.boxShadow = '0 2px 8px rgba(80,60,120,0.10)';
endButton.style.transition = 'background 0.2s, color 0.2s, transform 0.2s';
endButton.style.pointerEvents = 'auto'; // Allow click events on END button
endButton.onmouseover = () => {
  endButton.style.background = '#b97a56';
  endButton.style.color = '#fff';
  endButton.style.transform = 'scale(1.08)';
};
endButton.onmouseout = () => {
  endButton.style.background = '#fff';
  endButton.style.color = '#b97a56';
  endButton.style.transform = 'scale(1)';
};

// 2. Append the END button to the book cover (after bookContainer.innerHTML)
const bookCover = bookContainer.querySelector('.book-cover');
if (bookCover) {
  bookCover.appendChild(endButton);
}

// 3. (Optional) Add click event for END button (e.g., close the book with fall-down animation)
endButton.addEventListener('click', () => {
  bookContainer.classList.remove('show');
  bookContainer.style.animation = 'fallDown 1s forwards';
  setTimeout(() => {
    bookContainer.style.display = 'none';
    showRollingCredits();
  }, 1000); // Match the animation duration
});

endButton.addEventListener('touchstart', () => {
  bookContainer.classList.remove('show');
  bookContainer.style.animation = 'fallDown 1s forwards';
  setTimeout(() => {
    bookContainer.style.display = 'none';
    showRollingCredits();
  }, 1000);
});

// Function to show rolling credits
function showRollingCredits() {
  // Remove any existing credits
  const oldCredits = document.getElementById('rolling-credits');
  if (oldCredits) oldCredits.remove();

  // Create the credits container
  const credits = document.createElement('div');
  credits.id = 'rolling-credits';
  credits.style.position = 'fixed';
  credits.style.left = '0';
  credits.style.top = '0';
  credits.style.width = '100vw';
  credits.style.height = '100vh';
  credits.style.background = 'transparent';
  credits.style.display = 'flex';
  credits.style.justifyContent = 'center';
  credits.style.alignItems = 'flex-end';
  credits.style.zIndex = '99999';
  credits.style.pointerEvents = 'none';

  // Credit text content
  credits.innerHTML = `
    <div id="credits-text" style="
      font-family: 'Pacifico', cursive;
      font-size: 2.5rem;
      color: #b97a56;
      text-align: center;
      width: 100vw;
      line-height: 1.5;
      font-weight: bold;
      pointer-events: none;
      ">
      <div>Have a Best Day!</div>
      <div style="font-size:2rem; color:#ff1493;">You are Amazing!</div>
      <div style="font-size:1.5rem; color:#fa0c68;">Made with 💖 just for you</div>
      <div style="font-size:1.2rem; color:#888; margin-top:2rem;">— by Your Secret Admirer</div>
    </div>
  `;

  document.body.appendChild(credits);

  // Animate the credits text from bottom to top
  const creditsText = credits.querySelector('#credits-text');
  creditsText.style.position = 'absolute';
  creditsText.style.bottom = '-40vh';
  creditsText.style.left = '50%';
  creditsText.style.transform = 'translateX(-50%)';
  creditsText.style.transition = 'bottom 7s linear';

  // Trigger the animation
  setTimeout(() => {
    creditsText.style.bottom = '110vh';
  }, 100); // Small delay to ensure rendering

  // Remove credits after animation
  setTimeout(() => {
    credits.remove();
  }, 7500); // Duration matches the animation
}

// 2. Append to body
document.body.appendChild(bookContainer);

// 2. Add CSS for the open book and animation
const bookStyle = document.createElement('style');
bookStyle.textContent = `
  .open-book-container {
    width: 70vw;
    max-width: 600px;
    height: 40vh;
    max-height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    background: none;
  }
  .open-book-container.show {
    opacity: 1;
    animation: fallAndBounce 2.2s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
    pointer-events: auto;
  }
  .book {
    display: flex;
    width: 100%;
    height: 100%;
    perspective: 1200px;
    border-radius: 0;
    border: none;
    box-shadow: none;
    position: relative;
    padding: 0;
    background: none;
  }
  .book-page {
    width: 44%; /* Decreased from 48% */
    height: 90%; /* Slightly smaller height */
    background: #fff;
    border-radius: 0 0 18px 18px; /* Slight curve at the bottom */
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    padding: 2vw 2vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: transform 1s cubic-bezier(0.2,0.7,0.3,1);
    overflow: hidden;
    border: 1px solid #e0e0e0;
    position: relative; /* For stacking above cover */
    z-index: 2;
  }
  .book-left {
    /* Pointy on top-left & bottom-left, curved on right */
    border-radius: 0 18px 18px 0; /* top-left, top-right, bottom-right, bottom-left */
    border-right: none;
    box-shadow: none;
    border-left: none;
    margin-left: 6vw; /* Adjust this value for more/less space */
    margin-right: 0.08vw;
    }
  .book-right {
    /* Pointy on top-right & bottom-right, curved on left */
    border-radius: 18px 0 0 18px; /* top-left, top-right, bottom-right, bottom-left */
    border-left: none;
    box-shadow: none;
    border-right: none;
    margin-right: 6vw;
    margin-left: 0.08vw /* Adjust this value for more/less space */
  }
  /* Book cover (background behind pages) */
  .book-cover {
    position: absolute;
    top: -2%;
    left: 5%;
    width: 90%;
    height: 94%;
    background: #b97a56;
    border-radius: 12px 12px 12px 12px;
    box-shadow: 0 8px 24px rgba(80,60,120,0.10);
    z-index: 1;
    pointer-events: none;
    marginleft: 15vw;
    marginright: 15vw;
    marginTop: 0;
    marginBottom: 0;
  }
  .book-content {
    text-align: center;
    font-family: 'Caveat', cursive;
    padding: 0 0.5vw;
  }
  @media (max-width: 768px) {
    .open-book-container {
      width: 95vw;
      height: 45vh;
    }
    .book-content h2 { font-size: 1.2rem; }
    .book-content p { font-size: 0.95rem; }
  }
`;
document.head.appendChild(bookStyle);

// 3. Show the open book after the second falls down
customImage.addEventListener('click', () => {
  secondContainer.classList.add('fall-down');
  setTimeout(() => {
    secondContainer.style.display = 'none';
    // Show open book after 0.5s
    setTimeout(() => {
      bookContainer.classList.add('show');
      // --- Add this block to update book content on first show ---
      leftPageNumber.textContent = bookPages[bookPageSetIndex].left.number;
      leftPageContent.innerHTML = bookPages[bookPageSetIndex].left.html;
      leftPageContent.parentElement.appendChild(leftPageArrow); // Keep arrow if needed
      rightPageNumber.textContent = bookPages[bookPageSetIndex].right.number;
      rightPageContent.innerHTML = bookPages[bookPageSetIndex].right.html;
      updateArrows();
      // -----------------------------------------------------------
    }, 100);
  }, 500);
});

// Book page content arrays
const bookPages = [
  {
    left: {
      number: 1,
      html: `<h1 style="color:rgb(116, 60, 26); font-size:1.8rem; margin-bottom:8px; font-family:'Pacifico',cursive;">
        <br>Things I Know About Her
      </h1>`
    },
    right: {
      number: 2,
      html: `<h2 style="color:rgb(224, 29, 87); margin-bottom:10px; text-decoration: underline;">Favourites</h2>
        <ul style="font-size:0.8rem; color:#444; text-align:left; margin:0 0 0 1.2em; padding:0;">
          <li>She Loves BOOKS, especially those by "Ana Huang".</li>
          <li>Her favourite Place is 'Saraswati Ghat'.</li>
          <li>Favourite thing is her 'Teddy'.</li>
          <li>Favourite food is 'Momos'. <span style="font-size:0.9em; color:#888;">(somehow dal chawal too....)</span></li>
          <li>Loves to Listen Music on Radio.</li>
        <p id="right-page-text" style="font-size:1rem; color:#444;">
          <div style="position:absolute; bottom:4px; left:10px; font-size:1rem;"> 💖🪙</div>
        </p>
        </ul>
        <div style="text-align:center; margin-top:8px;">
          <span style="font-size:2rem;"></span>
        </div>`
    }
  },
  {
    left: {
      number: 3,
      html: `
    <ul style="font-size:0.8rem; color:#444; text-align:left; margin:1.5em 0 0 1.2em; padding:0;">
      <li>Prefers Kurkure over Lays.</li>
      <li>Her favourite colour is 'Black and White'.</li>
      <li>Loves Gale and Gloomy weather.</li>
      <li>Forgot to say, she loves Music and bOOks.</li>
      <li>Finds kids cute.</li>
      <li>Fictional MEN...😞
      <li>Her favourite person is.......</li>
    </ul>
    <div style="position:absolute; bottom:4px; right:10px; font-size:1rem;">🌸🎈</div>
  `
    },
    right: {
      number: 4,
      html: `<h2 style="color:#333; margin-bottom:10px;"><b>Her Skills:</b></h2>
  <ol style="font-size:0.8rem; color:#444; text-align:left; margin:0 0 0 1.2em; padding:0;">
    <li> A Cutie at her Finest</li>
    <li> Choreographer of her own dance moves</li>
    <li> Book Reader</li>
    <li> Knows to play Guitar</li>
    <li> Probably a Good Cook</li>
    <li> Horn-</li>
    <li></li>
    <li style="list-style:none; text-align:left; margin-left:-0.9em;">?.</li>
    <br>
     <p id="right-page-text" style="font-size:1rem; color:#444;">
          <div style="position:absolute; bottom:4px; left:10px; font-size:1rem;">😊🌟</div>
        </p>
  </ol>`
    }
  },
  {
    left: {
      number: 5,
      html: `<h2 style="color:rgb(61, 125, 244); margin-bottom:10px;"><b>Things she hates ;-;</b></h2>
        <p style="font-size:0.9rem; color:rgb(15, 190, 187);">
          Hates it when someone stops the music while she is cooking.</p>
          <p style="font-size:1.1rem;">Cheating. </p>
          <p style="font-size:0.9rem; color:#444;">Skin care (aalsi...)<br><br>??????</p>
           <div style="position:absolute; bottom:32px; right:14px; font-size:0.35rem; color:#bbb; font-style:italic; pointer-events:none;">(me?🥺)</div>
          <div style="position:absolute; bottom:4px; right:10px; font-size:1rem;">🍰📗</div>
      `
    },
    right: {
      number: 6,
      html: `<h2 style="color:#333; margin-bottom:10px;">She wants to do:-</h2>
       <ul style="font-size:0.8rem; color:#444; text-align:left; margin:1.5em 0 0 1.2em; padding:0;">
         <li>(khud nahi pata ise kya chahiye...)</li>
         <li>Wants to travel the world.</li>
         <li>Diving.</li>
         <li>Trekking.</li>
         <li>Bunjee Jumping.</li>
         <li>Paragliding again from highest point.</li>
         <br>
         <li style="color:rgb(255, 0, 0); font-weight:bold;">ALL ADVENTURES!!!!</li>

        <p id="right-page-text" style="font-size:1rem; color:#444;">
          <div style="position:absolute; bottom:4px; left:10px; font-size:1rem;">🧿💖</div>
        </p>`
    }
  },
  {
    left: {
      number: 7,
      html: `<h2 style="color:#333; margin-bottom:2px;">Lastly...</h2>
        <p style="font-size:0.8rem; color:#444;">
          She is not a TEA PERSON!!!<br>
          Former Topper....<br>
          Gets sick as fast as a flame meets the breeze...<br>
          (ATLEAST <span style="color:rgb(255, 157, 0); font-weight:bold; text-shadow:0 1px 6px #ffd6f6;">TAKE GOOD CARE OF YOURSELF!!!!</span>)
          <br>Did I mention she loves BOOKS?<br>
          <span style="font-size:1.2rem;">💓</span>
        </p>`
    },
    right: {
      number: '',
      html: '' // Empty right page for background only
    }
  }
];

// Set up page state
let bookPageSetIndex = 0;

// Get DOM elements for dynamic update
const leftPageNumber = bookContainer.querySelector('#left-page-number');
const rightPageNumber = bookContainer.querySelector('#right-page-number');
const leftPageContent = bookContainer.querySelector('#left-page-content');
const rightPageContent = bookContainer.querySelector('#right-page-content');
const rightPageArrow = bookContainer.querySelector('#right-page-arrow');

// Get DOM element for the right page (the whole page, not just content)
const rightPage = bookContainer.querySelector('#book-page-right');

// Helper to update arrows visibility
function updateArrows() {
  // Show back arrow only on page sets 1 and 2 (pages 3/4 and 5/6) and on page 7
  if (bookPageSetIndex === 1 || bookPageSetIndex === 2 || bookPageSetIndex === 3) {
    leftPageArrow.style.display = 'block';
  } else {
    leftPageArrow.style.display = 'none';
  }
  // Show right arrow only if not last page set (but show on page 6 for page 7)
  if (bookPageSetIndex < bookPages.length - 1) {
    if (!rightPageContent.contains(rightPageArrow)) rightPageContent.appendChild(rightPageArrow);
    rightPageArrow.style.display = 'block';
  } else {
    rightPageArrow.style.display = 'none';
  }
  // Hide right page content and the right page itself if on last page set (page 7)
  if (bookPageSetIndex === bookPages.length - 1) {
    rightPageContent.innerHTML = '';
    rightPageNumber.textContent = '';
    rightPageContent.style.background = '';
    if (rightPage) rightPage.style.display = 'none'; // <-- Hide the right page
  } else {
    if (rightPage) rightPage.style.display = ''; // <-- Show the right page
  }
}

// Create the left/back arrow (for left page)
const leftPageArrow = document.createElement('div');
leftPageArrow.id = 'left-page-arrow';
leftPageArrow.innerHTML = '&#8592;';
leftPageArrow.title = 'Back';
leftPageArrow.style.position = 'absolute';
leftPageArrow.style.bottom = '10px';
leftPageArrow.style.left = '20px';
leftPageArrow.style.fontSize = '2rem';
leftPageArrow.style.color = '#b97a56';
leftPageArrow.style.cursor = 'pointer';
leftPageArrow.style.userSelect = 'none';
leftPageArrow.style.transition = 'transform 0.2s';
leftPageArrow.style.zIndex = '10';
leftPageArrow.style.display = 'none'; // Hidden by default

// Add the left arrow to the left page content container
leftPageContent.parentElement.appendChild(leftPageArrow);

// Update this in your rightPageArrow click handler:
rightPageArrow.addEventListener('click', () => {
  if (bookPageSetIndex < bookPages.length - 1) {
    bookPageSetIndex++;
    // Update left page
    leftPageNumber.textContent = bookPages[bookPageSetIndex].left.number;
    leftPageContent.innerHTML = bookPages[bookPageSetIndex].left.html;
    leftPageContent.parentElement.appendChild(leftPageArrow); // Re-append to keep it fixed
    // Update right page
    rightPageNumber.textContent = bookPages[bookPageSetIndex].right.number;
    rightPageContent.innerHTML = bookPages[bookPageSetIndex].right.html;

    // If we're now on the last page set (page 7 left, right empty), clear right page content
    if (bookPageSetIndex === bookPages.length - 1) {
      rightPageContent.innerHTML = '';
      rightPageNumber.textContent = '';
      rightPageContent.style.background = ''; // Keep background as is
    }

    updateArrows();
    rightPageArrow.style.transform = 'scale(1.3)';
    setTimeout(() => rightPageArrow.style.transform = 'scale(1)', 150);
  }
});

// Add this for leftPageArrow click (back):
leftPageArrow.addEventListener('click', () => {
  if (bookPageSetIndex > 0) {
    bookPageSetIndex--;
    // Update left page
    leftPageNumber.textContent = bookPages[bookPageSetIndex].left.number;
    leftPageContent.innerHTML = bookPages[bookPageSetIndex].left.html;
    leftPageContent.parentElement.appendChild(leftPageArrow); // Re-append to keep it fixed
    // Update right page
    rightPageNumber.textContent = bookPages[bookPageSetIndex].right.number;
    rightPageContent.innerHTML = bookPages[bookPageSetIndex].right.html;
    updateArrows();
    leftPageArrow.style.transform = 'scale(1.3)';
    setTimeout(() => leftPageArrow.style.transform = 'scale(1)', 150);
  }
});

// Call this after initial render to set correct arrow state:
updateArrows();

// Add this keyframes animation for the book fall-down if not already present
const bookFallDownStyle = document.createElement('style');
bookFallDownStyle.textContent = `
@keyframes fallDown {
  0% {
    top: 50%;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    top: 150%;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.98);
  }
}
`;
document.head.appendChild(bookFallDownStyle);


