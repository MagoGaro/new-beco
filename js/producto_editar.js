fetch('http://localhost:4000/categorias') 
  .then(response => response.json())
  .then(categories => {
    //console.log(categories)

    const categorySelect = document.getElementById('categoria');

    for (const category of categories) {
        //console.log(category)
        categorySelect.innerHTML += `<option value="${category.id}">${category.nombre}</option>`;
    }

    document.getElementById('categoria').selectedIndex = parseInt(decodeURIComponent(data[5][1]))-1
    
  })
  .catch(error => {
    console.error('Error fetching categories:', error);
    
  });


let argurl = location.search.split('&');

let data = [];

for(let x = 0; x < argurl.length; x++){
    data[x] = argurl[x].split('=');
}

//console.log(data)



document.getElementById('id').value = decodeURIComponent(data[0][1])
document.getElementById('nombre').value = decodeURIComponent(data[1][1])
document.getElementById('precio').value = decodeURIComponent(data[2][1])
document.getElementById('stock').value = decodeURIComponent(data[3][1])
document.getElementById('imagen').value = decodeURIComponent(data[4][1])





function modificar(){
    let id = document.getElementById('id').value;
    let n = document.getElementById('nombre').value;
    let p = document.getElementById('precio').value;
    let s = document.getElementById('stock').value;
    let i = document.getElementById('imagen').value;
    let c = document.getElementById('categoria').value;

    let producto ={
        nombre: n,
        precio: p,
        stock: s,
        imagen: i,
        categoria: c
    };

    let url= 'http://localhost:4000/productos/'+id;
    let options = {
        body: JSON.stringify(producto),
        method: 'PUT',
        headers: {'Content-Type':'application/json'}
    }

    fetch(url, options)
    .then(function(){
        alert("Producto modificado exitosamente");
        window.location.href = './productos.html'
    }).catch(error =>{
        alert('No pudo modificarse el prodcto');
        console.error(error);
    })
}
