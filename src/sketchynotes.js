import BrowserWindow from 'sketch-module-web-view'
const UI = require('sketch/ui')
const sketch = require('sketch')

export default function() {
  /*var document = sketch.getSelectedDocument()
  var symbols = document.getSymbols()

  const symbolMaster = symbols[0]

  const instance = symbolMaster.createNewInstance()
  instance.parent = document.selectedPage*/


  const options = {
    identifier: 'unique.id',
    x:60,
    y:90,
    width: 680,
    height: 480,
    show: false,  
    resizable: false,
    vibrancy: 'light',
    movable: true
  }

  var browserWindow = new BrowserWindow(options)

  // only show the window when the page has loaded
  browserWindow.once('ready-to-show', () => {
    browserWindow.show();
  })

  const webContents = browserWindow.webContents

  // print a message when the page loads
  webContents.on('did-finish-load', () => {
    UI.message('Sketchy Notes v1.01');

    
  })

  webContents.on('copyMessage', () => {
    UI.message('Copy to clipboard!');
  })

  // add a handler for a call from web content's javascript
  webContents.on('loadNotes', (s) => {
    var document = require('sketch/dom').getSelectedDocument();
    var page = document.selectedPage;
    var layers = page.layers;
    var artboardNotes = [];
    var artboardNames = [];
    var layersList = [];

    for(var k=0;k<layers.length;k++){
        var artboard = layers[k].layers; 
        artboardNotes[k] = [];
        layersList[k] = [];
        artboardNames.push(layers[k].name);
        for (var i=0;i<artboard.length;i++){ 
          if(artboard[i].name.substring(0, 1) == "$"){
              console.log(artboard[i]);
              artboardNotes[k].push(artboard[i].overrides[0].value);
              layersList[k].push(artboard[i]);
          }
      }
    }

    //Write the notes in the web view
    webContents.executeJavaScript('writeNotes('+JSON.stringify(artboardNotes, artboardNames)+')');

    webContents.on('navigatePosts', (artboardIndex, noteIndex) => {
      console.log(artboardIndex, noteIndex);
      console.log(layersList[artboardIndex][noteIndex]);
      document.sketchObject.contentDrawView().setZoomValue(1.5);
      document.centerOnLayer(layersList[artboardIndex][noteIndex]);
      //document.centerOnLayer(document.selectedPage.layers[artboardIndex].layers[noteIndex+1]);
      
    })

    webContents.on('removePost', (artboardIndex, noteIndex) => {
      document.sketchObject.contentDrawView().setZoomValue(0.5);
      document.centerOnLayer(document.selectedPage.layers[0]);
      UI.message('Note removed');
      layersList[artboardIndex][noteIndex].remove();
      webContents.executeJavaScript('removeNoteView()');
      //layersList[artboardIndex].splice(noteIndex, 1);
    })

    webContents.on('toggleView', (s) => {
        for (var i=0;i< layers[0].layers.length;i++){ 
          if(layers[0].layers[i].name.substring(0, 1) == "$"){
            if(layers[0].layers[i].hidden == true){
              layers[0].layers[i].hidden = false;
            }else{
              layers[0].layers[i].hidden = true;
            }
          }
        }
    })
  })

  browserWindow.loadURL(require('../resources/webview.html'));
}
