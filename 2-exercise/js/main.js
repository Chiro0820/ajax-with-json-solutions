/** 
 * Skapa en tabell med 5 kolumner och 2 rader
 * Första raden i tabellen skall innehålla en knapp per kolumn, dvs totalt fem knappar på först raden.
 * - Första knappen skall heta "1", och hämta endast ett ord från http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=valueFromInput
 * - Andra knappen skall heta "2", och hämta två ord från samma URL
 * - Tredje knappen skall heta "3", och hämta tre ord från samma URL
 * - Gör samma sak för knapp 4 och 5
 * 
 * Undersök vad som visas i webbläsaren, med följande URLer:
 * http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=3
 * http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=10
 *
 * Varje knapp hämtar datan och placerar datan under respektive knapp, i andra raden.
 * Datan är en array med ord, dessa ord skall visas i en lista där varje ord är en listitem <il>
 * 
 * 
 * Skall ungefär se ut på följande sätt, efter att varje knapp gjort ett anrop
 * |-----|-----|-----|-----|-----|
 * |  1  |  2  |  3  |  4  |  5  |
 * |-----|-----|-----|-----|-----|
 * |.asd |.asd |.qwe |.qwe |.wer |
 * |     |.weq |.ewr |.gfd |.sfd |
 * |     |     |.ewr |.gfd |.cvx |
 * |     |     |     |.gfd |.dff |
 * |     |     |     |     |.bvc |
 * |-----|-----|-----|-----|-----|
 */





/**
 * Solution syggestion 1, for button 1
 * May replicate this solution for all buttons
 */
// const btn1 = document.getElementById('btn-1');
// btn1.addEventListener('click', fetchData1);

// async function fetchData1() {
//     try {
//         const response = await fetch('http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=1');
//         console.log(response);

//         if(!response.ok) {
//             throw new Error('HTTP Error! status: ' + response.status);
//         }

//         const words = await response.json();
//         console.log(words);

//         let listItemsHTML = '';
//         for(let word of words) {
//             listItemsHTML += `<li>${word}</li>`
//         }

//         document.getElementById('list-1').innerHTML = listItemsHTML;
//     } catch (error) {
//         console.log(error);
//     }
// }

 /**
  * Solution suggestion 2
  */
const btns = document.getElementsByTagName('button');
console.log(btns);

for(let btn of btns) {
    btn.addEventListener('click', async function(event) {
        console.log("What is 'this': ", this);
        console.log("What is 'this.value': ", this.value);

        // 'this' is the same as event.target 
        try {
            const response = await fetch('http://mardby.se/AJK15G/lorem_json_array.php?numberOfWords=' + this.value);
            console.log(response);
    
            if(!response.ok) {
                throw new Error('HTTP Error! status: ' + response.status);
            }
    
            const words = await response.json();
            console.log(words);
    
            let listItemsHTML = '';
            for(let word of words) {
                listItemsHTML += `<li>${word}</li>`
            }
    
            document.getElementById(`list-${this.value}`).innerHTML = listItemsHTML;
        } catch (error) {
            console.log(error);
        }
    })
}