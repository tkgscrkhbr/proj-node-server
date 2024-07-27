import { utilService } from './util.service.js'
import fs from 'fs'

const gigsFilePath = 'data/gigs.json'

export const gigService = {
    query,
    getById,
    save,
    remove,
    addGigMsg
}

async function query(filterBy = { txt: '', price: 0 }) {
    let gigs = await utilService.readJsonFile(gigsFilePath)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        gigs = gigs.filter(gig => regex.test(gig.title))
    }
    if (filterBy.price) {
        gigs = gigs.filter(gig => gig.price <= filterBy.price)
    }
    return gigs
}

async function getById(gigId) {
    const gigs = await utilService.readJsonFile(gigsFilePath)
    return gigs.find(gig => gig._id === gigId)
}

async function save(gig) {
    let gigs = await utilService.readJsonFile(gigsFilePath)
    if (gig._id) {
        const idx = gigs.findIndex(currGig => currGig._id === gig._id)
        gigs[idx] = gig
    } else {
        gig._id = utilService.makeId()
        gigs.push(gig)
    }
    fs.writeFileSync(gigsFilePath, JSON.stringify(gigs, null, 2))
    return gig
}

async function remove(gigId) {
    let gigs = await utilService.readJsonFile(gigsFilePath)
    gigs = gigs.filter(gig => gig._id !== gigId)
    fs.writeFileSync(gigsFilePath, JSON.stringify(gigs, null, 2))
}

async function addGigMsg(gigId, txt) {
    let gigs = await utilService.readJsonFile(gigsFilePath)
    const gig = gigs.find(gig => gig._id === gigId)
    if (!gig.msgs) gig.msgs = []
    const msg = { id: utilService.makeId(), txt }
    gig.msgs.push(msg)
    fs.writeFileSync(gigsFilePath, JSON.stringify(gigs, null, 2))
    return msg
}
