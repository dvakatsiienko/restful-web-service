/**
 * TODO: create Book instance inside controller and mock it with
 * TODO: a testing framework in order to test.
 */
export const booksController = Book => {
    const get = (req, res) => {
        const query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        Book.find(query, (err, books) => {
            if (err) {
                res.send(err);
            } else {
                const returnBooks = books.map(book => {
                    const newBook = book.toJSON();
                    newBook.links = {};
                    newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
                    return newBook;
                });

                res.json(returnBooks);
            }
        });
    };

    const post = (req, res) => {
        const book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required.');
        }

        book.save();
        res.status(201);
        res.json(book);
    };

    return {
        get,
        post,
    };
};

