import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Trash2 } from "lucide-react";

export default function VehicleManager({ onClose }: { onClose: () => void }) {
  const [vehicles, setVehicles] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchVehicles = () => {
    fetch(`${API_URL}/vehicles`)
      .then(res => res.json())
      .then(data => setVehicles(data));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAdd = async () => {
    if (!name.trim()) return;
    await fetch(`${API_URL}/vehicles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    fetchVehicles();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API_URL}/vehicles/${id}`, { method: "DELETE" });
    fetchVehicles();
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Nuevo vehículo"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button onClick={handleAdd} className="bg-blue-500 hover:bg-blue-600 text-white">
          Agregar
        </Button>
      </div>
      <ul>
        {vehicles.map(v => (
          <li key={v.id} className="flex items-center justify-between py-1">
            <span>{v.name}</span>
            <Button
              onClick={() => handleDelete(v.id)}
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