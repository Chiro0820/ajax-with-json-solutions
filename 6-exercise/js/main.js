/** 
 * Kopiera in koden från föregående uppgift "5-exercise"
 * 
 * Bygg vidare på inläggslistan
 * - Se till att varje inlägg visar tillhörande taggar, under inläggs-texten. Nedan illustrerar hur ett inlägg bör se ut.
 * 
 * 
 * 
 * Today is awesome!
 * 
 * 2015-11-18
 *
 * Bacon ipsum dolor amet pastrami tenderloin pork chop jerky corned beef ground round bresaola flank. 
 * Salami porchetta pancetta tenderloin, flank shoulder turducken pig jerky filet mignon. 
 * Flank sausage leberkas corned beef venison hamburger. 
 * Turkey pork loin short ribs meatball shankle sausage leberkas, bresaola pancetta pork jerky. 
 * Beef ribs flank corned beef pastrami.
 * 
 *      Tags: Bacon ipsum, tenderloin, pork, jerky, pancetta, pastrami 
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
                        <p class="tags">Tags: ${post.tags.join(', ')}</p>
                    </article>
                `
            }
            break
        default: // default-block handles 'about'/'author' content
            content = data[parameter] // Either data['author'], data['about']
    }

    return content;
}
