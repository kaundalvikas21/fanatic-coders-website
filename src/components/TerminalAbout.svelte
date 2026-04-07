<script lang="ts">
  import { onMount } from 'svelte';
  import GradientButton from './ui/GradientButton.svelte';

  const aboutContent = [
    {
      command: 'cat about.md',
      output: [
        '# About DevAgency',
        '',
        'We are a team of passionate developers, designers, and digital craftsmen who believe in creating exceptional digital experiences.',
        '',
        '## Our Mission',
        'To transform innovative ideas into powerful digital solutions that drive real business growth.',
        '',
        '## Core Values',
        '- Innovation First',
        '- Quality Obsessed',
        '- User Centered',
        '- Always Learning'
      ]
    },
    {
      command: 'cat team/stats.json',
      output: [
        '{',
        '  "team_size": 50,',
        '  "years_experience": 10,',
        '  "projects_completed": 500,',
        '  "happy_clients": "98%"',
        '}'
      ]
    }
  ];

  let currentCommandIndex = 0;
  let currentText = '';
  let showCursor = true;
  let terminalContent: string[] = [];
  let mounted = false;

  async function typeText() {
    if (!mounted) return;
    
    const command = aboutContent[currentCommandIndex];
    
    // Type command
    for (let i = 0; i <= command.command.length; i++) {
      if (!mounted) return;
      currentText = command.command.slice(0, i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!mounted) return;
    terminalContent = [...terminalContent, `$ ${command.command}`];
    currentText = '';
    
    // Show output
    for (const line of command.output) {
      if (!mounted) return;
      terminalContent = [...terminalContent, line];
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    terminalContent = [...terminalContent, ''];
    
    // Move to next command
    currentCommandIndex++;
    if (currentCommandIndex < aboutContent.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (mounted) typeText();
    }
  }

  onMount(() => {
    mounted = true;
    
    // Start cursor blink
    const cursorInterval = setInterval(() => {
      if (mounted) showCursor = !showCursor;
    }, 500);
    
    // Start typing
    typeText();

    return () => {
      mounted = false;
      clearInterval(cursorInterval);
    };
  });
</script>

<section class="py-24 relative overflow-hidden section-bg" id="about">
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
    <div class="text-center mb-16">
      <div class="preheading-code">about.module</div>
      <h2 class="heading-code">
        cat <span class="text-indigo-400">./about-us</span>
      </h2>
      <p class="subheading-code">
        // Get to know our story
      </p>
    </div>

    <!-- Terminal Window -->
    <div class="max-w-4xl mx-auto">
      <div class="terminal-window">
        <!-- Title Bar -->
        <div class="terminal-title-bar">
          <div class="window-controls">
            <span class="control close"></span>
            <span class="control minimize"></span>
            <span class="control maximize"></span>
          </div>
          <div class="terminal-title">about-us — zsh</div>
        </div>

        <!-- Terminal Content -->
        <div class="terminal-content">
          {#each terminalContent as line}
            <div class="terminal-line">
              {#if line.startsWith('$')}
                <span class="text-indigo-400">{line}</span>
              {:else if line.startsWith('#')}
                <span class="text-pink-400 font-bold">{line}</span>
              {:else if line.startsWith('-')}
                <span class="text-green-400">{line}</span>
              {:else if line.startsWith('{')}
                <span class="text-yellow-400">{line}</span>
              {:else if line.startsWith('  "')}
                <span class="text-blue-400">{line}</span>
              {:else if line.startsWith('drwx')}
                <span class="text-green-400">{line}</span>
              {:else}
                <span>{line}</span>
              {/if}
            </div>
          {/each}
          <div class="terminal-line">
            <span class="text-indigo-400">$ </span>{currentText}<span class="cursor" class:blink={showCursor}>|</span>
          </div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="flex justify-center gap-4 mt-8">
        <GradientButton href="/contact">
          joinOurTeam
          <i class="ph ph-users ml-2"></i>
        </GradientButton>
        <GradientButton href="/careers" variant="secondary">
          viewOpenings
          <i class="ph ph-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
        </GradientButton>
      </div>
    </div>
  </div>
</section>

<style>
  .code-grid {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: radial-gradient(circle at 50% 50%, black, transparent 70%);
  }

  .terminal-window {
    background: rgba(15, 15, 26, 0.95);
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(79, 70, 229, 0.2);
    height: clamp(320px, 65vh, 500px);
    display: flex;
    flex-direction: column;
  }

  .terminal-title-bar {
    background: rgba(35, 35, 45, 0.95);
    padding: 0.75rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(79, 70, 229, 0.2);
    flex-shrink: 0;
  }

  .window-controls {
    display: flex;
    gap: 0.5rem;
    margin-right: 1rem;
  }

  .control {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .close {
    background: #ff5f56;
  }

  .minimize {
    background: #ffbd2e;
  }

  .maximize {
    background: #27c93f;
  }

  .control:hover {
    filter: brightness(0.8);
  }

  .terminal-title {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    font-family: monospace;
  }

  .terminal-content {
    padding: 1rem;
    font-family: monospace;
    font-size: 0.875rem;
    line-height: 1.5;
    overflow-y: auto;
    flex-grow: 1;
  }

  .terminal-line {
    margin-bottom: 0.25rem;
    white-space: pre-wrap;
  }

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1.2em;
    background-color: #4f46e5;
    margin-left: 2px;
    vertical-align: middle;
  }

  .cursor.blink {
    opacity: 0;
  }

  /* Scrollbar Styling */
  .terminal-content::-webkit-scrollbar {
    width: 8px;
  }

  .terminal-content::-webkit-scrollbar-track {
    background: rgba(15, 15, 26, 0.95);
  }

  .terminal-content::-webkit-scrollbar-thumb {
    background: rgba(79, 70, 229, 0.3);
    border-radius: 4px;
  }

  .terminal-content::-webkit-scrollbar-thumb:hover {
    background: rgba(79, 70, 229, 0.5);
  }

  /* Responsive height adjustments */
  @media (max-width: 768px) {
    .terminal-window {
      height: 400px;
    }
  }

  @media (max-width: 480px) {
    .terminal-window {
      height: 350px;
    }
  }
</style>
