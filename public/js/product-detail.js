
sessionStorage.clear("order");
const tableBodyOrder1 = document.getElementById('table-body-order');
let productOrderDetail = JSON.parse(sessionStorage.getItem("order")) || [];
let productArray = JSON.parse(localStorage.getItem("orderArrayFinal")) || [];
console.log(productArray)


const URL1 = 'http://localhost:4000/api';
const URL_public2 = 'http://localhost:4000';



// let productOrderBuy = JSON.parse(sessionStorage.getItem("orderDetail")) ;
const params = window.location.search;
// console.log(params)
const index = params.split("id=")[1].split("&")[0];
//obtener id de url. Metodo recomendado para obtener queryParams es usando URLSearchParams
const paramsUrl = new URLSearchParams(params);
const paramsEntries = Object.fromEntries(paramsUrl)
// console.log(paramsEntries)
const indice = paramsEntries.id;
const products1 = JSON.parse(localStorage.getItem("products"));
console.log(products1)
const product = products1[indice];
console.log(product)
let orderFinal1 = JSON.parse(localStorage.getItem("orderArrayFinal"))
let badgeHTMLbuy2 = document.getElementById("cart-count");
let productOrder2 = JSON.parse(sessionStorage.getItem("order")) || [];
const cardContainer1 = document.querySelector("#card-detail");


async function cargarProductos2(id) {
    console.log(id)
    try {
        respuesta = await axios.get(`${URL1}/product/${id}`)

        const prodElegido = respuesta.data.product;
        console.log(prodElegido)
        // localStorage.setItem("products", JSON.stringify(products))
        renderizarDetail(prodElegido)


    } catch (error) {
        console.log(error);
    }
}
cargarProductos2(index)






function renderizarDetail(product) {


    let imageSrc2 =`${URL_public2}/upload/product/${product.image}`;

    cardContainer1.innerHTML = ` 
<main class="main">
    <div class="mainDetail">
        <div class="containerDetail">
            <div class="containerDetail__imageContainer">
                <img src=${imageSrc2} alt=${product.name} class="containerDetail__image">
            </div>

                 <div class="containerDetail__description" onclick="showNotUser()" >
                    <div class="containerDetail__container">
                            <div class="card__title">
                                <p>${product.name}</p>
                            </div>
                                    <div class="card__price">
                                    $ ${JSON.stringify(product.price)}
                                    </div>
                                <div class="card__detail">
                                    <p class="card__texto">${product.description}</p> 
                    </div>
                </div>
                    <div class="containerDetail__containerAdd"><div class="containerDetail__containerBtn1"><button class="containerDetail__containerBtn" onclick=" restCount(indice) ">-</button><div class="containerDetail__containerNumber" id="countNumber"> 1</div><button  class="containerDetail__containerBtn" onclick=" addCount(indice) "> +</button></div></div>
                    <button class="containerDetail__btn-add" onclick="addToCart(index)" id="btn-add-detail">
                             Añadir a carrito
                     </button>

                    <a href="/order" class="containerDetail__btn-buy" >  <button class="containerDetail__btn-buy">Comprar Ahora</button><a/>
                    </div>

        </div>
        <div class="containerDesc">
            <div class="containerDesc__cont">


              <h1 class="containerDesc__title">DESCRIPCION</h1>
                    <div class="containerDesc__detail">${product.detail}</div>
            </div>

        </div>




    </div> 
</main>`

}


renderizarDetail(product)

let badgeHTMLbuy3 = document.getElementById("countNumber");





//---------------------AGREGAR PRODUCTO COMPRADO-------------------------//

let productsDetail = []


function restCount(index) {
    console.log(index)
    let orderDetail1 = [orderFinal1[index]]
    console.log(orderDetail1)

    console.log(index)
    let countNumber = 0;
    orderFinal1.forEach((idx) => {
        let countNumb = idx.quantity
        if (idx.quantity > 0) {
            idx.quantity--;
        }

        badgeHTMLbuy3.innerText = idx.quantity;
        badgeHTMLbuy2.innerText = idx.quantity;

    })

    console.log(orderDetail1)
    sessionStorage.setItem("order", JSON.stringify(orderDetail1))
    showAlert("Producto quitado de carrito", "succes")

}



function addCount(index) {
    let orderDetail1 = [orderFinal1[index]]

    console.log(index)
    let countNumber = 1;
    orderFinal1.forEach((idx) => {
        let countNumb = idx.quantity;
        idx.quantity++;

        badgeHTMLbuy3.innerText = idx.quantity;
        badgeHTMLbuy2.innerText = idx.quantity;

    })

    console.log(orderDetail1)
    sessionStorage.setItem("order", JSON.stringify(orderDetail1))
    swal({
        title: "el producto se edito correctamente",
        icon: 'success',
    })

}

function addToCart(index) {
    let orderDetail2 = [orderFinal1[index]]
    let orderDetail1 = [productOrderDetail[index]]
    console.log(orderDetail1)


    // console.log(productOrderDetail)
    // console.log(index)
    orderDetail2.forEach((idx) => {
        // let countNumb = idx.quantity;
        console.log(idx.quantity)
        if (idx.quantity[index] = 1) {

            console.log(orderDetail2)
            sessionStorage.setItem("order", JSON.stringify(orderDetail2))
            swal({
                title: "el producto se edito correctamente",
                icon: 'success',
            })

        }
        console.log(idx.quantity)
        ixNumber = parseInt(idx.quantity)
        console.log(ixNumber)
        if (ixNumber == 1) {

            badgeHTMLbuy2.innerText = 1;

        }
    })

}

















































