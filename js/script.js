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

/*
async function buscar() {
  return await fetch('https://www.youtube.com/results?search_query=c5n+en+vivo');
}

function mostrarResultado (data) {
  console.log(data);
}

let buscar().then(mostrarResultado);
*/
let streamsUrls = [];
let streamNames = ["c5n","a24","tn","diputados tv","senadores","ln+"];
//let streamNames = ["c5n"];


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



// function buscarr(buscado) {
//   fetch('https://www.googleapis.com/youtube/v3/search?key=AIzaSyAD6_lw_djitCmUxEI8WyNyjvonlUTT57E&q='+buscado+' en vivo')
//     .then(res => res.json())
//     .then(data => {
//       //console.log(data);

//       for(let i=0;i<5;i++) {
//         let tipo = data['items'][i]['id']['kind'];
//         let id = data['items'][i]['id']['videoId'];
//         if(tipo === "youtube#video") {
//           console.log("bien: " + id)
//           return id;
//         }
          
//         //console.log(tipo + " - " + id);
//       }
//       console.log("ups no")
//       return "nada";
      
//       //console.log(data['items'][0]['id']);

//       // console.log(data['items'][0]['id']['kind'] === "youtube#video")
//       // console.log(data['items'][0]['id']['videoId']);
//       // console.log("--------")
//       // if(data['items'][0]['id']['kind'] === "youtube#video")
//       //   return data['items'][0]['id']['videoId'];
//       // return "nada";
//     })
//     .catch(err => console.log(err))
// }


// streamNames.forEach(e => {
//   streamsUrls =
//   console.log(e);
//   console.log(buscar(e));
// });

// streamsUrls = streamNames.map(e => buscar(e));
// console.log(streamsUrls);


// for(let i=0;i<=5;i++) {
//   streamsUrls[i] = buscar(streamNames[i]);
//   document.getElementById("iframe"+i).src = "https://youtu.be/embed/"+streamsUrls[i];
// }

//console.log(buscar("c5n").then())
// buscar("cronica").then(fullName => {
//   console.log("resp: " + fullName);
// });


// buscar("c5n").then(rtta => {
//   console.log("respuesta: " + rtta)
//   document.getElementById("iframe1").src = "https://youtube.com/embed/"+ rtta;
// });


// buscar("cronica tv").then(rtta => {
//   console.log(rtta);
// });

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

// for(let i = 0;i< streamNames.length -1; i++) {
//   buscar(streamNames[i]).then( rtta => streamsUrls[i] = rtta);
// }

// console.log(streamNames);
// console.log(streamsUrls)


//document.getElementById("iframe6").src = "https://www.youtube.com/embed/dbteiGt_t_4";