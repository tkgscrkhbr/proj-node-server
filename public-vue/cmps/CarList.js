import CarPreview from './CarPreview.js'

export default {
    props:['cars'],
    template: `
        <section class="car-list">
            <ul>
                <li v-for="car in cars" :key="car._id">
                    <CarPreview :car="car"/>
                    <RouterLink :to="'/car/'+car._id">Details</RouterLink> |
                    <RouterLink :to="'/car/edit/'+car._id">Edit</RouterLink> |
                    <button hidden @click="showDetails(car._id)">Details</button>
                    <button @click="remove(car._id)">x</button>
                </li>
            </ul>
        </section>
    `,
    methods: {
        remove(carId) {
            this.$emit('remove', carId)
        },
        showDetails(carId){
            this.$emit('show-details', carId)
        },
    },
    components: {
        CarPreview,
    }
}