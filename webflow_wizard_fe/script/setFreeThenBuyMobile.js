const puppeteer = require('puppeteer');
const {checkURLMobile} = require('./supportFunc')
const {calculateNewValue} = require('./digitValueToShort')
var checkUser = document.querySelector('#checkUser');
var stopScriptsOnErr = document.querySelector('#stopTheScripts');
var maxValueCheck = document.querySelector('#maxValueErr');
var maxValueReached = document.querySelector('#maxValueReached');
var displayCurrPetValue = document.querySelector('#currentValue');


var browser
var oldPetValue = 0
var currPetValue = 0
var interval
var maxValueToGo = 0

var userId = ''
var userPass = ''
var petId = 0
var siteURL = ''
var petURL = ''


const stopScript = (async() => {
    clearInterval(interval);
    try {
        browser.close()
    }
    catch(e) {console.log('Engine is not running')};
    // to implement first script i.e. first user will buy in last
    await new Promise(r => setTimeout(r, 2000));
});



const buyFreeRepeat = (async (arg)  => { 

    // turn off any prev error
    checkUser.style = "display: none";
    maxValueCheck.style = "display: none";
    maxValueReached.style = "display: none";
    
    oldPetValue = Number(0);
    userId = arg.email;
    userPass = arg.password.toString();
    petId = arg.pet_uid;
    maxValueToGo = Number(arg.maxValueToGo)
    siteURL = arg.siteURL;
    petURL = arg.petURL;

    petURL = 'https://m.tagged.com/pets/ownedpets.html';

    const wait = (duration) => { 
        console.log('waiting', duration);
        return new Promise(resolve => setTimeout(resolve, duration)); 
      };

    const clickingUtility = (async(page, j) => {
        try {
            console.log("Inside click");
            await page.click('body > div.ui-page.ui-body-c.ui-page-active > div.ui-content > div > div:nth-child(' + String(j) + ') > div:nth-child(4) > div > a > span').catch(err => {console.log('buy again clck err')});
            await wait(1000);
            await page.click('body > div.ui-page.ui-body-c.ui-page-active > div.ui-content > div > div.buyentry.id-entry > div:nth-child(4) > div:nth-child(2) > a.id-buy-again-confirm.green.ui-btn.ui-shadow.ui-btn-corner-all.ui-mini.ui-btn-up-c > span').catch(err => {console.log('Buy now clck err')});
            console.log("Clicks done")
        } catch (err) {
            console.log("Error buying pet")
        }
    }); 
    

    const restrictComponents = (page) => {
        console.log("restrict Components");
        page.on('request', (req) => {
            if ( req.resourceType() == 'font' || req.resourceType() == 'image') {
                req.abort();
            } else {
                req.continue();
            }
        })
    }

    const loginTag = (async(page) => {
        console.log("Login Tag")
        const firstName = await page.$('[name="username"]');
        await firstName.focus();
        await firstName.type(userId);
        const password = await page.$('[name="password"]');
        await password.focus();
        await password.type(userPass);
        await page.click('#index-mobile2-sign-in > div:nth-child(2) > div > form > div > div:nth-child(4) > button');
        if(await checkURLMobile(page) !== 1){
            console.log('closing user');
            checkUser.style = "display: inline";
            stopScriptsOnErr.click();
            // post in log as email or pwd invalid
        }
        else{
            console.log("Promise success");
            return;
        }
    });

    const gotoSite = (async(page, site_to_go) =>{
        await console.log('Goto Site');
        try {
            await page.goto(site_to_go, { waitUntil: 'networkidle2' });
        } catch (err) {
            console.log("Unable to reach page");
        }
    });

    const getCurrentPetValue = (async (page, oldPetValue, currPetValue, j) => {
        console.log("Lvl 1 " + j);
        console.log("Getting current value of pet.")
        currPetValue = await page.evaluate((j) => {
            return document.querySelector('body > div.ui-page.ui-body-c.ui-page-active > div.ui-content > div > div:nth-child(' + String(j) + ') > div:nth-child(4) > ul > li:nth-child(2) > span > span > span').title;
        }, j).catch(err => {console.log('Error get current pet value')});

        currPetValue = Number(currPetValue.replace(/[^0-9.-]+/g, ""));
        if (oldPetValue === currPetValue) {
            return;
        }
        
        if (Number(oldPetValue) < currPetValue) {
            i += 1;
            oldPetValue = currPetValue;
            console.log("old", oldPetValue);
            console.log(i + " " + currPetValue);
            var valueInNomen = calculateNewValue(currPetValue);
            displayCurrPetValue.innerHTML = "Current Pet value: " + valueInNomen;
            console.log(displayCurrPetValue);
            return currPetValue;
        }

        // Display current pet value
    })
    
    const functionForRepeatPetBuy = (async (page, j) => {
        currPetValue = await getCurrentPetValue(page, oldPetValue, currPetValue, j);
        if(currPetValue < maxValueToGo){
            await clickingUtility(page, j);
        }
        else{
            console.log('Pet value reached required value, exiting');
            maxValueReached.style = "display: inline";
            await stopScript();
        }
    }) 

    const run = (async (page, j, oldPetValue, currPetValue)  => {
        if(currPetValue < maxValueToGo){
            interval = setInterval(functionForRepeatPetBuy, 1000, page, j);
        }
        else{
            maxValueCheck.style = "display: inline";
            console.log('Pet value less than amount entered.');
            stopScriptsOnErr.click();
        }
    }) 

    // setting up environment for puppeteer
    var page;
    browser = await puppeteer.launch({headless: false});
    page = await browser.newPage();

    await page.setRequestInterception(true);
    // restrict unneeded components
    await restrictComponents(page)

    // Opening Tagged and Logging In
    await gotoSite(page, siteURL);
    await loginTag(page);
    // await page.waitForNavigation();
    console.log("Login done, closing now")
    // Reopening page instance
    page.close();
    page = await browser.newPage();
    await page.setRequestInterception(true);
    await restrictComponents(page)

    // Getting to specific pet url
    await page.goto(petURL)

    let inc=0
    let previousHeight;
    while (inc<10) {
      try {
        previousHeight = await page.evaluate('document.body.scrollHeight')
        console.log(previousHeight)
        await page.evaluate('window.scrollTo(0, 50000)')
        await wait(300);
        inc+=1;
      } catch (e) {
        console.log(e)
        console.log('Scroll End Page')
        break
      }
    }


    const allpets = await page.evaluate(() => {
         return document.getElementsByClassName("petentry id-entry")
     });
     let i = 0;
     for (i in allpets){
        i++;
     }
     console.log(allpets);
     console.log("Total available pets: "+ i);
     console.log("Above are all pets available")

     const getdata_uid = (async(page, i) => {
         var address = 'body > div.ui-page.ui-body-c.ui-page-active > div.ui-content > div > div:nth-child(' + String(i) + ')'
         
        return await page.evaluate(function (address) {
            return document.querySelector(address).getAttribute("data-uid");
        }, address);
     })

    var petFound = false;
    var j;

    for (j = 1; j<=i; j++){
        var petAddress = await getdata_uid(page, j);
        if(petAddress == petId){
            petFound = true;
            console.log("Requested pet address is " + petAddress);
            break;
        }
        // console.log(await getdata_uid(page, j) + " " + j);
    }
    if(!petFound){
        console.log("Requested pet not found");
    }
    console.log("For testing, type of data is: " + typeof(await getdata_uid(page, 1)));

    currPetValue = await getCurrentPetValue(page, oldPetValue, currPetValue, j); 
    console.log("Current value of pet is:" + currPetValue);

    // start buying pets
    if(petFound){
        console.log('Starting engine');
        await run(page, j, oldPetValue, currPetValue);
        // await run1(page, oldPetValue, currPetValue); 
    }
    else{
        console.log("No pet found with requested pet id");
    }
});


// const data = {
//     "email":"kk.aa.kk@yandex.com",
//     "password": "12345678",
//     "pet_uid": "7474452273",
//     "maxValueToGo": "newValue",
// }

// buyFreeRepeat(data)

module.exports = {buyFreeRepeat, stopScript}