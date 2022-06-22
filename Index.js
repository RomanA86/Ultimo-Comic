const mockApiURL = "https://62a42be947e6e400638d7100.mockapi.io/api/usuarios";

const cajaPrincipal = document.getElementById("cajaPrincipal");
const btnMenu = document.querySelector("#btnMenu");
const menuList = document.querySelector("#menuList");
const inputUser = document.getElementById("InputUser");
const InputEmail = document.getElementById("InputEmail");
const InputPassword = document.getElementById("InputPassword");
const btnSubmit = document.getElementById("btnSubmit");
const btnCarrito = document.getElementById('btn-carrito');
const tabla = document.getElementById('tabla');
const contadorCarrito = document.getElementById('contador-carrito');
const precios = document.getElementById('precios');
const btnEmpty = document.getElementById('btnEmpty');
const btnCompraCarrito = document.getElementById('btnCompraCarrito');




let carrito = [];
let acumulador = 0;
let contador = 0;

contadorCarrito.textContent = contador; 

btnEmpty.addEventListener('click',()=>{
  tabla.innerHTML = "";
  acumulador = 0;
  precios.textContent = acumulador;
  contador = 0;
  contadorCarrito.textContent = contador;

});

btnCompraCarrito.addEventListener('click', ()=>{
  tabla.innerHTML = "";
  acumulador = 0;
  precios.textContent = acumulador;
  contador = 0;
  contadorCarrito.textContent = contador;
  alert('Gracias por su compra, vuelva pronto!');
})

btnCarrito.addEventListener('click',(e)=>{

  carrito.forEach((producto)=>{
    let precioProducto = parseInt(producto.precio, 10);
    acumulador = acumulador + precioProducto;
    let fila = document.createElement('tr');
    let cruz = document.createElement('button');
    let col1 = document.createElement('td');
    let col2 = document.createElement('td');

    precios.textContent = acumulador;
    col1.textContent = producto.nombre;
    col2.textContent = producto.precio;
    cruz.textContent = 'X';
    cruz.className = 'btn btn-danger';
    cruz.addEventListener('click',()=>{
      eliminarDelCarrito(producto.nombre);
    });
    
    fila.append(col1);
    fila.append(col2);
    fila.append(cruz);
    tabla.append(fila);
  })
})

function eliminarDelCarrito(nombre){
  
    let item = carrito.find(prod => prod.nombre === nombre);
    let precioProducto = parseInt(item.precio, 10);
    acumulador = acumulador - precioProducto;
    precios.textContent = acumulador;

    
    let indice = carrito.indexOf(item);
    carrito.splice(indice, 1);

    tabla.innerHTML = "";
    carrito.forEach((producto)=>{
    
      let fila = document.createElement('tr');
      let cruz = document.createElement('button');
      let col1 = document.createElement('td');
      let col2 = document.createElement('td');
  
      col1.textContent = producto.nombre;
      col2.textContent = producto.precio;
      cruz.textContent = 'X';
      cruz.className = 'btn btn-danger';
  
      cruz.addEventListener('click',()=>{
        eliminarDelCarrito(producto.nombre);
      });
      
      fila.append(col1);
      fila.append(col2);
      fila.append(cruz);
      tabla.append(fila);
    })
    contador = contador - 1;
  contadorCarrito.textContent = contador;
}


btnMenu.addEventListener('click', () => menuList.classList.toggle("hidden-menu"));

async function getUsers() {
  const response = await fetch(mockApiURL);
  let data = await response.json();
  return data;
}

function createCards(name, avatar, Descripcion, precio) {
//CREACION
 let card = document.createElement('div');
 let img = document.createElement('img');
 let cardBody = document.createElement('div');
 let title = document.createElement('h5');
 let description = document.createElement('p');
 let price = document.createElement('p');
 let btnBuy = document.createElement('button');
//CLASEO
card.className = 'card mx-4 px-0';
img.className = 'card-img-top';
cardBody.className = 'card-body';
title.className = 'card-title';
description.className = 'card-text';
btnBuy.className = 'btn btn-carrito';
//TEXTEO
img.setAttribute('src', avatar);
title.textContent = name;
description.textContent = Descripcion;
price.textContent = precio;
btnBuy.textContent = 'Comprar';
//Agergo al carrito
btnBuy.addEventListener('click',(e)=>{
  agregoAlCarrito(name);
  contador = contador + 1;
  contadorCarrito.textContent = contador;
});
//APENDEO
cardBody.append(title);
cardBody.append(description);
cardBody.append(price);
cardBody.append(btnBuy);
card.append(img);
card.append(cardBody);
document.getElementById('cajaPrincipal').append(card);

return card;
}

function agregoAlCarrito(name){
  let usuarios = getUsers();
  usuarios.then((respuesta) => {
    let item = respuesta.find((prod)=> prod.nombre === name);
    carrito.push(item);
    });
    console.log('se agrego al carrito');
}

function loadUsers() {
  let usuarios = getUsers();
  usuarios.then((respuesta) => {
    respuesta.forEach((usuario) => {
      createCards(usuario.nombre, usuario.foto, usuario.descripcion, usuario.precio);
    });
  });
}




loadUsers();
btnSubmit.addEventListener("click", (e)=>{
  e.preventDefault();
  console.log('me hicite cli');
  if (inputUser.value === "Admin" && InputEmail.value === "admin@gmail.com" && InputPassword.value === "12345"){
    alert('Ingreso exitoso');
    let a = document.createElement("a");
    let li = document.createElement("li");
    a.setAttribute("href", "http://127.0.0.1:5500/admin.html");
    a.textContent = "Administración";
    li.append(a);
    menuList.append(li);
  }
})

