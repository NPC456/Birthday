// Create and insert styles
const style = document.createElement('style');
style.textContent = `
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #ffb6da, #ffc4e1, #f3a3cc);
    overflow: hidden;
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

  .countdown-container.show {
    opacity: 1;
    animation: fallAndBounce 2.2s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
  }

  .countdown-container {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 20px;
    padding: 50px 30px;
    height: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: none;
    z-index: 10; /* Ensure countdown container is above emojis */
  }

  /* Second container (empty box) */
  .second-container {
    position: absolute;
    top: -100%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 20px;
    padding: 50px 30px;
    height: auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: none;
    z-index: 9; /* Ensure it is below the first countdown */
  }

  .second-container.show {
    opacity: 1;
    animation: fallAndBounce 2.2s cubic-bezier(0.2, 0.7, 0.3, 1) forwards;
  }

  /* Floating emoji style */
  .floating-emoji {
    position: absolute;
    animation: floatEmojis 8s ease-in-out infinite;
    z-index: 0;
    pointer-events: none;
    opacity: 0.3; /* Adjust transparency */
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

  /* Stairs Arrangement for 💗 emojis */
  .staircase-emoji {
    font-size: 2rem;
    opacity: 0.3; /* Make them a bit transparent */
  }

  .staircase-emoji:nth-child(1) {
    left: 10px;
    top: 10px;
  }

  .staircase-emoji:nth-child(2) {
    left: 10px;
    top: 40px;
  }

  .staircase-emoji:nth-child(3) {
    left: 10px;
    top: 70px;
  }

  /* ✨ emoji at top right corner of the container */
  .emoji-star {
    position: absolute;
    top: -20px;
    right: -20px;
    font-size: 4rem; /* Increase the size of ✨ */
    opacity: 0.5;
    z-index: 1; /* Ensure it stays on top of the floating emojis */
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
    background: #ffe0f0;
    border-radius: 15px;
    padding: 15px 20px;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
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
    margin-top: 20px;
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

document.body.appendChild(container);

// Create second countdown container (empty box)
const secondContainer = document.createElement('div');
secondContainer.className = 'second-container';
secondContainer.id = 'second-countdown-box';
document.body.appendChild(secondContainer);

// Floating Emojis behind the page
const emojis = ['💖','💗','🔷', '💖', '🌟','🥟'];
const emojiWrapper = document.createElement('div');
emojiWrapper.style.position = 'fixed';
emojiWrapper.style.top = '0';
emojiWrapper.style.left = '0';
emojiWrapper.style.width = '100vw';
emojiWrapper.style.height = '100vh';
emojiWrapper.style.zIndex = '0'; // Ensure it's behind everything
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

// Logic
const birthday = new Date("2025-02-07T00:00:00");

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
  
        // Overlay celebration message, don't clear the boxes
        const overlay = document.createElement('div');
        overlay.className = 'celebrate';
        
        overlay.style.position = 'absolute';
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.style.pointerEvents = 'none';
        container.appendChild(overlay);
  
        // Trigger fall animation for the first container
        container.classList.add('fall-down');
        
        // Show the second container after the first one falls
        setTimeout(() => {
          secondContainer.classList.add('show');
        }, 2200); // Delay to match the first container's animation timing
      }
    }, 1000);
} else {
  function updateCountdown() {
    const now = new Date();
    const diff = birthday - now;

    if (diff <= 0) {
        clearInterval(interval);
      
        // Overlay the celebration message
        const overlay = document.createElement('div');
        overlay.className = 'celebrate';
       
        overlay.style.position = 'absolute';
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.style.pointerEvents = 'none';
        container.appendChild(overlay);
      
        // Trigger fall animation for the first container
        container.classList.add('fall-down');
        
        // Show the second container after the first one falls
        setTimeout(() => {
          secondContainer.classList.add('show');
        }, 2200); // Delay to match the first container's animation timing
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
