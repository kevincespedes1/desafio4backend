const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {

            return [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    addProduct(title, description, price, image, code, stock) {
        const product = {
            title,
            description,
            price,
            image,
            code,
            stock,
        };
        this.products.push(product);
        this.saveProducts();
        console.log(`Producto agregado: ${title} (id: ${code})`);
    }

    getProducts() {
        return this.products;
    }

    getProductById(code) {
        const product = this.products.find((product) => product.code === code);
        if (product) {
            console.log(`Producto encontrado: ${product.title} (id: ${product.code})`);
        } else {
            console.log(`Producto no encontrado con id: ${code}`);
        }
        return product;
    }

    updateProduct(code, updatedProduct) {
        const index = this.products.findIndex((product) => product.code === code);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this.saveProducts();
            console.log(`Producto actualizado con éxito.`);
        } else {
            console.log(`Producto no encontrado con id: ${code}`);
        }
    }

    deleteProduct(code) {
        const index = this.products.findIndex((product) => product.code === code);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log(`Producto eliminado con éxito.`);
        } else {
            console.log(`Producto no encontrado con id: ${code}`);
        }
    }
}

const manager = new ProductManager('productData.json');

manager.addProduct("Zapatillas Nike", "Zapatillas de Nike", 12999.99, "https://nikearprod.vtexassets.com/arquivos/ids/698518/DD8959_101_A_PREM.jpg?v=638229588960370000", 1, 15);
manager.addProduct("Zapatillas Adidas", "Zapatillas de Adidas", 11999.99, "https://assets.adidas.com/images/w_600,f_auto,q_auto/284271d85b694ff5b8e6af6400cad5ee_9366/Zapatillas_adidas_Grand_Court_Cloudfoam_Lifestyle_Court_Comfort_Blanco_HP9410_01_standard.jpg", 2, 10);

console.log("Lista de productos:", manager.getProducts());