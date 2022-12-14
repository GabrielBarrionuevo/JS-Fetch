////////////////
////////////////
// OBJETOS //
// PAPITAS //
// function papitas(id, nombre, precio, categoria, descripcion){
//     this.id = id;
//     this.nombre = nombre;
//     this.precio = precio;
//     this.categoria = categoria;
//     this.descripcion = descripcion;
// }


// let listaPapitas = [
//     { id: 01, nombre: "Clasica",         precio: 10, categoria: "normal",   descripcion: "Solo papitas" },
//     { id: 02, nombre: "Clasica",         precio: 20, categoria: "deluxe",   descripcion: "Solo papitas" },
//     { id: 03, nombre: "Cheddar",         precio: 15, categoria: "normal",   descripcion: "Con queso cheddar" },
//     { id: 04, nombre: "Wasabi",          precio: 15, categoria: "normal",   descripcion: "Con condimento picante wasabi" },
//     { id: 05, nombre: "Wacamole",        precio: 20, categoria: "premium",  descripcion: "Con wacamole. Se le puede agregar tomate." },
//     { id: 06, nombre: "Queso Y Cebolla", precio: 20, categoria: "premium",  descripcion: "Con queso y cebolla. Se le puede agregar un poco mas de cebolla a elección" },
//     { id: 07, nombre: "Queso Gratinado", precio: 30, categoria: "deluxe",   descripcion: "Con queso gratinado a elección (no cheddar)" },
//     { id: 08, nombre: "Sal-Marina",      precio: 35, categoria: "deluxe",   descripcion: "Con sal marina. Se le puede agregar alguna salsa a elección (no wasabi o wacamole)" }
// ];

///////////////////
// DOM
///////////////////

//Listado productos
async function fetchPapitas() {
    const response = await fetch('./data.json')
    return await response.json()
}

 // Llamo a esa función
let listaPapitas = [];

fetchPapitas().then(papita => {
    listaPapitas = papita
    mostrarListaPapitas();
})

function mostrarListaPapitas(){
    for (papita of listaPapitas) {
        let contenedor = document.createElement("section");
        contenedor.innerHTML = `
        <section class="contProducto">
        <div class="row">
        <div class="col-12 col-md-6">
        <div class="item">
        <h3 class="item-title">${papita.nombre}</h3>
        <img class="item-image" src="papita.jpg">
        <div class="item-details">
        <h4 class="item-categoria">${papita.categoria}</h4>
        <h4 class="item-id">ID Producto: ${papita.id}</h4>
        <h4 class="item-price">$${papita.precio}</h4>
        <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
        </div>
        </div>
        </div>
        </div>
        </section>
        `;
        contenedorStore.appendChild(contenedor);
    };
    //Este console.log me genera dos salidas.
    console.log(listaPapitas);
}
mostrarListaPapitas();

 ////////////////////////////////
 //// Agrego buscaXNombre
const eventKeyBuscarPorNombre = document.querySelector("#buscaXNombre");
eventKeyBuscarPorNombre.addEventListener("input", (e)=>{
    console.log(e.target.value)
    }
);

let btnBuscarXNombre = document.querySelector("#form-buscarXNombre");
btnBuscarXNombre.addEventListener("submit", buscarXNombre);

function buscarXNombre(e){
    e.preventDefault();
 //    alert(`${eventKeyBuscarPorNombre.value}`)

    let nombreFiltrado = listaPapitas.filter(papita => papita.nombre == eventKeyBuscarPorNombre.value);
    console.log(nombreFiltrado);

    for (papita of nombreFiltrado) {
        let contenedorBuscarXNombre = document.createElement("article");
        contenedorBuscarXNombre.innerHTML = `
        <section class="contProducto">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="item">
                        <h3 class="item-title">${papita.nombre}</h3>
                        <img class="item-image" src="papita.jpg">
                        <div class="item-details">
                            <h4 class="item-price">$${papita.precio}</h4>
                            <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
        contenedorBuscarPorNombre.appendChild(contenedorBuscarXNombre);
    }
};

 ////////////////////////////////
 ////////////////////////////////

const precioMinimo = document.querySelector("#baseDePrecio");
precioMinimo.addEventListener("input", (e)=>{
    console.log(e.target.value)
    }
);
const precioMaximo = document.querySelector("#topeDeprecio");
precioMaximo.addEventListener("input", (e)=>{
    console.log(e.target.value)
    }
);

let btnBuscarXRango = document.querySelector("#form-buscarXRango");
btnBuscarXRango.addEventListener("submit", buscarXRango);

function buscarXRango(e){
    e.preventDefault();
    console.log(`${precioMinimo.value}... ${precioMaximo.value}`);

    let buscarPrecioXRango = listaPapitas.filter(papita => papita.precio >= precioMinimo.value && papita.precio <= precioMaximo.value);

    for (papita of buscarPrecioXRango) {
        let contenedorBuscarPrecioXRango = document.createElement("section");
        contenedorBuscarPrecioXRango.innerHTML = `
        <section class="contProducto">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="item">
                        <h3 class="item-title">${papita.nombre}</h3>
                        <img class="item-image" src="papita.jpg">
                        <div class="item-details">
                            <h4 class="item-price">$${papita.precio}</h4>
                            <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
        contenedorRangoPrecios.appendChild(contenedorBuscarPrecioXRango);
    }
};


 //Categorias
let categoriasFiltradas = [];
let categoriasFiltradasNormal = listaPapitas.filter(listaPapitas => (listaPapitas.categoria === "normal"));
let categoriasFiltradasPremium = listaPapitas.filter(listaPapitas => (listaPapitas.categoria === "premium"));
let categoriasFiltradasDeluxe = listaPapitas.filter(listaPapitas => (listaPapitas.categoria === "deluxe"));



let checkbox1 = document.querySelector("#checkbox1");
checkbox1.addEventListener("change", validaCheckbox1);

let categoría1 = "normal";
function validaCheckbox1(){
    if (this.checked) {
        categoriasFiltradas.push(...categoriasFiltradasNormal);
        mostrarCategoriasFiltradas();
        console.log(categoriasFiltradas);
    } else {
        // console.log(categoriasFiltradas);
    }
};

let checkbox2 = document.querySelector("#checkbox2");
checkbox2.addEventListener("change", validaCheckbox2);

let categoría2 = "premium";
function validaCheckbox2(){
    if (this.checked) {
        categoriasFiltradas = categoriasFiltradas.filter(categoriasFiltradas => (categoriasFiltradas.categoria === categoría2));
        mostrarCategoriasFiltradas();
        console.log(categoriasFiltradas);
    } else {
        categoriasFiltradas = categoriasFiltradas.filter(function(papita){
            return papita.categoria !== categoría2;
        })
        // eliminarCategoriaFiltrada();
        // console.log(categoriasFiltradas);
    }
};

let checkbox3 = document.querySelector("#checkbox3");
checkbox3.addEventListener("change", validaCheckbox3);

let categoría3 = "deluxe";
function validaCheckbox3(){
    if (this.checked) {
        categoriasFiltradas = categoriasFiltradas.filter(categoriasFiltradas => (categoriasFiltradas.categoria === categoría3));
        mostrarCategoriasFiltradas();
        console.log(categoriasFiltradas);
    } else {
        categoriasFiltradas = categoriasFiltradas.filter(function(papita){
            return papita.categoria !== categoría3;
        })
        // eliminarCategoriaFiltrada();
        // console.log(categoriasFiltradas);
    }
};

function mostrarCategoriasFiltradas(){
    for (papita of categoriasFiltradas) {
        let contenedor = document.createElement("section");
        contenedor.innerHTML = `
        <section class="contProducto">
        <div class="row">
        <div class="col-12 col-md-6">
        <div class="item">
        <h3 class="item-title">${papita.nombre}</h3>
        <img class="item-image" src="papita.jpg">
        <div class="item-details">
        <h4 class="item-categoria">${papita.categoria}</h4>
        <h4 class="item-id">ID Producto: ${papita.id}</h4>
        <h4 class="item-price">$${papita.precio}</h4>
        <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
        </div>
        </div>
        </div>
        </div>
        </section>
        `;
        contenedorFiltrarCategorias.appendChild(contenedor);
    };
};
 // function eliminarCategoriaFiltrada();








 //Carrito de compras
 //Fui agregando muchos comentarios mientras agregaba para poder repasar nuevamente luego
 //ESCUCHAMOS A TODOS LOS "AÑADIR LA CARRITO"
const addToShoppingCartButtons = document.querySelectorAll('.addToCart');

 /* VERIFICAMOS */
 // addToShoppingCartButtons.forEach((addToCartButton) => {
 // addToCartButton.addEventListener(`click`, () => console.log(`Click`));
 // });

addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
});


 //LOCALSTORAGE
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('shoppingCartItemsContainer')){
        carrito = JSON.parse(localStorage.getItem('shoppingCartItemsContainer'))
        updateShoppingCartTotal();
    }
})

function addToCartClicked(event) {
    /*VERIFICAMOS
    const button = event.target;
    console.log(button)*/
    const button = event.target;
  //Evento mas cercano con item
    const item = button.closest('.item');
  //El text content es para tomar solo el contenido
    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;
    const itemID    = item.querySelector('.item-id').textContent;
    const itemCategoría = item.querySelector('.item-categoria').textContent;

  //Creamos una nueva función para que la misma no sea tan extensa.
  //Toma como parámetros las tres variables que recolectamos.
    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
    }




 //Seleccionamos contenedor y metemos dentro de una variable.
const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
function addItemToShoppingCart(itemTitle, itemPrice, itemImage) {
  //Verificamos
  //console.log(itemTitle, itemPrice, itemImage);

  //Necesitamos que no duplique en la lista los elementos ya presentes, sino que sume a la cantidad.
  // El shoppingCartItemsContainer toma todas las clases shoppingCartItemTitle dentro de una variable llamada elementsTittle
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');

    //Sweet Alert
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: 'Producto agregado al carrito.'
    })
  //Verificamos cada uno d los elementos uqe van llegando.
    for (let i = 0; i < elementsTitle.length; i++) {
    if (elementsTitle[i].innerText === itemTitle) {
      //console.log(elementsTitle[i].innerText);
      //Sube tres elementos div hasta el shoppingCartItem y edsde ahi traemos la clase shoppingCartItemQuantity
      //Busca los elementos que ya existen en el carrito, sino no.
        let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity')
        elementQuantity.value++;

      //REVISAR
      // $('.toast').toast('show');

      //Actualizamos precio al ir sumando
        updateShoppingCartTotal();
      //El return es necesario porque sino se vuelve a repetir el mismo elemento, dado quee el código se sigue ejecutando.
        return;
    }
}


  //Creamos el elemento que crearemos (un div)
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=papita.jpg class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
  //Ahora lo ponemos dentro de la variable creada shoppoiingCardRow
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);

    // //LOCALSTORAGE
    localStorage.setItem('carrito', JSON.stringify(shoppingCartItemsContainer))


  //SopphongCartRow es el div que tiene el shoppingCartContent.

  //Escucha la clase del boton eliminar... Y que escuche el evento click.
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem);
  //Escuchamos la clase shoppingCartItemQuantity... Escucha el evento change y llama a la función quiantityChanged
    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

    updateShoppingCartTotal();
}

 //Actualizamos precio conforme vamos agregando productos
function updateShoppingCartTotal() {
  //Precio inicial
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  //Seleccionamos los elementos que necesitamos, los shoppingCardItem (todos esos elementos, por eso el querySelectorAll)
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
  //Verificamos
  // console.log(updateShoppingCartTotal);

  // //Operaremos con cada uno de ellos
    shoppingCartItems.forEach(shoppingCartItem => {
    //Con una variable seleccionamos el elemento y con otra el valor de ese elemento
    const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    const shoppingCartItemPrice = Number(
      //Reemplazamos el peso por nada.
        shoppingCartItemPriceElement.textContent.replace('$', '')
    );
    //Trabajaremos con las cantidades
    //Traemos el elemento
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    //Seleccionamos solamente el número
    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
    //Precio * cantidad
    total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
  //el fixed es para deterinar la cantidad ed dígitos.
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}

 //Función para eliminar del carrito
function removeShoppingCartItem(event) {
    const buttonClicked = event.target;
  //Verificamos que tome el evento del boton eliminar.
  //console.log(buttonClicked)
  //El elemento mas cercado con la clase shoppingCartItem se elimina.
    buttonClicked.closest('.shoppingCartItem').remove();
  //Necesitamos actualizar el monto sumado del carrito
    updateShoppingCartTotal();

  //Sweet Alert
    const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
    })

    Toast.fire({
    icon: 'error',
    title: 'Producto eliminado del carrito'
    })
}

 //Cambiamos cantidad de elementos de cada tipo en el carrito
function quantityChanged(event) {
    const input = event.target;
  //Nos aseguramos con el if que no haya valores negativos
    if (input.value <= 0) {
    input.value = 1;
    }
  //input.value <= 0 ? (input.value = 1) : null;
  //Actalizamos los precios.
    updateShoppingCartTotal();
}


const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener("click", comprarButtonClicked);

function comprarButtonClicked() {
    //Variamos el carrito
    shoppingCartItemsContainer.innerHTML = '';
    //Actualizamos precio
    updateShoppingCartTotal();
    Swal.fire({
        title: 'Compra realizada con exito!',
        text: 'Agregar métodos de pago',
        icon: 'success',
        confirmButtonText: 'Finalizar compra'
        }
    )
}


