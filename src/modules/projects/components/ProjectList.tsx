'use client';

import type { Project } from '@/types';
import { ProjectItemCard } from './ProjectItemCard';

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <ProjectItemCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}
