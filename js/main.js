const dragAndDrop = new DragAndDrop();

const drag = (event) => dragAndDrop.drag(event);
const allowDrop = (event) => dragAndDrop.allowDrop(event);
const dragEnter = (column) => dragAndDrop.dragEnter(column);
const drop = (event) => dragAndDrop.drop(event);
const updateItem = (id, column) => dragAndDrop.updateItem(id, column);

const inputBox = new InputBox();

const showInputBox = (column) => inputBox.showInputBox(column);
const hideInputBox = (column) => inputBox.hideInputBox(column);

// On Load
updateDOM();
