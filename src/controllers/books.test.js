/* Core */
require('should');
const sinon = require('sinon');
const { booksController } = require('./books');

describe('Book controller:', () => {
    describe('Post', () => {
        it('should not allow an empty title on post', () => {
            function Book(book) {
                this.save = () => {};
            }

            const req = {
                body: {
                    author: 'Jon',
                },
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy(),
            };

            const controller = booksController(Book);
            controller.post(req, res);

            res.status
                .calledWith(400)
                .should.equal(true, `Bad Status ${res.status.args[0][0]}`);

            res.send.calledWith('Title is required.').should.equal(true);
        });
    });
});
