// Site Selection
// Instance
var getSiteT = document.querySelector('#taggedInstance');
var getSiteH = document.querySelector('#hi5Instance');
var siteName = "Tagged";
getSiteH.addEventListener('click', () => {siteName = "Hi5"; console.log(siteName); })
getSiteT.addEventListener('click', () => {siteName = "Tagged"; console.log(siteName);})


var btnParseAndRun = document.getElementById('btnRunScript');
btnParseAndRun.addEventListener('click', launchScriptsUtility);

function launchScriptsUtility(e) {

    console.log("First")
    const changeRunBtn = document.getElementById("btnRunScript");
    changeRunBtn.value = "Running";
    e.preventDefault()
    const petIdValue = document.getElementById("petid").value;
    var filePath = document.getElementById("filePath");
    var file = filePath.files[0];
    file = file.path
    console.log(petIdValue);
    console.log(file);

    var siteURL = '';
    if(siteName == "Tagged"){
        siteURL = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com'
    }
    else{
        siteURL = ''
    }

    const data = {
        "pet_uid": petIdValue,
        "siteURL": siteURL,
        "filePath": file
    }

    // setData - takes input data and send it to main to preload to json 
    // thn launches scripts
    
    console.log(data);
    window.normalBuy.setAddToWishlist(data, siteName);
}