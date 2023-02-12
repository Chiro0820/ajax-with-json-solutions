/** 
 * Kopiera in koden från föregående uppgift "6-exercise"
 * 
 * Bygg vidare på inläggslistan
 * - Se till att varje inlägg endast visar sin rubrik, resten av inlägget skall vara dolt
 * - Rubriken skall vara en klickbar länk (som EJ laddar om sidan)
 * - När man trycker på en rubrik, då skall inläggets innehåll visas under rubriken. Trycker man igen, då döljs innehållet återigen.
 * - Extra (jQuery): Försök lägga till en animation som visar/döljer inläggsinnehållet på ett snyggt sätt. Ex slide up/slide down
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
            console.log('HTTP Error! status: ' + response.status);
        }
        // Retrive API data
        const data = await response.json();
        
        // Retrieving the id, of the link that was clicked
        const parameter = event.target.id

        // Add the genereated HTML to the DOM
        contentDiv.innerHTML = generatePageContentHTML(parameter, data);

        toggleDisplayPostContent();
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
                        <h2><a href="#">${post.title}</a></h2>
                        <section class="hidden">
                            <i>${post.date}</i>
                            <p>${post.text}</p>
                            <p class="tags">Tags: ${post.tags.join(', ')}</p>
                        </section>
                    </article>
                `
            }
            break
        default: // default-block handles 'about'/'author' content
            content = data[parameter] // Either data['author'], data['about']
    }

    return content;
}

function toggleDisplayPostContent() {
    const postTitles = document.querySelectorAll("#content a");
    for (let postTitle of postTitles) {
        postTitle.addEventListener('click', function(event) {
            const title = event.target;
            console.log(title);                                 // The clicked title <a>
            console.log(title.parentNode);                      // <h2>
            console.log(title.parentNode.nextElementSibling);   // <section class="hidden">

            title.parentNode.nextElementSibling.classList.toggle('hidden');
        })
    }
}
