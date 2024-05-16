


function createCard(data) {
    var card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h2>${data.nev}</h2>
      <p>Age: ${data.age}</p>
      <p>Job: ${data.job}</p>
      <p>Gender: ${data.gender}</p>
    `;
    return card;
  }

  // Function to display JSON data in cards
  function displayDataInCards(dataArray) {
    var container = document.getElementById('cardsContainer');
    dataArray.forEach(function(item) {
      var card = createCard(item);
      container.appendChild(card);
    });
  }
  fetch('datas.json')
  .then(response => response.json())
  .then(data => {
    // Display JSON data in cards
    displayDataInCards(data);
  })
  .catch(error => console.error('Error fetching data:', error));
