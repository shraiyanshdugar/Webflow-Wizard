var emailList=[]
window.normalBuy.emailPasswordInfo.forEach((val=>{
    emailList.push(val)
}))
console.log(typeof(emailList))


function add_row_by_value(val){

    var table = document.getElementById("data_table");
   var table_len = table.rows.length - 1;
   var row = (table.insertRow(table_len).outerHTML =
    "<tr id='row" +
    table_len +
    "'><td id='email_row" +
    table_len +
    "'>" +
    val.email +
    "</td><td id='password_row" +
    table_len +
    "'>" +
    val.password +
    table_len +
    " <input type='button' value='Delete' class='delete' onclick='delete_row(" + table_len + ")'></td></tr>");
  
   document.getElementById("emailTag").value = "";
   document.getElementById("passwordTag").value ="" ;
  
  }
  emailList.forEach((val)=>{
    
    add_row_by_value(val)
  })
  
  
  function delete_row(no) {
    var name = document.getElementById("email_row" + no).innerHTML;
    console.log(name)
     emailList = emailList.filter((item) => item.email !== name);
    console.log(emailList)
   document.getElementById("row" + no + "").outerHTML = "";
   window.normalBuy.updateEmailPassword(emailList)

  
  }
  
  function add_row() {
   var emailTag = document.getElementById("emailTag").value;
   var passwordTag = document.getElementById("passwordTag").value;
   let obj={"email":emailTag,"password":passwordTag}
   console.log(emailList)
   emailList.push(obj)
   console.log(emailList)
   window.normalBuy.updateEmailPassword(emailList)
  
   var table = document.getElementById("data_table");
   var table_len = table.rows.length - 1;
   var row = (table.insertRow(table_len).outerHTML =
    "<tr id='row" +
    table_len +
    "'><td id='email_row" +
    table_len +
    "'>" +
    emailTag +
    "</td><td id='password_row" +
    table_len +
    "'>" +
    passwordTag +
    table_len +
    " <input type='button' value='Delete' class='delete' style='margin-left: 2rem; padding: .20rem 1rem; outline: rgb(255, 255, 255) solid .01em; border: white 1em; background-color: #069A8E; color: #fff; font-size: 1rem; border-radius: .5rem; cursor: pointer; transition: .3s;' onclick='delete_row(" + table_len + ")'></td></tr>");
  
   document.getElementById("emailTag").value = "";
   document.getElementById("passwordTag").value = "";
   
  }