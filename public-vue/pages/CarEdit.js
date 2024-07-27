import { carService } from "../services/car.service.js"
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'


export default {
    template: `
        <section class="car-edit">
            <h2>{{(car._id)? 'Edit' : 'Add'}} a car</h2>
            <form @submit.prevent="save">
                <input type="text" v-model="car.vendor" placeholder="Vendor">
                <input type="number" v-model.number="car.speed">
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            car: carService.getEmptyCar()
        }
    },
    created(){
        const {carId} = this.$route.params
        if (carId) {
            carService.getById(carId)
                .then(car => this.car = car)
        }
    },
    methods: {
        save() {
            carService.save(this.car)
                .then(savedCar => {
                    // console.log('Car saved', savedCar)
                    showSuccessMsg('Car saved')
                    this.$router.push('/car')
                })
                .catch(err=>{
                    showErrorMsg('Car save failed')
                })
        }
    }
}