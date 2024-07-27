export default {
    props: ['car'],
    template: `
        <article class="car-preview">
            <h2>{{ car.vendor }}</h2>
            <h3>{{ car.speed }} KMH</h3>
        </article>
    `,
}