import { carService } from '../services/car.service.js'

import CarFilter from '../cmps/CarFilter.js'
import CarList from '../cmps/CarList.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="car-index">
            <CarFilter @filter="setFilterBy"/>
            <RouterLink to="/car/edit">Add a car</RouterLink> | 
            <a href="/api/download-pdf">Download PDF</a>

            <CarList 
                :cars="filteredCars" 
                @remove="removeCar" />
          
        </section>
    `,
    data() {
        return {
            cars: [],
            filterBy: {},
        }
    },
    created() {
        this.loadCars()
    },
    methods: {
        loadCars() {
            carService.query(this.filterBy)
                .then(cars => this.cars = cars)
                .catch(err => {
                    showErrorMsg('Cannot load cars')
                })
        },
        removeCar(carId) {
            carService.remove(carId)
                .then(() => {
                    const idx = this.cars.findIndex(car => car._id === carId)
                    this.cars.splice(idx, 1)
                    showSuccessMsg('Car removed')
                })
                .catch(err => {
                    showErrorMsg('Car remove failed')
                })
        },
        setFilterBy(filterBy) {
            this.filterBy = filterBy
            this.loadCars()
        }
    },
    computed: {
        filteredCars() {
            return this.cars
        }
    },

    components: {
        CarFilter,
        CarList,
    }
}