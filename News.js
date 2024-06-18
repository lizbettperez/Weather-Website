const apiKey = '2f17f82e50664c349f9e3603530598c8';
const newsContainer = document.getElementById('newsContainer');

async function fetchWeatherNews() {
    const url = `https://newsapi.org/v2/everything?q=weather OR climate OR storm OR hurricane OR flood OR rainfall&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
        displayNewsArticles(data.articles);
    } else {
        displayErrorMessage('No news articles found.');
    }
}

function displayNewsArticles(articles) {
    newsContainer.innerHTML = ''; 

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('newsArticle');

        const titleElement = document.createElement('h2');
        titleElement.textContent = article.title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = article.description || 'No description available';

        const linkElement = document.createElement('a');
        linkElement.href = article.url;
        linkElement.textContent = 'Read more';
        linkElement.target = '_blank';

        articleElement.appendChild(titleElement);
        articleElement.appendChild(descriptionElement);
        articleElement.appendChild(linkElement);

        newsContainer.appendChild(articleElement);
    });
}

function displayErrorMessage(message) {
    newsContainer.innerHTML = ''; 

    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    errorElement.style.color = 'red';

    newsContainer.appendChild(errorElement);
}


fetchWeatherNews();

