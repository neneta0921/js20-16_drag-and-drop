class UpdateDom {
  // Get Arrays from localStorage if available, set default values if not
  _getSavedColumns() {
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
  _updateSavedColumns() {
    arrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const names = ['backlog', 'progress', 'complete', 'onHold'];
    arrays.forEach((array, index) => {
      localStorage.setItem(`${names[index]}Items`, JSON.stringify(array));
    });
  }

  // Filter Arrays to remove empty items
  _filterArray(array) {
    const filteredArray = array.filter((item) => item !== null);
    return filteredArray;
  }

  // Create DOM Elements for each list item
  _createItemEl(columnEl, column, item, index) {
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

  _createItems(list, array, number) {
    list.textContent = '';
    array.forEach((item, index) => {
      this._createItemEl(list, number, item, index);
    });
    array = this._filterArray(array);
  }

  // Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
  updateDOM() {
    // Check localStorage once
    if (!updatedOnLoad) {
      this._getSavedColumns();
    }

    // Create DOM Elements for each list item
    const lists = [backlogList, progressList, completeList, onHoldList];
    const arrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    lists.forEach((list, index) => {
      this._createItems(list, arrays[index], index);
    });

    // Run getSavedColumns only once, Update Local Storage
    updatedOnLoad = true;
    this._updateSavedColumns();
  }
}
