// Site Selection
var getSiteT = document.querySelector('#taggedInstance');
var getSiteH = document.querySelector('#hi5Instance');
var siteName = "Tagged";
getSiteH.addEventListener('click', () => {siteName = "Hi5"; console.log(siteName); })
getSiteT.addEventListener('click', () => {siteName = "Tagged"; console.log(siteName);})


const form = document.querySelector('form')
const stopTheScript = document.getElementById('stopTheScripts')

form.addEventListener('submit', launchScriptsUtility)

stopTheScript.addEventListener('click', stopScriptsUtility);

function stopScriptsUtility(e) {
    console.log('Stopping scripts');
    e.preventDefault()
    window.normalBuy.haltScriptsetFreeThenBuyPreload('Stopping scripts in preload', siteName);
}

function launchScriptsUtility(e) {
    console.log("as")
    e.preventDefault()
    const petIdValue = document.getElementById("petid").value;
    const email1Value = document.getElementById("email").value;
    const password1Value = document.getElementById("password").value;
    const value = document.getElementById("maxValue").value;
    const tagPriceListItem = document.getElementById("tagPriceListItem").value;

    const newValue = calculateNewValue(value, tagPriceListItem);
    console.log(newValue);

    if(siteName == "Tagged"){
        siteURL = 'https://m.tagged.com/login/sign-in';
        petURL = 'https://m.tagged.com/pets/ownedpets.html'
    }
    else{
        siteURL = '';
        petURL = '';
    }

    const data = {
        "email": email1Value,
        "password": password1Value,
        "pet_uid": petIdValue,
        "maxValueToGo": newValue,
        "siteURL": siteURL,
        "petURL": petURL
    }
    console.log(data);
    // setData - takes input data and send it to main to preload to json 
    // thn launches scripts
    window.normalBuy.setFreeThenBuyPreload(data, siteName);

}


function calculateNewValue(value, tagPriceListItem) {
    if (tagPriceListItem == '-'){
        return value;
    }
    else if(tagPriceListItem == 'M'){
        return (value * (10**6));
    }
    else if(tagPriceListItem == 'T'){
        return (value * (10**12));
    }
    else if(tagPriceListItem == 'Q'){
        return (value * (10**18));
    }
    else if(tagPriceListItem == 'S'){
        return (value * (10**24));
    }
    else if(tagPriceListItem == 'N'){
        return (value * (10**30));
    }
    else if(tagPriceListItem == 'U'){
        return (value * (10**36));
    }
    else if(tagPriceListItem == 'Td'){
        return (value * (10**42));
    }
    else if(tagPriceListItem == 'Qd'){
        return (value * (10**48));
    }
    else if(tagPriceListItem == 'Sd'){
        return (value * (10**54));
    }
    else if(tagPriceListItem == 'Nd'){
        return (value * (10**60));
    }
    else if(tagPriceListItem == 'Uv'){
        return (value * (10**66));
    }
    else if(tagPriceListItem == 'Tv'){
        return (value * (10**72));
    }
    else if(tagPriceListItem == 'Qv'){
        return (value * (10**78));
    }
    else if(tagPriceListItem == 'Sv'){
        return (value * (10**84));
    }
    else if(tagPriceListItem == 'Nv'){
        return (value * (10**90));
    }
}