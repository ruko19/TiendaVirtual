const APIURL = ('http://localhost:3000/productos')
const dataURl = JSON.stringify(APIURL)
let cesta = JSON.parse(localStorage.getItem('addCart')) || [];
const cardsContainer = document.querySelector('.cards__container')


let calculationCartModal = () => {
    let cartIcon = document.getElementById('cart__amount')

    cartIcon.innerHTML = cesta.map((x) => x.cantidad).reduce((x, y) => x + y, 0)

}

calculationCartModal()

document.addEventListener('DOMContentLoaded', e => {

})


// const carritoPruebamodal = async (API) => {
//     const apiFetch = await fetch(API)
//     const datos = await apiFetch.json();
//     console.log(datos)
// }
// carritoPruebamodal()


const carritoPrueba = async (API) => {
    const apiFetch = await fetch(API)
    const datos = await apiFetch.json();
    console.log(datos)
    try {
        cardsContainer.innerHTML += ``
        datos.forEach(e => {

            let search = cesta.find((x) => x.id === e.id)

            let total = search.cantidad * e.precio;


            cardsContainer.innerHTML += `
        
        <div class="card__cart container">
                    <figure>
                        <img src="${e.img}" alt="">
                    </figure>
                    <div class="description">
                        <h3>${e.nombre}</h3>
                        <p><b>sold by:</b>Fresho</p>
                        <p><b>quanty: <span>500 g</span></b></p>
                    </div>
                    <div class="price__container">
                        <p>Price</p>
                        <h3>$${e.precio}</h3>
                        <p>You Save : $20.68</p>
                    </div>
                    <div class="input__add input__add--pageCart">

                    <i onclick ="restar(${e.id})"  id = "input-minus${e.id}" class="input__minus fa-solid fa-minus"></i>
                    <input id="input${e.id}" class="input__number" type="number" value="${search.cantidad}">
                    <i onclick ="sumar(${e.id})" id = "input-plus${e.id}" class="input__plus fa-solid fa-plus"></i>

                    </div>

                    <div class="price__container">
                        <p>Total</p>
                        <h3>$${total}</h3>
                    </div>

                    <i onclick="removeitem(${e.id})" class="xModal xModal--cart fa-solid fa-x"></i>
                </div>

            
        
        `


        });

    } catch (error) {
        console.log(error);
    }

}






cesta.forEach(e => {

    carritoPrueba(APIURL + `/?id=` + e.id)

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


let removeitem = (id) => {
    let selectid = id;
    cesta = cesta.filter((x) => x.id !== selectid);
    console.log(cesta)
    localStorage.setItem('addCart', JSON.stringify(cesta));

    document.location.reload()

};


// const detectarBtnsRemove = (data) => {
//     btnRemove = document.querySelectorAll('.xModal')

//     btnRemove.forEach(btn => {
//         btn.addEventListener('click', () => {

//         })
//     })
// }


