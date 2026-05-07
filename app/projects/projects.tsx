'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import useBreakpoint from 'use-breakpoint';
import { projects } from './constants';
import ProjectItem from './project-item';
import ProjectPreview from './project-preview';
import { ProjectModal } from './types';

const BREAKPOINTS = { mobile: 0, tablet: 768, desktop: 1280 };

export default function Projects() {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const [modal, setModal] = useState<ProjectModal>({ active: false, index: 0 });

  return (
    <>
      {projects.map((project, index) => (
        <motion.div
          key={project.title}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ProjectItem
            index={index}
            title={project.title}
            url={project.url}
            role={project.role}
            setModal={setModal}
          />
        </motion.div>
      ))}
      {breakpoint === 'desktop' && <ProjectPreview modal={modal} projects={projects} />}
    </>
  );
}
