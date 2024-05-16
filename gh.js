const mysql = require('mysql');

// Adatbázis konfiguráció

const connection = mysql.createConnection({

  host: 'localhost', // Az adatbázis szerver elérési útja (általában 'localhost', de más is lehet)

  user: 'root',      // Az adatbázis felhasználóneve

  password: '',      // Az adatbázis jelszava (ha van)

  database: 'datas' // Az adatbázis neve, amelyben a lekérdezést futtatjuk

});

// Kapcsolódás az adatbázishoz

connection.connect();

// Lekérdezés az adatbázisból

connection.query('SELECT * FROM datas', (error, results, fields) => {

  if (error) throw error; // Hiba kezelése: ha hiba történik a lekérdezésben, dobunk egy hibaüzenetet

  // Az eredmények JSON formátumban kiírása

/*JSON.stringify(results, null, 2) azt jelenti, hogy az results változóban tárolt objektumot alakítjuk át JSON formátumba, ahol a szóközök és behúzások két szóközt foglalnak el, és nincs speciális cserélő függvény vagy tömb használva. Ezáltal szebb és olvashatóbb formában kapjuk meg az eredményt, amikor kiírjuk.*/

  const jsonResults = JSON.stringify(results, null, 2); // Az eredmények JSON formátumban történő átalakítása

  console.log(jsonResults); // Az eredmények kiírása a konzolra

  // A JSON kiírása fájlba

  const fs = require('fs'); // A "fs" modul importálása a Node.js-hez (a fájlkezeléshez)

  fs.writeFile('datas.json', jsonResults, 'utf8', (err) => { // A fájl írása: nevjegyek.json néven, a jsonResults tartalmával

    if (err) throw err; // Hiba kezelése: ha hiba történik a fájlírás során, dobunk egy hibaüzenetet

    console.log('A nevjegyek.json fájl létrehozva.'); // Sikeres fájlírás esetén üzenet a konzolra

  });

});

// Kapcsolat lezárása az adatbázissal

connection.end();