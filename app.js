import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Lista de productos (vinos)
const productos = [];

app.get('/', (req, res) => {
    res.render('home', { productos });
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { productos });
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');

    // Emitir la lista de productos al cliente cuando se conecta
    socket.emit('productos', productos);

    // Manejar la creación de un nuevo producto desde el cliente
    socket.on('nuevoProducto', (nuevoProducto) => {
        console.log('Nuevo producto:', nuevoProducto);

        // Añadir el nuevo producto a la lista de productos
        productos.push(nuevoProducto);

        // Emitir la actualización a todos los clientes
        io.emit('productos', productos);
    });

    // Manejar la eliminación de un producto desde el cliente
    socket.on('eliminarProducto', (productoId) => {
        console.log('Eliminar producto con ID:', productoId);

        // Filtrar la lista de productos para excluir el producto con el ID especificado
        const productosActualizados = productos.filter((producto) => producto.id !== productoId);

        // Actualizar la lista de productos
        productos.length = 0;
        productos.push(...productosActualizados);

        // Emitir la actualización a todos los clientes
        io.emit('productos', productos);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});