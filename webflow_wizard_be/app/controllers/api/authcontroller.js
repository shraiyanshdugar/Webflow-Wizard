const {success,error,validation}= require("../../helpers/responseApi");
const {randsomstring}=require("../../helpers/common");
const {validationResult}=require("express-validator");
const bcrypt =require("bcryptjs");
const config = require("config");
const jwt =require("jsonwebtoken");
const User =require("../../models/user")
const Verification =require("../../models/verification");
const crypto =require("crypto")


const key =  Buffer.from('writesomethingof32lettersinthisb');
    var iv=  Buffer.from("abcdefghijklmnop")

function decrypt(text) {
  iv = Buffer.from(iv, 'hex');
  let encryptedText = Buffer.from(text, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString()
  }

 
  exports.login =async (req,res) => {

console.log("login has been called")


let som = decrypt(req.body.encryptedData)
som= JSON.parse(som)
const email=som.email;
const password= som.password
const macaddress = som.macaddress
console.log(email)
try{

  const user=await User.findOne({email: email.toLowerCase()});
  


  if(!user)
  return res.status(422).json(validation("invalid email"));
  let checkpassword =await bcrypt.compare(password,user.password);


  const createlog= async function(userid,address){
    console.log("user log info");
    return User.findByIdAndUpdate(
        userid,
        {
            $push:{
                loginfo :{
                timing: Date.now(),
                macaddress:address
                }
            }
        },
        { new: true, useFindAndModify: false }
    );
    
};
  console.log(checkpassword)
  if(checkpassword)
    {
      if(user.loggedin&&user.macaddress==macaddress)
      {
          
          console.log("he is permitted");
         createlog(user._id,user.macaddress);


         const payload = {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        };
    
        jwt.sign(
          payload,
          "somejwthiddentext",
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
    
            res
              .status(200)
              .json(success("Login success Bitches!!", { token }, res.statusCode));
          }
        );
        
          
      }
      else if(!user.loggedin&&user.macaddress=="imthereforyou"){
          console.log("new user");
          user.macaddress=macaddress;
          user.loggedin=true;
          user.save();
          createlog(user._id,user.macaddress);
          const payload = {
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          };
      
          jwt.sign(
            payload,
            "somejwthiddentext",
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
      
              res
                .status(200)
                .json(success("Login success Bitches!!", { token }, res.statusCode));
            }
          );
      }
    else{
      return res.status(404).json(error("password is wrong", res.statusCode));
    }
    
    }
      else{
        

        return res.status(404).json(error("password is wrong", res.statusCode));
      }
  
  

}

catch (err) {

 return res.status(500).json(error("Server error", res.statusCode));
}

  };
