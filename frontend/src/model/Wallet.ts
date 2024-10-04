import { Clothing } from "./Clothing";

export class Wallet {
    private items: Clothing[] = [];

    addItem(item: Clothing) {
        this.items.push(item);
    }

    removeItem(itemId: string) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getItems(): Clothing[] {
        return this.items;
    }

    clear() {
        this.items = [];
    }
}
