const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId, makeLorem } from '../util.service'

import { gigService as local } from './gig.service.local'
import { gigService as remote } from './gig.service.remote'

function getEmptyGig() {
	return {
		title:'',
		price:'',
        description: '',
        imgUrls: []
	}
}

function getDefaultFilter() {
    return {
        title: '',
        tags: [],
        // sortField: '',
        // sortDir: '',
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const gigService = { getEmptyGig, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.gigService = gigService
