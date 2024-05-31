function runProgram(){

    console.log('runProgram');
    //your code goes here
    countrySearch();
}


function makeCountryStats(country){
    
    let actualCountry = country[0];
    clearCards(actualCountry);
    console.log(country[0])
    let countryStats = document.querySelector('#country-stats');
    const statArray = ["Region","Subregion", "Population", "Capital", "Currencies", "Languages", ]
    for(const stat of statArray){
        let infoRow = document.createElement('div');
        infoRow.classList.add("info-rows");
        let info = document.createElement('div');
        info.classList.add("info")
        info.textContent = stat;
        infoRow.appendChild(info);

        let infoOutput = document.createElement('div');
        infoOutput.classList.add("info");
        let output = actualCountry[stat.toLowerCase()]
        console.log(output);

        //if stat.toLowercase === population
            //turn thr output into a string "3,345,345"

        if(stat.toLowerCase() === "population"){
            output = numberWithCommas(output);
        }


        if(typeof (output) === 'object' && !Array.isArray(output) && output !== null){
            if(stat === "Languages"){
            infoOutput.textContent =output[Object.keys(output)[0]];
            }
            if(stat === "Currencies"){
                let currencyObject = output[Object.keys(output)[0]]
                infoOutput.textContent = currencyObject[[Object.keys(currencyObject)[0]]]
            }


        }
        
        
        else{
            infoOutput.textContent = output
        }

        infoRow.appendChild(infoOutput);
        countryStats.appendChild(infoRow);

    }
}
// https://stackoverflow.com/questions/2901102/how-to-format-a-number-with-commas-as-thousands-separators
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
        makeCountryStats(countryData);
        updateHeader(countryData);

    }
    catch(error){
        console.log('Error fetching country data', error);
    }
}

function updateHeader(country){
    let actualCountry = country[0];
    let countryNameHeader = document.querySelector("#country-name")
    countryNameHeader.textContent = actualCountry.name.common

    let countryImageHeader = document.querySelector("#flag-sprite");
    countryImageHeader.src = actualCountry.flags.png;

}

// function displayCountry(countryData){
//     let countryName = document.querySelector('#country-card');
//     countryName.textContent = countryData[0].capital
    

function clearCards(){
    let info = document.querySelector("#country-stats");
    while(info.lastChild){
        info.removeChild(info.lastChild)
    }
}

// }


    document.addEventListener('DOMContentLoaded', runProgram);