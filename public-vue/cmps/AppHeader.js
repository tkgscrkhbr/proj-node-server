export default {
    template: `
        <header class="app-header">
            <h1>Cars Are Us</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink> |
                <RouterLink to="/car">Our cars</RouterLink> |
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </header>
    `,
    methods: {
    }
}