/* Core */
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/* Instruments */
import { Router } from './routes/index.mjs';

if (process.env.ENV === 'TEST') {
    /**
     * TODO: change this real-world DB mock to a better, in-memory one.
     */
    mongoose.connect('mongodb://localhost/bookAPI-TESTS', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Test env launched.');
} else {
    mongoose.connect('mongodb://localhost/bookAPI', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Dev env launched.');
}

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true })).use(bodyParser.json());

app.use('/api', Router);

app.get('/', (_, res) => {
    res.send('welcome to my api!');
});

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});

export { app };
