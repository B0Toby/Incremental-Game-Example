// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";
// import "./style.css";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

const button = document.createElement("button");
button.textContent = "🎮";
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 Games";
document.body.appendChild(counterDiv);

let counter = 0;
let growthRate = 0;
let developers = 0;

button.onclick = () => {
  counter++;
  updateDisplay();
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
upgradeButton.className = "upgrade-button";

const upgradeTitle = document.createElement("div");
upgradeTitle.textContent = "Game Developer";
upgradeTitle.className = "upgrade-title";

const upgradeRow = document.createElement("div");
upgradeRow.className = "upgrade-row";

const upgradePrice = document.createElement("div");
upgradePrice.textContent = "🎮 10";
upgradePrice.className = "upgrade-price";

const upgradeCount = document.createElement("div");
upgradeCount.textContent = `x${developers}`;
upgradeCount.className = "upgrade-count";

upgradeRow.append(upgradePrice, upgradeCount);
upgradeButton.append(upgradeTitle, upgradeRow);

upgradeButton.disabled = true;
document.body.appendChild(upgradeButton);

upgradeButton.onclick = () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    developers += 1;
    updateDisplay();
  }
};

function updateDisplay() {
  counterDiv.textContent = `${counter.toFixed(2)} Games`;
  upgradeButton.disabled = counter < 10;
  upgradeCount.textContent = `x${developers}`;
}
