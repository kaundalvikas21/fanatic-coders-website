<script lang="ts">
  import { onMount } from 'svelte';

  let sectionEl: HTMLElement;
  let visible = false;

  // activeIndex  = highlighted question row (updates immediately on click)
  // displayIndex = which answer content is rendered (updates after exit phase)
  // phase        = controls the CSS animation state of the answer slot
  let activeIndex = 0;
  let displayIndex = 0;
  let phase: 'idle' | 'exiting' | 'entering' = 'idle';

  const faqs = [
    {
      q: "What services does Fanatic Coders offer?",
      a: "We offer full-stack web development, UI/UX design, e-commerce solutions, digital branding, SEO & PPC, and ongoing maintenance & support. From concept to launch, we cover the entire digital product lifecycle."
    },
    {
      q: "How long does a typical project take from start to launch?",
      a: "Timelines vary by scope. A landing page or MVP typically takes 2–4 weeks. A full web application or e-commerce platform is usually 6–12 weeks. We provide a detailed timeline during the discovery phase."
    },
    {
      q: "Do you work with startups and early-stage teams?",
      a: "Absolutely. We love working with early-stage founders. We're comfortable with ambiguity, fast pivots, and shipping iteratively. Whether you have a polished spec or just an idea, we can help you move forward."
    },
    {
      q: "What does your development process look like?",
      a: "We follow a structured process: Discovery → Design → Development → QA → Launch → Support. You'll have visibility at every stage with regular check-ins, staging previews, and a clear communication channel throughout."
    },
    {
      q: "Do you provide ongoing support and maintenance after launch?",
      a: "Yes. We offer retainer-based support plans covering performance monitoring, security updates, content changes, and feature additions. We're a long-term partner, not just a one-time vendor."
    },
    {
      q: "What technologies do you specialize in?",
      a: "Our core stack includes React, Next.js, Svelte, Node.js, TypeScript, PostgreSQL, and cloud platforms like AWS and Vercel. We choose the best fit for your project rather than forcing a one-size-fits-all approach."
    },
    {
      q: "How do I get started working with you?",
      a: "Simply reach out through our contact form or email. We'll schedule a free 30-minute discovery call to understand your goals, discuss timelines and budgets, and see if we're a good fit for each other."
    },
  ];

  function selectFaq(i: number) {
    if (i === activeIndex || phase !== 'idle') return;

    // 1. Highlight the question row immediately
    activeIndex = i;

    // 2. Phase 1 — exit: current answer fades out + slides up slightly
    phase = 'exiting';

    setTimeout(() => {
      // 3. Swap content while panel is blank
      displayIndex = i;

      // 4. Phase 2 — enter: new answer slides up from below + fades in
      phase = 'entering';

      setTimeout(() => {
        // 5. Settle to static visible state
        phase = 'idle';
      }, 420);
    }, 180);
  }

  onMount(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { visible = true; obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(sectionEl);
    return () => obs.disconnect();
  });
</script>

<section bind:this={sectionEl} class="faq-section py-24 relative overflow-hidden">
  <div class="container mx-auto px-4 max-w-6xl">

    <!-- Section Header — same pattern as Services / CoreValues / Testimonials -->
    <div class="text-center mb-16 reveal" class:visible>
      <div class="preheading-code">faq.support</div>
      <h2 class="heading-code mt-2">
        Got Questions? <span class="text-aurora-violet-light">Find Answers Here</span>
      </h2>
      <p class="subheading-code mt-3">// Everything you need to know before we start building together</p>
    </div>

    <!-- Two-column FAQ layout -->
    <div class="faq-layout reveal" class:visible style="transition-delay: 180ms;">

      <!-- Left: Question List -->
      <div class="question-list" role="tablist" aria-label="FAQ questions">
        {#each faqs as faq, i}
          <div class="faq-item" class:active={activeIndex === i}>
            <button
              class="faq-row"
              class:active={activeIndex === i}
              role="tab"
              aria-selected={activeIndex === i}
              aria-controls="faq-panel"
              id="faq-tab-{i}"
              on:click={() => selectFaq(i)}
            >
              <span class="faq-q-text">{faq.q}</span>
              <svg
                class="row-arrow"
                class:active={activeIndex === i}
                xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            <!-- Mobile-only inline accordion answer -->
            <div class="mobile-answer" class:open={activeIndex === i}>
              <div class="mobile-answer-inner">
                <p class="mobile-answer-text">{faq.a}</p>
              </div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Right: Answer Panel — whole card animates as one unit on click -->
      <div
        id="faq-panel"
        class="answer-panel glass-card-md"
        class:is-exiting={phase === 'exiting'}
        class:is-entering={phase === 'entering'}
        role="tabpanel"
        aria-labelledby="faq-tab-{activeIndex}"
      >
        <p class="answer-question">{faqs[displayIndex].q}</p>
        <p class="answer-text">{faqs[displayIndex].a}</p>
      </div>

    </div>
  </div>
</section>

<style>
  /* ── Section Background ──────────────────────── */
  .faq-section {
    background:
      radial-gradient(ellipse 55% 50% at 0% 50%, rgba(124, 58, 237, 0.06) 0%, transparent 65%),
      radial-gradient(ellipse 45% 40% at 100% 50%, rgba(6, 182, 212, 0.04) 0%, transparent 60%),
      var(--dark-1);
  }

  /* ── Two-column layout ───────────────────────── */
  .faq-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  @media (max-width: 768px) {
    .faq-layout {
      grid-template-columns: 1fr;
    }

    /* Hide desktop right panel — accordion takes over */
    .answer-panel {
      display: none;
    }

    /* .faq-item becomes the visual card on mobile */
    .faq-item {
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 10px;
      overflow: hidden;
      transition:
        border-color 300ms var(--ease-smooth),
        background 300ms var(--ease-smooth);
    }

    .faq-item.active {
      background: rgba(124, 58, 237, 0.12);
      border-color: rgba(124, 58, 237, 0.45);
    }

    /* Strip individual card styling from .faq-row — .faq-item is the card */
    .faq-row {
      background: transparent;
      border: none;
      border-radius: 0;
    }

    .faq-row.active {
      background: transparent;
      border-color: transparent;
    }

    .faq-row:hover:not(.active) {
      background: transparent;
      border-color: transparent;
    }

    /* Chevron: rotate 90° (right → down) when active */
    .faq-item.active .row-arrow {
      transform: rotate(90deg);
      color: var(--aurora-violet-light);
    }

    /* Mobile accordion body — CSS grid-rows trick */
    .mobile-answer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .mobile-answer.open {
      grid-template-rows: 1fr;
    }

    .mobile-answer-inner {
      overflow: hidden;
      min-height: 0;
    }

    .mobile-answer-text {
      padding: 1.25rem;
      font-size: 0.9375rem;
      color: rgba(255, 255, 255, 0.62);
      line-height: 1.72;
      margin: 0;
    }
  }

  /* ── Question List ───────────────────────────── */
  .question-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  /* ── FAQ Item wrapper (desktop: transparent, mobile: styled card) */
  .faq-item {
    display: flex;
    flex-direction: column;
  }

  /* Hide mobile accordion on desktop via explicit min-width query
     (avoids cascade conflict with the max-width: 768px display: grid rule) */
  @media (min-width: 769px) {
    .mobile-answer {
      display: none;
    }
  }

  /* ── Question Row ────────────────────────────── */
  .faq-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1.125rem 1.25rem;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    cursor: pointer;
    text-align: left;
    color: rgba(255, 255, 255, 0.65);
    transition:
      background 300ms var(--ease-smooth),
      border-color 300ms var(--ease-smooth),
      color 300ms var(--ease-smooth);
  }

  .faq-row:hover:not(.active) {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(124, 58, 237, 0.2);
    color: rgba(255, 255, 255, 0.85);
  }

  .faq-row.active {
    background: rgba(124, 58, 237, 0.18);
    border-color: rgba(124, 58, 237, 0.5);
    color: #fff;
  }

  .faq-row:focus-visible {
    outline: 2px solid var(--aurora-violet-light);
    outline-offset: 2px;
  }

  .faq-q-text {
    font-size: 0.9375rem;
    font-weight: 500;
    line-height: 1.45;
  }

  /* ── Row Arrow ───────────────────────────────── */
  .row-arrow {
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.22);
    transition: color 300ms var(--ease-smooth);
  }

  .row-arrow.active {
    color: var(--aurora-violet-light);
  }

  /* ── Answer Panel — whole card animates as one unit ── */
  .answer-panel {
    border-radius: 14px;
    min-height: 260px;
    padding: 2.25rem;
  }

  /* Phase 1 — EXIT: whole card fades out + floats up */
  .answer-panel.is-exiting {
    animation: panelExit 200ms cubic-bezier(0.4, 0, 1, 1) forwards;
  }

  /* Phase 2 — ENTER: whole card slides up + fades in, smooth */
  .answer-panel.is-entering {
    animation: panelEnter 520ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes panelExit {
    from {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    to {
      opacity: 0;
      transform: translateY(-8px) scale(0.99);
    }
  }

  @keyframes panelEnter {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.99);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  /* ── Answer Typography ───────────────────────── */
  .answer-question {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--aurora-violet-light);
    line-height: 1.4;
    margin: 0 0 1.25rem;
  }

  .answer-text {
    font-size: 1.0625rem;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.8;
    margin: 0;
  }

  /* ── Scroll Reveal ───────────────────────────── */
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition:
      opacity var(--duration-slow) var(--ease-snappy),
      transform var(--duration-slow) var(--ease-snappy);
  }

  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── Reduced Motion ──────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .answer-panel.is-exiting,
    .answer-panel.is-entering {
      animation: none;
    }
    .faq-row, .row-arrow { transition: none; }
    .reveal { transition: none; opacity: 1; transform: none; }
  }
</style>
