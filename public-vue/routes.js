import HomePage from './pages/HomePage.js'
import AboutPage, {AboutTeam, AboutServices} from './pages/AboutPage.js'
import CarIndex from './pages/CarIndex.js'
import CarDetails from './pages/CarDetails.js'
import CarEdit from './pages/CarEdit.js'




const { createRouter, createWebHashHistory } = VueRouter
const options = {
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/about',
            component: AboutPage,
            children: [
                {
                    path: 'team',
                    component: AboutTeam
                },
                {
                    path: 'services',
                    component: AboutServices
                },
            ]
        },
        {
            path: '/car',
            component: CarIndex
        },
        {
            path: '/car/:carId',
            component: CarDetails
        },
        {
            path: '/car/edit/:carId?',
            component: CarEdit
        },
        // Last fallback if no route was matched:
        {
            path: '/:catchAll(.*)',
            component: AboutPage
        }
    ]
}
export const router = createRouter(options)

