// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  const validation = $("form[name='add-item-form']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      item-name: "required",
      item-value: {
        required: true,
        number: true
      },
      item-quantity: {
        required: true,
        number: true
      }
    },
    // Specify validation error messages
    messages: {
      item-name: "Please name this item",
      lastname: {
        required: "Please enter a value",
        number: "Value must be a number"
      }
      quantity: {
        required: "Please enter a quantity",
        number: "Quantity must be a number"
      }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});
