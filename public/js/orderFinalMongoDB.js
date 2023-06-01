const tableBodyOrder = document.getElementById('table-body-order');
const products1 = [];
const productsArray = [];

const URL2 = 'http://localhost:4000/api';
const URL_public1 = 'http://localhost:4000';


badgeHTMLbuy=document.getElementById("cart-count");

let orderUser = JSON.parse(localStorage.getItem("currentUser"))
let productOrder = JSON.parse(sessionStorage.getItem("order"))
let productOrderFF = JSON.parse(sessionStorage.getItem("order"))





const btnEnd1 = document.getElementById("btnEnd")
const productFormBuy = document.getElementById("add-product");
const submitBtn = document.getElementById("submit-btn");
const total = document.getElementById("totalPrice")


//---------------------RECORRER TODO EL ARRAY DE PRODUCTOS-------------------------//

let orderArray = [];
let cart = []


//----------------PINTAR TABLA--------------


function renderizarTablaOrdenes() {

    tableBodyOrder.innerHTML = '';
    if (productOrderFF.length === 0) {
        tableBodyOrder.innerHTML = "<p class='disabled'>NO SE ENCONTRARON PRODUCTOS</p>"
        return
    }
    // console.log(productOrderFF)

    productOrderFF.forEach((prod, index) => {

        let imageSrc1 = `${URL_public1}/upload/product/${prod.imageOrder}`;
        console.log(i)

        tableBodyOrder.innerHTML += `<tr class="order">
        <td class="order__img-cell"><img class="product__img" src="${imageSrc1}" alt="${prod.nameOrder}"></td>
        <td class="order__name" onclick="editName(${index})">${prod.nameOrder}</td>
        <td class="order__desc">${prod.descriptionOrder}</td>
        <td class="order__quantity" ><div class="boton-container"><div class="boton-container__boton-div"><button class="boton-container__boton-order" onclick="restToOrderQuantity(${index}) " id=${index} >-</button> ${prod.quantity} <button class="boton-container__boton-order" onclick= "AccToOrderQuantity(${index})">+</button></div></div></td>
        <td class="order__price" id="new-price">$ ${prod.priceOrder}</td>
        <td class="order__price">$ ${prod.priceOrder * prod.quantity}</td>
        <td class="order__actions">
            <button class="product__action-btnDetail" onclick="deleteProductBuy(${index})">
                <i class="fa-solid fa-trash"></i>
            </button> 
        </td>
    </tr>
    
    `
    })
}



renderizarTablaOrdenes()

//---------------------LIMPIAR TABLA SI NO HAY USUARIO-------------------------//

function cleantable() {

    if (orderUser) {
        // console.log("hay usuario")
    } else {
        tableBodyOrder.innerHTML = '';
        productOrder = [];
        sessionStorage.setItem("order", JSON.stringify(products))
        actualizarBadge();
    }
}

cleantable()


//----------------ACTUALIZAR CANTIDAD EN CARRITOS DE COMPRA--------------
let count = 0;
function cartUpdate() {
    productOrder.forEach(productOrder => {
        count += parseInt(productOrder.quantity)
    })

    badgeHTMLbuy.innerText = count;
}
cartUpdate()


//---------------------AGREGAR PRODUCTO COMPRADO-------------------------//
// console.log(products)


async function addToOrder(index) {
    // console.log(index)
    let count1 = 0;

    try {

        const response = await axios.get(`${URL2}/product/${index}`);
        let productOrder = response.data.product;
        // console.log(productOrder)
        let orderBuy = {
            id: productOrder._id,
            image: productOrder.image,
            name: productOrder.name,
            price: productOrder.price,
            cant: 1,
            total: productOrder.price
        }

        // console.log(products1)
        // console.log(products1.name)
        const searchCart = products1.find((products1) => {
            if(products1.id === index){
                products1.cant = parseInt(products1.cant) + 1 ;
                return products1;
              }
            })

        if (!searchCart) {
            products1.push(orderBuy)
            // console.log(products1)
        }
        products1.forEach(products1 => {
            count1 += parseInt(products1.cant)
            })
        badgeHTMLbuy.innerText=count1;

        sessionStorage.setItem('order', JSON.stringify(products1));

        swal ({
            title:"el producto se agrego al carrito",
            icon: 'success',
        })

        // contarProductos();

    } catch (error) {
        console.log(error);
    }

}










//-----------------------OBTENER ID DE USUARIO---------------------
const usuarioID1 = productsUser.findIndex(id1 => id1.email === orderUser.email)
// console.log(usuarioID1)




//----------------ACTUALIZAR PRECIO--------------

// let valorTotal =productOrder.reduce((acc,prod) => acc + prod.quantity * prod.priceOrder,0 )
// total.innerHTML = `$ ${valorTotal}`



//----------------ELIMINAR PRODUCTO--------------

// function deleteProductBuy(indice){
//     let count2=0;
//     productOrderFF.splice(indice, 1);
//     sessionStorage.setItem("order",JSON.stringify(productOrderFF));

//     productOrderFF.forEach(productOrderFF => {
//         count2 += parseInt(productOrderFF.quantity)
//         })
//         badgeHTMLbuy.innerText=count2;
//         let valorTotal =productOrderFF.reduce((acc,prod) => acc + prod.quantity * prod.priceOrder,0 )
//         total.innerHTML = `$ ${valorTotal}`
//     console.log(productOrderFF)
//     // showAlert("Su producto se ha borrado111", "succes")
//     renderizarTablaOrdenes()
// }

function deleteProductBuy(indice) {
    let count2 = 0;
    swal({
        title: "Borrar producto",
        text: `Esta seguro que desea borrar el producto `,
        icon: `warning`,
        buttons: {
            cancel: "Cancelar",
            delete: "Borrar",
        }
    }).then(value => {
        if (value === "delete") {
            productOrderFF.splice(indice, 1);
            sessionStorage.setItem("order", JSON.stringify(productOrderFF));

            productOrderFF.forEach(productOrderFF => {
                count2 += parseInt(productOrderFF.quantity)
            })
            badgeHTMLbuy.innerText = count2;
            let valorTotal = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
            total.innerHTML = `$ ${valorTotal}`
            console.log(productOrderFF)

            swal({
                title: "Elemento borrado correctamente",
                icon: "error"

            });
            renderizarTablaOrdenes()

        } else {
            return; //return null
        }
    })


}





//----------------SUMAR CANTIDAD PRODUCTO--------------

function AccToOrderQuantity(index) {
    console.log(index)
    // console.log("funcionaboton")
    let count2 = 0
    // console.log(productOrder)
    // let orderAdd = productOrderFF[index]
    // console.log(orderAdd)

    productOrderFF.forEach((idx) => {
        console.log(idx)
        if (orderAdd === idx) {
            idx.quantity++;
        }
    })

    productOrderFF.forEach(productOrderFF => {
        count2 += parseInt(productOrderFF.quantity)
    })
    console.log(count2)

    badgeHTMLbuy.innerText = count2;

    sessionStorage.setItem("order", JSON.stringify(productOrderFF))

    //calcular Valor total
    let valorTotalSumar = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
    total.innerHTML = `$ ${valorTotalSumar}`

    renderizarTablaOrdenes()

}

//----------------RESTAR CANTIDAD PRODUCTO--------------

function restToOrderQuantity(index) {
    console.log(index)
    // console.log("funcionaboton")
    let count2 = 0
    // console.log(productOrder)
    let orderAdd = productOrderFF[index]
    console.log(orderAdd)

    productOrderFF.forEach((idx) => {
        console.log(idx)
        if (orderAdd === idx & idx.quantity > 0) {
            idx.quantity--;
        }
    })

    productOrderFF.forEach(productOrderFF => {
        count2 += parseInt(productOrderFF.quantity)
    })
    console.log(count2)

    badgeHTMLbuy.innerText = count2;

    sessionStorage.setItem("order", JSON.stringify(productOrderFF))

    //calcular Valor total
    let valorTotalSumar = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
    total.innerHTML = `$ ${valorTotalSumar}`

    renderizarTablaOrdenes()

}
//----------------FINALIZAR COMPRA--------------
// if(tableBodyOrder=''){
//     console.log("no hay nada")
// }

if (productOrder.length === 0) {
    console.log("no")
    btnEnd1.classList.add("buy-btn-empty")

}

function buyEnd() {
    if (!productOrder) {
        swal({
            title: `Su carrito esta vacio`,
            icon: 'error',
        })
    } else {


        swal({
            title: `Gracias por su compra`,
            icon: 'success',
        })

        sessionStorage.removeItem("order");

        setTimeout(() => {
            window.location.href = "/"

        }, 3000)
    }
}

let currentUser1 = JSON.parse(localStorage.getItem("currentUser"));




