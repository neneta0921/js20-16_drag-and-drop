class InputBox {
  constructor() {
    this._addBtns = document.querySelectorAll('.add-btn:not(.solid)');
    this._saveItemBtns = document.querySelectorAll('.solid');
    this._addItemContainers = document.querySelectorAll('.add-container');
  }

  // Show Add Item Input Box
  showInputBox(column) {
    this._addBtns[column].style.visibility = 'hidden';
    this._saveItemBtns[column].style.display = 'flex';
    this._addItemContainers[column].style.display = 'flex';
  }

  // Hide Item Input Box
  hideInputBox(column) {
    this._addBtns[column].style.visibility = 'visible';
    this._saveItemBtns[column].style.display = 'none';
    this._addItemContainers[column].style.display = 'none';
    this._addToColumn(column);
  }

  // Add to Column List, Reset Input box
  _addToColumn(column) {
    const addItems = document.querySelectorAll('.add-item');
    const itemText = addItems[column].textContent;
    const selectedArray = arrays[column];

    selectedArray.push(itemText);
    addItems[column].textContent = '';
    updateDOM();
  }
}
