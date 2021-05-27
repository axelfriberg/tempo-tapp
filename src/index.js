const body = document.querySelector("body");
const bpmValue = document.querySelector(".bpm-value");

/**
 * Slightly modified version of tempo-detector by
 * @josephfarina https://github.com/josephfarina/tempo-detector
 *
 * @arg {cb}: (bpm: number) => void
 * @return () => void
 */
function tempoDetector(cb) {
  const TIMEOUT = 2000;

  let times = [];
  let lastTime = null;
  let lastDifference = null;

  function tap() {
    const time = Date.now();

    if (lastTime) {
      lastDifference = time - lastTime;
      times.push(lastDifference);
      refresh();
    }

    lastTime = time;
    beginTimeout();
  }

  function refresh() {
    if (times.length > 2) {
      let average = times.reduce((result, t) => result + t) / times.length;
      let bpm = (1 / (average / 1000)) * 60;
      cb(bpm);
    }
  }

  let timer = null;

  function beginTimeout() {
    clearTimeout(timer);
    timer = setTimeout(function () {
      times = [lastDifference];
      lastTime = null;
    }, TIMEOUT);
  }

  return tap;
}

body.addEventListener(
  "click",
  tempoDetector((bpm) => {
    bpmValue.innerText = Math.round(bpm);
  })
);
