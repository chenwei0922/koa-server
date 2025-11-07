import app from '../src/app.js';

// Vercel serverless function handler
// app.callback() returns a function compatible with Node.js HTTP (req, res)
const handler = app.callback();

export default handler;

