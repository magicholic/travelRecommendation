const searchBtnElement = document.getElementById('searchBtn');
searchBtnElement.addEventListener('click', function() {
    let searchInput = document.getElementById('searchBarField').value;
    searchInput = searchInput.trim();   
    if (searchInput === '') {
        alert('Please enter a search term.');
        return;
    } 
    searchInput = searchInput.toLowerCase();
    getData(searchInput);
})

const resetBtnElement = document.getElementById('resetBtn');
resetBtnElement.addEventListener('click', function() {
    document.getElementById('searchBarField').value = '';
    document.getElementById('results').innerHTML = '';
})

async function getData(searchString) {
    let jsonFile = './travel_recommendation_api.json';
    let itemKeywords = [];
    try {
        let response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error('Network response was not ok'); 
        }
        let result = await response.json();
        for (item in result) {
            itemKeywords.push(item);
        }
        let foundList = itemKeywords.filter(item => item.includes(searchString) || searchString.includes(item));
        if (foundList.length === 0) {
            alert('No matching items found.');
            return;
        }
        let resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; // Clear previous results
        let ulElement = document.createElement('ul');
        ulElement.className = 'resultsList';
        for (let foundItem of foundList) {
            let info = result[foundItem];
            if (foundItem === 'countries') {
                for (let countryItem of info) {
                    buildInfo(countryItem.cities, ulElement);
                }
            } else {
                buildInfo(info, ulElement);
            }
        }
        resultsContainer.appendChild(ulElement);
    } catch (error) {
        console.error('Error reading file:', error);
        return;
    }
}

function buildInfo(info, ulElement) {
    for (let item of info) {
        let name = item.name;
        let description = item.description;
        let imageUrl = item.imageUrl;
        appendElement(name, description, imageUrl, ulElement);
    }
}

function appendElement(name, description, imageUrl, ulElement) {
        let itemDiv = document.createElement('li');
        itemDiv.className = 'result-item';
        itemDiv.innerHTML = `
            <div class="item-image">
                <img width=370 height=250 src="./images/${imageUrl}" alt="${name}" />
            </div>
            <div class="item-description">
                <h2>${name}</h2>
                <p>${description}</p>
            </div>
            <button>Add to Favorites</button>
        `;
        ulElement.appendChild(itemDiv);
}