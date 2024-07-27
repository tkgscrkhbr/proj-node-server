export default {
    template: `
        <section class="about-page">
            <h2>About</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
            <hr />
            <nav>
                <RouterLink to="/about/team">Our team</RouterLink> |
                <RouterLink to="/about/services">Our services</RouterLink> |
            </nav>
            <hr />
            <RouterView />
            <hr />
            <div ref="theMap"></div>
            <input type="text" ref="theInput" />
        </section>
    `,
    mounted() {
        console.log('About page is mounted', this.$refs)
        this.$refs.theInput.focus()
    },
}

export const AboutTeam = {
    template: `<section>
        <h3>Our team is amazing</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
    </section>`
}
export const AboutServices = {
    template: `<section>
        <h3>Our Services are incredible!</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis enim rem porro delectus. Quos expedita ipsam repellendus voluptas quas, nam ea eligendi veniam ullam, modi impedit eveniet quia quaerat molestias?</p>
    </section>`
}
