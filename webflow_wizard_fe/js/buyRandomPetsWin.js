// Site Selection
var getSiteT = document.querySelector('#taggedInstance');
var getSiteH = document.querySelector('#hi5Instance');
var siteName = "Tagged";
getSiteH.addEventListener('click', () => {siteName = "Hi5"; console.log(siteName); })
getSiteT.addEventListener('click', () => {siteName = "Tagged"; console.log(siteName );})


const startScript = document.getElementById('btnRunScript')
const stopTheScript = document.getElementById('stopTheScripts')

startScript.addEventListener('click', launchScriptsUtility)

stopTheScript.addEventListener('click', stopScriptsUtility);

function stopScriptsUtility(e) {
    console.log('Stopping scripts');
    e.preventDefault()
    window.normalBuy.haltScriptBuyRandomPetPreload('Stopping scripts in preload', siteName);
}

function launchScriptsUtility(e) {
    e.preventDefault()
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;
    var siteURL = '';
    var petPageURL = '';
    if(siteName == "Tagged"){
        siteURL = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com';
        petPageURL = 'https://www.tagged.com/apps/pets.html?dataSource=Pets&ll=nav#buy/';
    }
    else{
        siteURL = '';
        petPageURL = '';
    }

    const data = {
        "email": emailValue,
        "password": passwordValue,
        "siteURL": siteURL,
        "petPageURL": petPageURL
    }
    console.log(data);

    // setData - takes input data and send it to main to preload to json 
    // thn launches scripts
    // window.normalBuy.tryFunc(data);
    window.normalBuy.setBuyRandomPets(data, siteName);
}