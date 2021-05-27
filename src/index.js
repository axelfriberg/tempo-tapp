import tempoDetector from "./tempo-detector.js";

window.addEventListener("load", async () => {
  const body = document.querySelector("body");
  const bpmValue = document.querySelector(".bpm-value");

  body.addEventListener(
    "click",
    tempoDetector((bpm) => {
      bpmValue.innerText = Math.round(bpm);
    })
  );
});
