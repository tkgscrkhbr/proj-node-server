
window.loadCars = loadCars


function loadCars() {
    fetch('/api/car')
        .then(res => res.json())
        .then(cars => {
            console.log('Got Cars', cars)
            renderCars(cars)
        })
}

function renderCars(cars) {

    const strHTMLs = cars.map(car => `<li>${car.vendor}</li>`)
    const el = document.querySelector('.car-list')
    el.innerHTML = strHTMLs.join('')

}