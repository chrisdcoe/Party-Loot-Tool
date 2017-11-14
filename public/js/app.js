// Get the item list
function getItems() {
  return $.ajax('/api/loot')
    .then(res => {
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
      $('#total-container').html("<strong>Total:</strong> "
       + getTotalValue() + " gp");

    });
}

// Sum up the total GP value (each item's value * quantity)
function getTotalValue() {
  let totalValue = 0;
  $("li.data-item").each(function(){
    const thisValue = $(this).find(".thisValue").html();
    const thisQuantity = $(this).find(".thisQuantity").html();
    totalValue = totalValue + (+thisValue * +thisQuantity);
  });
  return totalValue;
}

// Toggle the Add Item form
function toggleAddItemForm() {
  setFormData({});
  toggleAddItemFormVisibility();
}

// Toggle visibility of the form
function toggleAddItemFormVisibility() {
  $('#form-container').toggle();
}

// Submit Add Item data to DB
function submitItemForm() {
  const itemData = {
    name: $('#item-name').val() || 'Item',
    value: Number($('#item-value').val()),
    quantity: parseInt($('#item-quantity').val()),
    description: $('#item-description').val(),
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
    value: data.value || 0,
    quantity: data.quantity || 1,
    description: data.description || '',
    _id: data._id || '',
  };

  $('#item-name').val(item.name);
  $('#item-value').val(item.value);
  $('#item-quantity').val(item.quantity);
  $('#item-description').val(item.description);
  $('#item-id').val(item._id);
}

// Toggle item description through button click
function toggleDescriptionClick()
{
  $(document.activeElement).parent().parent().parent().siblings("div.card").toggle();
}
