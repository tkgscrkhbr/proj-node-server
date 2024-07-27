import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import { loggerService } from './services/logger.service.js'
import { gigService } from './services/gig.service.js'

const app = express()

// Express Config:
app.use(cookieParser())
app.use(express.static('public'))
app.use(express.json()) // Add middleware to parse JSON bodies

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, 'build')))

// API Routes
app.get('/api/gig', async (req, res) => {
    try {
        const gigs = await gigService.query(req.query)
        res.send(gigs)
    } catch (err) {
        console.error('Cannot get gigs', err)
        loggerService.error('Cannot get gigs', err)
        res.status(400).send('Cannot get gigs')
    }
})

app.get('/api/gig/:gigId', async (req, res) => {
    try {
        const gig = await gigService.getById(req.params.gigId)
        res.send(gig)
    } catch (err) {
        console.error('Cannot get gig', err)
        loggerService.error('Cannot get gig', err)
        res.status(400).send('Cannot get gig')
    }
})

app.post('/api/gig', async (req, res) => {
    try {
        const gig = await gigService.save(req.body)
        res.send(gig)
    } catch (err) {
        console.error('Cannot save gig', err)
        loggerService.error('Cannot save gig', err)
        res.status(400).send('Cannot save gig')
    }
})

app.put('/api/gig/:gigId', async (req, res) => {
    try {
        const gig = await gigService.save({ ...req.body, _id: req.params.gigId })
        res.send(gig)
    } catch (err) {
        console.error('Cannot update gig', err)
        loggerService.error('Cannot update gig', err)
        res.status(400).send('Cannot update gig')
    }
})

app.delete('/api/gig/:gigId', async (req, res) => {
    try {
        await gigService.remove(req.params.gigId)
        res.send({ msg: 'Gig removed' })
    } catch (err) {
        console.error('Cannot delete gig', err)
        loggerService.error('Cannot delete gig', err)
        res.status(400).send('Cannot delete gig')
    }
})

app.post('/api/gig/:gigId/msg', async (req, res) => {
    try {
        const msg = await gigService.addGigMsg(req.params.gigId, req.body.txt)
        res.send(msg)
    } catch (err) {
        console.error('Cannot add message to gig', err)
        loggerService.error('Cannot add message to gig', err)
        res.status(400).send('Cannot add message to gig')
    }
})

// Serve React App for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = 3030
app.listen(port, () => {
    loggerService.info(`Server listening on port http://127.0.0.1:${port}/`)
})
