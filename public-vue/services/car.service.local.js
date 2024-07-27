'use strict'

import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PAGE_SIZE = 5
const CAR_KEY = 'carDB'

_createCars()

export const carService = {
    query,
    getById,
    remove,
    save,
    getEmptyCar,
}

function query(filterBy = {}) {
    return storageService.query(CAR_KEY)
        .then(cars => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                cars = cars.filter(car => regex.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                cars = cars.filter(car => car.speed >= filterBy.minSpeed)
            }
            if (filterBy.pageIdx !== undefined) {
                const startIdx = filterBy.pageIdx * PAGE_SIZE
                cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
            }
        
            return cars
        })
}

function getById(carId) {
    return storageService.get(CAR_KEY, carId)
}

function remove(carId) {
    return storageService.remove(CAR_KEY, carId)
}

function save(car) {
    if (car._id) {
        return storageService.put(CAR_KEY, car)
    } else {
        return storageService.post(CAR_KEY, car)
    }
}

function getEmptyCar(vendor = '', speed = 0) {
    return { id: '', vendor, speed }
}

function _createCars() {
    let cars = utilService.loadFromStorage(CAR_KEY)
    if (!cars || !cars.length) {
        cars = []
        cars.push(_createCar('audu', 300))
        cars.push(_createCar('fiak', 120))
        cars.push(_createCar('subali', 100))
        cars.push(_createCar('mitsu', 150))
        utilService.saveToStorage(CAR_KEY, cars)
    }
}

function _createCar(vendor, speed = 250) {
    const car = getEmptyCar(vendor, speed)
    car._id = utilService.makeId()
    return car
}

