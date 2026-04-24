---
title: Building a LinkedIn Reposted Marker Extension
date: 2026-04-23
tags:
  - Browser Extension
  - LinkedIn
summary: Detect reposted jobs on LinkedIn and keep highlights stable across route changes and rerenders.
slug: linkedin-reposted-marker
---

[GitHub Link](https://github.com/pinkpig777/reposted-marker)

## Introduction

**LinkedIn Reposted Marker** is a small browser extension I built to solve a simple problem:

> I wanted to know whether a LinkedIn job was reposted before spending time opening it.

At first, this sounded like an easy DOM-highlighting project. Find the word `Reposted`, mark the job card, done.

Naturally, it was not that simple.

LinkedIn is a dynamic single-page app. Job cards rerender, routes change without full page reloads, and useful signals are not always visible in the left-side job list. A simple highlighter would work sometimes, then quietly fail in all the annoying edge cases where users actually need it.

So the project became less about matching text and more about building a small, stable extension system.

## The Core Problem

The useful reposted signal often appears after opening a job, but the user needs that information earlier.

That created three main goals:

1. detect reposted jobs when the text is already visible
2. connect detected status back to the correct job card
3. keep the marker stable while LinkedIn rerenders the page

The extension currently supports `/jobs/search/`.

It does **not** support `/jobs/search-results/`, because that route behaves differently and is less reliable for the current implementation.

## Architecture

The extension has four main parts:

- **Content script** scans LinkedIn job pages, detects reposted signals, extracts job IDs, and applies markers.
- **Background worker** handles optional background prefetching for unresolved jobs.
- **Shared policy layer** keeps route support, cache rules, timing constants, and validation logic consistent.
- **Popup menu** gives the user controls for enabling behavior, tuning prefetch, clearing cache, and exporting debug logs.

The key design decision was to make DOM detection the foundation.

Background prefetch improves coverage, but it does not replace visible-page detection. That way, the extension still works even if prefetch is disabled, paused, or rate-limited.

## Why Job Identity Matters

The most important internal concept is the `jobId`.

Once each job card can be mapped to a stable ID, the extension can:

- cache results
- avoid duplicate background requests
- reapply markers after rerenders
- connect detail-panel detection back to the left-side card
- prevent marking the wrong job

This sounds boring, but it is the backbone of the whole extension. Without stable identity, the system becomes guesswork with CSS.

The extension extracts job IDs from several places, including URL paths, query parameters, and DOM attributes, because LinkedIn does not expose job identity in one perfectly consistent way.

Very thoughtful of them.

## Handling LinkedIn’s Dynamic Page

The hardest part was making the extension survive LinkedIn’s constant page changes.

The content script needs to handle:

- infinite scroll
- async DOM insertion
- rerendered job cards
- route changes without full reloads
- selected job changes in the detail panel

To deal with this, the extension uses a debounced `MutationObserver`, scroll-based rescanning, route polling, extension-owned data attributes, and a registry of known cards.

Without these pieces, the marker would flicker, disappear, duplicate itself, or attach to the wrong element. All excellent ways to make a browser extension feel cursed.

## Background Prefetch

Background prefetch helps the extension classify jobs that do not already show reposted text in the visible list.

But prefetching also creates risk. Too many requests can trigger rate limits, especially HTTP `429 Too Many Requests`.

So the extension treats prefetching as a controlled subsystem, not a free-for-all:

- bounded queue
- configurable concurrency
- minimum delay between requests
- pause window after rate limiting
- cache reuse before fetching again
- viewport-aware candidate selection

This keeps the extension useful without aggressively fetching every job on the page like a raccoon loose in a data center.

## Popup and Debugging

The popup is more than a settings menu. It also gives visibility into what the extension is doing.

It includes controls for:

- enabling or disabling the extension
- toggling background prefetch
- changing prefetch settings
- viewing route support state
- clearing cache
- exporting debug logs

The debug log became surprisingly important. Once the extension had content scripts, background workers, browser storage, queues, and popup state, `console.log` was no longer enough.

A local exportable log makes it much easier to understand why a job was marked, skipped, cached, rate-limited, or ignored.

## The Hardest Bugs

The hardest bugs were not visual styling bugs.

They were mapping bugs.

A common failure looked like this:

1. the detail panel showed a reposted signal
2. the extension detected it correctly
3. the matching left-side card needed to be updated
4. but the extension could not confidently map the detail result back to the right card

That led to stronger job ID extraction, stricter route support, better card registry logic, and clearer fallback behavior.

The lesson was simple:

> Detecting the signal is only half the problem. Applying it to the right place is the real work.

## Lessons Learned

A few takeaways from this project:

1. **Start with the visible user value.**  
   DOM detection came first because it proved the feature was useful.

2. **Treat identity as infrastructure.**  
   If async results need to reconnect to the page, stable IDs are not optional.

3. **Control background work carefully.**  
   Prefetch needs queue limits, cache rules, and rate-limit handling.

4. **Be honest about supported routes.**  
   Supporting `/jobs/search/` clearly is better than pretending every LinkedIn jobs route works.

5. **Build observability early.**  
   Debug logs are worth it once an extension spans multiple runtime contexts.

## Closing Thoughts

LinkedIn Reposted Marker started as a small utility, but building it reliably required more architecture than expected.

The interesting part was not highlighting reposted jobs. The interesting part was keeping that highlight correct while LinkedIn constantly changed the page underneath it.

That is the real work of browser extensions: not just injecting behavior into a page, but making that behavior stay useful on top of someone else’s unstable UI.

Ridiculous, but honestly kind of fun.
