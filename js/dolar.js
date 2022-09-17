async function getDolar()  {
const respuesta = await fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales');
const nombre = respuesta.json();
/*console.log(nombre)*/
return nombre;
}

function updateValues(n) {
  /*
  console.log(n)
  console.log(n[0]['casa']['compra']) //oficial
  console.log(n[0]['casa']['venta'])
  console.log(n[1]['casa']['compra']) //blue
  console.log(n[1]['casa']['venta'])
  */
  document.getElementById("oficial-compra").innerHTML = n[0]['casa']['compra'];
  document.getElementById("oficial-venta").innerHTML = n[0]['casa']['venta'];
  document.getElementById("blue-compra").innerHTML = n[1]['casa']['compra'];
  document.getElementById("blue-venta").innerHTML = n[1]['casa']['venta'];
}