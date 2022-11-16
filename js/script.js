if(localStorage.getItem("la-caja-boba-encuesta_no-mostrar") === null) {
    Swal.fire({
        title: '¿Nos ayudarías contestando una breve encuesta sobre esta herramienta?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si! Vamos a la encuesta!',
        denyButtonText: `No volver a mostrar`,
        cancelButtonText: 'Quizás en un futuro...',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            window.open("https://forms.gle/3KWjrWKT4mLr73L27", '_blank').focus();
        } else if (result.isDenied) {
          localStorage.setItem("la-caja-boba-encuesta_no-mostrar",JSON.stringify(new Date()))
        }
      });
}

console.clear();

let monitor1 = document.getElementById("monitor1");

let dragable = document.getElementById("dragable");
dragable.addEventListener("dragstart", e=> {
  console.log("drag start")
});

dragable.addEventListener("dragend", e=> {
  console.log("drag end")
});

dragable.addEventListener("drag", e=> {
 //console.log("drag");
  //console.log(e)
});

let soltable = document.getElementById("drop");
soltable.addEventListener("dragenter", (e) => {
  console.log("drag enter")

});

soltable.addEventListener("dragleave", (e) => {
  console.log("drag leave")

});

soltable.addEventListener("dragover", (e) => {
  //console.log("drag over")
  e.preventDefault();

});

soltable.addEventListener("drop", (e) => {
  console.log("drag drop");
  soltable.appendChild(dragable);
  soltable.appendChild(monitor1);

  //necesita el preventDefault

});


/*
async function buscar() {
  return await fetch('https://www.youtube.com/results?search_query=c5n+en+vivo');
}

function mostrarResultado (data) {
  console.log(data);
}

let buscar().then(mostrarResultado);
*/

function buscar(buscado) {
  fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAD6_lw_djitCmUxEI8WyNyjvonlUTT57E&q='+buscado+' en vivo')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data['items'][0]['id']['videoId']);
    })
    .catch(err => console.log(err))
}

buscar("c5n");

