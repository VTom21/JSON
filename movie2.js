//az űrlap beküldésének esemény kezelése
document.getElementById('searchForm').addEventListener("submit", function (e) {
    //böngésző alapértelmezett működésének megállítása
    e.preventDefault();
    console.log("fut");
    //a keresett érték eltárolása az input mezőből
    const keresettFilm = document.getElementById("search").value;
    console.log(keresettFilm);

    //xmlHttpRequst új példányának létrehozása
    const xhr = new XMLHttpRequest();

    /* Az OMDB API URL összeállítása a keresett film alapján
       az encodeURI() beépített function átalakítja az URL-t kompatibilis formára
       */
    const url = `http://www.omdbapi.com/?s=${encodeURI(keresettFilm)}&apiKey=9606ae0f`;
    console.log(url);

    //az AJAX kérés beállítása
    xhr.open("GET", url, true);
    //ha az ajax kérés betöltődik
    xhr.onload = function () {
        //Státusz ellenőrzés
        if (xhr.status == 200) {
            //json kimenetet
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseTex);
            //js számára értelmezető tömb
            console.log(response);

            //ellenőrizzük, hogy a válasz tartalmazza e a "Search" értéket
            if (response.Search) {
                renderFilmek(response.Search);
            } else {
                console.log("Nincs találat")
            }

        } else {
            console.error(
                "Ajax hiba", xhr.statusText
            )
        }
    }

    //Ajax kérés elküldése
    xhr.send();
})

//renderelés
function renderFilmek(films) {
    //ahová a filmek kerülnek
    const filmContainer = document.getElementById("filmek");
    //előző filmeket töröljük
    filmContainer.innerHTML = "";
    //minden filmre egy kártyát létre hozunk
    films.forEach(function (film) {
        const card = `
        <div class="col-lg-3">
        <div class="card">
            <img src="${film.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                <h5 class="card-title">${film.Title}</h5>
                <p class="card-text">${film.Year}</p>
            </div>
        </div>
    </div>
        `;
        filmContainer.innerHTML += card;
    })
}
