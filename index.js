// include all dependencies
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");
const router = require('./src/router')
const logger = require('./src/middleware/logger')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require('dotenv').config()
const apiRoot = '/' + (process.env.API_ROOT || '')
const serverPort = process.env.SERVER_PORT || 3000
const serverURL = (process.env.SERVER_URL || `http://localhost:${serverPort}`) + apiRoot
const mongoURI = process.env.MONGO_URI || null

const app = express()

app.use(cors())
app.use(express.json())
app.use(`/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger)

app.use(apiRoot, router)

mongoose.connect(mongoURI)
    .then(() => {
        console.log('Successfully connected to database')
        app.listen(serverPort, () => {
            console.log(`Server started on port ${serverPort}`)
            console.log(`Api Documentation on ${serverURL}api-docs/`)
            console.log(`Server Live at ${serverURL} `)
        })
    })
    .catch((error) => {
        console.log('Database connection failed. Exiting now...')
        console.error(error)
        process.exit(1)
    })