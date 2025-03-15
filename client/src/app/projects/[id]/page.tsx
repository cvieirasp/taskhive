"use client";

import { use, useState } from "react";

import ProjectHeader from "@/app/projects/_components/ProjectHeader";
import BoardView from "@/app/projects/BoardView";
import ListView from "@/app/projects/ListView";
import TimelineView from "@/app/projects/TimelineView";

type Props = {
  params: Promise<{ id: string }>;
};

const ProjectPage = ({ params }: Props) => {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState("board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* MODAL - NOVAS TAREFAS */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "list" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default ProjectPage;
