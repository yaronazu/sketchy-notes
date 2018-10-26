const UI = require('sketch/ui')
const sketch = require('sketch')

export default function() {
    var point = CGPointToObject(mouseInCanvasViewForDocument(context.document));
    //console.log(point.x);
    var tmpArray = [];

    var document = sketch.getSelectedDocument()
    var symbols = document.getSymbols()

    for(var i=0; i<document.selectedPage.layers[0].layers.length; i++){
        document.selectedPage.layers[0].layers[i].selected = false;
    }

    const symbolMaster = symbols[0]

    const instance = symbolMaster.createNewInstance();
    instance.frame.x = point.x;
    instance.frame.y =  point.y;
    instance.parent = document.selectedPage.layers[0];
    instance.selected = true;
    tmpArray.push(instance);

    //console.log('instance:', instance);
    UI.message('Note added');

    function mouseInCanvasViewForDocument(document) {
        var mouseInWindow = document.documentWindow().convertScreenToBase(NSEvent.mouseLocation());
        return document.contentDrawView().convertPoint_fromView(mouseInWindow,null);    
    }
    
    function CGPointToObject(point) {
        return {
            x: point.x.doubleValue(),
            y: point.y.doubleValue()
        }
    }
    
    // Alternative approach with the same result
    /*
    function CGPointToObject(point) {
        return {
            x: point.x + 0,
            y: point.y + 0
        }
    }
    */
    
    var point = CGPointToObject(mouseInCanvasViewForDocument(context.document));
    console.log(point);
    /*console.log(toString.call(point));*/
    console.log('x:', point.x);
    console.log('y:', point.y);
}