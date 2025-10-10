import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
import "./style.css";

document.body.innerHTML = `
  <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
`;

const button = document.createElement("button");
button.textContent = "🎮";
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 Games";
document.body.appendChild(counterDiv);

let counter = 0;
let growthRate = 0;

button.onclick = () => {
  counter++;
  counterDiv.textContent = `${counter} Games`;
};

button.onmousedown = () => {
  button.style.transform = "scale(1.5)";
};
button.onmouseup = () => {
  button.style.transform = "scale(1)";
};
button.style.transition = "transform 0.1s ease-in-out";

let lastTimestamp = performance.now();
function animate(now: number) {
  const deltaSeconds = (now - lastTimestamp) / 1000;
  counter += growthRate * deltaSeconds;
  updateDisplay();
  lastTimestamp = now;
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Game Developer (Cost: 10 Games)";
upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

upgradeButton.onclick = () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    updateDisplay();
  }
};

function updateDisplay() {
  counterDiv.textContent = `${counter.toFixed(2)} Games`;
  upgradeButton.disabled = counter < 10;
}

console.log("Hello this is Eric Cai");

console.log("Thursday's section");
