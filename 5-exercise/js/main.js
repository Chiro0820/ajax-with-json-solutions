/** 
 * Kopiera in koden från föregående uppgift "4-exercise"
 * 
 * Skapa en 3:e länk: 'Blog posts'
 * Beroende på vilken länk man trycker, skall sidans innehåll uppdateras via API anrop till: http://mardby.se/AJK15G/simple_json.php
 * Notera att länkarna skall EJ ladda om sidan, utan se till att anropen endast uppdaterar en HTML element (ex div#content), där sidans innehåll placeras
 * 
 * Klickar man på 'Blog posts'-länken
 *  - Sidan skall innehålla en lista av alla blogg-inlägg, som finns i 'blog_posts'-parametern.
 *  - Ordet lista i detta fall syftar EJ på att man använder <ul>, utan se till att inläggen visas under varann likt en lista
 *  - Varje inlägg skall visa:
 *       - 'title'- parametern som en h2-rubrik
 *       - 'date'- parametern under rubriken i kursiv textstil
 *       - 'text'- parametern under datum, i en egen <p>-element
 *          
 *
 */

const contentDiv = document.getElementById('content');
const links = document.querySelectorAll('#main-nav a');

for (let link of links) {
    link.addEventListener('click', fetchData);
}

async function fetchData(event) {
    try {
        const response = await fetch('http://mardby.se/AJK15G/simple_json.php');
        if(!response.ok) {
            console.log('HTTP Error! statu: ' + response.status);
        }
        // Retrive API data
        const data = await response.json();
        
        // Retrieving the id, of the link that was clicked
        const parameter = event.target.id

        // Add the genereated HTML to the DOM
        contentDiv.innerHTML = generatePageContentHTML(parameter, data);
    } catch (error) {
        console.log(error);
    }
}

function generatePageContentHTML(parameter, data) {
    // Generating a title according to the id (parameter), of the retrieved link above
    let title = generateTitle(parameter);
        
    // Retrive the content for the page, with the id (parameter)
    let content = generateContent(parameter, data);

    return `
        <article>
            <h1>${title}</h1>
            <p>${content}</p>
        </article>
    `;
}


function generateTitle(parameter) {
    switch(parameter) {
        case 'about':
            return 'About';
        case 'author':
            return 'Author';
        case 'blog_posts':
            return 'Blog posts';
    }
}

function generateContent(parameter, data) {
    let content = '';
    switch(parameter) {
        case 'blog_posts':
            for (let post of data['blog_posts']) {
                content += `
                    <article>
                        <h2>${post.title}</h2>
                        <i>${post.date}</i>
                        <p>${post.text}</p>
                    </article>
                `
            }
            break
        default: // default-block handles 'about'/'author' content
            content = data[parameter] // Either data['author'], data['about']
    }

    return content;
}