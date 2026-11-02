---
title: WebGuard
summary: Research proposal on predicting how likely a published web-application CVE is to be exploited.
order: 3
status: research
problem: WebGuard is a research proposal to predict how likely a published web-application vulnerability (CVE) is to be exploited. The output is a probability that website owners could use to prioritise patching.
credit: Team project, 3 members, DLSU-D
stack: [NVD, CISA KEV, Exploit-DB, Logistic Regression, Decision Tree, Random Forest, XGBoost]
limitations:
  - This is a proposal. There are no results to report yet.
  - The full paper is not published. This page is a summary of it.
linksNote: There is no repository for this project yet.
diagram: true
---

Proposal written. Dataset extraction was underway as of the October 2026 draft.

The proposal uses NVD records as inputs, the CISA Known Exploited Vulnerabilities catalog as the label, and Exploit-DB for public-exploit availability.

It compares Logistic Regression, Decision Tree, Random Forest and XGBoost, with a time-aware train/test split and PR-AUC as the primary metric. EPSS is a benchmark to beat, not an input.
