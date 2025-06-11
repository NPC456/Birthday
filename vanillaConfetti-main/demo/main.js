import { generateConfetti } from "../vanillaConfetti.min.js";

document.querySelector("button").addEventListener("click", () => {
    generateConfetti({
        colorsArray: ["rgba(255, 180, 185, 1)", "rgba(255, 220, 185, 1)", "rgba(255, 255, 185, 1)", "rgba(185, 255, 200, 1)", "rgba(185, 225, 255, 1)", "rgba(215, 185, 255, 1)"],
        velocity: 0.025,
        quantity: 750,
        minSize: 4,
        maxSize: 12,
        minOpacity: 0.75,
        maxOpacity: 1,
        infiniteLoop: false
    }, "vanillaConfettiCanvas");
});