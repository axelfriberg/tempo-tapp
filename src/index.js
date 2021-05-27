import tempoDetector from "./tempo-detector.js";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const bpmValue = document.querySelector(".bpm-value");

  body.addEventListener(
    "click",
    tempoDetector((bpm) => {
      bpmValue.innerText = Math.round(bpm);
    })
  );
});
