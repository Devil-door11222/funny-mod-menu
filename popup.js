// ====================
// helper to send messages
// ====================
function send(action, value) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    if (!tabs[0]) return;
    chrome.tabs.sendMessage(tabs[0].id, { action, value });
  });
}

// ====================
// SECTIONS CONFIG
// ====================
const sections = {
  "Fonts": [
    ["Comic Sans", "Comic Sans MS, cursive"],
    ["Arial", "Arial, sans-serif"],
    ["Times New Roman", "Times New Roman, serif"],
    ["Georgia", "Georgia, serif"],
    ["Courier New", "Courier New, monospace"],
    ["Verdana", "Verdana, sans-serif"],
    ["Impact", "Impact, fantasy"],
    ["Trebuchet MS", "Trebuchet MS, sans-serif"],
    ["Lucida Console", "Lucida Console, monospace"],
    ["Monaco", "Monaco, monospace"]
  ],

  "Filters": [
    "invert",
    "grayscale",
    "sepia",
    "crt",
    "scanlines",
    "infrared",
    "ghost",
    "afterimage"
  ],

  "Movement": [
    "spin",
    "shake",
    "wobble",
    "vibrate",
    "jelly",
    "breathing",
    "drunk",
    "float",
    "gravitywell",
    "vhs"
  ],

  "Layout": [
    "mirror",
    "drift apart",
    "deflate",
    "skewed",
    "offset hover"
  ],

  "Visual": [
    "rainbow",
    "neon",
    "glow",
    "outline",
    "outline hover",
    "melt down"
  ],

  "Images": [
    "hide images",
    "fish",
    "image shuffle"
  ],

  "Cursor": [
    "cursor trail",
    "gun"
  ],

  "Tools": [
    "reset"
  ]
};

// ====================
// BUILD UI
// ====================
const root = document.getElementById("sections");

Object.entries(sections).forEach(([sectionName, items]) => {
  const section = document.createElement("div");
  section.className = "section";

  // header
  const header = document.createElement("div");
  header.className = "section-head";

  const title = document.createElement("h4");
  title.textContent = sectionName;

  const toggle = document.createElement("button");
  toggle.textContent = "▾";
  toggle.style.border = "none";
  toggle.style.background = "transparent";
  toggle.style.cursor = "pointer";

  header.appendChild(title);
  header.appendChild(toggle);
  section.appendChild(header);

  // body
  const body = document.createElement("div");
  body.className = "section-body";

  items.forEach(item => {
    const btn = document.createElement("button");
    btn.className = "btn";

    // ---------- FONTS ----------
    if (Array.isArray(item)) {
      const [label, fontValue] = item;
      btn.textContent = label.toUpperCase();
      btn.onclick = () => send("setFont", fontValue);
    }

    // ---------- FILTERS ----------
    else if (sectionName === "Filters") {
      btn.textContent = item.toUpperCase();
      btn.onclick = () => send("applyFilter", item);
    }

    // ---------- NORMAL MODS ----------
    else {
      btn.textContent = item.toUpperCase();
      btn.onclick = () => send(item);
    }

    body.appendChild(btn);
  });

  section.appendChild(body);
  root.appendChild(section);

  // collapse logic
  let open = false;
body.style.display = "none";
toggle.textContent = "▸";

toggle.onclick = () => {
  open = !open;
  body.style.display = open ? "block" : "none";
  toggle.textContent = open ? "▾" : "▸";
};
});

// ====================
// SLIDERS (SAFE)
// ====================
const zoom = document.getElementById("zoomSlider");
if (zoom) zoom.oninput = e => send("zoomSlider", e.target.value);

const blur = document.getElementById("blurSlider");
if (blur) blur.oninput = e => send("blurSlider", e.target.value);

const tilt = document.getElementById("tiltSlider");
if (tilt) tilt.oninput = e => send("tiltSlider", e.target.value);