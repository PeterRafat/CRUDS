let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;
//----get total price------
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result + ' EGP';
        total.style.background = 'orange';
        total.style.color = 'black';

    }
    else {
        total.innerHTML = '';
        total.style.background = 'rgba(173, 28, 28, 0.834)';
        total.style.color = 'white';
    }
}

//-----create product----
let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.product);
}
else { data = []; }

submit.onclick = function () {
    let newOpject = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
        submit: submit.value,
    }
    if(title.value !='' && price.value!='' && category.value!='' && count.value<100)
    {
        if (mood === 'create') 
            {
                if (newOpject.count > 1) 
                {
                    for (let i = 0; i < newOpject.count; i++) {
                        data.push(newOpject);
                    }
                }
                else data.push(newOpject);
            }
        else 
            {
                data[tmp]=newOpject;
                mood ='create';
                submit.innerHTML='Create';
                count.style.display='block';
            }
        clearData();
    }
   
    //save localstorage
    localStorage.setItem('product', JSON.stringify(data));
    // call this function    
   
    showData();
}

//-----clear inputs-----
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//........read.......... 
function showData() {
    let table = '';
    for (let i = 0; i < data.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${data[i].title}</td>
                <td>${data[i].price}</td>
                <td>${data[i].taxes}</td>
                <td>${data[i].ads}</td>
                <td>${data[i].discount}</td>
                <td>${data[i].total}</td>
                <td>${data[i].category}</td>
                <td><button onclick ="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deletData(${i})" id="delete">delete</button></td>
            </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let deletBtn = document.getElementById('deletAll');
    if (data.length > 0) {
        deletBtn.innerHTML = `<button onclick="deletAll()">deletAll (${data.length})</button>`
       
    }
    else{deletBtn.innerHTML='';}
   
    getTotal();
}
showData();

//------delet------
function deletData(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    showData();//to reload this page after delet
}

//-----DeleteAll
function deletAll() {
    localStorage.clear();
    data.splice(0);
    showData();//to reload this page after deletAll
   

}

//----updateData----
function updateData(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    ads.value = data[i].ads;
    discount.value = data[i].discount;
    category.value = data[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = 'Update'
    mood = 'update';
    tmp = i;
    scrollTo({
        top:0,
        behavior: "smooth",
    })
}


//------Search----
let searchMood = 'title';
function search(id)
{
    let search =document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'title';
        search.placeholder ='Search By Title';
    }
    else
    {
        searchMood = 'category';
        search.placeholder ='Search By Category';
    }
    search.focus();
    search.value='';
    showData();
}
function searchData(value)
{
    table='';
    for(let i=0; i<data.length ; i++)
    {
        if(searchMood == 'title')
        {
            if(data[i].title.includes(value.toLowerCase()))
                {
                    table +=
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick ="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                }
        }
        else
        {
            if(data[i].category.includes(value.toLowerCase()))
                {
                    table +=
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
                        <td><button onclick ="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}