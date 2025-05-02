import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name || typeof name !== "string") {
            return res.status(400).json({ error: "El nombre es requerido y debe ser texto." });
        }

        // Verifica si ya existe una categoría con ese nombre
        const existing = await prisma.category.findUnique({ where: { name } });
        if (existing) {
            return res.status(400).json({ error: "La categoría ya existe." });
        }

        const category = await prisma.category.create({
            data: { name }
        });
        res.status(201).json(category);
    } catch (error) { 
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCategories = async (_req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
};