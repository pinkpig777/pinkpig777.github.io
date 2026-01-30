---
title: "A Personal Journey Toward Quant Development"
date: "2026-01-30"
summary: "Motivation, initiative, and plan."
tags: ["quant"]
---

**Disclaimer**  
This reflects my personal thoughts and feelings. Some of the views below may be incomplete or inaccurate.

## Thoughts on the Current Industry

In today’s job market, software engineering has become extremely popular, arguably too popular. Given the current state of the U.S. job market, especially for top-tier companies like FAANG or MANGO, I find it difficult to see myself landing a solid role there in the near term. So I started asking myself: why not change direction?

I am fully aware that breaking into top quant firms such as Jane Street or Citadel is even more competitive. However, instead of aiming for U.S.-based firms, I began considering quant companies in Taiwan. From my perspective, this feels like a more realistic path to achieving comparable financial outcomes to those working in the U.S. software industry, while facing a slightly more attainable hiring landscape.

## Motivation and Documentation

I have a strong tendency toward short bursts of motivation (三分鐘熱度), so I want to document everything I encounter during this learning journey. The goal is to keep myself accountable and motivated as I learn new things. Even if the outcome is not ideal, for example, if I fail to complete the study plan, I believe the process itself will still be highly valuable. That alone makes it worth documenting.

## The Plan

To get started, I asked ChatGPT and Gemini to generate a learning roadmap for a CS major aiming to become a qualified Quant Developer. I plan to follow this roadmap on a weekly basis. In parallel, I will read additional materials related to the stock market and work through brain teasers from *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou.

This document will serve as a record of that journey.

## Below is the complete roadmap:

**Target:** Buy-side Quant Infrastructure / Low-Latency Execution

**Language Stack:** C++23 (Performance), Python 3.12+ (Glue/Testing)

**Environment:** MacOS (m4)

---

## PHASE 0: PRE-FLIGHT (Week 0)

*Goal: Eliminate environment friction.*

- **Tools:** Install `gcc-14` or `clang-18+`, `CMake`, `gdb`, and `valgrind`.
- **Libraries:** Set up `Google Benchmark` (microbenchmarking) and `GTest` (unit testing).
- **Deliverable:** A "Hello-Perf" project that calculates a Fibonacci sequence, benchmarks it, and passes a unit test.

---

## PHASE 1: SYSTEMS MASTERY & THE METAL (Weeks 1–3)

*Goal: Stop writing "Software" and start writing "Hardware-Aware Code."*

### Week 1: Memory & Cache Locality

- **Concepts:** L1/L2/L3 cache lines (64-byte), False Sharing, Page Faults.
- **Deliverable:** Implement two versions of a Queue: `ArrayQueue` (Contiguous) and `LinkedListQueue` (Pointer-chasing).
- **Validation:** Use `perf stat` to prove `ArrayQueue` has < 10% of the cache misses of the `LinkedListQueue`.

### Week 2: RAII & Memory Control

- **Concepts:** Custom Allocators, Placement `new`, `std::span`, Rule of 5/0.
- **Deliverable:** Create a "No-Allocation" String class that uses a Stack-allocated buffer for small strings (SSO).
- **Validation:** Benchmarks must show zero heap allocations in the hot loop.

### Week 3: DELIVERABLE 1 — The Fast Ring Buffer

- **Task:** Implement a **Circular Ring Buffer** using C++23.
- **Requirements:** Pre-allocated, power-of-two sizing, no dynamic allocation after initialization.
- **Validation:** Benchmark vs `std::deque`. Target: $\ge 5\times$ faster throughput.

---

## PHASE 2: MARKET MICROSTRUCTURE (Weeks 4–6)

*Goal: Model the exchange honestly.*

### Week 4: Order Book Data Structures

- **Concepts:** Price-Time Priority, Bids/Asks, Levels.
- **Deliverable:** Design a `LimitOrder` struct (8-byte aligned) and a `PriceLevel` container.

### Week 5: DELIVERABLE 2 — The Matching Engine

- **Task:** Build a high-performance **Matching Engine**.
- **Features:** `limit_buy`, `limit_sell`, `cancel_order`.
- **Validation:** Process 1,000,000 orders. Maintain a "Clean Book" (no crossed prices).
- **Architecture:** Use a `std::map<Price, OrderList>` for the book and a `std::unordered_map` for O(1) order lookups by ID.

### Week 6: 2026 Realism — Latency & Slippage

- **Concepts:** Adverse Selection, Jitter, Tick-to-Trade delays.
- **Deliverable:** Add a "Network Simulator" layer that injects $2\mu s$ to $10\mu s$ of random delay to every order.

---

## PHASE 3: EVENT-DRIVEN SYSTEMS (Weeks 7–9)

*Goal: Build the engine that runs the strategy.*

### Week 7: Event Loops & Dispatchers

- **Concepts:** Observer Pattern, Static Dispatch (CRTP) vs. Virtual Functions.
- **Deliverable:** An `EventDispatcher` that routes `MarketData` and `OrderUpdate` events to a `Strategy` class.

### Week 8: Portfolio & Accounting

- **Concepts:** PnL Calculation, Margin, Risk Limits (Fat Finger protection).
- **Deliverable:** A `RiskEngine` that rejects any order that would put the position over a $1M$ limit.

### Week 9: DELIVERABLE 3 — The Backtester

- **Task:** Assemble the **Event-Driven Backtester**.
- **Validation:** Run a "Mean Reversion" strategy over 1 year of synthetic data. Compare "Vectorized PnL" (Python) vs "Event-Driven PnL" (C++). *Spoiler: They will differ due to slippage.*

---

## PHASE 4: CONCURRENCY & LOW-LATENCY (Weeks 10–12)

*Goal: Eliminate locks. Master the atomics.*

### Week 10: Atomics & Memory Barriers

- **Concepts:** `std::atomic`, `memory_order_acquire/release`, CAS (Compare-And-Swap).
- **Deliverable:** A simple "Atomic Counter" that multiple threads increment without using `std::mutex`.

### Week 11: DELIVERABLE 4 — Lock-Free SPSC Queue

- **Task:** Implement a **Single-Producer Single-Consumer Queue** using only atomics.
- **Optimization:** Use `alignas(64)` to prevent **False Sharing** between the `head` and `tail` pointers.
- **Validation:** Pass $10^7$ integers between two threads in $< 50ms$.

### Week 12: SIMD & Vectorization

- **Concepts:** AVX-512, `std::experimental::simd`.
- **Deliverable:** Rewrite your Moving Average signal using SIMD instructions.
- **Validation:** Achieve a $4\times$ speedup over the scalar loop.

---

## PHASE 5: CONNECTIVITY & PROTOCOLS (Weeks 13–14)

*Goal: Speak the language of the Exchange.*

### Week 13: FIX & Binary Protocols

- **Concepts:** FIX 4.2, SBE (Simple Binary Encoding).
- **Deliverable:** A Zero-Copy FIX Parser.

### Week 14: DELIVERABLE 5 — The High-Speed Parser

- **Task:** Parse a raw byte stream of FIX messages into C++ structs.
- **Validation:** Benchmarks must show $\ge 500,000$ messages per second on a single core.

---

## PHASE 6: THE HERO PROJECT (Weeks 15–16)

*Goal: The Final Boss.*

### FINAL DELIVERABLE: The End-to-End Trading Harness

- **System Architecture:**
    - **Thread A (Feed):** Simulates a UDP Multicast market data feed.
    - **Thread B (Strategy):** Uses your SPSC Queue to receive data, runs SIMD signals, and generates orders.
    - **Thread C (Execution):** Routes orders via your FIX Parser into your Matching Engine.
- **Target Metric:** "Tick-to-Trade" latency $< 10\mu s$.
- **2026 Twist:** Use a local LLM Agent (via API) to generate "Chaos" scenarios (e.g., sudden flash crashes) to test your Risk Engine's resilience.

---

## INTERVIEW READINESS (Ongoing)

- **Math:** Master Probability (Expected Value, Bayes).
- **Brainteasers:** Solve the first 50 problems in "Heard on the Street."
- **Coding:** LeetCode "Hard" (Focus: Arrays, Bit Manipulation, Monotonic Queues).

