import { useState } from "react";
import { parse, formatISO } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
};

const ModalNewTask = ({ isOpen, onClose, id = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectId, setProjectId] = useState("");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(id !== null || projectId)) return;

    // Definir o fuso horário local
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone; //"America/Sao_Paulo";

    const formattedStartDate = formatISO(
      fromZonedTime(parse(startDate, "yyyy-MM-dd", new Date()), timeZone),
      {
        representation: "complete",
      },
    );
    const formattedDueDate = formatISO(
      fromZonedTime(parse(dueDate, "yyyy-MM-dd", new Date()), timeZone),
      {
        representation: "complete",
      },
    );

    await createTask({
      title,
      description,
      status,
      priority,
      tags,
      startDate: formattedStartDate,
      dueDate: formattedDueDate,
      authorUserId: authorUserId,
      assignedUserId: assignedUserId,
      projectId: id !== null ? id : projectId,
    });
  };

  const isFormValid = () => {
    return title && authorUserId && (id !== null || projectId);
  };

  const selectStyles =
    "mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Criar Nova Tarefa">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <select
            className={selectStyles}
            value={status}
            onChange={(e) =>
              setStatus(Status[e.target.value as keyof typeof Status])
            }
          >
            <option value="">Selecione o Status</option>
            <option value={Status.ToDo}>À Fazer</option>
            <option value={Status.WorkInProgress}>Em Andamento</option>
            <option value={Status.UnderReview}>Revisão</option>
            <option value={Status.Completed}>Finalizado</option>
          </select>
          <select
            className={selectStyles}
            value={priority}
            onChange={(e) =>
              setPriority(Priority[e.target.value as keyof typeof Priority])
            }
          >
            <option value="">Selecione a Prioridade</option>
            <option value={Priority.Urgent}>Urgente</option>
            <option value={Priority.High}>Alta</option>
            <option value={Priority.Medium}>Média</option>
            <option value={Priority.Low}>Baixa</option>
            <option value={Priority.Backlog}>Backlog</option>
          </select>
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Tags (separadas por vírgula)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <input
          type="text"
          className={inputStyles}
          placeholder="Autor"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          className={inputStyles}
          placeholder="Responsável"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
        {id === null && (
          <input
            type="text"
            className={inputStyles}
            placeholder="Projeto"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        )}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Criando..." : "Tarefa Criada"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
