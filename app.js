import express from 'express';


const ProductManager = require('./productManager');
const PORT = 8080;
const app = express();

const manager = new ProductManager('productData.json');

// Endpoint para obtener productos
app.get('/products', (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = manager.getProducts();

    if (!isNaN(limit)) {
        // Si se proporciona un valor válido para "limit,"
        res.json(products.slice(0, limit));
    } else {
        // Si no se proporciona "limit" 
        res.json(products);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
});