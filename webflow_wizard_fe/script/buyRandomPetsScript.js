// existing errors:
// have to set errors/warnings
// working when requires not used, but other things will not work 

const puppeteer = require('puppeteer');
const { checkURL, delay }= require('./supportFunc')

var userCheck = document.querySelector('#userErr');

var page;
var browser;
var i = 0, j = 0;
var interval
var buyBtnNeedlessClcks = 0
var catchError = 0;
var exitTime = false;

var timeStart;
var timeEnd;

var userId = ''
var userPass = ''
var ticker = 0;

var siteURL = '';
var petPageURL = '';

timeStart = performance.now();

const stopBuyRandomPet = (async (arg, i) => {
    console.log(arg);
    console.log('clearing interval');
    browser.close();
    timeEnd = performance.now();
    console.log(timeEnd - timeStart + " msec");
    console.log((timeEnd - timeStart) / 1000 + " sec");
    console.log((timeEnd - timeStart) / 60000 + " min");
    console.log("from stop script " + i)
    clearInterval(interval);
    i = 0;
})

const buyRandomPet = (async (arg) => {
    userCheck.style = "display: none";

    userId = arg.email;
    userPass = arg.password.toString();
    siteURL = arg.siteURL;
    petPageURL = arg.petPageURL;
    

    const rejectRequestPattern = [
         "adservice.google.co.in",
         "adservice.google.com",
     ]

    const restrictComponents = (page) => {
        console.log("restrict Components");
        page.on('request', (req) => {
            if (req.resourceType() == 'stylesheet' || req.resourceType() == 'font' || req.resourceType() == 'image' || rejectRequestPattern.find((pattern) => req.url().match(pattern))) {
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
            console.log(userCheck);
            browser.close();
            userCheck.style = "display: inline";
            // post in log as email or pwd invalid
        };
    });

    // Initial page open


    const gotoSite = (async(page, site_to_go) =>{
        await console.log('Goto Site');
        try {
            await page.goto(site_to_go, { waitUntil: 'networkidle2' });
        } catch (err) {
            console.log("Unable to reach page");
        }
    });

    const eleToRestrict = [    '#navbar-top',
    '#topad',
    '#alerts_toast_container',
    '#buy-page > div:nth-child(1)',
    '#buyPetsAd',
    '.thefooter',
    '#cashruns-page',
    '#header',
    '#achievements-page',
    '#rankings-page',
    '#pet-page',
    '#spinHistory-page',
    '#home-page',
    '#browse-page',
    '#pets3 > div.id-widget-getGold']
    let len = eleToRestrict.length;
    // for this, looping not working as normal, so if prb occurs, set set doc.qs().rmv() for each 
    // of ele to restrict
    const clearExtraElements = (async() => {
        console.log(len);
        await page.evaluate(() => {
            try{
                console.log('asd')
                for (j = 0; j< len; j++){
                     document.querySelector(eleToRestrict[j]).remove();
                }
            }
            catch {
                console.log('some error')
            }
        })
    })

    const clickingUtility = (async() => {
        try {
            // not using clearExtraElements now, if error, start using it
            // await clearExtraElements()
            // continue btn
            await page.click("#buy-page > div > div.id-container-pet.ui-helper-clearfix > div.buypets.id-container-confirm.tag-state-hidden > center > input").catch(async (e) => {
                if(!e.message.match(/No node found/i)){
                    console.log(e.message)
                }
            })
            // wait and click yes 
            await page.click('.buypet-confirm-button').catch(async (e) => {console.log(e.message)})
            
            //wait and click buy now 
            await page.click('input.confirm:nth-child(3)').catch(async (e) => {console.log(e)})

            // check if "price is changed" displayed
            if(await page.$("#buy-page > div.id-module-buy.right-column > div.id-container-pet.ui-helper-clearfix > div.buypets.id-container-confirm.tag-state-hidden > div.confirm-buttons.clearfix > input.confirm.id-button-new-price.btn.btn-buy.greenBtn") !== null || await page.$("#buy-page > div.id-module-buy.right-column > div.id-container-pet.ui-helper-clearfix > div.buypets.id-container-confirm.tag-state-hidden > div.confirm-buttons.clearfix > input") !== null){
                // cancel button
                await page.click(".id-button-close").catch(async (e) => {if(!e.message.match(/Node is either/i)){
                    console.log(e.message)
                }})
                // no button
                await page.click(".buypet-confirm-button-nopad").catch(async (e) => {if(!e.message.match(/Node is either/i)){
                    console.log(e.message)
                }})
                ticker = 0;
                // console.log("price is changed")
            }
            else {
                ticker += 1;
                await gotoSite(page, petPageURL)
                if(ticker > 5){
                    ticker = 0;
                    console.log(i);     
                    await stopBuyRandomPet('ticker prblm', i)
                }
                console.log("price is not changed")
            }
            
        } catch (err) {
            console.log("Error buying pet")
            catchError += 1;
            if(catchError > 10){
                return await stopBuyRandomPet('from errors', i)
            }
        }
    })

    const functionforbuy = (async (page) => {
        i = i + 1;
        if(i <= 20){
            console.log(i);
            return await clickingUtility(page);
        }
    })

    const buy_pets = (async () => {
        interval = await setInterval(functionforbuy, 2000, page)
        console.log('from buy_pets' + i);
        return i;
    })
    
    browser = await puppeteer.launch({
        headless: false, 
        ignoreHTTPSErrors: true,
        args: [`--window-size=400,600`],
        // dumpio: true
    });

    // setting up environment for puppeteer
    page = await browser.newPage();
    await page.setRequestInterception(true);
    await restrictComponents(page);

    // Opening Tagged and Logging In
    await gotoSite(page, siteURL)
    await loginTag(page);

    // Reopening page instance to resolve some issue
    page.close();
    page = await browser.newPage();
    await page.setRequestInterception(true);
    await restrictComponents(page)

    await gotoSite(page, petPageURL)

    page.on('dialog', async dialog => {
        //get alert message
        console.log(dialog.message());
        //accept alert
        console.log(dialog.type());
        await dialog.dismiss()
    })

    console.log('here1')

    await page.evaluate(`window.confirm = () => true`)
    await clearExtraElements();
    await buy_pets();
});

module.exports = {buyRandomPet, stopBuyRandomPet}
