// FORM-MODULE TO HANDLE THE FORM

var formmodule = (
    function() {
      var formobject = {};
      const formelement = document.getElementById("form-input"); // MY FORM ID
      const inputelement = document.getElementById("add-input"); // MY INPUT ID
      
      //function to get the value of the new activity
      formobject.getValue = function() {
        inputvalue = inputelement.value;
        formobject.val = inputvalue;
        return inputvalue;
      }
      return formobject;
    }()
  );