/* Core */
import express from 'express';

/* Instruments */
import { Models } from '../models/index.mjs';
import { booksController } from '../controllers/books.mjs';

const Router = express.Router();
const controller = booksController(Models.Book);

Router
    .route('/books')
    .get(controller.get)
    .post(controller.post);

Router.use('/books/:bookId', (req, res, next) => {
    Models.Book.findById(req.params.bookId, (err, book) => {
        if (err) {
            res.send(err);
        } else if (book) {
            req.book = book;

            return next();
        } else {
            return res.sendStatus(404);
        }
    });
});

Router
    .route('/books/:bookId')
    .get((req, res) => {
        const returnBook = req.book.toJSON();
        returnBook.links = {
            FilterByThisGenre: `http://${
                req.headers.host
            }/api/books/?genre=${req.book.genre.replace(' ', '%20')}`,
        };
        res.json(returnBook);
    })
    .put((req, res) => {
        const { book } = req;

        book.title = req.body.title;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.read = req.body.read;

        req.book.save(err => {
            if (err) {
                res.send(err);
            } else {
                res.json(book);
            }
        });
    })
    .patch((req, res) => {
        const { book } = req;

        req.body._id && delete req.body._id;

        Object.entries(req.body).forEach(entry => {
            const [key, value] = entry;
            book[key] = value;
        });

        req.book.save(err => {
            if (err) {
                res.send(err);
            } else {
                res.json(book);
            }
        });
    })
    .delete((req, res) => {
        req.book.remove(err => {
            if (err) {
                res.send(err);
            } else {
                res.sendStatus(204);
            }
        });
    });

export { Router }