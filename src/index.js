const express = require('express');
//const mongoose = require('mongoose');
const redis = require('redis');
const {Client} = require('pg');

const PORT = 4000;
const app = express();

const REDIS_HOST = 'redis';
const REDIS_PORT = 6379;

const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', (err) => console.log('Redis Client Error ', err));
redisClient.on('connect', () => console.log('Redis Client Connected Successfully'));
redisClient.connect();

const DB_USER = 'postgres';
const DB_PASS = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres';

const URI = `postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
    connectionString: URI,
});

client
    .connect()
    .then(() => console.log('Connecting to Postgres'))
    .catch((err) => console.log("Failed to connect: ", err));

app.get('/', (req, res) => {
    redisClient.set('products', 'products...');
    res.send('<h1>Hello World! Welcome to my website!</h1><br><h2>Main Page</h2>');
});

app.get('/data', async (req, res) => {
    const products = await redisClient.get('products');
    res.send(`<h1>${products}</h1>`);
});

app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));