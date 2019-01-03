var boxes = document.querySelectorAll('.pick-or-ban-box');
var maps = document.querySelectorAll('.map-selectable');

var dragSrcEl = null;

function handleDragStart(e) {

    if (this.draggable === false) {
        return;
    }

    this.classList.add('map-picked-up');
    
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('map-picked-up');

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

    // Set the source column's HTML to the HTML of the column we dropped on.
    dragSrcEl.innerHTML = '';
    dragSrcEl.classList.remove('map-selectable');
    dragSrcEl.classList.remove('map-picked-up');
    dragSrcEl.draggable = false;

    this.innerHTML = e.dataTransfer.getData('text/html');

    var pick = this.classList.contains('pick');
    if (pick) {
        var audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-25674/zapsplat_impact_slam_hard_metallic_smash_against_001_25974.mp3');
        audio.play();
    } else {
        var audio = new Audio('https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-12634/zapsplat_household_vhs_c_camcorder_cassette_case_open_002_12805.mp3?_=6');
        audio.play();
    }

    setNextAvailable();
  
    return false;
}

function setNextAvailable() {

    var next = false;

    [].forEach.call(boxes, function(box) {

        box.removeEventListener('dragenter', handleDragEnter);
        box.removeEventListener('dragover', handleDragOver);
        box.removeEventListener('dragleave', handleDragLeave);
        box.removeEventListener('drop', handleDrop);

        if (box.classList.contains('available')) {
            box.classList.remove('available');
            box.classList.add('taken');
            next = true;
        } else if (next) {
            box.classList.add('available');
            next = false;
        }

        if (box.classList.contains('available')) {
            box.addEventListener('dragenter', handleDragEnter, false);
            box.addEventListener('dragover', handleDragOver, false);
            box.addEventListener('dragleave', handleDragLeave, false);
            box.addEventListener('drop', handleDrop, false);
        }
    });
}

function wireUpPickAndBanBoxes() {
    [].forEach.call(boxes, function(box) {
        box.removeEventListener('dragenter', handleDragEnter);
        box.removeEventListener('dragover', handleDragOver);
        box.removeEventListener('dragleave', handleDragLeave);
        box.removeEventListener('drop', handleDrop);

        if (box.classList.contains('available')) {
            box.addEventListener('dragenter', handleDragEnter, false);
            box.addEventListener('dragover', handleDragOver, false);
            box.addEventListener('dragleave', handleDragLeave, false);
            box.addEventListener('drop', handleDrop, false);
        }
    });
}

wireUpPickAndBanBoxes();