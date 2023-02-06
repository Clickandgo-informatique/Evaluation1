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
            <div class="col-md-6 mx-auto fadeIn">
            <div class="card bg-white text-black">
            <div class="card-body">
            <div class="container d-flex justify-content-between align-items-center news-title mb-2">      
            <h5 class="text-white text-shadow text-left mb-0">${evt.title}</h5> 
            <h6 class="text-white mb-0 mr-3 d-flex text-shadow"><i class="bi bi-calendar3 my-auto text-right text-white"></i>&nbsp;&nbsp;${evt.date}</h6>
            </div>
            <div class="container news-content">
            <div class="card-text mx-3 my-3"><p class="news-content">${evt.content.join(' ')}</p></div>                                
            <div class="text-center">
            <a href="#" class="btn bg-white m-3">Voir plus ...</a>
            </div>
            </div>
            </div>
            </div>
            </article>`
    }).join(' ')
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