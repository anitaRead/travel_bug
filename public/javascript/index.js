
let redButton = document.querySelector("#red-button");
let amberButton = document.querySelector("#amber-button");
let greenButton = document.querySelector("#green-button");

let redList = document.querySelector("#red-list");
let amberList = document.querySelector("#amber-list");
let greenList = document.querySelector("#green-list");

let countries = document.querySelectorAll(".recommended-list-item");

countries.forEach(function(country){
    let countryName = country.children[0].innerHTML;
    console.log(countryName);
    let url = `https://api.unsplash.com/search/photos/?query=${countryName}&page=1&per_page=1&client_id=K2ForJ_PYF0C2pa3D3UMURO7k3Gjde9FVcfVBMIdMgk`
    
    fetch(url)
    .then(response => response.json())
    .then(imageData => {
        let path = imageData.results[0].urls.regular.toString();
        country.style.backgroundImage = `url(${path})`;
    });
});

redButton.addEventListener("click", () => {
    amberList.style.display = "none";
    greenList.style.display = "none";

    if (redList.style.display == "none"){
        redList.style.display = "block";
    } else {
        redList.style.display = "none";
    }
    
})

amberButton.addEventListener("click", () => {
    redList.style.display = "none";
    greenList.style.display = "none";

    if (amberList.style.display == "none"){
        amberList.style.display = "block";
    } else {
        amberList.style.display = "none";
    }
    
})

greenButton.addEventListener("click", () => {
    amberList.style.display = "none";
    redList.style.display = "none";
    
    if (greenList.style.display == "none"){
        greenList.style.display = "block";
    } else {
        greenList.style.display = "none";
    }
    
})

// let usernameToggle = document.querySelector("#username-toggle");
// let usernameForm = document.querySelector("#username-form");

// usernameToggle.addEventListener("click", function() {
  
//   if(usernameForm.style.display == "none"){
//     usernameForm.style.display = "block";
//   } else {
//     usernameForm.style.display = "none";
//   }
// })




