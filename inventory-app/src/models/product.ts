export class Product {
    id: number;
    name: string;
    description: string;
    price: number;

    constructor(id: number, name: string, description: string, price: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    save(): Promise<Product> {
        // Logic to save the product to the database
        return Promise.resolve(this);
    }

    update(updatedProduct: Partial<Product>): Promise<Product> {
        // Logic to update the product in the database
        Object.assign(this, updatedProduct);
        return Promise.resolve(this);
    }

    delete(): Promise<void> {
        // Logic to delete the product from the database
        return Promise.resolve();
    }

    static findById(id: number): Promise<Product | null> {
        // Logic to find a product by id in the database
        return Promise.resolve(null);
    }

    static findAll(): Promise<Product[]> {
        // Logic to retrieve all products from the database
        return Promise.resolve([]);
    }
}