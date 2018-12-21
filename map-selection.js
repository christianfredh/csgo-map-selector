var boxes = document.querySelectorAll('.pick-or-ban-box');
var maps = document.querySelectorAll('.map-selectable');

var dragSrcEl = null;

function handleDragStart(e) {
    this.classList.add("map-picked-up");
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', this.innerHTML);
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragEnd(e) {
    this.classList.remove("map-picked-up");

    [].forEach.call(boxes, function(box) {
        box.classList.remove('over');
    });
}

[].forEach.call(maps, function(map) {
    map.addEventListener('dragstart', handleDragStart, false);
    map.addEventListener('dragend', handleDragEnd, false);
});

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}
  
function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.
  
    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
  
    return false;
  }

[].forEach.call(boxes, function(box) {
    box.addEventListener('dragenter', handleDragEnter, false);
    box.addEventListener('dragover', handleDragOver, false);
    box.addEventListener('dragleave', handleDragLeave, false);
    box.addEventListener('drop', handleDrop, false);
});