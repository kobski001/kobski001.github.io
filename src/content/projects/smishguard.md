---
title: SmishGuard
summary: Streamlit app that detects banking and online-payment smishing in Filipino and Taglish SMS.
order: 2
status: live
problem: SmishGuard detects banking and online-payment smishing in Filipino and Taglish SMS. It compares Logistic Regression, Decision Tree and SVM models using TF-IDF plus 11 hand-built features, such as links, shorteners, suspicious TLDs, urgency and money words, and sender type.
role: Main Programmer.
credit: Team project, 3 members, DLSU-D
stack: [Python, Streamlit, scikit-learn, TF-IDF]
limitations:
  - The hand-built set includes sender features, which partly reflect which dataset a message came from.
  - It is a proof of concept, not a live filter.
repo: https://github.com/jel77/smishguard
demo: https://smishguardv1.streamlit.app/
screenshots:
- src: ./images/SmishGuard_screenshot.png
  alt: SmishGuard compares three models on a sample SMS
---

The core dataset has 4,043 messages: 2,582 smishing and 1,461 legitimate.

In 5-fold cross-validation repeated 5 times, Logistic Regression scored F1 0.983. McNemar's test compares the models.

The app includes a live demo, a feedback and retrain tab, and a feature-importance view.
