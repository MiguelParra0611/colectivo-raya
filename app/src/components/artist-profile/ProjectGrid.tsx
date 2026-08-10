import { motion, type Variants } from 'framer-motion'
import type { Project } from '../../data/types'
import { ProjectThumb } from './ProjectThumb'

interface ProjectGridProps {
  projects: Project[]
  onOpenProject: (index: number) => void
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function ProjectGrid({ projects, onOpenProject }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <p role="status" className="text-ink-muted">
        Este artista todavía no tiene proyectos publicados.
      </p>
    )
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {projects.map((project, index) => (
        <motion.div key={project.id} variants={itemVariants}>
          <ProjectThumb project={project} onOpen={() => onOpenProject(index)} />
        </motion.div>
      ))}
    </motion.div>
  )
}
