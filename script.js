const find = (re, str) => { const m = re.exec(str); return m ? m[0] : null; };
const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const indicators = [
  {
    name: "Urgent or threatening language",
    weight: 2,
    check: t => find(/urgent|act now|immediately|account suspended|verify now|within 24 hours/i, t),
    why: "Scammers rush you so you don't stop to think. Real companies rarely threaten to close your account within hours.",
    tip: "Slow down. Open the company's official app or website yourself instead of using this message."
  },
  {
    name: "Link hides its real destination",
    weight: 3,
    check: t => find(/https?:\/\/\d{1,3}(\.\d{1,3}){3}|bit\.ly|tinyurl|\bt\.co\b|goo\.gl/i, t),
    why: "Links made of raw numbers (an IP address) or shortened links hide where they really lead. Legitimate companies use their own clear web address.",
    tip: "Don't click it. Type the company's website into your browser yourself."
  },
  {
    name: "Asks for private information",
    weight: 3,
    check: t => find(/password|\botp\b|one[- ]time|card number|cvv|\bpin\b/i, t),
    why: "Banks and real services never ask you to send passwords, OTPs, PINs, or card details by email or message.",
    tip: "Never share these. If you're unsure, call the number printed on the back of your card."
  },
  {
    name: "Generic greeting",
    weight: 1,
    check: t => find(/dear (customer|user|member|client)/i, t),
    why: "Real companies usually use your name. Mass phishing messages are sent to thousands of people, so they can't.",
    tip: "Treat the message with extra suspicion, especially if it also asks you to act."
  },
  {
    name: "Lookalike brand name",
    weight: 3,
    check: t => find(/paypa1|amaz0n|g00gle|micros0ft|faceb00k|netfl1x/i, t),
    why: "Scammers swap letters for numbers (paypa1 instead of paypal) to trick a quick glance.",
    tip: "Read the web address letter by letter. Don't enter any details on that site."
  },
  {
    name: "Suspicious sender address",
    weight: 3,
    check: (t, s) =>
      find(/@[^\s>]*\.(xyz|top|click|work|zip|ru)\b/i, s) ||
      find(/@[^\s>]*(paypa1|amaz0n|g00gle|micros0ft|faceb00k|netfl1x)/i, s),
    why: "The ending of the sender's address (like .xyz or .top) and lookalike spellings are common in scam emails. Big companies send from their own domain.",
    tip: "Don't reply. Check the sender's full address, not just the display name."
  },
  {
    name: "Sender name doesn't match sender address",
    weight: 3,
    check: (t, s) => {
      const brands = ["paypal", "amazon", "google", "microsoft", "apple", "netflix", "sbi", "hdfc", "icici"];
      const lower = s.toLowerCase();
      const domain = (lower.split("@")[1] || "").replace(/[>\s].*$/, "");
      const name = lower.split("<")[0];
      const b = brands.find(b => name.includes(b) && !domain.includes(b));
      return b ? `name says "${b}" but the email comes from ${domain}` : null;
    },
    why: "Anyone can type a famous name as the display name. The real sender is the address behind it, and it doesn't match the brand.",
    tip: "Ignore the display name. Only trust the actual address after the @ sign."
  },
  {
    name: "Risky attachment mentioned",
    weight: 3,
    check: t => find(/\b[\w-]+\.(exe|scr|bat|js|zip|iso)\b/i, t),
    why: "Files like .exe, .scr, .bat, .js, and .zip can install malware on your device as soon as you open them.",
    tip: "Don't open it. If you expected a file, confirm with the sender using a different channel."
  }
];

function pt(f, r) {
  const a = Math.PI * (1 - f);
  return [100 + r * Math.cos(a), 100 - r * Math.sin(a)];
}

function arc(f1, f2, color) {
  const [x1, y1] = pt(f1, 80);
  const [x2, y2] = pt(f2, 80);
  return `<path d="M ${x1} ${y1} A 80 80 0 0 1 ${x2} ${y2}" stroke="${color}" stroke-width="18" fill="none"/>`;
}

function gauge(score) {
  const f = Math.min(score, 12) / 12;
  const [nx, ny] = pt(f, 66);
  return `<svg viewBox="0 0 200 125" style="width:100%;max-width:320px;display:block;margin:0 auto">` +
    arc(0, 0.25, "#2e9e4f") + arc(0.25, 0.5, "#f0a020") + arc(0.5, 1, "#d93a3a") +
    `<line x1="100" y1="100" x2="${nx}" y2="${ny}" stroke="#1f2a44" stroke-width="4" stroke-linecap="round"/>` +
    `<circle cx="100" cy="100" r="7" fill="#1f2a44"/>` +
    `<text x="20" y="119" font-size="9" text-anchor="middle" fill="#6b7a90">0</text>` +
    `<text x="180" y="119" font-size="9" text-anchor="middle" fill="#6b7a90">12+</text>` +
    `</svg>`;
}

document.getElementById("analyzeBtn").addEventListener("click", () => {
  const text = document.getElementById("message").value;
  const sender = document.getElementById("sender").value;
  const result = document.getElementById("result");

  if (!text.trim()) {
    result.innerHTML = "Please paste a message first.";
    return;
  }

  let score = 0;
  const hits = [];
  indicators.forEach(i => {
    const evidence = i.check(text, sender);
    if (evidence) {
      score += i.weight;
      hits.push({ ...i, evidence });
    }
  });

  let verdict = "Safe";
  let color = "#2e9e4f";
  let summary = "No common warning signs found. This doesn't guarantee it's safe, so still be careful with unexpected links or requests.";
  if (score >= 6) {
    verdict = "High Risk";
    color = "#d93a3a";
    summary = "This is very likely phishing. Don't click links, reply, or open attachments. Delete it or report it as phishing.";
  } else if (score >= 3) {
    verdict = "Suspicious";
    color = "#f0a020";
    summary = "Several warning signs. Don't click links or share information until you verify through the official website or app.";
  }

  const cards = hits.map(h => `
    <div class="flag">
      <div class="flag-title">⚠️ ${h.name} <span class="pts">+${h.weight}</span></div>
      <div class="flag-found">Found: <code>${esc(String(h.evidence))}</code></div>
      <p><b>Why it matters:</b> ${h.why}</p>
      <p><b>What to do:</b> ${h.tip}</p>
    </div>`).join("");

  result.innerHTML =
    gauge(score) +
    `<h2 style="color:${color};text-align:center;margin:4px 0">${verdict} (score: ${score})</h2>` +
    `<p style="text-align:center">${summary}</p>` +
    (hits.length ? `<h3>Why we flagged it</h3>${cards}` : "");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}