// Disable the context menu to have a more native feel
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

window.postMessage('loadNotes', 'Called from the webview');

document.getElementById('id-name--1').addEventListener('click', function () {
  window.postMessage('toggleView', 'Called from the webview');
  setToggle();
})

window.removeNoteView = function (){
  //UI.message('removeNoteView')
  //var elem = document.getElementById("artboard-"+artboardIndex+"-note-"+noteIndex);
  //elem.parentNode.removeChild(elem);
}

window.writeNotes = function (artboardNotes, artboardName) {
  //sketch.UI.message('here');
  const artboardLis = artboardNotes.map(
    (notes, i) => {
      return notes.map((note, j) => {
        //return `<li id="artboard-${i}-note-${j}">${note}</li>`
        return `<div class="note-block" id="artboard-${i}-note-${j}"><p class="note-item">${note}</p><div class="copy-button" id="copy-${i}-note-${j}">copy</div><div class="close-button" id="remove-${i}-note-${j}"></div></div>`
        /* <div class="note-block">
               <p class="note-item">Thing to do now</p>
               <div class="close-button">
               </div>
           </div>*/
      })
    }
  )

  document.getElementById('note-list').innerHTML = artboardLis.map(lis => lis.join('')).join('');

  /*document.getElementById('answer').innerHTML = `<ul>` + 
    artboardLis.map(lis => lis.join('')).join('') 
    + `</ul>`;*/


  artboardLis.forEach((lis, i) => {
    
    //document.getElementById('yaron').innerHTML = artboardName[i];
    lis.forEach((_, j) => {
      const noteEl = document.getElementById(`artboard-${i}-note-${j}`).getElementsByClassName("note-item")[0];
      const removeEl = document.getElementById(`remove-${i}-note-${j}`);
      const copyEl = document.getElementById(`copy-${i}-note-${j}`)
      noteEl.addEventListener("click", () => {
        //noteEl.innerHTML += "qweqwe"
        // code that call back into sketch
        window.postMessage('navigatePosts', i, j);
      })

      removeEl.addEventListener("click", (e) => {
        // code that call back into sketch
        var elem = document.getElementById("artboard-"+i+"-note-"+j);
        elem.parentNode.removeChild(elem);
        window.postMessage('removePost', i, j);
        
        var notes = document.getElementsByClassName("note-block");
        if(notes.length==0){
          document.getElementById("note-list").className += ' note-empty-state';
        }

        /*var element = document.getElementsByClassName("note-list");
        if(element.classList.contains('note-block')){
         
        }*/
      })

      copyEl.addEventListener("click", (e) => {
        // code that call back into sketch;
        //var elem = document.getElementById("artboard-"+i+"-note-"+j);
        //var child = elem.getElementsByClassName("note-item");
        window.postMessage('copyMessage');

        var targetDiv = document.getElementById("artboard-"+i+"-note-"+j).getElementsByClassName("note-item")[0];

        const el = document.createElement('textarea');
        el.value = targetDiv.innerHTML;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        targetDiv.select();
        document.execCommand("copy");

        
      })
    })
  })
}


