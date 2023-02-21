var createborder = function(context) {
    var sketch = require('sketch');
    var document = sketch.getSelectedDocument();
    var page = document.selectedPage;

    var artboards = page.layers.filter(function(layer) {
      return layer.type === 'Artboard';
    });

    var borderGroup = page.layers.find(function(layer) {
      return layer.name === 'bordergroup';
    });

    if (borderGroup) {
      borderGroup.remove();
    }

    borderGroup = new sketch.Group({
      parent: page,
      name: 'bordergroup',
      locked: true
    });

    for (var i = 0; i < artboards.length; i++) {
      var artboard = artboards[i];
      var rect = new sketch.Rectangle(artboard.frame.x, artboard.frame.y, artboard.frame.width, artboard.frame.height);
      var shape = new sketch.Shape({
        parent: borderGroup,
        frame: rect,
        style: {
          borders: [{
            color: '#666666',
            thickness: 1
          }]
        }
      });
    }
};

/*
var createname = function(context){
  const sketch = require('sketch')
  const document = sketch.getSelectedDocument()
  const selectedPage = document.selectedPage

  // Delete the group if it already exists
  const namegroup = selectedPage.layers.find(layer => layer.name === 'namegroup')
  if (namegroup) {
   namegroup.remove()
  }

  // Create a new group to hold the text layers
  const group = new sketch.Group({
    name: 'namegroup',
    parent: selectedPage,
    locked: true,
  })

  const artboards = selectedPage.layers.filter(layer => layer.type === 'Artboard')

  for (let i = 0; i < artboards.length; i++) {
    const artboard = artboards[i]

    // Create a new text layer with the artboard name
    const text = new sketch.Text({
      text: artboard.name,
      fixedWidth: true,
      frame: {
        x: artboard.frame.x,
        y: artboard.frame.y-56,
        width: artboard.frame.width,
        height: 40,
      },
      style:{
        fontSize: 40,
        lineHeight: 40,
        alignment: "left",
        textColor: "#000000",
      },  
    })
    
    // Add the text layer to the current page
    selectedPage.addLayer(text);
  
    // Move the text layer to the group
    text.moveToLayer_beforeLayer(namegroup, null);
    
  }
}
*/


var createname = function(context){
    // Get the current page
    var currentPage = context.document.currentPage();

    var sketch = require('sketch');
    var document = sketch.getSelectedDocument();
    var page = document.selectedPage;

    // Get all the artboards in the current page
    var artboards = currentPage.artboards();

    var nameGroup = page.layers.find(function(layer) {
      return layer.name === 'namegroup';
    });

    if (nameGroup) {
      nameGroup.remove();
    }


    // Create a group named "namegroup"
    nameGroup = MSLayerGroup.new();
    nameGroup.setName("namegroup");

    // Add the group to the current page
    currentPage.addLayer(nameGroup);

    // Loop through each artboard
    for (var i = 0; i < artboards.count(); i++) {
      var artboard = artboards[i];
      
      // Create a text layer
      var textLayer = MSTextLayer.new();
      textLayer.setStringValue(artboard.name());
      
      // Set the text layer frame
      var frame = textLayer.frame();
      frame.setX(artboard.frame().x());
      frame.setY(artboard.frame().y() -56);
      frame.setWidth(750);
      frame.setHeight(40);
      
      // Set the text size to 40
      textLayer.setFontSize(40);
      
      // Enable word wrap
      textLayer.setTextBehaviour(1);
      
      // Add the text layer to the current page
      //currentPage.addLayer(textLayer);
      nameGroup.addLayer(textLayer);
      
      // Move the text layer to the group
      //textLayer.moveToLayer_beforeLayer(nameGroup, null);
    }

    // Set the group as locked
    nameGroup.setIsLocked(true);
};