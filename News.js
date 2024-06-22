const apiKey = '2f17f82e50664c349f9e3603530598c8';
const newsContainer = document.getElementById('newsContainer');

async function fetchWeatherNews() {
    const url = `https://newsapi.org/v2/everything?q=(weather OR climate OR storm OR hurricane OR flood OR rainfall)&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
        const filteredArticles = filterWeatherArticles(data.articles);
        if (filteredArticles.length > 0) {
            displayNewsArticles(filteredArticles);
        } else {
            displayErrorMessage('No relevant weather news articles found.');
        }
    } else {
        displayErrorMessage('No news articles found.');
    }
}

function filterWeatherArticles(articles) {
    const weatherKeywords = ['weather', 'climate', 'storm', 'hurricane', 'flood', 'rainfall'];
    return articles.filter(article => {
        const title = article.title.toLowerCase();
        const description = article.description ? article.description.toLowerCase() : '';
        return weatherKeywords.some(keyword => title.includes(keyword) || description.includes(keyword));
    });
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
