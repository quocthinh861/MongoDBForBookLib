import { Request, Response } from 'express';
import Logging from '../library/Logging';
import bookModel from '../models/book.model';
const express = require('express');

const router = express.Router();

router.get('/book', async (req: Request, res: Response) => {
    bookModel.find({avg_rating: {$gte: 3, $lte: 5}}, (err: Error, books: any) => {
        if (err) {
            Logging.warn(err);
            res.status(500).send();
        } else {
            res.status(200).send({
                result: books,
                count: books.length,
            });
        }
    });
});

router.get('/:id', async (req: Request, res: Response) => {
    bookModel.findOne({id: req.params.id}, (err: Error, book: any) => {
        if (err) {
            res.status(500).send();
        } else {
            res.status(200).send(book);
        }
    });
});

module.exports = router;