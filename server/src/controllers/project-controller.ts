import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching projects" });
    console.error(err);
  }
};

export const createProject = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (err) {
    res
      .status(500)
      .json({ message: "An error occurred while creating project" });
    console.error(err);
  }
};
