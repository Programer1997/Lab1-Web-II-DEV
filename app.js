// https://newsapi.org/docs/endpoints/everything API documentation for this example

///////////////////////////////////////////////////////////////////////////////////////
//const helmet = require('helmet');
/*const express = require('express');
const helmet = require('helmet');

const app = express();

app.use(helmet());

// aquí puedes definir tus rutas y otros middlewares

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});*/

/////////////////////////////////////////////////////////////////////////


const APIKEY = "1eb165f1b11b4aa987ba90ec822184e3";

const container = document.querySelector(".news");
const englishButton = document.querySelector("#english-btn");
const frenchButton = document.querySelector("#french-btn");
const pageSizeSelection = document.querySelector("#pageSize");

//Abraham code Start :

const searchInput = document.querySelector('#search-text');
const searchButton = document.querySelector('#search-btn');
let searchIn = "";

//Abraham code End ////////////////

let language = 'en';
let pageSize = 10;

const getNews = (language = "en", pageSize = "10", searchIn=" ") => {
    fetch("https://newsapi.org/v2/everything" +
    `?q=${searchIn}` +
    `&language=${language}` +
    `&pageSize=${pageSize}` +
    `&apiKey=${APIKEY}`
    )
    .then(res => res.json())
    .then(data => {
        let news = data.articles;
        let newCards = "";
        news.forEach((item) => {
            let date = new Date(item.publishedAt);
            newCards += `
                <div class="card">
                    <img width="100%" src="${item.urlToImage ? item.urlToImage : "./assets/noimage.jpg"}" />
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p><b>Date:</b> ${date.toDateString()}</p>
                    <a id="goto-btn" href="${item.url}">Go to News</a>
                </div>
            `;
        })
        container.innerHTML = newCards;
    })
    .catch(err => console.log(err));
}

englishButton.addEventListener("click", () => {
    language = "en";
    getNews(language, pageSize)
})

frenchButton.addEventListener("click", () => {
    language = "fr"
    getNews(language, pageSize)
})

pageSizeSelection.addEventListener("change", (ev) =>{
    pageSize = ev.target.value;
    getNews(language, pageSize)
})

searchButton.addEventListener("click", (ev) =>{
    console.log("here");
    console.log(searchInput.value);

    searchIn = searchInput.value;
    getNews(language, pageSize, searchIn)
})

getNews(language, pageSize)

// function checkImage(image){
//     if(image !== null){
//         return image
//     }else{
//         return "./assets/noimage.jpg"
//     }
// }

// Ternary Operator

// item.urlToImage ? item.urlToImage : "./assets/noimage.jpg"
// condition ? true : false
// console.log(5 > 4 ? "Yes, it is" : "No, its not");  
// after ?(question mark) you can return true or after :(colon) you can return false
// console.log(3 > 4 && "Yes, its is"); // only check true