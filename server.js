import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(
    bodyParser.raw({ 
        type: 'application/octet-stream',
        limit: '100mb'
    })
);
app.use(cors());

app.get('/', (req, res) => {
    res.send('ok');
})

app.post('/upload', (req, res) => {
    const { name, size, currentChunkIndex, totalChunks } = req.query;
    const ext = name.split('.').pop(); // test.jpg => jpg

    console.log( req.body );

    res.send('ok');
});

app.listen(4000);