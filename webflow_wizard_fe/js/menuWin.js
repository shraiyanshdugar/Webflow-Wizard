const normalBuyy = document.getElementById("normalBuy");
const randomPetBuy = document.getElementById("randomPetBuy");
const repeatBuy = document.getElementById("repeatBuy");
const addToWishlist = document.getElementById("addToWishlist");
const removeFromWishlist = document.getElementById("removeFromWishlist");

normalBuyy.addEventListener('click', normalBuyUtility);
randomPetBuy.addEventListener('click', randomPetBuyUtility);
repeatBuy.addEventListener('click', repeatBuyUtility);
addToWishlist.addEventListener('click', addToWishlistUtility);
removeFromWishlist.addEventListener('click', removeFromWishlistUtility);

function normalBuyUtility(){
    location.href = "../html/normalBuyWin.html"
}
function randomPetBuyUtility(){
    location.href = "../html/buyRandomPetsWin.html"
}
function repeatBuyUtility(){
    location.href = "../html/setFreeThenBuyWin.html"
}
function addToWishlistUtility(){
    location.href = "../html/addToWishlist.html"
}