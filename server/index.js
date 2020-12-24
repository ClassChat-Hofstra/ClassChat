import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/userDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

    mongoose.set('useFindAndModify', false);