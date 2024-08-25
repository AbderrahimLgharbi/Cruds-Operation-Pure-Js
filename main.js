let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById("btnCreate");

function getPrice() {
    if (price.value != "") {
        let res = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = res;
        total.style.backgroundColor = "green"
    }
    else {
        total.innerHTML = "";
        total.style.background = "#a00d02";
    }
}