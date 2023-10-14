class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.products.push(product);
        console.log(`Producto agregado: ${title} (id: ${code})`);
    }

    getProducts() {
        return this.products;
    }

    getElementById(code) {
        const product = this.products.find((product) => product.code === code);
        if (product) {
            console.log(`Producto encontrado: ${product.title} (id: ${product.code})`);
        } else {
            console.log(`Producto no encontrado con id: ${code}`);
        }
        return product;
    }
}

const manager = new ProductManager();


manager.addProduct("Zapatillas Nike", "Zapatillas de Nike", 12999.99, "https://nikearprod.vtexassets.com/arquivos/ids/698518/DD8959_101_A_PREM.jpg?v=638229588960370000", 1, 15);
manager.addProduct("Zapatillas Adidas", "Zapatillas de Adidas", 11999.99, "https://assets.adidas.com/images/w_600,f_auto,q_auto/284271d85b694ff5b8e6af6400cad5ee_9366/Zapatillas_adidas_Grand_Court_Cloudfoam_Lifestyle_Court_Comfort_Blanco_HP9410_01_standard.jpg", 2, 10);

console.log("Lista de productos:", manager.getProducts());