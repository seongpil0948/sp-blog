
const particleSpread = 600; // how wide the particles expand
const particleScale = 4; // how large the particles get
const numOfParticle = 20;
const fwLaunchRate = 300; // in milliseconds/logo.png

export function useFireWork(props: {
  parentSelector: string;
}) {
  let interval: null | ReturnType<typeof setInterval> = null;
  function play() {
    interval = setInterval(() => {
      const el = document.querySelector(props.parentSelector)
      const f = createFireBall(el as HTMLElement);
      shootElement(f);
      attachParticle(f);
    }, fwLaunchRate);
  }


  function stop() {
    if (interval) clearInterval(interval);
  }
  return { play, stop, makeCustomFire, attachParticle };
}

function createFireBall(parent: HTMLElement) {
  const f = document.createElement("div");
  f.className = "firework";
  f.style.width = "4px";
  f.style.height = "4px";
  f.style.position = "absolute";
  shootElement(f);

  parent.appendChild(f);
  return f;
}

export function makeCustomFire(e: any) {
  e.className = "firework";
  e.style.position = "absolute";
  shootElement(e);
  attachParticle(e);
  return e;
}

function shootElement(f: any) {
  f.style.left = Math.random() * 33 + 33 + "%";
  f.style.top = "100%";
  f.style.transition = "ease-out " + Math.random() * 3 + 1 + "s";
}

function attachParticle(fireSelector: string | HTMLElement) {
  const f: HTMLElement | null =
    typeof fireSelector === "string"
      ? document.querySelector(fireSelector)
      : fireSelector;
  if (!f) return;

  for (let i = 0; i < numOfParticle; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.width = "100%";
    p.style.height = "100%";
    p.style.backgroundColor = "hsl(" + Math.random() * 360 + "deg,100%,50%)";
    p.style.position = "absolute";
    p.style.left = "0";
    p.style.top = "0";
    p.style.transition = ".7s";
    f.appendChild(p);
  }
  setTimeout(function () {
    f.style.top = Math.random() * 50 + 5 + "%"; // to Top
    const fx = Math.random() * 100 + "%"; // to X
    f.style.left = fx;
    f.ontransitionend = function () {
      const p = f.querySelectorAll(".particle");
      p.forEach(function (elm: any) {
        const x =
          Math.random() < 0.5
            ? Math.random() * particleSpread
            : -1 * Math.random() * particleSpread;
        const y =
          Math.random() < 0.5
            ? Math.random() * particleSpread
            : -1 * Math.random() * particleSpread;
        elm.style.left = x + "px";
        elm.style.top = y + "px";
        elm.style.opacity = "0";
        elm.style.transform = "scale(" + particleScale + ")";
        elm.style.borderRadius = "50%";
        elm.style.filter = "blur(1px)";
        elm.ontransitionend = function () {
          this.remove();
        };
      });
      setTimeout(function () {
        f.remove();
      }, 800);
    };
  }, 100);
}