const {contextBridge} = require('electron')
const {ipcRenderer} = require('electron')

const emails = require("./JSON/addEmailPass.json");
const fs = require("fs");

console.log('preload.js');


contextBridge.exposeInMainWorld(
    'normalBuy', {
        tryFunc: async(arg) => {
            console.log('normalBuy ok');
            console.log(arg);
        },
        // login info
        setLoginInfo : async (arg) => {
            console.log(arg);
            ipcRenderer.sendSync('loginInfo', arg)
        },
        // normal buy
        setDataNormalBuyPreload1: async(arg, siteName1) => {
            console.log(siteName1);
            const {engine1} = require('./script/normalBuy1/normalBuy1')
            const {engine2} = require('./script/normalBuy1/normalBuy2')
            engine1(arg)
            engine2(arg)
            
        },
        haltScriptsNormalBuyPreload1: async(arg, siteName1) => {
            console.log(arg);
            console.log(siteName1);
            const {stopScript1} = require('./script/normalBuy1/normalBuy1')
            const {stopScript2} = require('./script/normalBuy1/normalBuy2')
            stopScript1(arg)
            stopScript2(arg)
        },
        setDataNormalBuyPreload2: async(arg, siteName2) => {
            console.log(siteName2);
            const {engine1} = require('./script/normalBuy1/normalBuy1')
            const {engine2} = require('./script/normalBuy1/normalBuy2')
            engine1(arg)
            engine2(arg)
        },
        haltScriptsNormalBuyPreload2: async(arg, siteName2) => {
            console.log(arg);
            console.log(siteName2);
            const {stopScript1} = require('./script/normalBuy1/normalBuy1')
            const {stopScript2} = require('./script/normalBuy1/normalBuy2')
            stopScript1(arg)
            stopScript2(arg)
        },
        setDataNormalBuyPreload3: async(arg, siteName3) => {
            console.log(siteName3);
            const {engine1} = require('./script/normalBuy1/normalBuy1')
            const {engine2} = require('./script/normalBuy1/normalBuy2')
            engine1(arg)
            engine2(arg)
        },
        haltScriptsNormalBuyPreload3: async(arg, siteName3) => {
            console.log(arg);
            console.log(siteName3);
            const {stopScript1} = require('./script/normalBuy1/normalBuy1')
            const {stopScript2} = require('./script/normalBuy1/normalBuy2')
            stopScript1(arg)
            stopScript2(arg)
        },

        // buy random pets
        setBuyRandomPets: async(arg, siteName) => {
                const {buyRandomPet} = require('./script/buyRandomPetsScript');
                console.log(arg);
                console.log(siteName);
                buyRandomPet(arg);
        },
        haltScriptBuyRandomPetPreload: async(arg, siteName) => {
                const {stopBuyRandomPet} = require('./script/buyRandomPetsScript');
                console.log(arg);
                console.log(siteName);
                stopBuyRandomPet(arg);
        },

        // set free then buy
        setFreeThenBuyPreload: async(arg,siteName) => {
            const {buyFreeRepeat} = require('./script/setFreeThenBuyMobile')
            console.log(arg);
            console.log(siteName);
            buyFreeRepeat(arg);
        },
        haltScriptsetFreeThenBuyPreload: async(arg, siteName) => {
            const {stopScript} = require('./script/setFreeThenBuyMobile')
            console.log(arg);
            console.log(siteName);
            stopScript();
            
        },

        // wishlist
        setAddToWishlist: async(arg, siteName) => {
            const {parentFunc} = require('./script/wishlist/wishlistParent')
            console.log(arg);
            console.log(siteName);
            // parentFunc(pet_id, file_path);
            parentFunc(arg);
        },
        // halt not work for this
        // haltsetAddToWishlist: async(arg, siteName) => {
        //     const {stopScript} = require('./script/wishlist/wishlistParent')
        //     console.log(arg);
        //     console.log(siteName);
        //     // have to make it
        //     stopScript();
            
        // },
        
        // read json and display 
        emailPasswordInfo : emails,
        // for updating json file
        updateEmailPassword: (emails)=> {
            fs.writeFile("./JSON/addEmailPass.json", JSON.stringify(emails), err=> {
                if(err) throw err;
                console.log("OK");
            });
        },
    }
)