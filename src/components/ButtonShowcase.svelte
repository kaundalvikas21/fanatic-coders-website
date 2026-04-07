<script lang="ts">
  import { onMount } from 'svelte';
  
  let mounted = false;
  
  onMount(() => {
    mounted = true;
  });

  const buttonCategories = [
    {
      title: 'Primary Actions',
      buttons: [
        {
          id: 'skewed-gradient',
          name: 'Skewed Gradient',
          component: 'btn-skewed',
          text: 'Start Project',
          description: 'Asymmetric gradient with code brackets'
        },
        {
          id: 'terminal-style',
          name: 'Terminal Style',
          component: 'btn-terminal',
          text: './start-project',
          description: 'Command-line inspired design'
        },
        {
          id: 'function-call',
          name: 'Function Call',
          component: 'btn-function',
          text: 'startProject()',
          description: 'Programming function syntax'
        }
      ]
    },
    {
      title: 'Secondary Actions',
      buttons: [
        {
          id: 'ghost-skewed',
          name: 'Ghost Skewed',
          component: 'btn-ghost-skewed',
          text: 'View Details',
          description: 'Transparent version of skewed gradient'
        },
        {
          id: 'code-block',
          name: 'Code Block',
          component: 'btn-code-block',
          text: '{ explore }',
          description: 'Code block with curly braces'
        },
        {
          id: 'import-style',
          name: 'Import Style',
          component: 'btn-import',
          text: 'import details',
          description: 'Import statement design'
        }
      ]
    },
    {
      title: 'Special Actions',
      buttons: [
        {
          id: 'matrix-effect',
          name: 'Matrix Effect',
          component: 'btn-matrix',
          text: 'Connect()',
          description: 'Digital rain animation on hover'
        },
        {
          id: 'glitch-effect',
          name: 'Glitch Effect',
          component: 'btn-glitch',
          text: '> Execute',
          description: 'Cyberpunk-inspired glitch effect'
        },
        {
          id: 'binary-hover',
          name: 'Binary Hover',
          component: 'btn-binary',
          text: 'Download',
          description: 'Binary code reveal animation'
        }
      ]
    }
  ];
</script>

<section class="py-24 relative overflow-hidden">
  <!-- Background Elements -->
  <div class="absolute inset-0 -z-10">
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_50%)]"></div>
    <div class="code-grid"></div>
  </div>

  <div class="container mx-auto px-4">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <div class="preheading-code">ui.buttons</div>
      <h2 class="heading-code">
        export class <span class="text-indigo-400">ButtonSystem</span>
      </h2>
      <p class="subheading-code">
        // Code-inspired button collection
      </p>
    </div>

    <!-- Button Categories -->
    <div class="max-w-5xl mx-auto space-y-16">
      {#each buttonCategories as category}
        <div class="space-y-6">
          <h3 class="text-2xl font-bold font-mono text-white">
            <span class="text-indigo-400">interface</span> {category.title}
          </h3>
          
          <div class="grid md:grid-cols-3 gap-8">
            {#each category.buttons as button}
              <div class="glass-card p-6 rounded-xl space-y-4">
                <h4 class="font-mono text-indigo-400">
                  <span class="text-blue-300">const</span> {button.name}
                </h4>
                
                <!-- Button Demo -->
                {#if button.component === 'btn-skewed'}
                  <button class="btn-skewed group relative px-8 py-3 rounded-lg overflow-hidden w-full">
                    <span class="relative z-10 flex items-center justify-center text-white">
                      <span class="mr-2">{`{`}</span>
                      {button.text}
                      <span class="ml-2 group-hover:translate-x-1 transition-transform">{`}`}</span>
                    </span>
                    <div class="absolute inset-0 bg-gradient-skewed transform group-hover:translate-x-2 transition-transform"></div>
                  </button>
                
                {:else if button.component === 'btn-terminal'}
                  <button class="btn-terminal group relative px-8 py-3 rounded-lg w-full">
                    <span class="flex items-center justify-center">
                      <span class="text-indigo-400 mr-2">$</span>
                      {button.text}
                    </span>
                  </button>
                
                {:else if button.component === 'btn-function'}
                  <button class="btn-function group relative px-8 py-3 rounded-lg w-full">
                    <span class="flex items-center justify-center">
                      <span class="text-indigo-400">function</span>
                      <span class="mx-2">{button.text}</span>
                    </span>
                  </button>
                
                {:else if button.component === 'btn-ghost-skewed'}
                  <button class="btn-ghost-skewed group relative px-8 py-3 rounded-lg overflow-hidden w-full">
                    <span class="relative z-10 flex items-center justify-center text-white">
                      <span class="mr-2">./</span>
                      {button.text}
                    </span>
                    <div class="absolute inset-0 bg-gradient-skewed-ghost transform group-hover:translate-x-2 transition-transform"></div>
                  </button>
                
                {:else if button.component === 'btn-code-block'}
                  <button class="btn-code-block group px-8 py-3 rounded-lg w-full">
                    <span class="flex items-center justify-center font-mono">
                      {button.text}
                    </span>
                  </button>
                
                {:else if button.component === 'btn-import'}
                  <button class="btn-import group px-8 py-3 rounded-lg w-full">
                    <span class="flex items-center justify-center">
                      <span class="text-indigo-400 mr-2">import</span>
                      {button.text}
                    </span>
                  </button>
                
                {:else if button.component === 'btn-matrix'}
                  <button class="btn-matrix group px-8 py-3 rounded-lg w-full overflow-hidden">
                    <span class="relative z-10">{button.text}</span>
                  </button>
                
                {:else if button.component === 'btn-glitch'}
                  <button class="btn-glitch group px-8 py-3 rounded-lg w-full">
                    <span class="glitch-text">{button.text}</span>
                  </button>
                
                {:else if button.component === 'btn-binary'}
                  <button class="btn-binary group px-8 py-3 rounded-lg w-full overflow-hidden">
                    <span class="relative z-10">{button.text}</span>
                  </button>
                {/if}
                
                <p class="text-sm text-blue-100/60">{button.description}</p>
              </div>
            {/each}
          </div>
        </div>
      {/each}
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

  .glass-card {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.2);
    backdrop-filter: blur(12px);
  }

  /* Skewed Gradient Button */
  .btn-skewed {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
  }

  .bg-gradient-skewed {
    background: linear-gradient(
      135deg,
      #4f46e5 0%,
      #7c3aed 50%,
      #2563eb 100%
    );
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    opacity: 0.8;
    transition: all 0.3s ease;
  }

  /* Ghost Skewed Button */
  .btn-ghost-skewed {
    background: rgba(15, 15, 26, 0.6);
    border: 1px solid rgba(79, 70, 229, 0.2);
    transition: all 0.3s ease;
  }

  .bg-gradient-skewed-ghost {
    background: linear-gradient(
      135deg,
      rgba(79, 70, 229, 0.2) 0%,
      rgba(124, 58, 237, 0.2) 50%,
      rgba(37, 99, 235, 0.2) 100%
    );
    clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
    opacity: 0.6;
    transition: all 0.3s ease;
  }

  /* Terminal Style Button */
  .btn-terminal {
    background: rgba(15, 15, 26, 0.9);
    border: 1px solid rgba(79, 70, 229, 0.3);
    font-family: monospace;
    transition: all 0.3s ease;
  }

  .btn-terminal:hover {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.5);
  }

  /* Function Style Button */
  .btn-function {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    font-family: monospace;
    transition: all 0.3s ease;
  }

  .btn-function:hover {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.5);
  }

  /* Code Block Button */
  .btn-code-block {
    background: rgba(79, 70, 229, 0.1);
    border: 1px solid rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
  }

  .btn-code-block:hover {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.5);
    transform: translateY(-2px);
  }

  /* Import Style Button */
  .btn-import {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    font-family: monospace;
    transition: all 0.3s ease;
  }

  .btn-import:hover {
    background: rgba(79, 70, 229, 0.2);
    border-color: rgba(79, 70, 229, 0.5);
  }

  /* Matrix Effect Button */
  .btn-matrix {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
  }

  .btn-matrix::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(transparent, rgba(79, 70, 229, 0.5));
    transform: translateY(-100%);
    transition: transform 0.3s ease;
  }

  .btn-matrix:hover::before {
    transform: translateY(0);
  }

  /* Glitch Effect Button */
  .btn-glitch {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
  }

  .glitch-text {
    position: relative;
    display: inline-block;
  }

  .glitch-text::before,
  .glitch-text::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0, 0, 0, 0);
  }

  .btn-glitch:hover .glitch-text::before {
    clip: rect(0, 100%, 33%, 0);
    transform: translate(-2px, 2px);
    color: #4f46e5;
  }

  .btn-glitch:hover .glitch-text::after {
    clip: rect(66%, 100%, 100%, 0);
    transform: translate(2px, -2px);
    color: #7c3aed;
  }

  /* Binary Hover Button */
  .btn-binary {
    background: rgba(15, 15, 26, 0.8);
    border: 1px solid rgba(79, 70, 229, 0.3);
    transition: all 0.3s ease;
  }

  .btn-binary::before {
    content: '10101';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: monospace;
    color: rgba(79, 70, 229, 0.5);
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .btn-binary:hover::before {
    transform: translateY(0);
  }

  /* Common Button Hover Effects */
  .btn-skewed:hover,
  .btn-ghost-skewed:hover {
    transform: translateY(-2px);
    border-color: rgba(79, 70, 229, 0.5);
  }
</style>