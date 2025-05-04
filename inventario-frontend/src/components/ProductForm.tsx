import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

type ProductFormProps = {
  onSuccess?: () => void;
  product?: any;
};

export default function ProductForm({ onSuccess, product }: ProductFormProps) {
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    stock: product?.stock || "",
    categoryId: product?.category?.id || "",
    vehicleId: product?.vehicle?.id || "",
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [vehicles, setVehicles] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
    fetch(`${API_URL}/vehicles`)
      .then(res => res.json())
      .then(data => setVehicles(data));
  }, [API_URL]);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        stock: product.stock || "",
        categoryId: product.category?.id || "",
        vehicleId: product.vehicle?.id || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        vehicleId: "",
      });
    }
    setSuccess(null);
    setError(null);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const method = product ? "PUT" : "POST";
      const url = product
        ? `${API_URL}/products/${product.id}`
        : `${API_URL}/products`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
          categoryId: form.categoryId ? Number(form.categoryId) : null,
          vehicleId: form.vehicleId ? Number(form.vehicleId) : null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar el producto");
      }
      setSuccess(product ? "¡Producto actualizado!" : "¡Producto agregado!");
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        categoryId: "",
        vehicleId: "",
      });
      setTimeout(() => {
        setSuccess(null);
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 rounded shadow">
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Descripción</Label>
        <Input id="description" name="description" value={form.description} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="price">Precio</Label>
        <Input id="price" name="price" type="number" value={form.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input id="stock" name="stock" type="number" value={form.stock} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="categoryId">Categoría</Label>
        <select
          id="categoryId"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border rounded px-2 py-2"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="vehicleId">Vehículo</Label>
        <select
          id="vehicleId"
          name="vehicleId"
          value={form.vehicleId}
          onChange={handleChange}
          className="w-full border rounded px-2 py-2"
        >
          <option value="">Selecciona un vehículo</option>
          {vehicles.map(v => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading
          ? "Guardando..."
          : product
            ? "Actualizar producto"
            : "Agregar producto"}
      </Button>
      {success && <div className="text-green-600 text-center">{success}</div>}
      {error && <div className="text-red-600 text-center">{error}</div>}
    </form>
  );
}