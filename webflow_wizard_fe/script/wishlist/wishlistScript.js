const puppeteer = require('puppeteer');
var value = process.argv[2];

var page;
var user = JSON.parse(value)
console.log(user.email)
var buyed = false

var site_id = 'https://secure.tagged.com/secure_login.html?ver=2&loc=en_US&uri=http%3A%2F%2Fwww.tagged.com';
const pet_page_url = 'https://www.tagged.com/apps/pets.html?dataSource=Pets&ll=nav#/pet/' + user.pet_id;

const wishlist = (async () => {


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

    const clickToWishlist = async () => {
        await page.click(".id-button-wish").then(async () => {
            console.log("added to wishlist")
        }, async () => {
            const exists = await page.$eval(".id-button-remove-wish", () => true).catch(() => false)
            if (exists) {
                console.log("already in wish list")

            }
        })
    }

    const loginTag = (async (page) => {
        console.log("Login Tag")
        const firstName = await page.$("#username");
        await firstName.focus();
        await firstName.type(user.email);
        const password = await page.$("#password");
        await password.focus();
        const passs = user.password.toString();
        await password.type(passs);
        await page.click('#signInBtn');
    });

    const gotoSite = (async(page, site_to_go) =>{
        await console.log('Goto Site');
        try {
            await page.goto(site_to_go, { waitUntil: 'networkidle2' }).then(()=>{
                isVisited=2
            });
        } catch (err) {
            console.log("Unable to reach page");
            if(isVisited==2){
                await page.goto(site_to_go, { waitUntil: 'networkidle2' });
            }
            else{
                browser.close()
    
            }
    
        }
    });

    const browser = await puppeteer.launch({headless: false, ignoreHTTPSErrors: true, args: [`--window-size=600,700`]});

    // setting up environment for puppeteer
    page = await browser.newPage();
    await page.setRequestInterception(true);
    await restrictComponents(page);
    // Opening Tagged and Logging In
    await gotoSite(page, site_id)
    await loginTag(page)

    page.close();
    page = await browser.newPage();
    await page.setRequestInterception(true);
    await restrictComponents(page)

    await gotoSite(page, pet_page_url)
    await clickToWishlist()

    
    process.stdout.write(i.toString());
    await browser.close()
    process.stdout.write('complete again');
})

wishlist()


