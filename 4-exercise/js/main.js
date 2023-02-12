/** 
 * 
 * Skapa en meny med 3 länkar: 'Blog posts', 'Author', 'About'
 * Beroende på vilken länk man trycks, skall sidans innehåll uppdateras via API anrop till: http://mardby.se/AJK15G/simple_json.php
 * Notera att länkarna skall EJ ladda om sidan, utan se till att anropen endast uppdaterar en HTML element (ex div#content), där sidans innehåll placeras
 * 
 * Klickar man på 'About'-länken
 *  - Visa då endast en rubrik "About" tillsammans med texten som finns i 'about'-parametern
 * 
 * Klickar man på 'Author'-länken
 *  - Visa då endast en rubrik "Author" tillsammans med texten som finns i 'author'-parametern
 *        
 *
 */

/**
 * Solution suggestion 1, for about-link
 * May replicate this solution for the other links as well
 */
// const content = document.getElementById('content');
// const aboutLink = document.getElementById('about');

// aboutLink.addEventListener('click', fetchAbout);

// async function fetchAbout() {
//     try {
//         const response = await fetch('http://mardby.se/AJK15G/simple_json.php');
//         if(!response.ok) {
//             console.log('HTTP Error! statu: ' + response.status);
//         }

//         const blogData = await response.json();
//         console.log(blogData);
//         console.log(blogData.about);

//         let htmlContent = `
//             <article>
//                 <h2>About</h2>
//                 <p>${blogData.about}</p>
//             </article>
//         `;

//         content.innerHTML = htmlContent;

//     } catch (error) {
//         console.log(error);
//     }
// }


/**
 * Solution suggestion 2
 */
const content = document.getElementById('content');
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

        const blogData = await response.json();
        console.log('The fetched data: ',blogData);
        
        // Retrieving the link that was clicked
        const link = event.target; 
        console.log('The clicked link: ', link);
        const pageParameter = link.id
        console.log('Link id, used as a page param: ', pageParameter);

        // Generating a title according to the id, of the retrieved link above
        let pageTitle = '';
        switch(pageParameter) {
            case 'about':
                pageTitle = 'About';
                break;
            case 'author':
                pageTitle = 'Author';
                break;
        }
        console.log('Generated page title: ', pageTitle)
        
        // Getting the content for the page
        let pageContent = blogData[pageParameter]
        console.log('Retrieved page content: ', pageContent)


        let htmlContent = `
            <article>
                <h2>${pageTitle}</h2>
                <p>${pageContent}</p>
            </article>
        `;

        content.innerHTML = htmlContent;

    } catch (error) {
        console.log(error);
    }
}