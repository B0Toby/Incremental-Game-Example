import gameUrl from "./Microsoft Video Game Emoji.png";
import "./style.css";

const button = document.createElement("button");
button.className = "big-button";

const img = document.createElement("img");
img.src = gameUrl;
img.alt = "Click to produce Games";
img.className = "big-button-img";

button.appendChild(img);
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 Games";
document.body.appendChild(counterDiv);

const rateDiv = document.createElement("div");
rateDiv.textContent = "Rate: 0.00 Games/sec";
document.body.appendChild(rateDiv);

const purchasesHeader = document.createElement("div");
purchasesHeader.textContent = "Purchases:";
document.body.appendChild(purchasesHeader);

let counter = 0;
let growthRate = 0;

button.onclick = () => {
  counter += 1;
  updateDisplay();
};

button.onmousedown = () => {
  img.style.transform = "scale(0.85)";
};
button.onmouseup = () => {
  img.style.transform = "scale(1.15)";
  setTimeout(() => {
    img.style.transform = "scale(1)";
  }, 100);
};
img.style.transition = "transform 0.1s ease-in-out";

interface Item {
  key: string;
  name: string;
  baseCost: number;
  rate: number;
}

const availableItems: Item[] = [
  { key: "dev", name: "Game Developer", baseCost: 10, rate: 0.1 },
  { key: "indie", name: "Indie Game Studio", baseCost: 100, rate: 2.0 },
  { key: "aaa", name: "AAA Game Company", baseCost: 1000, rate: 50.0 },
];

type ItemState = {
  count: number;
  button: HTMLButtonElement;
  priceEl: HTMLElement;
  countEl: HTMLElement;
};
const itemStateByKey = new Map<string, ItemState>();

function currentPrice(item: Item, count: number): number {
  return item.baseCost * Math.pow(1.15, count);
}

for (const item of availableItems) {
  const btn = document.createElement("button");
  btn.className = "upgrade-button";

  const title = document.createElement("div");
  title.className = "upgrade-title";
  title.textContent = item.name;

  const row = document.createElement("div");
  row.className = "upgrade-row";

  const priceEl = document.createElement("div");
  priceEl.className = "upgrade-price";
  priceEl.textContent = `🎮 ${currentPrice(item, 0).toFixed(2)}`;

  const countEl = document.createElement("div");
  countEl.className = "upgrade-count";
  countEl.textContent = "x0";

  row.append(priceEl, countEl);
  btn.append(title, row);
  btn.disabled = true;

  btn.onclick = () => {
    const st = itemStateByKey.get(item.key)!;
    const costNow = currentPrice(item, st.count);
    if (counter >= costNow) {
      counter -= costNow;
      st.count += 1;
      growthRate += item.rate;
      updateDisplay();
    }
  };

  document.body.appendChild(btn);

  itemStateByKey.set(item.key, {
    count: 0,
    button: btn,
    priceEl,
    countEl,
  });
}

function updateDisplay() {
  counterDiv.textContent = `${counter.toFixed(2)} Games`;
  rateDiv.textContent = `Rate: ${growthRate.toFixed(2)} Games/sec`;

  for (const item of availableItems) {
    const st = itemStateByKey.get(item.key)!;
    const price = currentPrice(item, st.count);
    st.priceEl.textContent = `🎮 ${price.toFixed(2)}`;
    st.countEl.textContent = `x${st.count}`;
    st.button.disabled = counter < price;
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
