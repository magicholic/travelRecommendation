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
        for (let foundItem of foundList) {
            let info = result[foundItem];
            if (foundItem === 'countries') {
                for (let countryItem of info) {
                    buildInfo(countryItem.cities);
                }
            } else {
                buildInfo(info);
            }
        }

    } catch (error) {
        console.error('Error reading file:', error);
        return;
    }
}

function buildInfo(info) {
    for (let item of info) {
        let name = item.name;
        let description = item.description;
        let imageUrl = item.imageUrl;
        appendElement(name, description, imageUrl, 'results');
    }
}

function appendElement(name, description, imageUrl, elementId) {
    // Create a new div element for the item
        let itemDiv = document.createElement('div');
        itemDiv.className = 'result-item';
        itemDiv.innerHTML = `
            <div class="item-image">
                <img src="${imageUrl}" alt="${name}" />
            </div>
            <div.item-description>
                <h2>${name}</h2>
                <p>${description}</p>
            </div>
        `;
        // Append the item div to the results container
        let resultsContainer = document.getElementById(elementId);
        if (!resultsContainer) {
            console.error('Results container not found');
            return;
        }
        resultsContainer.appendChild(itemDiv);

}