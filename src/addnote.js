const UI = require('sketch/ui')
const sketch = require('sketch')

export default function() {
    var tmpArray = [];

    var document = sketch.getSelectedDocument()
    var symbols = document.getSymbols()

    for(var i=0; i<document.selectedPage.layers[0].layers.length; i++){
        document.selectedPage.layers[0].layers[i].selected = false;
    }

    const symbolMaster = symbols[0]

    const instance = symbolMaster.createNewInstance();
    instance.parent = document.selectedPage.layers[0];
    instance.selected = true;
    tmpArray.push(instance);

    //console.log('instance:', instance);
    //UI.message('Note added');
}