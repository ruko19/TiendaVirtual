const APIURL = ('http://localhost:3000/productos')
const dataURl = JSON.stringify(APIURL)
const outPutCard = document.getElementById('cards__contaier')
let cesta = [];
let favorites = [];

let = botonesAgregar = document.querySelectorAll('.add-to-car__btn');

// JSON.parse(localStorage.getItem("data")) ||


document.addEventListener('DOMContentLoaded', e => {
    // dataCart = JSON.parse(localStorage.getItem('dataCart'))
    fetchData();
})

const fetchData = async () => {
    try {
        const res = await fetch(APIURL);
        const data = await res.json()


        imprimirCard(data);
        formularioUbicacion(data)
        detectarBotones(data)

    } catch (error) {
        console.log('ha ocurrido un error')

    }
}

const imprimirCard = data => {

    let card = '';
    data.forEach(e => {
        card += `

          <div id="product-id-${e.id}" class=" card col-4 border  ">

                                <img class="card__img" src="${e.img}" alt="">
                                <h3>${e.nombre}</h3>
                                <span class="price">
                                    <span class="price_buy">$${e.precio} COP</span>
                                    <span class="ofert">${e.descuento}</span>
                                </span>

                                <div class="input__add">

                                    <i onclick ="resta(${e.id})"  id = "input-minus${e.id}" class="input__minus fa-solid fa-minus"></i>
                                    <input id="input${e.id}" class="input__number" type="text" value="0">
                                    <i onclick ="sumar(${e.id})" id = "input-plus${e.id}" class="input__plus fa-solid fa-plus"></i>

                                </div>

                                <button id= "${e.id}" type="button" class="add-to-car__btn">
                                    <img src="./img/car_shop.svg" alt="">Add to Car
                                </button>
                                
                            </div>
        `


    });

    outPutCard.innerHTML = card;

    // actualizarBotonesAgregar()

}




let carrito = {};
// console.log(carrito)
const dataCart = JSON.parse(localStorage.getItem('dataCart'))
// console.log(dataCart)

const detectarBotones = (data) => {
    botonesAgregar = document.querySelectorAll('.add-to-car__btn');

    const cartContainer = document.querySelector('.modal__item')



    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            const producto = data.find(item => item.id === boton.id);
            const inputFocus = document.getElementById(`input${boton.id}`)
            let subTotal = document.querySelector('.subTotal');


            producto.cantidad = parseInt(inputFocus.value);
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + parseInt(inputFocus.value)

            }


            if (localStorage.getItem('dataCart')) {
                let copiacCarrito = JSON.parse(localStorage.getItem('dataCart'))
                if (copiacCarrito[producto.id]) {
                    copiacCarrito[producto.id].cantidad *= producto.cantidad

                } else {
                    copiacCarrito[producto.id] = { ...producto }
                }
                carrito = copiacCarrito
            } else {

                carrito[producto.id] = { ...producto }
            }
            console.log(carrito)


            let cartIcon = document.getElementById('cart__amount')

            nCantidad = Object.values(carrito).reduce((x, { cantidad }) => x + cantidad, 0)
            cartIcon.innerHTML = nCantidad
            document.getElementById(`input${boton.id}`).value = 0



            // a    grego productos al carrito-------   -------------------------------------------


            if (producto.cantidad === 0) {
                return;
            } else {


                let unidTOtal = producto.cantidad * producto.precio;

                cartContainer.innerHTML += `
                <div class="cart__item">
                <figure>
                <img src="${producto.img}" alt="">
                </figure>
                <div class="product__cantidad">
                <h4 class="cart__item__name">${producto.nombre}</h4>
                <p class="cart__item__cantidad">x ${producto.cantidad}</p>
                <p class="cart__item__price"> c/u $ ${producto.precio}k</p>
                </div>
                <p class="unid_total">${unidTOtal}k</p>
                <i id='T${producto.id}' class="btnEliminar trash_icon fa-regular fa-trash-can"></i>
                </div>
                
                `
                getTotal()



                localStorage.setItem('dataCart', JSON.stringify(carrito));
            }

            // eliminar elementos del localstorage


            function getTotal() {
                let sumTotal;
                let total = Object.values(carrito).reduce((sum, item) => {
                    sumTotal = sum + item.cantidad * item.precio
                    return sumTotal
                }, 0);
                subTotal.innerHTML = `<span>$${total}</span>`
            }

            // GAURDAR LOCALSTORAGE

            // localStorage.setItem('dataCart', JSON.stringify(carrito));

        });


    })


    const btnEliminar = document.querySelectorAll('.btnEliminar')
    console.log(btnEliminar)


}






// FILTRADO DE BUSQUEDA

const FORMULARIO = document.getElementById('formulario');
const inputFormulario = document.getElementById('inputSearch');

const formularioUbicacion = data => {
    FORMULARIO.addEventListener('submit', e => {
        e.preventDefault()

        const letraCliente = inputFormulario.value.toLowerCase();
        console.log(letraCliente)

        const arrayFiltrado = data.filter(item => {
            const letraApi = item.TProducto.toLowerCase()
            if (letraApi.indexOf(letraCliente) !== -1) {
                return item
            }

        })

        imprimirCard(arrayFiltrado)



    })
}

// ------ fin filtrado de busqueda.





// ---------- funcionalidad contador-----------------------



let sumar = (id) => {

    document.getElementById(`input${id}`).value++




    // let selectId = id;
    // let search = cesta.find((x) => x.id === selectId);

    // if (search === undefined) {

    //     cesta.push({
    //         id: selectId,
    //         cantidad: 1
    //     });

    // } else {
    //     search.cantidad += 1;
    // }

    localStorage.setItem("data", JSON.stringify(cesta))
    update(id);
};

let resta = (id) => {
    // document.getElementById(`input${id}`).value--

    valueInput = parseInt(document.getElementById(`input${id}`).value)

    if (valueInput == 0) {
        return;

    } else {
        document.getElementById(`input${id}`).value--

    }

    // let selectId = id;
    // let search = cesta.find((x) => x.id === selectId);


    // if (search.cantidad === 0) {
    //     return;
    // } else {
    //     search.cantidad -= 1;
    // }

    // // cesta = cesta.filter((x) => x.item !== 0)

    // // localStorage.setItem("data", JSON.stringify(cesta))
    update(id);
};

let update = (id) => {


    document.getElementById(`input${id}`).value
}


// fin contador



