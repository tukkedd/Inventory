import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId, vehicleId } = req.body;
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'El nombre es requerido y debe ser texto.' });
    }
    if (price === undefined || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'El precio es requerido y debe ser un número positivo.' });
    }
    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ error: 'El stock es requerido y debe ser un número positivo.' });
    }
    if (!categoryId || typeof categoryId !== 'number') {
      return res.status(400).json({ error: 'La categoría es requerida y debe ser un ID numérico.' });
    }
    if (!vehicleId || typeof vehicleId !== 'number') {
      return res.status(400).json({ error: 'El vehículo es requerido y debe ser un ID numérico.' });
    }

    // Verifica si ya existe un producto con ese nombre, categoría y vehículo
    const existing = await prisma.product.findFirst({
      where: { name, categoryId, vehicleId },
    });
    if (existing) {
      return res.status(400).json({ error: 'El producto ya existe para esa categoría y vehículo.' });
    }

    const product = await prisma.product.create({
      data: { name, description, price, stock, categoryId, vehicleId },
    });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'No se pudo crear el producto.' });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    include: { category: true, vehicle: true },
  });
  res.json(products);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, categoryId, vehicleId } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'El nombre es requerido y debe ser texto.' });
    }
    if (price === undefined || typeof price !== 'number' || price < 0) {
      return res.status(400).json({ error: 'El precio es requerido y debe ser un número positivo.' });
    }
    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({ error: 'El stock es requerido y debe ser un número positivo.' });
    }
    if (!categoryId || typeof categoryId !== 'number') {
      return res.status(400).json({ error: 'La categoría es requerida y debe ser un ID numérico.' });
    }
    if (!vehicleId || typeof vehicleId !== 'number') {
      return res.status(400).json({ error: 'El vehículo es requerido y debe ser un ID numérico.' });
    }

    // Verifica si ya existe otro producto con ese nombre, categoría y vehículo
    const existing = await prisma.product.findFirst({
      where: {
        name,
        categoryId,
        vehicleId,
        NOT: { id: Number(id) }
      }
    });
    if (existing) {
      return res.status(400).json({ error: 'Ya existe un producto con ese nombre, categoría y vehículo.' });
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, description, price, stock, categoryId, vehicleId },
    });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'No se pudo actualizar el producto.' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Verifica si el producto existe antes de eliminar
    const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existing) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    await prisma.product.delete({ where: { id: Number(id) } });
    res.json({ message: 'Producto eliminado.' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'No se pudo eliminar el producto.' });
  }
};