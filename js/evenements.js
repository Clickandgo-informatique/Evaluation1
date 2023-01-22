let divNewsList = document.querySelector('.news-list')
let selectTriDate = document.querySelector('#triDateEvenement')

const lstEvenements = async () => {
    var response = await fetch("./json/evenements.json")
    var evts = await response.json()
    afficherListeEvts(evts)
}
lstEvenements()

selectTriDate.addEventListener('change', (evts) => {
    lstEvenements(evts)
    triParDate(evts)
    afficherListeEvts(evts)
})

//Classe par date Française en ascendant ou descendant
//suivant le choix utilisateur dans le select
const triParDate = (evts) => {
    if (selectTriDate.value == 1) {
       evts = evts.sort(triDateFrDesc(evts))      
       return evts
    }
    if (selectTriDate.value == 2) {
       evts = evts.sort(triDateFrAsc(evts))
        return evts          
    }
    function triDateFrDesc(a, b) {
        dateA = new Date(a.date.split("/").reverse().join('-'));
        dateB = new Date(b.date.split("/").reverse().join('-'));
        return (dateA < dateB) ? 1 : -1;
    }
    
    function triDateFrAsc(a, b) {
        dateA = new Date(a.date.split("/").reverse().join('-'));
        dateB = new Date(b.date.split("/").reverse().join('-'));
        return (dateA > dateB) ? 1 : -1;
    }
}

const afficherListeEvts = (evts) => {
    const html = evts.map(evt => {
        return `<article>
            <div class="col-md-6 mx-auto">
            <div class="card bg-light text-black">
            <div class="card-body">
            <div class="container d-flex justify-content-start date-news">
            <p class="card-title mb-3 news-date text-left mx-1">
            <i class="bi bi-calendar3 my-auto"></i>&nbsp;&nbsp;${evt.date}</p>
            </div>
            <div class="container">
            <h5 class="text-primary">${evt.title}</h5> 
            <div class="card-text">${evt.content.join('')}</div>                                
            <div class="text-center">
            <a href="#" class="btn btn-primary mt-2">Voir plus ...</a>
            </div>
            </div>
            </div>
            </div>
            </article>`
    })
    divNewsList.innerHTML = html
}