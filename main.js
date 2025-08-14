getData();

async function getData() {
    let jsonFile = './travel_recommendation_api.json';
    try {
        let response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error('Network response was not ok'); 
        }
        let result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error reading file:', error);
        return;
    }
}