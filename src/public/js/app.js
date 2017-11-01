
// Get the item list
function getItems() {
  return $.ajax('/api/loot')
    .then(res => {
      console.log("Results from getItems()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getItems()", err);
      throw err;
    });
}

// Refresh the item list
function refreshItemList() {
  const template = $('#list-template').html();
  const compiledTemplate = Handlebars.compile(template);

  getItems()
    .then(items => {
      window.itemList = items;
      const data = {items: items};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

// Toggle the Add Item form
function toggleAddItemForm() {
  setFormData({});
  toggleAddItemFormVisibility();
}

// Toggle visibility of the form
function toggleAddItemFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

// Submit Add Item data to DB
function submitItemForm() {
  const itemData = {
    name: $('#item-name').val(),
    value: $('#item-value').val(),
    _id: $('#item-id').val(),
  };

  let method, url;
  if (itemData._id) {
    method = 'PUT';
    url = '/api/loot/' + itemData._id;
  } else {
    method = 'POST';
    url = '/api/loot';
  }

  $.ajax({
    type: method,
    url: url,
    data: JSON.stringify(itemData),
    dataType: 'json',
    contentType: 'application/json',
  })
    .done(function(response) {
      refreshItemList();
      toggleAddItemForm();
    })
    .fail(function(error) {
      console.log("Error POSTing data", error);
    });
}

// Cancel the Add Item form, toggle visibility
function cancelItemForm() {
  toggleAddItemFormVisibility();
}

// Edit Item button
function editItemClick(id) {
  const item = window.itemList.find(item => item._id === id);
  if (item) {
    setFormData(item);
    toggleAddItemFormVisibility();
  } else {
    console.log("Failed to find", id)
  }
}

// Delete Item button
function deleteItemClick(id, name) {
  if (confirm(name + "\rReally delete this item?")) {
    $.ajax({
      type: 'DELETE',
      url: '/api/loot/' + id,
      dataType: 'json',
      contentType: 'application/json',
    })
    .done(function(response) {
      console.log("Item", id, "has been trashed.");
      refreshItemList();
    })
    .fail(function(error) {
      console.log("Failed to delete item", error);
    })
  }
}

// Set the form's data. This is reusable.
function setFormData(data) {
  data = data || {};

  const item = {
    name: data.name || '',
    value: data.value || '',
    _id: data._id || '',
  };

  $('#item-name').val(item.name);
  $('#item-value').val(item.value);
  $('#item-id').val(item._id);
}
