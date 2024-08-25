let title = document.getElementById("title");
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


let data;

if (localStorage.products != null) {
    data = JSON.parse(localStorage.products);
}
else {
    data = [];
}

create.addEventListener("click", function () {
    let newData = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    data = [...data, newData];
    localStorage.setItem('products', JSON.stringify(data));
    console.log(data)
})