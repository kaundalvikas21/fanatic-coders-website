import type { CSSProperties } from 'react';
import { UsersRound } from 'lucide-react';
import { AuthCodeProductMotion } from './AuthCodeProductMotion';
import styles from './AuthBrandingPanel.module.css';

const projectStages = [
  { title: 'Request received', detail: 'Scope and goals captured', status: 'Complete' },
  { title: 'Project in progress', detail: 'Team working on delivery', status: 'Active' },
  { title: 'Client review', detail: 'Ready for feedback', status: 'Next' },
] as const;

export function AuthBrandingPanel() {
  return (
    <section
      className={`${styles.root} relative hidden h-[calc(100vh-7rem)] min-h-[42rem] max-h-[46rem] self-center overflow-hidden rounded-2xl lg:flex lg:flex-col`}
    >
      <div
        className={`${styles.orb} ${styles.orbCyan}`}
        aria-hidden
      />
      <div
        className={`${styles.orb} ${styles.orbViolet}`}
        aria-hidden
      />

      <AuthCodeProductMotion />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-10 py-12 xl:px-16">
        <div>
          <h1 className="max-w-[15ch] text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white xl:text-5xl">
            Welcome to your workspace.
          </h1>
          <p className="mt-6 max-w-[47ch] text-base font-medium leading-7 tracking-[0.01em] text-[#aab2d4]">
            One clear place for requests, proposals, projects, tasks, and conversations with your
            delivery team.
          </p>
        </div>

        <div className="mt-10 max-w-[34rem] overflow-hidden rounded-xl border border-cyan-300/15 bg-[#090914]/90">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs font-semibold text-white">
            <span>Website launch</span>
            <span className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
              <i className={styles.liveDot} /> Live activity
            </span>
          </div>

          <div className={`${styles.activityTrack} relative px-4 py-3 pl-15`}>
            <i className={styles.activityCursor} />
            {projectStages.map((stage, index) => (
              <div
                key={stage.title}
                className={`${styles.activityRow} flex min-h-11 items-center justify-between gap-4 border-b border-white/[0.07] text-[11px] last:border-0`}
                style={{ '--auth-stage': index } as CSSProperties}
              >
                <span className="text-slate-400">
                  <strong className="block text-xs font-semibold text-slate-100">
                    {stage.title}
                  </strong>
                  {stage.detail}
                </span>
                <span className="rounded-md bg-white/[0.05] px-2 py-1 text-[9px] font-semibold text-slate-300">
                  {stage.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-[10px] text-slate-500">
            <span>Delivery flow</span>
            <span className={styles.deliveryProgress} />
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-10 flex items-center justify-between gap-6 border-t border-white/10 py-6 xl:mx-16">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-300">
            <UsersRound
              className="size-4"
              aria-hidden
            />
          </span>
          <div className="min-w-0">
            <strong className="block text-sm font-semibold text-white">Your delivery team</strong>
            <span className="block truncate text-xs text-slate-400">
              Available for updates and feedback.
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="flex justify-end"
            aria-label="Three team members available"
          >
            <span className={`${styles.avatar} bg-violet-600`} />
            <span className={`${styles.avatar} bg-emerald-600`} />
            <span className={`${styles.avatar} bg-blue-600`} />
          </div>
          <span
            className={`${styles.availability} mt-1.5 flex items-center justify-end gap-1.5 text-[10px] font-medium text-emerald-300`}
          >
            <span className={`${styles.availabilityDot} relative flex size-2`}>
              <i className="absolute inline-flex size-full animate-ping animate-infinite animate-duration-[1800ms] animate-ease-out rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
              <i className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            </span>
            3 available
          </span>
        </div>
      </div>
    </section>
  );
}
