const UI = require('sketch/ui')
const sketch = require('sketch')

export default function() {
    var document = sketch.getSelectedDocument()
    var symbols = document.getSymbols()

    const symbolMaster = symbols[0]

    const instance = symbolMaster.createNewInstance()
    instance.parent = document.selectedPage.layers[0]
}