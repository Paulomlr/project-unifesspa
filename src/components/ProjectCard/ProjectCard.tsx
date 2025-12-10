import Button from "../Button/Button";
import { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  onView?: (project: Project) => void;
}

const ProjectCard = ({
  project,
  showActions = false,
  onEdit,
  onDelete,
  onView,
}: ProjectCardProps) => {
  const getStatusBadge = (status: string) => {
    const statusMap: Record<
      string,
      { text: string; className: string }
    > = {
      ativo: {
        text: "Ativo",
        className: "bg-[var(--color-success)]",
      },
      em_andamento: {
        text: "Em Andamento",
        className: "bg-[var(--color-warning)]",
      },
      planejamento: {
        text: "Planejamento",
        className: "bg-blue-500",
      },
      finalizado: {
        text: "Finalizado",
        className: "bg-[var(--color-secondary)]",
      },
    };

    return statusMap[status] || statusMap.ativo;
  };

  const statusBadge = getStatusBadge(project.status);

  return (
    <div className="
      bg-white rounded-xl overflow-hidden shadow-md 
      transition-all duration-300 h-full flex flex-col
      hover:-translate-y-1 hover:shadow-2xl
    ">
      {project.image && (
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />

          <span
            className={`
              absolute top-4 right-4 text-white text-sm font-semibold 
              px-4 py-2 rounded-full ${statusBadge.className}
            `}
          >
            {statusBadge.text}
          </span>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-4 mb-3">
          <h3 className="text-xl font-bold text-[var(--color-text)] leading-snug flex-1">
            {project.title}
          </h3>

          {project.category && (
            <span className="
              bg-[var(--color-surface)] text-[var(--color-text-secondary)] 
              px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap
            ">
              {project.category}
            </span>
          )}
        </div>

        <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="
          flex flex-col gap-2 mb-4 pt-4 
          border-t border-[var(--color-border)]
        ">
          {project.coordinator && (
            <div className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text)] font-semibold">
                Coordenador:
              </strong>{" "}
              {project.coordinator}
            </div>
          )}

          {project.participants !== undefined && (
            <div className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text)] font-semibold">
                Participantes:
              </strong>{" "}
              {project.participants}
            </div>
          )}
        </div>

        {showActions && (
          <div className="flex gap-2 flex-wrap mt-auto md:flex-row">
            {onView && (
              <Button variant="outline" size="small" onClick={() => onView(project)}>
                Ver Detalhes
              </Button>
            )}
            {onEdit && (
              <Button variant="secondary" size="small" onClick={() => onEdit(project)}>
                Editar
              </Button>
            )}
            {onDelete && (
              <Button variant="danger" size="small" onClick={() => onDelete(project)}>
                Excluir
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
