
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
