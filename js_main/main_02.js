const APIURL = ('http://localhost:3000/productos')

const dataURl = JSON.stringify(APIURL)
const outPutCard = document.getElementById('cards__contaier')
let cesta = JSON.parse(localStorage.getItem('addCart')) || [];
let favoritos = JSON.parse(localStorage.getItem('addFavorites')) || [];
const cardsContainerModal = document.querySelector('.modal__item')


document.addEventListener('DOMContentLoaded', e => {

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
    data.map((e) => {

        let search = cesta.find((x) => x.id === e.id) || [];

        card += `
        
          <div id="product-id-${e.id}" class=" card col-4 border  ">
          <i id="${e.id}" class="xCard bi bi-heart"></i>

                                <img class="card__img" src="${e.img}" alt="">
                                <h3>${e.nombre}</h3>
                                <span class="price">
                                    <span class="price_buy">$${e.precio} COP</span>
                                    <span class="ofert">${e.descuento}</span>
                                </span>

                                <div class="input__add">

                                    <i onclick ="restar(${e.id})"  id = "input-minus${e.id}" class="input__minus fa-solid fa-minus"></i>
                                    <input id="input${e.id}" class="input__number" type="number" value="${search.cantidad === undefined ? 0 : search.cantidad}">
                                    <i onclick ="sumar(${e.id})" id = "input-plus${e.id}" class="input__plus fa-solid fa-plus"></i>

                                </div>

                                
                                
                            </div>
        `
    });

    outPutCard.innerHTML = card;


}



// FILTRADO DE bUSQUEDAD----------------
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






const carritoPruebaModal = async (API) => {
    const apiFetch = await fetch(API)
    const datos = await apiFetch.json();

    try {
        cardsContainerModal.innerHTML += ``
        datos.forEach(e => {

            let search = cesta.find((x) => x.id === e.id)


            cardsContainerModal.innerHTML += `
        
            <div class="cart__item">
            <figure>
                <img src="${e.img}" alt="">
            </figure>
            <div class="product__cantidad">
                <h4 class="cart__item__name">${e.nombre}</h4>
                <p class="cart__item__cantidad">x${search.cantidad}</p>
            </div>
            <p class="cart__item__price">$ ${e.precio}</p>
            <i class="trash_icon fa-regular fa-trash-can"></i>
        </div> 
            
        
        `


        });

        // getTotal()
        // 
        // function getTotal() {
        //     let sumTotal;
        //     let total = cesta.reduce((sum, e) => {
        //         sumTotal = sum + e.cantidad * e.precio
        //         return sumTotal
        //     }, 0);
        //     console.log(e.cantidad)
        //     subTotal.innerHTML = `<span>$${total}</span>`
        // }



    } catch (error) {
        console.log(error);
    }

}


cesta.forEach(e => {

    carritoPruebaModal(APIURL + `/?id=` + e.id)

});





let sumar = (id) => {


    let selectid = id;
    let search = cesta.find((x) => x.id === selectid)

    if (search === undefined) {
        cesta.push({
            id: selectid,
            cantidad: 1
        });
    } else {
        search.cantidad += 1;

    }



    document.getElementById(`input${id}`).value++
    update(id)
    localStorage.setItem('addCart', JSON.stringify(cesta))
}
let restar = (id) => {
    valueInput = parseInt(document.getElementById(`input${id}`).value)


    if (valueInput == 0) {
        return;

    } else {
        document.getElementById(`input${id}`).value--

    }




    let selectid = id;
    let search = cesta.find((x) => x.id === selectid)

    if (search === undefined) return;
    else if (search.cantidad === 0) {
        return;
    }
    else {
        search.cantidad -= 1;

    }
    update(id)
    cesta = cesta.filter((x) => x.cantidad !== 0)


    localStorage.setItem('addCart', JSON.stringify(cesta))



}
let update = (id) => {

    document.getElementById(`input${id}`).value
    calculationCartModal()
}

let calculationCartModal = () => {
    let cartIcon = document.getElementById('cart__amount')

    cartIcon.innerHTML = cesta.map((x) => x.cantidad).reduce((x, y) => x + y, 0)

}

calculationCartModal()


// boton add cart---------------------------------

const detectarBotones = (data) => {

    botonesAgregar = document.querySelectorAll('.xCard');

    botonesAgregar.forEach(btn => {
        btn.addEventListener('click', () => {
            const producto = data.find(item => item.id === parseInt(btn.id))
            console.log(producto)

            favoritos.push(producto)
            localStorage.setItem('addFavorites', JSON.stringify(favoritos))
        })
    })
}


const adminContainer = document.querySelector('.products__container');



// pagina de administrador -----------------------------------

const imprimirCardAdmin = async () => {


    let respuesta = await fetch(APIURL);
    let muestra = await respuesta.json()




    muestra.forEach((e) => {


        adminContainer.innerHTML += `

        <div class="cards__container__admin">

            <figure>
                <img src="${e.img}" alt="">
            </figure>

            <div class="card__admin__text">
                <p>${e.TProducto}</p>
                <p>${e.nombre}</p>
            </div>

            <div class="price__container">
                <p>Price</p>
                <h3>$${e.precio}</h3>

            </div>

            <div class="card__admin__btns">
                <button type="button" class="btn btn-primary">Modificar</button>
                <button id="${e.id}" type="button" class="btnDelete btn btn-secondary">Eliminar</button>

            </div>

        </div>
   

        `
    });



}

imprimirCardAdmin()



//capturad datos
function leerDtatos() {

    let img = document.querySelector('#urlData').value;
    let nombre = document.querySelector('#nombreData').value;
    let precio = document.querySelector('#precioData').value;
    // let categoriaData = document.querySelector('#categoriaData').value;

    let datos = {
        img,
        nombre,
        precio,

    }
    return datos
}


const btnCrear = document.querySelector('#btnCrear');

btnCrear.addEventListener('click', async (e) => {
    e.preventDefault()

    let newData = leerDtatos();

    await fetch(APIURL, {

        method: 'POST',
        body: JSON.stringify(newData),
        headers: {

            "content-Type": "application/json; charset=utf-8"

        }
    });

})


adminContainer.addEventListener('click', async (e) => {
    const btnEliminar = e.target.classList.contains('btnDelete');

    console.log(btnEliminar)

    if (btnEliminar === true) {
        const id = e.target.id;
        await fetch(`${APIURL}/${id}`, {
            method: 'DELETE'
        })
    }
})

