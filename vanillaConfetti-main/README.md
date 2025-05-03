<p align="center">
    <img width="128" height="128" src="./assets/icon.svg"/>
</p>

<h1 align="center">Vanilla Confetti</h1>

A lightweight and fully vanilla (no libraries) confetti animation project built with HTML, CSS, and JavaScript to be easy to integrate into any project.

---

## Getting Started

1. Create a `canvas` in your HTML file.

    ```html
    <canvas id="vanillaConfettiCanvas"></canvas>
    ```

2. Specify the `type="module"` in your HTML file to enable module importation.

    ```html
    <script src="./main.js" type="module"></script>
    ```

3. Clone the `vanillaConfetti.min.js` file of this repository in your project.

4. Import the `vanillaConfetti` script like that at the top of your JS file. (Specify the path to the `vanillaConfetti.min.js` file)

    ```js
    import { generateConfetti } from "../vanillaConfetti.min.js";
    ```

5. Now you can simply call the `generateConfetti` function.

    ```js
    generateConfetti(confettiConfigObj, canvasId);
    ```

---

## Configuration

The animation can be customized by modifying the `confettiConfigObj` in the JavaScript.

Example:

```js
const confettiConfigObj = {
    colorsArray: ["rgba(255, 180, 185, 1)", "rgba(255, 220, 185, 1)", "rgba(255, 255, 185, 1)", "rgba(185, 255, 200, 1)", "rgba(185, 225, 255, 1)", "rgba(215, 185, 255, 1)"],
    velocity: 0.025,
    quantity: 750,
    minSize: 4,
    maxSize: 12,
    minOpacity: 0.75,
    maxOpacity: 1,
    infiniteLoop: false
};
```

#### `colorsArray`

- **Type**: Array
- **Description**: Controls the colors of the confetti. Each color is randomly chosen from the array for every piece of confetti.

#### `velocity`

- **Type**: Number
- **Description**: Controls the speed at which confetti falls. A higher value makes the confetti fall faster, a lower value makes it fall slower.

#### `quantity`

- **Type**: Number
- **Description**: The number of confetti pieces to be generated.

#### `minSize`

- **Type**: Number
- **Description**: The minimum size of each confetti piece.

#### `maxSize`

- **Type**: Number
- **Description**:The maximum size of each confetti piece.

#### `minOpacity`

- **Type**: Number
- **Description**: Controls how transparent the confetti pieces can be. A lower value makes confetti more transparent.

#### `maxOpacity`

- **Type**: Number
- **Description**: Controls how opaque the confetti pieces can be. A higher value makes the confetti pieces more solid.

#### `infiniteLoop`

- **Type**: Boolean
- **Description**: Whether the confetti should continuously fall (infinite loop).


You can also specify the canvas id, by default, it is `vanillaConfettiCanvas`.

```js
generateConfetti(confettiConfigObj, "yourCanvasId");
```