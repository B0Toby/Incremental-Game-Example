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

setInterval(() => {
  counter++;
  counterDiv.textContent = `${counter} Games`;
}, 1000);
