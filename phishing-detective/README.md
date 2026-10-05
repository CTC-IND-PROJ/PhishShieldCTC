# 🛡️ PhishShield

Paste an email or message and find out if it's phishing, and why.
Track 4: Cybersecurity Made Simple (PS1: Phishing Detective).

**Live demo:** https://phishshield18136.netlify.app

## Features
- Classifies messages as Safe, Suspicious, or High Risk
- Speedometer risk gauge
- Plain-English explanation for every red flag, with evidence and advice
- Sender checks: lookalike domains and name/domain mismatch
- Works offline (installable PWA)
- Runs fully in the browser, so no data leaves your device

## Tech stack
HTML, CSS, JavaScript, SVG, Service Worker, Netlify

## How it works
Eight weighted rule-based indicators are matched with regular expressions.
Score 0-2 = Safe, 3-5 = Suspicious, 6+ = High Risk.

## Team
| Name | GitHub |
|------|--------|
| Rouble Aklujkar | [@rouble-akl](https://github.com/rouble-akl) |
| Tejashree Varshindkar | [@tejashree-v18](https://github.com/tejashree-v18) |
| Sanika Gaund | [@sanikagaund-cmyk](https://github.com/sanikagaund-cmyk) |
| Kashmira Waghulkar | [@kashmiraww](https://github.com/kashmiraww) |

## Run locally
Open `index.html` with VS Code Live Server.
