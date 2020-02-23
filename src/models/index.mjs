import { Book } from './Book.mjs';

export const Models = new (class {
    constructor() {
        this.Book = Book;
    }
})();
