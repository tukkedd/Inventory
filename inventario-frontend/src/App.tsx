import ProductList from "./components/ProductList";

function App() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen cursor-default">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Inventario de Productos</h1>
      <ProductList />
    </div>
  );
}

export default App;