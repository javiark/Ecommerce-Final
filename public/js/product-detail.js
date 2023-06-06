
// sessionStorage.clear("order");
const tableBodyOrder3 = document.getElementById('table-body-order');
let productOrderDetail = JSON.parse(sessionStorage.getItem("order")) || [];
// let productArray = JSON.parse(localStorage.getItem("orderArrayFinal")) || [];
// console.log(productArray)


const URL1 = 'http://localhost:4000/api';
const URL_public2 = 'http://localhost:4000';
const token = localStorage.getItem('token');

const params = window.location.search;
const index = params.split("id=")[1].split("&")[0];
const paramsUrl = new URLSearchParams(params);
const paramsEntries = Object.fromEntries(paramsUrl)
const indice = paramsEntries.id;
let badgeHTMLbuy2 = document.getElementById("cart-count");
let productOrder2 = JSON.parse(sessionStorage.getItem("order")) || [];
const cardContainer1 = document.querySelector("#card-detail");




async function cargarProductos2(id) {
    // console.log(id)
    try {
        respuesta = await axios.get(`${URL1}/product/${id}`)
        product = respuesta.data.respuesta
        // console.log(product)

        const prodElegido = respuesta.data.product;
        // console.log(prodElegido)
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

                 <div class="containerDetail__description"" >
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
                    <div class="containerDetail__containerAdd"><div class="containerDetail__containerBtn1"><button class="containerDetail__containerBtn" onclick="decrement(index) ">
                    -
                    </button>
                    <input type="text" class="containerDetail__containerNumber1" id="countNumber1${index}" value=1 >
                    <button  class="containerDetail__containerBtn" onclick="increment(index)"> 
                    +</button>
                    </div>
                    </div>


                    <a  class="containerDetail__btn-buy" >  <button class="containerDetail__btn-buy" onclick="addToCartDetail('${product._id}')">Agregar a Carrito</button><a/>
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


//href="/order"

// renderizarDetail(product)

//---------------------SUMA PRODUCTOS-------------------------//
let cantOrdenes = []
function increment(id) {
    // console.log(id)
    let input = document.getElementById(`countNumber1${id}`);
    // console.log(input)
    let currentValue = parseInt(input.value);

    input.value = currentValue + 1;
    currentValue = parseInt(input.value);

    // updateTotal(id)
}



function decrement(id) {
    // console.log(id)
    let input = document.getElementById(`countNumber1${id}`);
    // console.log(input)
    let currentValue = parseInt(input.value);

    if (currentValue > 1) {
        input.value = currentValue - 1;
        currentValue = parseInt(input.value);
    }
    // updateTotal(id)

}
// console.log(cantOrdenes)

// console.log(cantOrdenes.length)


async function addToCartDetail(id){
    // console.log(id)
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    // console.log(Order)
    // console.log(id)
    try {
        const res = await axios.get(`${URL1}/product/${id}`);
        const product = res.data.product;
        // console.log(res)
        const cantidad=document.getElementById(`countNumber1${id}`)
        // let cantProd = parseInt( cantidad)
        // let index = (Order.findIndex(el=>el.product==product.id))
        // console.log(index)

        const orderNew = {
            id: product._id,
            image: product.image,
            name: product.name,
            price: product.price,
            cant: parseInt(cantidad.value),
            total: parseInt(cantidad.value) * parseInt(product.price)
           
        }
        // console.log(orderNew)
        const prod = Order.find((prod)=>{
            if(prod.name === product.name){
              prod.cant = parseInt(prod.cant) +  parseInt(cantidad.value);
              prod.total = prod.cant * parseInt(prod.price);
              return prod;
            }
          })
          if(!prod) {
            Order.push(orderNew);
          }
          sessionStorage.setItem('order',JSON.stringify( Order));

          swal ({
            title:"Producto agregado a la Orden",
            icon: 'success',
        })
          countProducts()
    } catch (error) {
        console.log(error)
    }

    // async function addToOrder(id){
    //     let count1 = 0;
    //     let Order = JSON.parse(sessionStorage.getItem("order"))|| [];
    //     try {
    //         const respuesta = await axios.get(`${URL2}/product/${id}`);
    //         const product = respuesta.data.product;
    
            
    //     const newOrder = {
    //         id: product._id,
    //         image:product.image,
    //         name: product.name,
    //         price: product.price,
    //         cant: 1,
    //         total: product.price
            
    //     }
            
    //     const prod = Order.find((prod)=>{
    //         if(prod.name === product.name){
    //           prod.cant = parseInt(prod.cant) + 1 ;
    //           prod.total = prod.cant * parseInt(prod.price);
    //           return prod;
    //         }
    //       })
      
    //       if(!prod) {
    //         Order.push(newOrder);
    //       }
    
    //     //Guardarlo en el local storage
    //     sessionStorage.setItem('order',JSON.stringify( Order));
    
    //         swal({
    //             title: "el producto se agrego al carrito",
    //             icon: 'success',
    //         })
    //         Order.forEach(Order => {
    //             count1 += parseInt(Order.cant)
    //         })
    //         badgeHTMLbuy.innerText = count1;
    //     } catch (error) {
    //         console.log(error);
    //     }
    
    // }
    


    

    // order = JSON.parse(sessionStorage.getItem('order')) || [];
    // let input = document.getElementById(`countNumber1${id}`)
    // console.log(cantOrdenes.length)

 

    // let index = (order.findIndex(el=>el.product==product.id))
    
    // if(index !== -1){
    //     userCart[0].order[index].quantity++ 
    // }else{
    //     userCart[0].order.push({
    //         product:product.id,
    //         quantity:Number(cantidad)
    //     })
    }
    
    // sessionStorage.setItem("order", JSON.stringify(productsArray))
    // renderOrder(userCart)
    // actualizarBadge(userCart)
    // showAlert('Producto agregado al carro de compras correctamente.','ok')









async function updateTotal(id){
    Order = JSON.parse(sessionStorage.getItem('order')) || [];
    let cantOrdenes = document.getElementById(`countNumber1${id}`)
    cant = cantOrdenes.length
    
    console.log(product[id])
    product[id].cant =  parseInt(cant);
    product[id].total = product[id].cant * parseInt(product[id].price);
      
//Guardarlo en el local storage
sessionStorage.setItem('order',JSON.stringify( products));
// renderizarTabla();

// contarProductos();

  }


























// function addOrderDetail(id){
//     {
//         const existProd = JSON.parse(sessionStorage.getItem('order')) || [];
//         const updatedProduct = { ...product, quantity: parseInt(document.querySelector('.quantity-product__input').value) };
//         const existingProductIndex = existingCartItems.findIndex(item => item.name === updatedProduct.name);
//         if (existingProductIndex !== -1) {
//             existingCartItems[existingProductIndex].quantity += updatedProduct.quantity;
//         } else {
//             existingCartItems.push(updatedProduct);
//         }
//         sessionStorage.setItem('order', JSON.stringify(existingCartItems));
    
//         // Actualizar el contador del carrito
//         const cartCounter = document.getElementById('card-count');
//         let currentCount = parseInt(cartCounter.textContent) || 0;
//         cartCounter.textContent = (currentCount + updatedProduct.quantity).toString();
//     }
// }















// function addOrderDetail(id){
//     Order = JSON.parse(sessionStorage.getItem('order')) || [];
//     const prodDetail = document.getElementById(`countNumber1${id}`)  
//     console.log(prodDetail)
//     const newOrder = {
//         id: product._id,
//         image: product.image,
//         name: product.name,
//         price: product.price,
//         cant: parseInt(prodDetail.value),
//         total: parseInt(prodDetail.value) * parseInt(prodDetail.price)
        
//     }
    
//     const prod = Order.find((prod)=>{
//       if(prod.name === product.name){
//         prod.cant = parseInt(prod.cant) + parseInt(cantProd.value);
//         prod.total = prod.cant * parseInt(prod.price);
//         return prod;
//       }
//     })

//     if(!prod) {
//       Order.push(newOrder);
//     }
//     swal ({
//         title:"Producto agregado a su carrito",
//         icon: 'success',
//     })
// sessionStorage.setItem('order',JSON.stringify(Order));

// countProducts()
// //Alerta de Producto agregado

// }







// let badgeHTMLbuy3 = document.getElementById("countNumber");


// let input = document.getElementById("quantity-input");
// let currentValue = parseInt(input.value);

// function increaseInput() {
//     input.value = currentValue + 1;
//     currentValue = parseInt(input.value);
// }

// function decreaseInput() {
//     if (currentValue > 1) {
//         input.value = currentValue - 1;
//         currentValue = parseInt(input.value);
//     }
// }


//---------------------AGREGAR PRODUCTO COMPRADO-------------------------//

// let productsDetail = []


// function restCount(index) {
//     console.log(index)
//     let orderDetail1 = [orderFinal1[index]]
//     console.log(orderDetail1)

//     console.log(index)
//     let countNumber = 0;
//     orderFinal1.forEach((idx) => {
//         let countNumb = idx.quantity
//         if (idx.quantity > 0) {
//             idx.quantity--;
//         }

//         badgeHTMLbuy3.innerText = idx.quantity;
//         badgeHTMLbuy2.innerText = idx.quantity;

//     })

//     console.log(orderDetail1)
//     sessionStorage.setItem("order", JSON.stringify(orderDetail1))
//     showAlert("Producto quitado de carrito", "succes")

// }

// async function cargarProductos2(id) {
//     console.log(id)
//     try {
//         respuesta = await axios.get(`${URL1}/product/${id}`)

//         const prodElegido = respuesta.data.product;
//         // console.log(prodElegido)
//         // localStorage.setItem("products", JSON.stringify(products))
//         renderizarDetail(prodElegido)


//     } catch (error) {
//         console.log(error);
//     }
// }
// cargarProductos2(index)

// function addCount(index){
//     let input = document.getElementById(`order-cant-input${id}`)

// }











// async  function addCount(index) {
//     try {
//         respuesta = await axios.get(`${URL1}/product/${index}`)
//         const prodElegido = respuesta.data.product;
//         console.log(prodElegido)
//         // localStorage.setItem("products", JSON.stringify(products))
//         renderizarDetail(prodElegido)


//     } catch (error) {
//         console.log(error);
//     }
// }


// function addToCart(index) {
//     let orderDetail2 = [orderFinal1[index]]
//     let orderDetail1 = [productOrderDetail[index]]
//     console.log(orderDetail1)


//     // console.log(productOrderDetail)
//     // console.log(index)
//     orderDetail2.forEach((idx) => {
//         // let countNumb = idx.quantity;
//         console.log(idx.quantity)
//         if (idx.quantity[index] = 1) {

//             console.log(orderDetail2)
//             sessionStorage.setItem("order", JSON.stringify(orderDetail2))
//             swal({
//                 title: "el producto se edito correctamente",
//                 icon: 'success',
//             })

//         }
//         console.log(idx.quantity)
//         ixNumber = parseInt(idx.quantity)
//         console.log(ixNumber)
//         if (ixNumber == 1) {

//             badgeHTMLbuy2.innerText = 1;

//         }
//     })

// }

//----------------ACTUALIZAR CANTIDAD EN CARRITOS DE COMPRA--------------
let count = 0;
function cartUpdate() {
    productOrderDetail.forEach(productOrderDetail => {
        count += parseInt(productOrderDetail.quantity)
    })

    badgeHTMLbuy2.innerText = count;
}
cartUpdate()











function increaseNumber(index) {
    // console.log(index)
    // console.log("funcionaboton")
    let count2 = 0
    // console.log(productOrder)
    let orderAdd = productOrderDetail[index]
    // console.log(orderAdd)

    productOrderDetail.forEach((idx) => {
        // console.log(idx)
        if (orderAdd === idx) {
            idx.cant++;
        }
    })

    productOrderDetail.forEach(productOrderDetail => {
        count2 += parseInt(productOrderDetail.cant)
    })
    console.log(count2)

    badgeHTMLbuy.innerText = count2;

    sessionStorage.setItem("order", JSON.stringify(productOrderDetail))

    //calcular Valor total
    // let valorTotalSumar = productOrderFF.reduce((acc, prod) => acc + prod.quantity * prod.priceOrder, 0)
    // total.innerHTML = `$ ${valorTotalSumar}`

    // renderizarTablaOrdenes()

}


















































