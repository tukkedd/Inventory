import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2 } from "lucide-react";

export default function CategoryManager({ onClose }: { onClose: () => void }) {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchCategories = () => {
    fetch(`${API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchCategories();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/categories/${id}`, { method: "DELETE" });
    fetchCategories();
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nueva categoría"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white">
          Agregar
        </Button>
      </div>
      <ul>
        {categories.map(c => (
          <li key={c.id} className="flex items-center justify-between py-1">
            <span>{c.name}</span>
            <Button
              onClick={() => handleDelete(c.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1"
              title="Eliminar"
            >
              <Trash2 size={16} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}