"use client";

import { useMemo, useState } from "react";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header";
import { useGetProjectsQuery } from "@/state/api";

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const { data: projects, isLoading, error } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "pt-BR",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
      })) || []
    );
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (ganttTasks.length === 0) return <div>Nenhum projeto encontrado</div>;
  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Ocorreu um erro ao retornar tarefas</div>;

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Linha do Tempo de Projetos" />
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Dia</option>
            <option value={ViewMode.Week}>Semana</option>
            <option value={ViewMode.Month}>Mês</option>
            <option value={ViewMode.Year}>Ano</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
            projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
            projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
            TaskListHeader={({
              headerHeight,
              fontFamily,
              fontSize,
              rowWidth,
            }) => (
              <div
                className="border-[rgb(230 228 228,1)] table rounded-tl-md border-b border-l border-r-0 border-t dark:border-[rgb(45,49,53,1)]"
                style={{
                  fontFamily: fontFamily,
                  fontSize: fontSize,
                }}
              >
                <div
                  className="table-row list-none"
                  style={{
                    height: headerHeight - 2,
                  }}
                >
                  <div
                    className="table-cell align-middle"
                    style={{
                      minWidth: rowWidth,
                    }}
                  >
                    <span className="px-2">Nome</span>
                  </div>
                  <div
                    className="-ml-0.5 border-r border-[#c4c4c4] opacity-100"
                    style={{
                      height: headerHeight * 0.5,
                      marginTop: headerHeight * 0.2,
                    }}
                  />
                  <div
                    className="table-cell align-middle"
                    style={{
                      minWidth: rowWidth,
                    }}
                  >
                    <span className="px-2">De</span>
                  </div>
                  <div
                    className="-ml-0.5 border-r border-[#c4c4c4] opacity-100"
                    style={{
                      height: headerHeight * 0.5,
                      marginTop: headerHeight * 0.2,
                    }}
                  />
                  <div
                    className="table-cell align-middle"
                    style={{
                      minWidth: rowWidth,
                    }}
                  >
                    <span className="px-2">Até</span>
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
