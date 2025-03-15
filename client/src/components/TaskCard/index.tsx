import Image from "next/image";
import { format } from "date-fns";
import { Task } from "@/state/api";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
      {task.attachments && task.attachments.length > 0 && (
        <div>
          <strong>Anexos:</strong>
          <div className="flex flex-wrap">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            )}
          </div>
        </div>
      )}
      <p>
        <strong>ID:</strong> {task.id}
      </p>
      <p>
        <strong>Título:</strong> {task.title}
      </p>
      <p>
        <strong>Descrição:</strong>{" "}
        {task.description || "Nenhuma descrição fornecida"}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Prioridade:</strong> {task.priority}
      </p>
      <p>
        <strong>Tags:</strong> {task.tags || "Nenhuma tag fornecida"}
      </p>
      <p>
        <strong>Início:</strong>{" "}
        {task.startDate
          ? format(new Date(task.startDate), "P")
          : "Nenhuma data de início fornecida"}
      </p>
      <p>
        <strong>Prazo:</strong>{" "}
        {task.dueDate
          ? format(new Date(task.dueDate), "P")
          : "Nenhum prazo fornecido"}
      </p>
      <p>
        <strong>Autor:</strong>{" "}
        {task.author ? task.author.username : "Desconhecido"}
      </p>
      <p>
        <strong>Responsável:</strong>{" "}
        {task.assignee ? task.assignee.username : "Não atribuído"}
      </p>
    </div>
  );
};

export default TaskCard;
