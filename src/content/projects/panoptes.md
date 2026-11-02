---
title: Panoptes
summary: Passive OSINT dashboard that combines what four services already know about an IP address.
order: 1
status: code
problem: Panoptes takes a public IPv4 or IPv6 address, queries Shodan Host, Shodan InternetDB, VirusTotal and IPinfo Lite in parallel, and shows one combined report. It is passive. It only reads data these services already hold and never sends packets to the target.
role: Solo project. I built it on my own.
credit: Solo project
stack: [Python, Streamlit, SQLite, pytest, GitHub Actions]
limitations:
  - It only knows what the four services already hold, so a report can be out of date. Stale cached data is labelled.
  - It works on public addresses only. Private and loopback IPs are rejected before any API call.
repo: https://github.com/kobski001/panoptes
screenshots: 
- src: ./images/panoptes_screenshot.png
  alt: Panoptes Dashboard (No Results Yet)
---

Results from all four providers are normalised into one schema and cached in SQLite.

- Providers fail independently. If one fails, only its own card is affected.
- Unknown values are never shown as 0.
- Stale cached data is labelled.
- Private and loopback IPs are rejected before any API call.
- Tests run in CI.
