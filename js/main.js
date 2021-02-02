// Item Lists
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

// Instance
const update = new UpdateDom();
const dragAndDrop = new DragAndDrop();
const inputBox = new InputBox();

// from UpdateDOM class
const updateDOM = () => update.updateDOM();

// From DragAndDrop class
const drag = (event) => dragAndDrop.drag(event);
const allowDrop = (event) => dragAndDrop.allowDrop(event);
const dragEnter = (column) => dragAndDrop.dragEnter(column);
const drop = (event) => dragAndDrop.drop(event);
const updateItem = (id, column) => dragAndDrop.updateItem(id, column);

// From InputBox class
const showInputBox = (column) => inputBox.showInputBox(column);
const hideInputBox = (column) => inputBox.hideInputBox(column);

// On Load
updateDOM();
