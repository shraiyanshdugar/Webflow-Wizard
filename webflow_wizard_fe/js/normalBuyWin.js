// Site Selection
// Instance 1
var getSiteT1 = document.querySelector('#taggedInstance1');
var getSiteH1 = document.querySelector('#hi5Instance1');
var siteName1 = "Tagged";
getSiteH1.addEventListener('click', () => {siteName1 = "Hi5"; console.log(siteName1); })
getSiteT1.addEventListener('click', () => {siteName1 = "Tagged"; console.log(siteName1);})

// Instance 2
var getSiteT2 = document.querySelector('#taggedInstance2');
var getSiteH2 = document.querySelector('#hi5Instance2');
var siteName2 = "Tagged";
getSiteH2.addEventListener('click', () => {siteName2 = "Hi5"; console.log(siteName2); })
getSiteT2.addEventListener('click', () => {siteName2 = "Tagged"; console.log(siteName2);})

// Instance 3
var getSiteT3 = document.querySelector('#taggedInstance3');
var getSiteH3 = document.querySelector('#hi5Instance3');
var siteName3 = "Tagged";
getSiteH3.addEventListener('click', () => {siteName3 = "Hi5"; console.log(siteName3); })
getSiteT3.addEventListener('click', () => {siteName3 = "Tagged"; console.log(siteName3);})



const btnRunBothScripts1 = document.getElementById('btnRunBothScripts1')
const btnRunBothScripts2 = document.getElementById('btnRunBothScripts2')
const btnRunBothScripts3 = document.getElementById('btnRunBothScripts3')
btnRunBothScripts1.addEventListener('click', launchScriptsUtility1)
btnRunBothScripts2.addEventListener('click', launchScriptsUtility2)
btnRunBothScripts3.addEventListener('click', launchScriptsUtility3)
const stopTheScript1 = document.getElementById('stopTheScripts1')
const stopTheScript2 = document.getElementById('stopTheScripts2')
const stopTheScript3 = document.getElementById('stopTheScripts3')
stopTheScript1.addEventListener('click', stopScriptsUtility1);
stopTheScript2.addEventListener('click', stopScriptsUtility2);
stopTheScript3.addEventListener('click', stopScriptsUtility3);


function stopScriptsUtility1(e) {
    console.log('Stopping script 1');
    const changeRunBtn1 =  document.getElementById("btnRunBothScripts1");
    changeRunBtn1.value = "Run Engine"
    e.preventDefault()
    window.normalBuy.haltScriptsNormalBuyPreload1('Stopping scripts 1 in preload', siteName1);
}
function stopScriptsUtility2(e) {
    console.log('Stopping script 2');
    const changeRunBtn2 =  document.getElementById("btnRunBothScripts2");
    changeRunBtn2.value = "Run Engine"
    e.preventDefault()
    window.normalBuy.haltScriptsNormalBuyPreload2('Stopping scripts 2 in preload', siteName2);
}
function stopScriptsUtility3(e) {
    console.log('Stopping script 3');
    const changeRunBtn3 =  document.getElementById("btnRunBothScripts3");
    changeRunBtn3.value = "Run Engine"
    e.preventDefault()
    window.normalBuy.haltScriptsNormalBuyPreload3('Stopping scripts 3 in preload', siteName3);
}

function launchScriptsUtility1(e) {

    console.log("First")
    const changeRunBtn1 = document.getElementById("btnRunBothScripts1");
    changeRunBtn1.value = "Running";
    e.preventDefault()
    const petIdValue = document.getElementById("petid1").value;
    const email1Value = document.getElementById("email11").value;
    const password1Value = document.getElementById("password11").value;
    const email2Value = document.getElementById("email21").value;
    const password2Value = document.getElementById("password21").value;
    const value = document.getElementById("maxValue1").value;
    const tagPriceListItem = document.getElementById("tagPriceListItem1").value;
    const lastBuyWith = document.getElementById("lastBuyerSelect1").value;

    const newValue = calculateNewValue(value, tagPriceListItem);
    console.log(newValue);
    var siteURL1 = '';
    if(siteName1 == "Tagged"){
        siteURL1 = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com'
        petURL1 = 'https://www.tagged.com/apps/pets.html?ll=pysb_home_mm&uid=6103180012#/pet/' + petIdValue
    }
    else{
        siteURL1 = ''
        petURL1 = ''
    }

    const data = {
        "user1": {
            "email": email1Value,
            "password": password1Value
        },
        "user2": {
            "email": email2Value,
            "password": password2Value
        },
        "pet_uid": petIdValue,
        "maxValueToGo": newValue,
        "lastBuyWithOpt": lastBuyWith,
        "siteURL": siteURL1,
        "petURL": petURL1
    }

    // setData - takes input data and send it to main to preload to json 
    // thn launches scripts
    
    console.log(data);
    window.normalBuy.setDataNormalBuyPreload1(data, siteName1);
}

function launchScriptsUtility2(e) {
    console.log("Second")
    const changeRunBtn2 =  document.getElementById("btnRunBothScripts2");
    changeRunBtn2.value = "Running"
    e.preventDefault()
    const petIdValue = document.getElementById("petid2").value;
    const email1Value = document.getElementById("email12").value;
    const password1Value = document.getElementById("password12").value;
    const email2Value = document.getElementById("email22").value;
    const password2Value = document.getElementById("password22").value;
    const value = document.getElementById("maxValue2").value;
    const tagPriceListItem = document.getElementById("tagPriceListItem2").value;
    const lastBuyWith = document.getElementById("lastBuy2").value;

    const newValue = calculateNewValue(value, tagPriceListItem);
    console.log(newValue);

    var siteURL2 = '';
    if(siteName2 == "Tagged"){
        siteURL2 = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com'
        petURL2 = 'https://www.tagged.com/apps/pets.html?ll=pysb_home_mm&uid=6103180012#/pet/' + petIdValue
    }
    else{
        siteURL2 = ''
        petURL2 = ''
    }

    const data = {
        "user1": {
            "email": email1Value,
            "password": password1Value
        },
        "user2": {
            "email": email2Value,
            "password": password2Value
        },
        "pet_uid": petIdValue,
        "maxValueToGo": newValue,
        "lastBuyWithOpt": lastBuyWith,
        "siteURL": siteURL2,
        "petURL": petURL2
    }

    // setData - takes input data and send it to main to preload to json 
    // thn launches scripts
    
    console.log(data);
    window.normalBuy.setDataNormalBuyPreload2(data, siteName2);
}

function launchScriptsUtility3(e) {
    console.log("Third")
    const changeRunBtn3 =  document.getElementById("btnRunBothScripts3");
    changeRunBtn3.value = "Running"
    e.preventDefault()
    const petIdValue = document.getElementById("petid3").value;
    const email1Value = document.getElementById("email13").value;
    const password1Value = document.getElementById("password13").value;
    const email2Value = document.getElementById("email23").value;
    const password2Value = document.getElementById("password23").value;
    const value = document.getElementById("maxValue3").value;
    const tagPriceListItem = document.getElementById("tagPriceListItem3").value;
    const lastBuyWith = document.getElementById("lastBuy3").value;

    const newValue = calculateNewValue(value, tagPriceListItem);
    console.log(newValue);

    var siteURL3 = '';
    if(siteName3 == "Tagged"){
        siteURL3 = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com'
        petURL3 = 'https://www.tagged.com/apps/pets.html?ll=pysb_home_mm&uid=6103180012#/pet/' + petIdValue
    }
    else{
        siteURL3 = ''
        petURL3 = ''
    }

    const data = {
        "user1": {
            "email": email1Value,
            "password": password1Value
        },
        "user2": {
            "email": email2Value,
            "password": password2Value
        },
        "pet_uid": petIdValue,
        "maxValueToGo": newValue,
        "lastBuyWithOpt": lastBuyWith,
        "siteURL": siteURL3,
        "petURL": petURL3
    }

    // setData - takes input data and send it to main to preload to json 
    // thn launches scripts
    
    console.log(data);
    window.normalBuy.setDataNormalBuyPreload3(data, siteName3);
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