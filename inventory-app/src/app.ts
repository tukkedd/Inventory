import express from 'express';
import categoryRoutes from './routes/categoryRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import productRoutes from './routes/productRoutes';
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/categories', categoryRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('¡Bienvenido al inventario!');
});

// en inventory-app/src/app.ts
const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});