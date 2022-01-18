console.log('Clientside JS is loaded!') //Just to let me know!

const weatherForm = document.querySelector('form');     //Only have one form and input so can select by elemeny type.
const searchTerm = document.querySelector('input');
const msgOne= document.querySelector('#msgOne');        //Using # in a query selector selects by ID.
const msgTwo= document.querySelector('#msgTwo');
const msgThree= document.querySelector('#msgThree');

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()      //e means event, preventDefault prevents the page from refreshing.

    msgOne.innerHTML = 'Loading...'     //Called before fetch but after submit.
    msgTwo.innerHTML = ''               //Clears any previous location data upon a new search.
    msgThree.innerHTML = ''

    fetch(`http://localhost:3000/weather?address=${searchTerm.value}`).then((response) => {
    response.json().then((data) => {
        if (data.error) { 
            msgOne.innerHTML = data.error;
        } else {
            msgOne.innerHTML = 
            `${data.location}`;
            
            msgTwo.innerHTML = 
            `${data.weather}.<br><br>
            Temperature: ${data.temperature}°c.<br><br>
            Feels like: ${data.feelsLike}°c.<br><br>`

            msgThree.innerHTML = 'This location not quite right? Try refining your search...'
            
        }
    })
})
})