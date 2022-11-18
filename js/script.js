

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


let streamsUrls = [];
let streamNames = ["c5n","a24","tn","diputados tv","senadores","ln+"];


async function buscar(buscado) {
  const response = await fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAD6_lw_djitCmUxEI8WyNyjvonlUTT57E&q='+buscado+' en vivo', {});
  //console.log('response.status: ', response.status); //
  if(response.status === 403) {
    console.log("sin couta para la api");
  }
  const data = await response.json();
  for(let i=0;i<5;i++) {
    let tipo = data['items'][i]['id']['kind'];
    let id = data['items'][i]['id']['videoId'];
    //console.log(tipo + " - " + id);
    if(tipo === "youtube#video") {
      //console.log("bien: " + id)
      return id;
    }
  }
  //console.log("ups no")
  return "nada";

 // return json.first_name.concat(' ').concat(json.last_name);
  //return "retornando";
}


buscar("c5n").then(rtta => {
  console.log("a24: " + rtta)
  document.getElementById("iframe1").src = "https://youtube.com/embed/"+ rtta;
});

buscar("a24").then(rtta => {
  console.log("a24: " + rtta)
  document.getElementById("iframe2").src = "https://youtube.com/embed/"+ rtta;
});

buscar("tn").then(rtta => {
  console.log("tn: " + rtta)
  document.getElementById("iframe3").src = "https://youtube.com/embed/"+ rtta;
});

buscar("diputados tv").then(rtta => {
  document.getElementById("iframe4").src = "https://youtube.com/embed/"+ rtta;
});

buscar("camara senadores").then(rtta => {
  document.getElementById("iframe5").src = "https://youtube.com/embed/"+ rtta;
});

buscar("ln+").then(rtta => {
  document.getElementById("iframe6").src = "https://youtube.com/embed/"+ rtta;
});





/*************************************************************************************************/

/*
console.clear();

//let monitor1 = document.getElementById("monitor1");

//let dragable = document.getElementById("dragable");
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

//let soltable = document.getElementById("drop");
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
*/

let iframedragable = document.getElementById("iframedragable");
//iframedragable.dataset.id = 2;

iframedragable.addEventListener("dragstart", e=> {
  console.log("drag start");
  e.dataTransfer.setData("id",e.target.id);
  console.log("enviando: " + e.target.id);
});

let iframedragable2 = document.getElementById("iframedragable2");
//iframedragable.dataset.id = 2;

iframedragable2.addEventListener("dragstart", e=> {
  console.log("drag 2 start");
  e.dataTransfer.setData("id",e.target.id);
  console.log("enviando 2: " + e.target.id);
});


//let dragable = document.getElementById("dragable");
// iframedragable.addEventListener("dragstart", e=> {
//   console.log("drag start": e)
// });

//console.log("data: " + iframedragable.dataset.id)

let tvGrande = document.getElementById("tvGrande");
tvGrande.addEventListener("dragenter", (e) => {
  console.log("drag enter")
});

tvGrande.addEventListener("dragover", (e) => {
  e.preventDefault();
  e.target.classList.add("if-hover");
});

tvGrande.addEventListener("dragleave", (e) => {
  console.log("drag leave")
  e.target.classList.remove("if-hover");

});

tvGrande.addEventListener("drop", (e) => {
  console.log("drag drop");
  e.target.classList.remove("if-hover");

  //soltable.appendChild(dragable);
  //soltable.appendChild(monitor1);

  //necesita el preventDefault
  let data = e.target.dataset.id;
  console.log("data: " + data);


  let recibido = e.dataTransfer.getData("id");
  console.log("rec: " + recibido);

  let elementoAMover = document.getElementById(recibido);
  tvGrande.appendChild(elementoAMover);
  document.getElementById("main-container-2").removeChild(elementoAMover)
  
  //document.getElementById("")





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
