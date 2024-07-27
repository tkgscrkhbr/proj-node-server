import { utilService } from "../services/util.service.js"

export default {
    template: `
        <section class="car-filter">
            <input 
                v-model="filterBy.txt"
                placeholder="Search"
                type="text" />
                
            <input 
                v-model.number="filterBy.minSpeed"
                placeholder="Min speed"
                type="number" />
        </section>
    `,
    data() {
        return {
            filterBy: { txt: '', minSpeed: 0 },
        }
    },
    created() {
        this.filter = utilService.debounce(()=>{
            this.$emit('filter', this.filterBy)
        }, 1000)
    },
    watch: {
        filterBy: {
            handler() {
                this.filter()
            },
            deep: true
        },
    }

}