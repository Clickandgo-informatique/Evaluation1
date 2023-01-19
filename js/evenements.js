let divNewsList = document.querySelector('.news-list')

const urlEvenements = fetch("./json/evenements.json")
    .then(response => {
        return response.json()
    })
    .then(evenements => {
                const dateAsc = evenements.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date)
                })
                console.log('Tri Date ascendante:' + JSON.stringify(dateAsc))
        
          const html = evenements.map(evenement => {
            return `<article>
                        <div class="col-md-6 mx-auto">
                            <div class="card bg-light text-black">
                                <div class="card-body">
                                    <div class="container d-flex justify-content-start date-news">
                                        <p class="card-title mb-3 news-date text-left mx-1">
                                        <i class="bi bi-calendar3 my-auto"></i>&nbsp;&nbsp;${evenement.date}</p>
                                    </div>
                                    <div class="container">
                                        <h5 class="text-primary">${evenement.title}</h5> 
                                        <div class="card-text">${evenement.content.join('')}</div>                                
                                        <div class="text-center">
                                            <a href="#" class="btn btn-primary mt-2">Voir plus ...</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>`
        })
        divNewsList.innerHTML += html

    })