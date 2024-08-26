let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById("btnCreate");
let btnDelete = document.getElementById("btnDelete");
let search = document.getElementById("search");

let mood = "create";
let searchmood;

let index;
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
    if (mood == "create") {
        if (count.value > 1) {
            let i = 0;
            while (i < count.value) {
                data = [...data, newData];
                i++;
            }
        }
        else data = [...data, newData];
    } else {
        data[index] = newData;
        mood = "create";
        create.value = "create";
        create.style.display = "block";
        count.style.display = "block";
    }
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

// function dataTable(i) {
//     return `
//     <tr>
//     <td>${i}</td>
//     <td>${data[i].title}</td>
//     <td>${data[i].price}</td>
//     <td>${data[i].taxes}</td>
//     <td>${data[i].ads}</td>
//     <td>${data[i].discount}</td>
//     <td>${data[i].total}</td>
//     <td>${data[i].category}</td>
//     <td><input type="button" id="tablebtn" value="Delete" onClick="deleteProd(${i})"/></td>
//     <td><input type="button" id="tablebtn" value="Update" onClick="updateProd(${i})"/></td>
//     </tr>`
// }

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
        <td><input type="button" id="tablebtn" value="Update" onClick="updateProd(${i})"/></td>
        </tr>`;
    }

    document.getElementById("tbody").innerHTML = tableContent;

    if (data.length > 0) {
        btnDelete.style.display = "block";
        btnDelete.value = `Delete All (${data.length})`;
    }
    else btnDelete.style.display = "none";

    getPrice();
}


function deleteProd(indexOfprod) {
    let confirmDelete = window.confirm("are you sure");
    if (confirmDelete) {
        data.splice(indexOfprod, 1);
        localStorage.setItem("products", JSON.stringify(data));
        showData();
        // deleteAll();
    }
    else {
        ;
    }
}

function deleteAll() {
    // let confirmDelete = window.confirm("are you sure");
    // if (confirmDelete) {
    data.splice(0);
    localStorage.clear();
    showData();


    console.log(data.length);
}

function updateProd(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    total.value = data[i].total;
    category.value = data[i].category;
    getPrice();

    window.scroll({
        top: 0,
        behavior: "smooth",
    });

    count.style.display = "none";
    create.value = "Update";
    mood = "update";

    index = i;

}

showData();

//search

function searchProd(id) {
    searchmood = id;
    if (searchmood == "btntitle") {
        searchmood = "title";
    }
    else {
        searchmood = "category";
    }
    search.placeholder = "Search By " + searchmood;
    search.focus();
    search.value = ""
    showData();

}

function searchData(val) {
    let tableContent = "";
    for (let i = 0; i < data.length; i++) {

        if (searchmood == "title") {
            if (data[i].title.toLowerCase().includes(val.toLowerCase())) {
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
                <td><input type="button" id="tablebtn" value="Update" onClick="updateProd(${i})"/></td>
                </tr>`;
            }


        }
        else {
            if (data[i].category.toLowerCase().includes(val.toLowerCase())) {
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
                <td><input type="button" id="tablebtn" value="Update" onClick="updateProd(${i})"/></td>
                </tr>`;
            }
        }
    }

    document.getElementById("tbody").innerHTML = tableContent;

}

