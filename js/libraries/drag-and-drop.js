// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// function rebuildArray(array, list) {
//   array = Array.from(list.children).map((i) => i.textContent);
// }

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  backlogListArray = Array.from(backlogList.children).map((i) => i.textContent);
  progressListArray = Array.from(progressList.children).map((i) => i.textContent);
  completeListArray = Array.from(completeList.children).map((i) => i.textContent);
  onHoldListArray = Array.from(onHoldList.children).map((i) => i.textContent);
  updateDOM();
}

// When Item Starts Dragging
function drag(e) {
  draggedItem = e.target;
  dragging = true;
}

// Column Allows for Item to Drop
function allowDrop(e) {
  e.preventDefault();
}

// When Item Enters Columns Area
function dragEnter(column) {
  listColumns[column].classList.add('over');
  currentColumn = column;
}

// Dropping Item in Column
function drop(e) {
  e.preventDefault();

  // Remove Background Color/Padding
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });

  // Add Item to Column
  const parent = listColumns[currentColumn];
  parent.append(draggedItem);

  // Dragging Complete
  dragging = false;
  rebuildArrays();
}
