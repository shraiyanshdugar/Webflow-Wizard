 var fs = require("fs");
var data=fs.readFile("s.js","utf-8", function(err, buf) {
    


    const crypto = require('crypto');
    const algorithm = 'aes-256-cbc';
    /*  const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    console.log(key)
    console.log(iv) */

    const key =  Buffer.from('writesomethingof32lettersinthisb');
    const iv=  Buffer.from("abcdefghijklmnop")
    
    function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc',Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }
      
    function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
    }
    
    
    
      
     var gfg = encrypt(buf);
     console.log(gfg)
     fs.writeFile('encryptedcalltesting.js',gfg.encryptedData , function (err) {
        if (err) throw err;
        else
        {
         
          console.log('File is created successfully.');
       
        }
        
       
      });
     console.log(decrypt(gfg)); 





  });

