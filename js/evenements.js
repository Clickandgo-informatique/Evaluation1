let divNewsList = document.querySelector('.news-list')
let selectTriDate = document.querySelector('#triDateEvenement')

window.onload = () => {
    lstEvenements()
        .then(evts => {
            evts=evts.sort(triDateFrDesc)
            afficherListeEvts(evts)
        })
}

const lstEvenements = async (evts) => {
    let response = await fetch("./json/evenements.json")
    evts = await response.json()
    return evts
}
//Gestion du select permettant de classer par date
selectTriDate.addEventListener('change', () => {
    triParDate()
})

const afficherListeEvts = (evts) => {
    const html = evts.map(evt => {
        return `<article>
            <div class="col-md-6 mx-auto">
            <div class="card bg-white text-black">
            <div class="card-body">
            <div class="container d-flex justify-content-start date-news">
            <p class="card-title mb-3 news-date text-left mx-1">
            <i class="bi bi-calendar3 my-auto"></i>&nbsp;&nbsp;${evt.date}</p>
            </div>
            <div class="container">
            <h5 class="text-primary">${evt.title}</h5> 
            <div class="card-text">${evt.content.join('')}</div>                                
            <div class="text-center">
            <a href="#" class="btn btn-gray m-3">Voir plus ...</a>
            </div>
            </div>
            </div>
            </div>
            </article>`
    })
    divNewsList.innerHTML = html
}
//Classe par date Française en ascendant ou descendant
//suivant le choix utilisateur dans le select
const triParDate = () => {
    if (selectTriDate.value == 1) {
        lstEvenements()
            .then(evts => {
                evts.sort(triDateFrDesc)
                afficherListeEvts(evts)
            })
    }
    if (selectTriDate.value == 2) {
        lstEvenements()
            .then(evts => {
                evts.sort(triDateFrAsc)
                afficherListeEvts(evts)
            })
    }
}

function triDateFrDesc(a, b) {
    let dateA = new Date(a.date.split("/").reverse().join('-'));
    let dateB = new Date(b.date.split("/").reverse().join('-'));
    return (dateA < dateB) ? 1 : -1;
}

function triDateFrAsc(a, b) {
    let dateA = new Date(a.date.split("/").reverse().join('-'));
    let dateB = new Date(b.date.split("/").reverse().join('-'));
    return (dateA > dateB) ? 1 : -1;
}