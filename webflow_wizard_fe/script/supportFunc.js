function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }


const checkURL = (async(page) => {
    await delay(2000);
    const url = await page.url();
    console.log(url);
    if (url !== 'https://www.tagged.com/home.html?jli=1'){
        console.log('prblm in login');
        return -1;
    }
    else if (url === 'https://secure.tagged.com/account_info.html?field=editemail&eaId=149007802&bl=1'){
        console.log('acc prb');
        return -1;
    }
    else {
        console.log('login successful')
        return 1;
    }
    return 1;
})

const checkURLMobile = (async(page) => {
    await delay(2000);
    const url = await page.url();
    console.log(url);
    if (url !== 'https://m.tagged.com/meetme'){
        console.log('prblm in login, check username/pass');
        return -1;
    } 
    else if(url === 'https://m.tagged.com/account_info.html?field=editemail&eaId=149007802&bl=1'){
        return -1;
    }
    else {
        console.log('login successful')
        return 1;
    }
    return 1;
})


const checkPet = (async(page, petID) => {
    await delay(1000);
    const url = await page.url();
    console.log(url);
    var pet_url = 'https://www.tagged.com/apps/pets.html?ll=pysb_home_mm&uid=6103180012#/pet/' + petID;
    console.log(pet_url);
    if (url !== pet_url){
        console.log('Invalid pet id');
        return -1;
    }
    console.log('pet id ok');
    return 1;
})


module.exports = {checkURL, delay, checkPet, checkURLMobile};
