class DragAndDrop {
  // Drag Functionality
  constructor() {
    this._draggedItem;
    this._dragging = false;
    this._currentColumn;
  }

  // When Item Starts Dragging
  drag(e) {
    this._draggedItem = e.target;
    this._dragging = true;
  }

  // Column Allows for Item to Drop
  allowDrop(e) {
    e.preventDefault();
  }

  // When Item Enters Columns Area
  dragEnter(column) {
    listColumns[column].classList.add('over');
    this._currentColumn = column;
  }

  // Dropping Item in Column
  drop(e) {
    e.preventDefault();

    // Remove Background Color/Padding
    listColumns.forEach((column) => {
      column.classList.remove('over');
    });

    // Add Item to Column
    const parent = listColumns[this._currentColumn];
    parent.append(this._draggedItem);

    // Dragging Complete
    this._dragging = false;
    this._rebuildArrays();
  }

  // Allows arrays to reflect Drag and Drop items
  _rebuildArrays() {
    backlogListArray = Array.from(backlogList.children).map((i) => i.textContent);
    progressListArray = Array.from(progressList.children).map((i) => i.textContent);
    completeListArray = Array.from(completeList.children).map((i) => i.textContent);
    onHoldListArray = Array.from(onHoldList.children).map((i) => i.textContent);
    updateDOM();
  }

  // Update Item - Delete if necessary, or update Array value
  updateItem(id, column) {
    const selectedArray = arrays[column];
    const selectedColumnEl = listColumns[column].children;
    if (!this._dragging) {
      if (!selectedColumnEl[id].textContent) {
        delete selectedArray[id];
      } else {
        selectedArray[id] = selectedColumnEl[id].textContent;
      }
      updateDOM();
    }
  }
}
