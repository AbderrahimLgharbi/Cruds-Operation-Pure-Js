let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById("btnCreate");

// localStorage.removeItem("products")

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
    clearData();
    showData();
})

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

function showData() {
    let tableContent = '';

    for (let i = 0; i < data.length; i++) {
        tableContent += `
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
                        <td><input type="button" id="tablebtn" value="Delete" onClick="deleteProd(${i})"/></td>
    </tr>`;
    }

    document.getElementById("tbody").innerHTML = tableContent;
}


function deleteProd(indexOfprod) {
    let confirmDelete = window.confirm("are you sure");
    if (confirmDelete) {
        data.splice(indexOfprod, 1);
        localStorage.setItem("products", JSON.stringify(data));
        showData();
    }
    else {
        ;
    }
}

showData();