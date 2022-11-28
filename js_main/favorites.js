
const cards__contaier__fav = document.querySelector('#cards__contaier__fav');


const carritoPruebaFav = async (API) => {
    const apiFetch = await fetch(API)
    const datos = await apiFetch.json();
    console.log(datos)
    try {
        cards__contaier__fav.innerHTML += ``
        datos.forEach(e => {

            let search = favoritos.find((x) => x.id === e.id)

            let total = search.cantidad * e.precio;


            cards__contaier__fav.innerHTML += `

            <div id="product-id-${e.id}" class=" card col-4 border  ">
                                <i onclick="removeitemFav(${e.id})" class="xModal xModal--cart fa-solid fa-x"></i>
  
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

    } catch (error) {
        console.log(error);
    }

}


favoritos.forEach(e => {

    carritoPruebaFav(APIURL + `/?id=` + e.id)

});

let removeitemFav = (id) => {
    let selectid = id;
    cesta = favoritos.filter((x) => x.id !== selectid);

    localStorage.setItem('addFavorites', JSON.stringify(cesta));

    document.location.reload()

};