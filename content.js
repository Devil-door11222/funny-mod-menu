// ========= GLOBAL STYLE TAG =========
let styleTag = document.createElement("style");
document.head.appendChild(styleTag);

function addCSS(css) {
  styleTag.innerHTML += css;
}

// ========= FLOAT SYSTEM =========
let floatInterval = null;
let floatStrength = 20;

function screenShake(intensity = 10, duration = 150) {
  const start = performance.now();

  function shake(now) {
    const elapsed = now - start;
    if (elapsed > duration) {
      document.documentElement.style.transform = "";
      return;
    }

    const x = (Math.random() - 0.5) * intensity;
    const y = (Math.random() - 0.5) * intensity;

    document.documentElement.style.transform =
      `translate(${x}px, ${y}px)`;

    requestAnimationFrame(shake);
  }

  requestAnimationFrame(shake);
}

function spawnFlyingFish() {
  const fish = document.createElement("img");
  fish.src = chrome.runtime.getURL(
    `fish/fish${Math.floor(Math.random() * 6) + 1}.jpg`
  );

  const size = Math.random() * 120 + 60; // 60–180px
  const fromLeft = Math.random() < 0.5;

  fish.style.position = "fixed";
  fish.style.width = size + "px";
  fish.style.top = Math.random() * (window.innerHeight - size) + "px";
  fish.style.left = fromLeft ? -size + "px" : window.innerWidth + "px";
  fish.style.zIndex = "999998";
  fish.style.pointerEvents = "none";
  fish.style.transition = "transform linear";

  if (!fromLeft) {
    fish.style.transform = "scaleX(-1)";
  }

  document.body.appendChild(fish);

  const distance = window.innerWidth + size * 2;
  const duration = Math.random() * 6000 + 4000; // 4–10s

  requestAnimationFrame(() => {
    fish.style.transitionDuration = duration + "ms";
    fish.style.transform += ` translateX(${fromLeft ? distance : -distance}px)`;
  });

  setTimeout(() => fish.remove(), duration);
  fish.className = "flyingFish";
}

let fishInterval = null;

function showSiteMessage(text) {
  if (document.getElementById("__siteMessage")) return;

  const box = document.createElement("div");
  box.id = "__siteMessage";
  box.textContent = text;

  box.style.position = "fixed";
  box.style.top = "20px";
  box.style.right = "-320px"; // start off-screen
  box.style.maxWidth = "260px";
  box.style.padding = "12px";
  box.style.background = "rgba(0,0,0,0.85)";
  box.style.color = "#fff";
  box.style.fontSize = "14px";
  box.style.borderRadius = "8px";
  box.style.zIndex = "999999";
  box.style.boxShadow = "0 4px 12px rgba(0,0,0,0.4)";
  box.style.cursor = "pointer";
  box.style.transition = "right 0.5s cubic-bezier(.25,1.4,.5,1)";

  box.onclick = () => {
  box.style.right = "-320px";
  setTimeout(() => box.remove(), 400);
};

  document.body.appendChild(box);

  // trigger slide-in
  requestAnimationFrame(() => {
    box.style.right = "20px";
  });
}

const siteMessages = [
  {
    match: "neal.fun",
    message: "funny mod menu: this chrome extension is inspired by this website"
  },
  {
    match: "pornhub.com",
    message: "funny mod menu: what are you doing bro 💀"
  },
  {
    match: "rule34.xxx",
    message: "funny mod menu: what are you doing bro 💀"
  },
  {
    match: "mcdonalds.com",
    message: "funny mod menu: i recommend the McChicken Sandwich 🔥"
  },
  {
    match: "roblox.com/games/6516141723/DOORS#!/game-instances",
    message: "funny mod menu: DOORS?!?!?!??"
  },
];

// ========= MESSAGE HANDLER =========
chrome.runtime.onMessage.addListener((msg) => {
  switch (msg.action) {

    /* =========================
       ORIGINAL BUTTON MODS
       ========================= */

    case "applyFilter":
  switch (msg.value) {

    case "invert":
      addCSS(`html { filter: invert(1); }`);
      break;

    case "grayscale":
      addCSS(`html { filter: grayscale(1); }`);
      break;

    case "sepia":
      addCSS(`html { filter: sepia(1); }`);
      break;

    case "infrared":
      addCSS(`html { filter: hue-rotate(90deg) saturate(2); }`);
      break;

    case "crt":
      addCSS(`
        html {
          filter: contrast(1.6) brightness(1.2) saturate(1.3);
        }
        * {
          text-shadow:
            0 0 3px rgba(0,255,0,0.8),
            0 0 6px rgba(0,255,0,0.6);
        }
      `);

    case "ghost":
  addCSS(`body * { opacity: 0.95; }`);
  break;

case "afterimage":
  addCSS(`
    body {
      filter:
        drop-shadow(10px 0 red)
        drop-shadow(-10px 0 cyan);
    }
  `);
  break;

    case "scanlines":
      addCSS(`
        body::before {
          content:"";
          position:fixed;
          inset:0;
          background: repeating-linear-gradient(
            to bottom,
            rgba(0,0,0,0.15),
            rgba(0,0,0,0.15) 1px,
            transparent 1px,
            transparent 3px
          );
          pointer-events:none;
          z-index:999999;
        }
      `);
      break;
  }
  break;


    case "spin":
      addCSS(`
        body { animation: spin 6s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `);
      break;

    case "rainbow":
      addCSS(`
        * { animation: rainbow 3s linear infinite; }
        @keyframes rainbow {
          0% { color: red; }
          25% { color: yellow; }
          50% { color: lime; }
          75% { color: cyan; }
          100% { color: magenta; }
        }
      `);
      break;

    case "shake":
      addCSS(`
        body { animation: shake 0.15s infinite; }
        @keyframes shake {
          0% { transform: translate(1px,1px); }
          50% { transform: translate(-1px,-1px); }
        }
      `);
      break;

    case "hide images":
  document.querySelectorAll("img").forEach(img => {
    // store originals once
    if (!img.__originalSrc) {
      img.__originalSrc = img.src;
      img.__originalSrcset = img.srcset;
    }

    img.style.visibility = "hidden";
  });
  break;


    case "outline":
      addCSS(`* { outline: 1px solid red !important; }`);
      break;

    case "mirror":
      addCSS(`body { transform: scaleX(-1); }`);
      break;
    
    case "setFont":
  addCSS(`
    * {
      font-family: ${msg.value} !important;
    }
  `);
  break;


    case "neon":
      addCSS(`
        * {
          text-shadow:
            0 0 5px cyan,
            0 0 10px magenta;
        }
      `);
      break;

    case "wobble":
      addCSS(`
        body { animation: wobble 1s infinite; }
        @keyframes wobble {
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
      `);
      break;

    case "glow":
      addCSS(`* { box-shadow: 0 0 10px cyan !important; }`);
      break;

    case "melt down":
      document.querySelectorAll("body *").forEach(el => {
        el.style.transform =
          `rotate(${Math.random() * 20 - 10}deg)`;
      });
      break;

    /* =========================
       SLIDERS
       ========================= */

    case "zoomSlider":
      document.body.style.zoom = msg.value + "%";
      break;

    case "blurSlider":
      addCSS(`html { filter: blur(${msg.value}px); }`);
      break;

    case "tiltSlider":
  document.documentElement.style.transform =
    `rotate(${msg.value}deg)`;
  document.documentElement.style.transformOrigin =
    "center center";
  break;

    /* =========================
       FLOAT BUTTON
       ========================= */

    case "float":
      if (floatInterval) break;

      floatInterval = setInterval(() => {
        document.querySelectorAll("body *").forEach(el => {
          if (!el.__floatData) {
            el.__floatData = {
              x: 0,
              y: 0,
              sx: Math.random() - 0.5,
              sy: Math.random() - 0.5
            };
          }

          el.__floatData.x += el.__floatData.sx * (floatStrength / 10);
          el.__floatData.y += el.__floatData.sy * (floatStrength / 10);

          el.style.transform =
            `translate(${el.__floatData.x}px, ${el.__floatData.y}px)`;
        });
      }, 50);

      break;

    case "drunk":
      addCSS(`
        body {
          animation: drunk 2s infinite alternate;
          filter: blur(1px);
        }
        @keyframes drunk {
          from { transform: rotate(-1deg); }
          to { transform: rotate(1deg); }
        }
      `);
      break;

    case "breathing":
      addCSS(`
        body {
          animation: breathe 4s infinite ease-in-out;
        }
        @keyframes breathe {
          50% { transform: scale(1.02); }
        }
      `);
      break;

    case "warp":
      addCSS(`
        html {
          filter: url('data:image/svg+xml;utf8,\
            <svg xmlns="http://www.w3.org/2000/svg">\
            <filter id="w"><feTurbulence baseFrequency=".01"/><feDisplacementMap scale="20"/></filter>\
            </svg>#w');
        }
      `);
      break;

    case "drift apart":
      document.querySelectorAll("body *").forEach(el => {
        el.style.transform =
          `translate(${Math.random()*50-25}px, ${Math.random()*50-25}px)`;
      });
      break;

    case "deflate":
      addCSS(`* { transform: scale(0.8); }`);
      break;

    case "skewed":
      addCSS(`body { transform: skew(-5deg); }`);
      break;

    case "offset hover":
      addCSS(`
        *:hover {
          transform: translate(20px, -20px) !important;
        }
      `);
      break;

    case "gravitywell":
  if (window.__gravityActive) break;
  window.__gravityActive = true;

  window.__gravityHandler = e => {
    document.querySelectorAll("body *").forEach(el => {
      el.style.transform =
        `translate(${(e.clientX-window.innerWidth/2)/50}px,
                   ${(e.clientY-window.innerHeight/2)/50}px)`;
    });
  };

  document.addEventListener("mousemove", window.__gravityHandler);
  break;

    case "vhs":
      addCSS(`
        html { filter: contrast(1.4) saturate(1.2); }
        * {
          animation: vhs .1s infinite alternate;
        }
        @keyframes vhs {
          from { transform: translateX(-1px); }
          to { transform: translateX(1px); }
        }
      `);
      break;
    
    case "jelly":
  addCSS(`
    * {
      animation: jelly 1.5s infinite ease-in-out;
    }
    @keyframes jelly {
      0% { transform: scale(1,1); }
      50% { transform: scale(1.05,0.95); }
      100% { transform: scale(1,1); }
    }
  `);
  break;

    case "shakey text":
  addCSS(`
    p, h1, h2, h3, h4, h5, h6, span {
      animation: melt 0.1s infinite alternate ease-in-out;
    }
    @keyframes melt {
      to { transform: translateY(8px); }
    }
  `);
  break;

    case "vibrate":
  addCSS(`
    body {
      animation: vibrate 0.05s infinite;
    }
    @keyframes vibrate {
      from { transform: translate(0); }
      to { transform: translate(1px, -1px); }
    }
  `);
  break;

    case "outline hover":
  addCSS(`
    *:hover {
      outline: 2px solid red !important;
    }
  `);
  break;

    case "gun":
  if (window.__gunActive) break;
  window.__gunActive = true;

  // change cursor (BACKTICKS REQUIRED)
  const gunCursor = chrome.runtime.getURL("gun/bullet.png");
  document.body.style.cursor = `url(${gunCursor}) 16 16, crosshair`;

  // preload sounds once
  if (!window.__gunSounds) {
    window.__gunSounds = [
      chrome.runtime.getURL("gun/shot1.mp3")
    ];
  }
  // click handler
  window.__gunHandler = e => {
    // ---- BULLET HOLE ----
    const hole = document.createElement("img");
    hole.src = chrome.runtime.getURL("gun/bullet.png");
    hole.className = "__bulletHole";

    // ---- SCREEN SHAKE ----
    screenShake(12, 180);

    const size = 256;
    hole.style.position = "fixed";
    hole.style.width = hole.style.height = size + "px";
    hole.style.left = (e.clientX - size / 2) + "px";
    hole.style.top = (e.clientY - size / 2) + "px";
    hole.style.pointerEvents = "none";
    hole.style.zIndex = "999999";

    document.body.appendChild(hole);

    // ---- SOUND ----
    const audio = new Audio(
      window.__gunSounds[Math.floor(Math.random() * window.__gunSounds.length)]
    );
    audio.volume = 0.6;
    audio.play().catch(() => {});
  };

  // THIS WAS MISSING
  document.addEventListener("click", window.__gunHandler);
  break;

    case "image shuffle": {
  const imgs = Array.from(document.querySelectorAll("img"));

  // store originals once (shared with fish / hide images)
  imgs.forEach(img => {
    if (!img.__originalSrc) {
      img.__originalSrc = img.src;
      img.__originalSrcset = img.srcset;
    }
  });

  // collect current sources
  const sources = imgs.map(img => img.src);

  // shuffle sources
  for (let i = sources.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [sources[i], sources[j]] = [sources[j], sources[i]];
  }

  // reassign shuffled sources
  imgs.forEach((img, i) => {
    img.src = sources[i];
    img.srcset = "";
  });

  break;
}

      case "fish": {
  const images = [
    chrome.runtime.getURL("fish/fish1.jpg"),
    chrome.runtime.getURL("fish/fish2.jpg"),
    chrome.runtime.getURL("fish/fish3.jpg"),
    chrome.runtime.getURL("fish/fish4.jpg"),
    chrome.runtime.getURL("fish/fish5.jpg"),
    chrome.runtime.getURL("fish/fish6.jpg")
  ];

  document.querySelectorAll("img").forEach(img => {
    // store originals ONCE
    if (!img.__originalSrc) {
      img.__originalSrc = img.src;
      img.__originalSrcset = img.srcset;
    }

    const randomSrc = images[Math.floor(Math.random() * images.length)];
    img.src = randomSrc;
    img.srcset = "";

    // start flying fish
if (!fishInterval) {
  fishInterval = setInterval(spawnFlyingFish, 100);
}
  });
  break;
}


    /* =========================
       RESET EVERYTHING
       ========================= */

    case "reset":
      if (floatInterval) {
        clearInterval(floatInterval);
        floatInterval = null;
        window.__gravityActive = false;
      }

      document.querySelectorAll("body *").forEach(el => {
        el.style.transform = "";
        delete el.__floatData;
      });

// reset gun
if (window.__gunHandler) {
  document.removeEventListener("click", window.__gunHandler);
  window.__gunHandler = null;
}
window.__gunActive = false;
document.body.style.cursor = "";

// remove bullet holes
document.querySelectorAll(".__bulletHole").forEach(hole => hole.remove());

// stop flying fish
if (fishInterval) {
  clearInterval(fishInterval);
  fishInterval = null;
}

// remove flying fish still on screen
document.querySelectorAll(".flyingFish").forEach(f => f.remove());

document.documentElement.style.transform = "";

      // reset cursor trail
if (window.__cursorTrailHandler) {
  document.removeEventListener("mousemove", window.__cursorTrailHandler);
  window.__cursorTrailHandler = null;
}
window.__cursorTrailActive = false;

// remove leftover trail dots
document.querySelectorAll(".__cursorTrailDot").forEach(dot => dot.remove());


      if (window.__gravityHandler) {
  document.removeEventListener("mousemove", window.__gravityHandler);
  window.__gravityHandler = null;
}
window.__gravityActive = false;

      // restore original images
document.querySelectorAll("img").forEach(img => {
  if (img.__originalSrc) {
    img.src = img.__originalSrc;
    img.srcset = img.__originalSrcset || "";
    img.style.visibility = "";
    delete img.__originalSrc;
    delete img.__originalSrcset;
  }
});


      styleTag.innerHTML = "";
      document.body.style.zoom = "";
      document.body.removeAttribute("style");
      document.documentElement.removeAttribute("style");
      break;
  }
});

(function checkSiteMessage() {
  const host = location.hostname;

  siteMessages.forEach(rule => {
    if (host.includes(rule.match)) {
      showSiteMessage(rule.message);
    }
  });
})();
