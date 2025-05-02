import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createVehicle = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "El nombre es requerido y debe ser texto." });
    }

    // Verifica si ya existe un vehículo con ese nombre
    const existing = await prisma.vehicle.findUnique({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: "El vehículo ya existe." });
    }

    const vehicle = await prisma.vehicle.create({
      data: { name }
    });
    res.status(201).json(vehicle);
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVehicles = async (_req: Request, res: Response) => {
  const vehicles = await prisma.vehicle.findMany();
  res.json(vehicles);
};