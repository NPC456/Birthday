// Import the generateConfetti function from the package
import { generateConfetti } from "./vanillaConfetti-main/vanillaConfetti.min.js";

// Create and insert styles
const style = document.createElement('style');
style.textContent = `
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
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
    font-size: 1.2rem;
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
      font-size: 1.2rem; /* Adjust font size for smaller screens */
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
      font-size: 1.2rem; /* Adjust font size for very small screens */
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

  .reveal-box-front {
    background:rgb(250, 198, 250);
    color: #fff;
  }

  .reveal-box-back {
    background:rgb(255, 247, 217);
    color:rgb(86, 45, 234);
    transform: rotateX(180deg); /* Flip vertically */
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

  .reveal-box-front {
    background: linear-gradient(135deg,rgb(255, 4, 217),rgb(229, 43, 239),rgb(179, 0, 210)); /* Gradient colors */
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

  #ribbon {
    position: absolute;
    bottom: 0px; /* Move to the bottom */
    right: 0px; /* Keep it on the right */
    font-size: 2rem;
    opacity: 0;
    transform: scale(0);
    transition: all 1s ease;
  }

  #ribbon.reveal {
    opacity: 1;
    transform: scale(2);
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

  .reveal-box {
    position: relative;
    width: 50vw; /* Set width to 50% of the viewport width */
    max-width: 400px; /* Set a maximum width for larger screens */
    height: 25vw; /* Maintain aspect ratio with height */
    max-height: 200px; /* Set a maximum height */
    margin: 20px auto;
    perspective: 1000px; /* Enable 3D perspective */
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
countdownTitle.style.marginTop = '-20px'; // Add spacing below the title
container.appendChild(countdownTitle);

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
extraMessageBox.innerHTML = "Just a little more....<br>a special gift for my favourite person💖";
extraMessageBox.style.fontSize = "1rem";
container.appendChild(extraMessageBox);

// Create a button below the countdown box
const nextButton = document.createElement('button');
nextButton.textContent = "For You ✨▶️";
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
      quantity: 750,
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
emojisLine.textContent = "🎉🎂🎁✨💖";
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
  <span style="color: #ff1493;">I Hope your birthday is full of Love, Magic and Happiness! which make you smile ❣️</span>
`;
revealBoxBack.style.background = 'rgb(255, 246, 217)'; 
// Style the reveal box for flexible positioning and shape
revealBox.style.margin = '50vw 5vw'; // Center horizontally
revealBox.style.marginTop = '4%'; // Add spacing from the top
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
});

// Add additional texts below the reveal box
const additionalText1 = document.createElement('p');
additionalText1.textContent = "Wishing you all the happiness in the world!";
additionalText1.style.fontSize = '0.8rem'; // Reduced font size
additionalText1.style.textAlign = 'center';
additionalText1.style.marginTop = '-150px';
additionalText1.style.color = '#ff1493'; // Reddish pink

const additionalText2 = document.createElement('p');
additionalText2.textContent = "May your day be filled with love, laughter, and joy, And every wish you make may come true.";
additionalText2.style.fontSize = '0.8rem'; // Reduced font size
additionalText2.style.textAlign = 'center';
additionalText2.style.marginTop = '0';
additionalText2.style.color = 'violet'; // Violet (purple)

const additionalText3 = document.createElement('p');
additionalText3.textContent = "You Deserve a lot and I'll be here to remind you of that 🫶";
additionalText3.style.fontSize = '0.8rem'; // Reduced font size
additionalText3.style.textAlign = 'center';
additionalText3.style.marginTop = '0';
additionalText3.style.color = '#ff1493'; // Reddish pink

// Append the texts to the second container content
secondContainerContent.appendChild(additionalText1);
secondContainerContent.appendChild(additionalText2);
secondContainerContent.appendChild(additionalText3);

// Floating Emojis behind the page
const emojis = [,'💗','🔷', '💖', '🌟','🥟'];
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

// Ensure the emoji wrapper stays behind the containers but remains visible
emojiWrapper.style.zIndex = '0'; // Set z-index to 0 to keep it visible but behind other elements

// Ensure the containers have a higher z-index
container.style.zIndex = '1'; // Set a higher z-index for the countdown container
secondContainer.style.zIndex = '2'; // Set a higher z-index for the second container

// Logic
const birthday = new Date("2025-05-05T01:15:00");

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
countdownContainer.style.height = '55vh'; // Adjust height