/**
 * A general purpose server to host both the API and the client
 **/
import express from 'express';
import cors from 'cors';
import path from 'path';
import droneMiddleware from './drone-api.js';

const app = express();

app.use('/api/drone', droneMiddleware);

// Expose static files
const moduleURL = new URL(import.meta.url);
const __dirname = path.dirname(moduleURL.pathname);
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
	res.status(404).json({error: 'Path not found'});
});

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

