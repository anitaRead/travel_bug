let redButton = document.querySelector("#red-button");
let amberButton = document.querySelector("#amber-button");
let greenButton = document.querySelector("#green-button");

let redList = document.querySelector("#red-list");
let amberList = document.querySelector("#amber-list");
let greenList = document.querySelector("#green-list");

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
