document.getElementById('searchForm').addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("fut");

    const keresettFilm = document.getElementById("search").value;
    console.log(keresettFilm);

    const xhr = new XMLHttpRequest();

    const url = `https://www.omdbapi.com/?s=${encodeURI(keresettFilm)}&apiKey=9606ae0f`;
    console.log(url);

    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            const response = JSON.parse(xhr.responseText);
            console.log(response);

            if (response.Search) {
                renderFilmek(response.Search);
            } else {
                console.log("Nincs találat")
            }

        } else {
            console.error("Ajax hiba", xhr.statusText);
        }
    }

    xhr.send();
});

function renderFilmek(films) {
    const filmContainer = document.getElementById("filmek");
    filmContainer.innerHTML = "";
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
    });
}