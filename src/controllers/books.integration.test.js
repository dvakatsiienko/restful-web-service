/* Core */
require('should');
const supertest = require('supertest');
const mongoose = require('mongoose');

/* Instruments */
const { app } = require('../server.mjs');

process.env.ENV = 'TEST';

const agent = supertest.agent(app);
const Book = mongoose.model('Book');

/**
 * TODO: Ensure mongoose and mongodb are disconnected and the server stops listening when test finish.
 */
describe('Book CRUD test:', () => {
    it('should allow a book to be posted and return read and _it', done => {
        const bookPost = { title: 'My Book', author: 'Jon', genre: 'Fuction' };

        agent
            .post('/api/books')
            .send(bookPost)
            .expect(200)
            .end((err, results) => {
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            });
    });

    afterEach(done => {
        /**
         * TODO: change this dirty DB cleanup — mock DB in tests entirely.
         */
        Book.deleteMany({}).exec();
        done();
    });

    /**
     * TODO: fix errors after moving to Jest.
     */
    // after(done => {
    //     mongoose.connection.close();
    //     app.server.close(done());
    // });
});
