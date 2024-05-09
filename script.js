function runProgram(){

    console.log('runProgram');
    //your code goes here
    countrySearch();
}

function countrySearch(){
    const countryInputButton = document.querySelector('#search-button');
    countryInputButton.addEventListener('click', showCountry);
    
}

async function showCountry(){
    const countryInput = document.querySelector('#search-input');
    const countryInputValue = countryInput.value;

    const apiURL = `https://restcountries.com/v3.1/name/${countryInputValue}`;

    let countryData = null
    try{
        const response = await fetch(apiURL);
        console.log(response);
        if(response.ok === false){
            alert("Country not found. Check spelling.")
        }
        countryData = await response.json();
        console.log(countryData);
    }
    catch(error){
        console.log('Error fetching country data', error);
    }
}


    document.addEventListener('DOMContentLoaded', runProgram);