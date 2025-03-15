"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white w-64`;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{
        opacity: isSidebarCollapsed ? 0 : 1,
        height: isSidebarCollapsed ? 0 : "100%",
      }}
      transition={{ duration: 0.3 }}
      className={sidebarClassNames}
    >
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            TASKHIVE
          </div>
          {!isSidebarCollapsed && (
            <button
              className="py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <X className="h-6 w-6 cursor-pointer text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* Equipe */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" width={40} height={40} alt="Logo" />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              EQUIPE
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Privado</p>
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" Icon={Home} label="Home" />
          <SidebarLink
            href="/timeline"
            Icon={Briefcase}
            label="Linha do Tempo"
          />
          <SidebarLink href="/search" Icon={Search} label="Pesquisa" />
          <SidebarLink href="/settings" Icon={Settings} label="Configurações" />
          <SidebarLink href="/users" Icon={User} label="Usuários" />
          <SidebarLink href="/teams" Icon={Users} label="Times" />

          {/* Projetos */}
          <button
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
            onClick={() => setShowProjects((prev) => !prev)}
          >
            <span>Projetos</span>
            {showProjects ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          {showProjects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: showProjects ? 1 : 0,
                height: showProjects ? "auto" : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              {projects?.map((project) => (
                <SidebarLink
                  key={project.id}
                  href={`/projects/${project.id}`}
                  Icon={Briefcase}
                  label={project.name}
                />
              ))}
            </motion.div>
          )}

          {/* Prioridades */}
          <button
            className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
            onClick={() => setShowPriority((prev) => !prev)}
          >
            <span>Prioridades</span>
            {showPriority ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: showPriority ? 1 : 0,
              height: showPriority ? "auto" : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <SidebarLink
              href="/priority/urgent"
              Icon={AlertCircle}
              label="Urgente"
            />
            <SidebarLink
              href="/priority/high"
              Icon={ShieldAlert}
              label="Alta"
            />
            <SidebarLink
              href="/priority/medium"
              Icon={AlertTriangle}
              label="Média"
            />
            <SidebarLink
              href="/priority/low"
              Icon={AlertOctagon}
              label="Baixa"
            />
            <SidebarLink
              href="/priority/backlog"
              Icon={Layers3}
              label="Backlog"
            />
          </motion.div>
        </nav>
      </div>
    </motion.div>
  );
};

interface SidebarLinkProps {
  href: string;
  Icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""} justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
