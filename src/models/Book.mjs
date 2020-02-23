/* Core */
import mongoose from 'mongoose';

const { Schema } = mongoose;

const model = new Schema({
    title: { type: String },
    author: { type: String },
    genre: { type: String },
    read: { type: Boolean, default: false },
});

export const Book = mongoose.model('Book', model);
