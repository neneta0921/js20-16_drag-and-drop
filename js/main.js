const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');

// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let arrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// Set localStorage Arrays
function updateSavedColumns() {
  arrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const names = ['backlog', 'progress', 'complete', 'onHold'];
  arrays.forEach((array, index) => {
    localStorage.setItem(`${names[index]}Items`, JSON.stringify(array));
  });
}

// Filter Arrays to remove empty items
function filterArray(array) {
  const filteredArray = array.filter((item) => item !== null);
  return filteredArray;
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute('ondragstart', 'drag(event)');
  listEl.setAttribute('contenteditable', 'true');
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
  // Append
  columnEl.appendChild(listEl);
}

function createItems(list, array, number) {
  list.textContent = '';
  array.forEach((item, index) => {
    createItemEl(list, number, item, index);
  });
  array = filterArray(array);
}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }

  const lists = [backlogList, progressList, completeList, onHoldList];
  const arrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  lists.forEach((list, index) => {
    createItems(list, arrays[index], index);
  });

  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Update Item - Delete if necessary, or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
}

// Add to Column List, Reset Input box
function addToColumn(column) {
  const addItems = document.querySelectorAll('.add-item');
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];

  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();
}

// Show Add Item Input Box
function showInputBox(column) {
  addBtns[column].style.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}

// Hide Item Input Box
function hideInputBox(column) {
  addBtns[column].style.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

function rebuildArray(array, list) {
  array = Array.from(list.children).map((i) => i.textContent);
}

// Allows arrays to reflect Drag and Drop items
function rebuildArrays() {
  const arrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const lists = [backlogList, progressList, completeList, onHoldList];
  arrays.forEach((array, index) => {
    rebuildArray(array, lists[index]);
  });
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

// On Load
updateDOM();
