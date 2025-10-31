import gameUrl from "./Microsoft Video Game Emoji.png";
import "./style.css";

/* =========================
   Game State (variables)
   ========================= */
let counter = 0; // total games produced
let growthRate = 0; // games produced per second by upgrades
let lastTimestamp = performance.now(); // track time for smooth incremental growth

/* =========================
   Types & Item Data
   ========================= */
interface Item {
  key: string;
  name: string;
  baseCost: number;
  rate: number;
  description: string;
}

// Available upgrades (data-driven design)
const availableItems: Item[] = [
  {
    key: "cursor",
    name: "Cursor",
    baseCost: 10,
    rate: 1,
    description: "Autoclicks once every 10 seconds.",
  },
  {
    key: "dev",
    name: "Game Developer",
    baseCost: 50,
    rate: 10,
    description: "Writes lines of code that slowly build your game.",
  },
  {
    key: "indie",
    name: "Indie Game Studio",
    baseCost: 200,
    rate: 50,
    description:
      "A scrappy team with big dreams and tiny budgets. Sometimes they make masterpieces.",
  },
  {
    key: "aaa",
    name: "AAA Game Company",
    baseCost: 1000,
    rate: 300,
    description:
      "A massive studio with hundreds of employees. Their sequels sell millions, bugs included.",
  },
  {
    key: "ai",
    name: "AI Game Maker",
    baseCost: 5000,
    rate: 1000,
    description:
      "An advanced neural net that designs games faster than you can play them.",
  },
];

/* =========================
   UI Elements
   ========================= */
const button = document.createElement("button");
button.className = "big-button";

const img = document.createElement("img");
img.src = gameUrl;
img.alt = "Click to produce Games";
img.className = "big-button-img";
button.appendChild(img);
document.body.appendChild(button);

const counterDiv = document.createElement("div");
counterDiv.textContent = "0 games";
document.body.appendChild(counterDiv);

const rateDiv = document.createElement("div");
rateDiv.textContent = "per second: 0 games";
document.body.appendChild(rateDiv);

const purchasesHeader = document.createElement("div");
purchasesHeader.textContent = "Purchases:";
document.body.appendChild(purchasesHeader);

/* =========================
   Upgrade System
   ========================= */
type ItemState = {
  count: number;
  button: HTMLButtonElement;
  priceEl: HTMLElement;
  countEl: HTMLElement;
};
const itemStateByKey = new Map<string, ItemState>();

// Exponential cost growth formula: each purchase increases cost by 15%
function currentPrice(item: Item, count: number): number {
  return item.baseCost * Math.pow(1.15, count);
}

// Centralized tooltip builder for upgrade buttons
function createUpgradeTooltip(item: Item): string {
  return [
    `${item.name}:`,
    `Makes ${Math.round(item.rate)} games per second`,
    item.description,
  ].join("\n");
}

// Refresh counters, rates, and button states
function updateDisplay() {
  counterDiv.textContent = `${Math.round(counter)} games`;
  rateDiv.textContent = `per second: ${Math.round(growthRate)} games`;

  for (const item of availableItems) {
    const st = itemStateByKey.get(item.key)!;
    const price = currentPrice(item, st.count);
    st.priceEl.textContent = `🎮 ${Math.round(price)}`;
    st.countEl.textContent = `x${st.count}`;
    // Disable upgrade if not enough resources
    st.button.disabled = counter < price;
  }
}

/* build upgrade buttons for each item */
for (const item of availableItems) {
  const btn = document.createElement("button");
  btn.className = "upgrade-button";
  btn.title = createUpgradeTooltip(item);

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

  // Purchase handler: deduct cost, increment count, increase growth rate
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

/* =========================
   Floating +1 feedback (inspired by https://github.com/inyoo403/D1.a)
   ========================= */
function spawnFloatingPlusOne(x: number, y: number, amount = 1) {
  const el = document.createElement("div");
  el.className = "floating-plus";
  el.textContent = `+${amount}`;
  // place at viewport coords
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  document.body.appendChild(el);
  // clean up after the CSS animation
  const remove = () => el.remove();
  el.addEventListener("animationend", remove, { once: true });
}

/* =========================
   Interaction (click/press)
   ========================= */
// Each click increases counter by 1 + show a floating “+1”
button.addEventListener("click", (e: MouseEvent) => {
  counter += 1;
  updateDisplay();
  spawnFloatingPlusOne(e.clientX, e.clientY, 1);
});

// Visual feedback for press & release
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

/* =========================
   Game Loop
   ========================= */
// Uses delta time so production scales smoothly regardless of frame rate
function animate(now: number) {
  const dt = (now - lastTimestamp) / 1000;
  counter += growthRate * dt;
  lastTimestamp = now;
  updateDisplay();
  requestAnimationFrame(animate);
}

updateDisplay();
requestAnimationFrame(animate);
