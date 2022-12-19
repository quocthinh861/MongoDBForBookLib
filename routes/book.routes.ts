import { Request, Response } from 'express';
import Logging from '../library/Logging';
import bookModel from '../models/book.model';
const express = require('express');

const router = express.Router();

router.get('/book', async (req: Request, res: Response) => {
    bookModel.find({language: "English"}, (err: Error, books: any) => {
        setTimeout(function() {
            if (err) {
                Logging.warn(err);
                res.status(500).send();
            } else {
                res.status(200).send({
                    result: books,
                    count: books.length,
                });
            }
    }, 0);
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