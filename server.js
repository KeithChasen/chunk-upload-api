import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import md5 from 'md5';

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
    const { name, currentChunkIndex, totalChunks } = req.query;
    
    const firstChunk = parseIncurrentChunkIndex === 0;
    const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1
    
    const ext = name.split('.').pop(); // test.jpg => jpg

    // remove this part: data:application/octet-stream;base64
    const data = req.body.toString().split(',')[1];

    const buffer = new Buffer.from(data);

    const tmpFileName = `tmp_${md5(name)}.${ext}`;

    if (firstChunk) {
        fs.unlinkSync(`./uploads/${tmpFileName}`)
    }
    
    fs.appendFileSync(`./uploads/${tmpFileName}`, buffer);

    if (lastChunk) {
        const finalFileName = md5(Date.now()).substring(0,6) + '.' + ext;
        fs.renameSync(`./uploads/${tmpFileName}`, `./uploads/${finalFileName}`);

    }


    res.send('ok');
});

app.listen(4000);