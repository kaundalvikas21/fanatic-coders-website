<script lang="ts">
  export let href: string | undefined = undefined;
  export let type: "button" | "submit" | "reset" = "button";
  export let variant: "primary" | "secondary" = "primary";
  
  let className = "";
  export { className as class };
</script>

{#if href}
  <a
    {href}
    class="gradient-btn group relative px-8 py-3 rounded-lg overflow-hidden inline-flex items-center justify-center {className}"
    class:secondary={variant === "secondary"}
  >
    <span class="relative z-10 flex items-center justify-center text-white">
      {#if variant === "primary"}
        <span class="text-white mr-2">{'{'}</span>
        <slot />
        <span class="text-white ml-2">{'}'}</span>
      {:else}
        <span class="text-indigo-400 mr-2">./</span>
        <slot />
      {/if}
    </span>
    <div class="absolute inset-0 bg-gradient-1"></div>
    <div class="absolute inset-0 bg-gradient-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div class="absolute inset-0 bg-gradient-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
    <div class="absolute inset-0 bg-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </a>
{:else}
  <button
    {type}
    class="gradient-btn group relative px-8 py-3 rounded-lg overflow-hidden inline-flex items-center justify-center {className}"
    class:secondary={variant === "secondary"}
    on:click
  >
    <span class="relative z-10 flex items-center justify-center text-white">
      {#if variant === "primary"}
        <span class="text-white mr-2">{'{'}</span>
        <slot />
        <span class="text-white ml-2">{'}'}</span>
      {:else}
        <span class="text-indigo-400 mr-2">./</span>
        <slot />
      {/if}
    </span>
    <div class="absolute inset-0 bg-gradient-1"></div>
    <div class="absolute inset-0 bg-gradient-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div class="absolute inset-0 bg-gradient-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"></div>
    <div class="absolute inset-0 bg-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
{/if}

<style>
  .gradient-btn {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
  }

  .gradient-btn:hover {
    transform: translateY(-2px);
    border-color: rgba(79, 70, 229, 0.5);
  }

  .gradient-btn:focus-visible {
    outline: 2px solid rgba(165, 180, 252, 0.95);
    outline-offset: 2px;
  }

  /* First gradient layer - Default state */
  .bg-gradient-1 {
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    transition: all 0.5s ease;
  }

  /* Second gradient layer - First hover state */
  .bg-gradient-2 {
    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%);
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    transition: all 0.5s ease;
  }

  /* Third gradient layer - Second hover state */
  .bg-gradient-3 {
    background: linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #4f46e5 100%);
    clip-path: polygon(0 0, 85% 0, 100% 100%, 15% 100%);
    transition: all 0.5s ease;
  }

  .bg-glow {
    background: radial-gradient(
      circle at center,
      rgba(79, 70, 229, 0.3) 0%,
      transparent 70%
    );
    filter: blur(15px);
  }

  /* Secondary variant styles */
  .secondary .bg-gradient-1 {
    opacity: 0.2;
  }

  .secondary .bg-gradient-2 {
    opacity: 0;
  }

  .secondary .bg-gradient-3 {
    opacity: 0;
  }

  .secondary:hover .bg-gradient-1 {
    opacity: 0.3;
  }

  .secondary:hover .bg-gradient-2 {
    opacity: 0.2;
  }

  .secondary:hover .bg-gradient-3 {
    opacity: 0.1;
  }

  /* Hover animations */
  .gradient-btn:hover .bg-gradient-1 {
    transform: translateX(-5%) scale(1.05);
  }

  .gradient-btn:hover .bg-gradient-2 {
    transform: translateX(5%) scale(1.05);
  }

  .gradient-btn:hover .bg-gradient-3 {
    transform: scale(1.1);
  }
</style>
