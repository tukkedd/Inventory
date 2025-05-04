import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ProductForm from "./ProductForm";
import { Edit, Trash2 } from "lucide-react";

import CategoryManager from "./CategoryManager";
import VehicleManager from "./VehicleManager";

type Product = {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: { id: number; name: string };
    vehicle: { id: number; name: string };
};

export default function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editProduct, setEditProduct] = useState<Product | null>(null);
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null); // Nuevo estado para el modal
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);

    const API_URL = process.env.REACT_APP_API_URL;

    const fetchProducts = () => {
        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data));
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [showForm]);

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = async (id: number) => {
        await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });
        setDeleteProduct(null);
        fetchProducts();
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
                <Input
                    placeholder="Buscar producto..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={() => { setEditProduct(null); setShowForm(true); }}>
                    Agregar producto
                </Button>
                <Button onClick={() => setShowCategoryModal(true)} className="bg-green-500 hover:bg-green-600">
                    Nueva categoría
                </Button>
                <Button onClick={() => setShowVehicleModal(true)} className="bg-blue-500 hover:bg-blue-600">
                    Nuevo vehículo
                </Button>
            </div>

            {/* Modal para el formulario */}
            {showForm && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    onClick={() => setShowForm(false)}
                >
                    <div
                        className="bg-white rounded shadow-lg p-6 w-full max-w-md relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <ProductForm
                            onSuccess={() => setShowForm(false)}
                            product={editProduct}
                        />
                        <Button
                            onClick={() => setShowForm(false)}
                            className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
                        >
                            X
                        </Button>
                    </div>
                </div>
            )}

            {/* Modal de confirmación para eliminar */}
            {deleteProduct && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    onClick={() => setDeleteProduct(null)}
                >
                    <div
                        className="bg-white rounded shadow-lg p-6 w-full max-w-sm relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold mb-4 text-center text-red-600">¿Eliminar producto?</h2>
                        <p className="mb-6 text-center">
                            ¿Estás seguro de que deseas eliminar <b>{deleteProduct.name}</b>? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button
                                onClick={() => setDeleteProduct(null)}
                                className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={() => handleDelete(deleteProduct.id)}
                                className="bg-red-500 text-white hover:bg-red-600"
                            >
                                Eliminar
                            </Button>
                        </div>
                        <Button
                            onClick={() => setDeleteProduct(null)}
                            className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
                        >
                            X
                        </Button>
                    </div>
                </div>
            )}

            {showCategoryModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    onClick={() => setShowCategoryModal(false)}
                >
                    <div
                        className="bg-white rounded shadow-lg p-6 w-full max-w-sm relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold mb-4 text-center text-green-600">Gestionar Categorías</h2>
                        <CategoryManager onClose={() => setShowCategoryModal(false)} />
                        <Button
                            onClick={() => setShowCategoryModal(false)}
                            className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
                        >
                            X
                        </Button>
                    </div>
                </div>
            )}

            {showVehicleModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    onClick={() => setShowVehicleModal(false)}
                >
                    <div
                        className="bg-white rounded shadow-lg p-6 w-full max-w-sm relative"
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-lg font-bold mb-4 text-center text-blue-600">Gestionar Vehículos</h2>
                        <VehicleManager onClose={() => setShowVehicleModal(false)} />
                        <Button
                            onClick={() => setShowVehicleModal(false)}
                            className="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-600"
                        >
                            X
                        </Button>
                    </div>
                </div>
            )}

            <table className="min-w-full border bg-white rounded shadow mt-8">
                <thead>
                    <tr>
                        <th className="border px-2 select-none cursor-default">Nombre</th>
                        <th className="border px-2 select-none cursor-default">Precio</th>
                        <th className="border px-2 select-none cursor-default">Stock</th>
                        <th className="border px-2 select-none cursor-default">Categoría</th>
                        <th className="border px-2 select-none cursor-default">Vehículo</th>
                        <th className="border px-2 select-none cursor-default">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(p => (
                        <tr key={p.id}>
                            <td className="border px-2 select-none cursor-default">{p.name}</td>
                            <td className="border px-2 select-none cursor-default">{p.price}</td>
                            <td className="border px-2 select-none cursor-default">{p.stock}</td>
                            <td className="border px-2 select-none cursor-default">{p.category?.name}</td>
                            <td className="border px-2 select-none cursor-default">{p.vehicle?.name}</td>
                            <td className="border px-2 flex gap-2 select-none cursor-default">
                                <Button
                                    onClick={() => { setEditProduct(p); setShowForm(true); }}
                                    className="flex items-center gap-1 bg-yellow-400 text-black hover:bg-yellow-500 px-3 py-1 rounded shadow transition"
                                    title="Editar"
                                >
                                    <Edit size={16} /> Editar
                                </Button>
                                <Button
                                    onClick={() => setDeleteProduct(p)}
                                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition"
                                    title="Eliminar"
                                >
                                    <Trash2 size={16} /> Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
