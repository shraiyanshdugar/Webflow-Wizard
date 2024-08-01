// WINDOWS NEEDED
// A - LOGIN Window
// B - TAGGED / HIKE AS MENU OPTIONS
//     BOTH MENU ITEMS WITH 4 OPTIONS
//     OPTION 1 - BASIC PET BUY WITH 2 IDS
//     OPTION 2 - ADD TO WISHLIST WITH MANY IDS
//     OPTION 3 - REMOVE HISTORY
//     OPTION 4 - RANDOM PET BUY


// const electron = require('electron');
'use strict'
const {app, electron, BrowserWindow, Menu, ipcMain, globalShortcut, getCurrentWindow } = require('electron');
const path = require('path');
const macaddress = require('macaddress')
const crypto = require('crypto')


let win
function createWindow() {

    
    win = new BrowserWindow({
        // frame: false,
        hasShadow: false,
        width: 1200,
        height: 730,
        // resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // win.loadFile('html/loginWin.html');
    win.loadFile('html/loginWin.html');
    win.webContents.openDevTools();

    const loginMenu = Menu.buildFromTemplate(loginMenuTemplate);
    Menu.setApplicationMenu(loginMenu);

    win.on('closed', () => {
        // win = null;
        app.quit();
    })
}


// after electron load all initial files, it will run

// shortcuts
app.whenReady().then(() => {
    createWindow()
    var reloadAll = ()=>{
        win.webContents.reload()
      }
    // var openDev = () => { win.webContents.openDevTools()};
    // var closeDev = () => {win.webContents.closeDevTools()};
    globalShortcut.register('F5', reloadAll);
    globalShortcut.register('CommandOrControl+R', reloadAll);
    // globalShortcut.register('F12', openDev);
});

// unregisted all shortcuts

app.on('will-quit', () => {
  
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })


// EXTRA stuff
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
   
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// for login 

ipcMain.on('loginInfo', (event, arg) => {
  // prints "ping"
  loginDataParse(arg)
  event.returnValue = 'returned form main'
})

var key = Buffer.from('writesomethingof32lettersinthisb');
var iv = Buffer.from("abcdefghijklmnop")


function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return {iv: iv.toString('hex'), encryptedData: encrypted.toString('hex')};
}


function decrypt(text) {
    iv = Buffer.from(iv, 'hex');
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString()
}

var token
const loginDataParse = (async (dat) => {
    var macAddress
    await macaddress.one(function (err, mac) {
        macAddress = mac
    });
    var axios = require('axios');
    var data = encrypt(JSON.stringify({"email": dat.userEmail, "password": dat.userPass, "macaddress": 12345678}));

    var config = {
        method: 'post',
        url: 'http://localhost:3000/api/auth/login',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data

    };

    axios(config).then(function (response) {

        console.log(typeof(response.data.encryptedData))
        let responseData = JSON.parse(decrypt(response.data.encryptedData))
        token = responseData.results.token
        console.log(token)

        if (! responseData.errors && responseData.message == "Login success Bitches!!") {
            win.loadURL(`file://${__dirname}/html/menuWin.html`);

        } else {
            console.log("some error")
        }

    }).catch(function (error) {
        console.log(error);
        // send warning to preload, preload to js file
    });
})





const loginMenuTemplate = [
    // {
    //     label: 'File',
    //     submenu: [
    //         {
    //             label: 'Contact Us',
    //             click() {
    //                 mailto: "taggedmail@gmail.com"
    //             }
    //         },
    //         {
    //             label: 'Exit',
    //             click() {
    //                 app.quit();
    //             }
    //         }
    //     ]
    // }
]

// // // SHORTCUTS
// if (process.env.NODE_ENV != 'production') {
//     loginMenuTemplate.push({
//         label: 'Developer Tools',
//         submenu: [
//             {
//                 label: 'Toggle DevTools',
//                 acclerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//                 click(item, focusedWindow) {
//                     focusedWindow.toggleDevTools();
//                 }
//             }
//         ]
//     });
// }


// ipcMain.on('loginInfo', (event, arg) => {
//     console.log(arg) // prints "ping"
//     loginDataParse("hi")
//     event.returnValue = 'returned form main'
//   })


// const loginDataParse = (async(dat) => {
//     console.log(dat)
//     var axios = require('axios');
//     var data = JSON.stringify({"email":"sdug@gmail.com","password":"121345","macaddress":"12345678","name":"hihiiii"});
    
//     var config = {
//       method: 'post',
//       url: 'http://localhost:3000/api/auth/login',
//       headers: { 
//         'Content-Type': 'application/json'
//       },
//       data : data
//     };
    
//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// })