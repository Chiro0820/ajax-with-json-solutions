/** 
 * Skapa ett textfält och en knapp "Roll dices".
 * I textfältet skall man kunna ange ett nummer, 
 * som är antal tärningar(slumpad siffra mellan 1-6), som skall hämtas från http://mardby.se/AJK15G/dice_json_array.php?numberOfDice=valueFromInput
 * 
 * Undersök vad som visas i webbläsaren, med följande URLer:
 * http://mardby.se/AJK15G/dice_json_array.php?numberOfDice=1
 * http://mardby.se/AJK15G/dice_json_array.php?numberOfDice=4
 *
 * Datan skall i sin tur visas i en lista, där varje tärning placeras i en listItem <li>
 */

const inputNumber = document.getElementById('input-number');
const list = document.getElementById('list');
const fetchBtn = document.getElementById('fetch-btn');
fetchBtn.addEventListener('click', fetchData);

async function fetchData() {
    try {
        const response = await fetch('http://mardby.se/AJK15G/dice_json_array.php?numberOfDice=' + inputNumber.value);
        console.log(response);
    
        if(!response.ok) {
            throw new Error('HTTP Error! status: ' + response.status);
        }

        const dices = await response.json();
        console.log(dices);

        let listItemsHTML = '';
        for(let dice of dices) {
            listItemsHTML += `<li>${dice}</li>`;
        }

        list.innerHTML = listItemsHTML;
    } catch (error) {
        console.log(error);
    }
}