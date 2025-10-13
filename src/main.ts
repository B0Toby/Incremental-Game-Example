// import exampleIconUrl from "./noun-paperclip-7598668-00449F.png";

// document.body.innerHTML = `
//   <p>Example image asset: <img src="${exampleIconUrl}" class="icon" /></p>
// `;

import "./style.css";

const button = document.createElement("button");
button.textContent = "🎮";
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 Games";
document.body.appendChild(counterDiv);

const rateDiv = document.createElement("div");
rateDiv.textContent = "Rate: 0.00 Games/sec";
document.body.appendChild(rateDiv);

const countsDiv = document.createElement("div");
countsDiv.textContent = "Purchases:";
document.body.appendChild(countsDiv);

let counter = 0;
let growthRate = 0;

button.onclick = () => {
  counter += 1;
  updateDisplay();
};

button.onmousedown = () => (button.style.transform = "scale(1.5)");
button.onmouseup = () => (button.style.transform = "scale(1)");
button.style.transition = "transform 0.1s ease-in-out";

type Upgrade = {
  name: string;
  cost: number;
  rate: number;
  count: number;
  button: HTMLButtonElement;
  priceEl: HTMLElement;
  countEl: HTMLElement;
};

function createUpgrade(name: string, cost: number, rate: number): Upgrade {
  const button = document.createElement("button");
  button.className = "upgrade-button";

  const title = document.createElement("div");
  title.className = "upgrade-title";
  title.textContent = name;

  const row = document.createElement("div");
  row.className = "upgrade-row";

  const priceEl = document.createElement("div");
  priceEl.className = "upgrade-price";
  priceEl.textContent = `🎮 ${cost}`;

  const countEl = document.createElement("div");
  countEl.className = "upgrade-count";
  countEl.textContent = "x0";

  row.append(priceEl, countEl);
  button.append(title, row);
  button.disabled = true;
  document.body.appendChild(button);

  return { name, cost, rate, count: 0, button, priceEl, countEl };
}

const upgrades: Upgrade[] = [
  createUpgrade("Game Developer", 10, 0.1),
  createUpgrade("Indie Game Studio", 100, 2.0),
  createUpgrade("AAA Game Company", 1000, 50.0),
];

for (const u of upgrades) {
  u.button.onclick = () => {
    if (counter >= u.cost) {
      counter -= u.cost;
      u.count += 1;
      growthRate += u.rate;
      updateDisplay();
    }
  };
}

function updateDisplay() {
  counterDiv.textContent = `${counter.toFixed(2)} Games`;
  rateDiv.textContent = `Rate: ${growthRate.toFixed(2)} Games/sec`;

  for (const u of upgrades) {
    u.button.disabled = counter < u.cost;
    u.countEl.textContent = `x${u.count}`;
  }
}

let lastTimestamp = performance.now();
function animate(now: number) {
  const dt = (now - lastTimestamp) / 1000;
  counter += growthRate * dt;
  lastTimestamp = now;
  updateDisplay();
  requestAnimationFrame(animate);
}

updateDisplay();
requestAnimationFrame(animate);
