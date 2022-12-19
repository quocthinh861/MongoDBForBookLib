import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    author_id: { type: String, required: false },
    avg_rating: { type: Number, required: false },
    id: { type: String, required: true },
    language: { type: String, required: false },
    num_ratings: { type: Number, required: false },
    publish_day: { type: String, required: false },
    publish_month: { type: String, required: false },
    publish_year: { type: String, required: false },
    title: { type: String, required: false },
    url: { type: String, required: false },
});

export default mongoose.model("Book", bookSchema);