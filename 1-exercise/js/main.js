/** 
 * Skapa ett textfält och en knapp "Fetch data".
 * I textfältet skall man kunna ange ett nummer, som är antal ord,
 * som hämtas från http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=valueFromInput
 * 
 * Undersök vad som visas i webbläsaren, med följande URLer:
 * http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=3
 * http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=10
 *
 * Datan skall läggas in i en tabell <table></table>, med 2 kolumner:
 * - Kolumn 1 skall ha rubriken "Number of words", och innehålla nummret som angavs
 * - Kolumn 2 skall ha rubriken "Result", och innehålla datan. Datan är en array med ord, där varje ord skall visas i en egen listItem <li>
 * 
 * Varje anrop skall hämta och placera datan i en ny rad, i tabellen
 */

const inputNumber = document.getElementById('input-number');
const tableBody = document.querySelector('#table tbody');
const fetchBtn = document.getElementById('fetch-btn');
fetchBtn.addEventListener('click', fetchData);

async function fetchData() {
    try {
        const response = await fetch('http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=' + inputNumber.value);
        console.log(response);

        if(!response.ok) {
            throw new Error('HTTP Error! status: ' + response.status);
        }

        const words = await response.json();
        console.log(words);

        let listItemsHTML = "";
        for(let word of words) {
            listItemsHTML +=  `<li>${word}</li>`;
        }

        let tableRowHTML = `
            <tr>
                <td>${inputNumber.value}</td>
                <td><ul>${listItemsHTML}</ul></td>
            </tr>
        `;

        tableBody.innerHTML += tableRowHTML
    } catch (error) {
        console.log(error);
    }
}

