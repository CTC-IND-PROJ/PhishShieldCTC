# 🛡️ PhishShield

Paste an email or message and find out if it's phishing, and why.
Built for Smart India Hackathon 2026, Track 4: Cybersecurity Made Simple (PS1: Phishing Detective).

**Live demo:** https://[your-site].netlify.app

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
| Name | GitHub | Contribution |
|------|--------|--------------|
| [Your name] | [@yourusername](https://github.com/yourusername) | [e.g. detection logic] |
| [Teammate] | [@theirusername](https://github.com/theirusername) | [e.g. UI design] |

## Run locally
Open `index.html` with VS Code Live Server.