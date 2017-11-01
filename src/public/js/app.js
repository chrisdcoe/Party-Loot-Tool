
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
      const data = {items: items};
      const html = compiledTemplate(data);
      $('#list-container').html(html);
    })
}

// Toggle the Add Item form
function toggleAddItemForm() {
  toggleAddItemFormVisibility();
}

// Toggle visibility of the form
function toggleAddItemFormVisibility() {
  $('#form-container').toggleClass('hidden');
}

// Submit Add Item data to DB
function submitItemForm() {
  const name = $('#item-name').val();
  const value = $('#item-value').val();
  const itemData = {
    name: name,
    value: value,
  };
  console.log("Your item data: ", itemData);

  $.ajax({
    type: "POST",
    url: '/api/loot',
    data: JSON.stringify(itemData),
    dataType: 'json',
    contentType: 'application/json',
  })
    .done(function(response) {
      console.log("Posted the data");
      refreshItemList();
      toggleAddItemFormVisibility();
    })
    .fail(function(error) {
      console.log("Error POSTing data", error);
    });
}

// Cancel the Add Item form, toggle visibility
function cancelItemForm() {
  toggleAddItemFormVisibility();
}
