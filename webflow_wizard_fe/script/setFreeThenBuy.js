const puppeteer = require('puppeteer');
const { checkURL, delay}= require('./supportFunc')

var checkUser = document.querySelector('#checkUser');
var stopScriptsOnErr = document.querySelector('#stopTheScripts');
var maxValueCheck = document.querySelector('#maxValueErr');
var maxValueReached = document.querySelector('#maxValueReached');

var i =0;
var browser
var oldPetValue = 0
var currPetValue = 0
var interval
var maxValueToGo = 0

var userId = ''
var userPass = ''
var petId = 0
const site_id = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com';
var petURL = ''

const stopSetFreeThenBuy = (async() => {
    clearInterval(interval);
    try {
        browser.close()
    }
    catch(e) {console.log('Engine is not running')};
    // to implement first script i.e. first user will buy in last
    await new Promise(r => setTimeout(r, 2000));
});

const buyFreeRepeat = (async (arg)  => { 
    checkUser.style = "display: none";
    maxValueCheck.style = "display: none";
    maxValueReached.style = "display: none";

    userId = arg.email;
    userPass = arg.password.toString();
    petId = arg.pet_uid;
    maxValueToGo = Number(arg.maxValueToGo)
    petURL = "https://www.tagged.com/apps/pets.html?ll=pysb_home_mm&uid=6103180012#/pet/" + petId;

    const clickingUtility = (async() => {
        try {
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > div.id-container-buttons.id-info-endButtons > button').catch(err => {console.log('buy clck err')});
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > div.id-container-confirm.tag-state-hidden > div.confirm-buttons.clearfix > input.confirm.id-button-buy.btn.btn-buy.greenBtn').catch(err => {console.log('cnf buy clck err')});
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > div.id-container-confirm.tag-state-hidden > div.confirm-buttons.clearfix > input.confirm.id-button-new-price.btn.btn-buy.greenBtn').catch(err => {console.log('new price btn clck err')});
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > div.id-container-confirm.tag-state-hidden > div.confirm-buttons.clearfix > input.confirm.id-button-buy.btn.btn-buy.greenBtn').catch(err => {console.log('new price rebuy clck err')});
            // set free
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > span.id-container-buttons.id-info-valueButtons > a').catch(err => {console.log('set free clck err')})
        } catch (err) {
            console.log("Error buying pet")
        }
    });
    

    const restrictComponents = (page) => {
        console.log("restrict Components");
        page.on('request', (req) => {
            if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image') {
                req.abort();
            } else {
                req.continue();
            }
        })
    }

    const loginTag = (async(page) => {
        console.log("Login Tag")
        const firstName = await page.$("#username");
        await firstName.focus();
        await firstName.type(userId);
        const password = await page.$("#password");
        await password.focus();
        await password.type(userPass);
        await page.click('#signInBtn');
        console.log(await checkURL(page));
        if(await checkURL(page) === -1){
            console.log('Closing user ');
            checkUser.style = "display: inline";
            stopScriptsOnErr.click();
            // post in log as email or pwd invalid
        };
    });

    const gotoSite = (async(page, site_to_go) =>{
        await console.log('Goto Site');
        try {
            await page.goto(site_to_go, { waitUntil: 'networkidle2' });
        } catch (err) {
            console.log("Unable to reach page");
        }
    });

    const getCurrentPetValue = (async (page, oldPetValue, currPetValue) => {

        currPetValue = await page.evaluate(() => {
            return document.querySelector('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > ul.id-container-details > li:nth-child(1) > span > span > span').title;
        });
        currPetValue = Number(currPetValue.replace(/[^0-9.-]+/g, ""));
        if (oldPetValue === currPetValue) {
            return;
        }
        if (oldPetValue < currPetValue) {
            i += 1;
            oldPetValue = currPetValue;
            console.log(i + " " + currPetValue);
            return currPetValue;
        }
    })
    
    const functionForPetBuy = (async (page, oldPetValue, currPetValue) => {
        currPetValue = await getCurrentPetValue(page, i, oldPetValue, currPetValue);
        if(currPetValue < maxValueToGo){
            await clickingUtility();
        }
        else{
            console.log('Pet value reached required value, exiting');
            maxValueReached.style = "display: inline";
            await stopSetFreeThenBuy();
        }
    })

    const run1 = (async (page, oldPetValue, currPetValue)  => {
        if(currPetValue < maxValueToGo){
            interval = setInterval(functionForPetBuy, 1000, page, oldPetValue, currPetValue);
        }
        else{
            maxValueCheck.style = "display: inline";
            console.log('Pet Value less than amount entered.');
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
    await gotoSite(page, site_id);
    await loginTag(page);
    
    // Reopening page instance
    page.close();
    page = await browser.newPage();
    await page.setRequestInterception(true);
    await restrictComponents(page)

    // Getting to specific pet url
    await gotoSite(page, petURL);

    // Get current value of pet
    currPetValue = await getCurrentPetValue(page, 0, oldPetValue, currPetValue);
    
    // actual main part
    // he confirmation prompt is triggered by the global function confirm(<string>) 
    // which is at window.confirm. That function freezes the execution of the script 
    // until a response is given, then returns it to the caller. If the user accepts 
    // the prompt the returned value will be true.
    // So before running the action that triggers the confirmation window run
    // await page.evaluate(`window.confirm = () => true`)

    // start buying pets
    await run1(page, oldPetValue, currPetValue);
});


// buyFreeRepeat()
module.exports = {stopSetFreeThenBuy, buyFreeRepeat}
