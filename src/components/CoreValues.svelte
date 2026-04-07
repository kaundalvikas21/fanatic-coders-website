<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';

  let visible = false;

  onMount(() => {
    visible = true;
  });
</script>

<section class="py-24 relative overflow-hidden">
  <!-- Spotlights -->
  <div class="spotlight spotlight-1"></div>
  <div class="spotlight spotlight-2"></div>
  <div class="spotlight spotlight-3"></div>

  <!-- Background Elements -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="code-grid"></div>
  </div>

  <div class="container mx-auto px-4">
    <!-- Section Header -->
    {#if visible}
      <div 
        class="text-center mb-16"
        in:fly={{ y: 20, duration: 600, delay: 100 }}
      >
        <div class="preheading-code">core.values</div>
        <h2 class="heading-code">
          how.<span class="text-indigo-400">weWork</span>()
        </h2>
        <p class="subheading-code">
          // Our approach to delivering exceptional results
        </p>
      </div>
    {/if}

    <!-- Bento Grid -->
    <div class="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      <!-- Build Box -->
      <div class="glass-card p-8 rounded-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
        <div class="relative mb-6">
          <!-- Icon Container -->
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center border border-orange-500/20">
            <i class="ph ph-circles-three-plus text-3xl text-orange-400"></i>
          </div>
          <!-- Decorative Code -->
          <div class="absolute -top-2 right-0 px-3 py-1 rounded-full text-xs font-mono bg-orange-500/10 border border-orange-500/20">
            <span class="text-orange-400">build()</span>
          </div>
        </div>

        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-pink-400 text-transparent bg-clip-text">
          Build
        </h3>

        <p class="text-blue-100/70 mb-6">
          With a dedicated team, we build exceptional projects, focusing on quality, transparency, efficiency management, and innovative solutions to ensure complete client satisfaction and success.
        </p>

        <div class="font-mono text-sm space-y-1 text-blue-100/40">
          <div><span class="text-orange-400">const</span> approach = {`{`}</div>
          <div class="pl-4">quality: <span class="text-green-400">'exceptional'</span>,</div>
          <div class="pl-4">focus: <span class="text-blue-400">'innovation'</span></div>
          <div>{`}`};</div>
        </div>
      </div>

      <!-- Maintain Box -->
      <div class="glass-card p-8 rounded-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
        <div class="relative mb-6">
          <!-- Icon Container -->
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/20">
            <i class="ph ph-lightbulb text-3xl text-indigo-400"></i>
          </div>
          <!-- Decorative Code -->
          <div class="absolute -top-2 right-0 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 border border-indigo-500/20">
            <span class="text-indigo-400">maintain()</span>
          </div>
        </div>

        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
          Maintain
        </h3>

        <p class="text-blue-100/70 mb-6">
          We maintain websites and apps with a commitment to quality, reliability, and proactive management, ensuring they run smoothly and meet ongoing client needs.
        </p>

        <div class="font-mono text-sm space-y-1 text-blue-100/40">
          <div><span class="text-indigo-400">function</span> optimize() {`{`}</div>
          <div class="pl-4">reliability: <span class="text-green-400">'99.9%'</span>,</div>
          <div class="pl-4">support: <span class="text-blue-400">'24/7'</span></div>
          <div>{`}`};</div>
        </div>
      </div>

      <!-- Grow Box -->
      <div class="glass-card p-8 rounded-2xl hover:transform hover:scale-[1.02] transition-all duration-300">
        <div class="relative mb-6">
          <!-- Icon Container -->
          <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center border border-green-500/20">
            <i class="ph ph-chart-line-up text-3xl text-green-400"></i>
          </div>
          <!-- Decorative Code -->
          <div class="absolute -top-2 right-0 px-3 py-1 rounded-full text-xs font-mono bg-green-500/10 border border-green-500/20">
            <span class="text-green-400">grow()</span>
          </div>
        </div>

        <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-400 text-transparent bg-clip-text">
          Grow
        </h3>

        <p class="text-blue-100/70 mb-6">
          We help businesses grow by enhancing their digital presence, optimizing performance, and implementing strategies that drive engagement, conversions, and long-term success.
        </p>

        <div class="font-mono text-sm space-y-1 text-blue-100/40">
          <div><span class="text-green-400">async</span> function scale() {`{`}</div>
          <div class="pl-4">growth: <span class="text-green-400">'exponential'</span>,</div>
          <div class="pl-4">success: <span class="text-blue-400">'guaranteed'</span></div>
          <div>{`}`};</div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .glass-card {
    background: rgba(15, 15, 26, 0.95);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  .code-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
  }
</style>