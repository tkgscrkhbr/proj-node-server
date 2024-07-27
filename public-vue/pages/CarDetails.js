import { carService } from "../services/car.service.js"

export default {
    template: `
        <section class="car-details" v-if="car">
            <h2>{{ car.vendor }}</h2>
            <h3>{{ car.speed }} KMH</h3>
            <img :src="'../assets/img/' + car.vendor + '.png'" alt="">
            <nav>
                <RouterLink to="/car">Back to list</RouterLink>
            </nav>
            <hr />
            <pre>{{car}}</pre>    
        </section>
    `,
    data() {
        return {
            car: null
        }
    },
    created() {
        console.log('CarDetails Params:', this.$route.params)
        this.loadCar()
    },
    computed: {
        carId() {
            return this.$route.params.carId
        }
    },
    watch: {
        carId() {
            console.log('CarId Changed!')
            this.loadCar()
        }
    },
    methods: {
        loadCar() {
            carService.getById(this.carId)
                .then(car => this.car = car)
        }
    }
}