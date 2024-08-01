const puppeteer = require('puppeteer');
const { checkURL, delay}= require('../supportFunc')

var displayCurrOwner = document.querySelector('#currentOwner1');
var user1Check = document.querySelector('#user1err1');
var stopScriptsOnErr = document.querySelector('#stopTheScripts1');
var maxValueCheck = document.querySelector('#maxValueErr1');
var maxValueReached = document.querySelector('#maxValueReached1');
var accountError1 = document.querySelector('#accountError1');

i =0;
var oldPetValue = 0
var currPetValue = 0
var interval
var maxValueToGo = 0

var userId = '';
var userPass = '';
var petId = 0;
var lastBuyWith = ''
var browser;
var siteURL = '';
var petURL = ''

const stopScript1 = (async(lastBuyWith) => {
    clearInterval(interval);
    try {
        browser.close()
    }
    catch(e) {console.log('Engine 1 is not running')};
    // to implement first script i.e. first user will buy in last
    await new Promise(r => setTimeout(r, 2000));
    if(lastBuyWith == 'First Buyer'){
        await clickingUtility();
        console.log('Last brought by first buyer')
    }
});

const engine1 = (async (arg)  => { 
    // turn off any prev error
    user1Check.style = "display: none";
    maxValueCheck.style = "display: none";
    maxValueReached.style = "display: none";

    userId = arg.user1.email;
    userPass = arg.user1.password.toString();
    petId = arg.pet_uid;
    maxValueToGo = Number(arg.maxValueToGo)
    lastBuyWith = arg.lastBuyWithOpt
    siteURL = arg.siteURL
    petURL = arg.petURL

    const getOwnerName = (async() => {
        var currOwner = "";
        currOwner = await page.evaluate(() => {
            return document.querySelector('#pet-page > div.id-container-profile > div.pet-page.id-container-owner.right-column > div.user-info > h2 > a').innerHTML;
        });
        // console.log(currOwner);
        displayCurrOwner.innerHTML = "Current Owner: " + currOwner; 
        // console.log(displayCurrOwner);
    })

    console.log(arg);
    const clickingUtility = (async() => {
        try {
            await page.click('button.id-button-yes:nth-child(1)').catch(err => {});
            await page.click('input.confirm:nth-child(3)').catch(err => {});
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > div.id-container-confirm.tag-state-hidden > center > input').catch(err => {});
            await page.click('#pet-page > div.id-container-profile > div.pet-page.id-container-pet.left-column > div.user-info > div.id-container-pet-info > div.id-container-confirm.tag-state-hidden > div.confirm-buttons.clearfix > input.confirm.id-button-new-price.btn.btn-buy.greenBtn').catch(err => {});
            await getOwnerName();
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
            console.log('closing user 1');
            user1Check.style = "display: inline";
            stopScriptsOnErr.click();
            // post in log as email or pwd invalid
        };
        if(await checkURL(page) === 0){
            console.log("Account problem, closing instance, relogin");
            accountError1.style = "display: inline";
            stopScriptsOnErr.click();
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
            await stopScript1(lastBuyWith);
        }
    })

    const run1 = (async (page, oldPetValue, currPetValue)  => {
        if(currPetValue < maxValueToGo){
            await getOwnerName();
            interval = setInterval(functionForPetBuy, 500, page, oldPetValue, currPetValue);
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
    await gotoSite(page, siteURL);
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

    // start buying pets
    await run1(page, oldPetValue, currPetValue);
});


module.exports = {engine1, stopScript1}
