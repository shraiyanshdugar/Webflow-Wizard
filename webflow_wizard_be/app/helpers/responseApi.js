




 



 exports.success = (message, results, statusCode) => {
   console.log("is it working")
   const crypto = require('crypto');
   const key =  Buffer.from('writesomethingof32lettersinthisb');
   const iv=  Buffer.from("abcdefghijklmnop")
   
   function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc',Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };}

    let val = encrypt(JSON.stringify( {
      message,
      error: false,
      code: statusCode,
      results
    }))
    return val
  };
  
  /**
   * @desc    Send any error response
   *
   * @param   {string} message
   * @param   {number} statusCode
   */
  exports.error = (message, statusCode) => {
    // List of common HTTP request code
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
  
    // Get matched code
    const findCode = codes.find((code) => code == statusCode);
  
    if (!findCode) statusCode = 500;
    else statusCode = findCode;
  
    return {
      message,
      code: statusCode,
      error: true
    };
  };
  
  /**
   * @desc    Send any validation response
   *
   * @param   {object | array} errors
   */
  exports.validation = (errors) => {
    return {
      message: "Validation errors",
      error: true,
      code: 422,
      errors
    };
  };