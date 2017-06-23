//Populationg the modal DOM item
function myModal() {
  //Selecting the modal in DOM document
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    closeMyModal();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      closeMyModal();
    }
  }
}

//Cosing the Modal
function closeMyModal() {
  document.getElementById('myModal').style.display = "none";
}

//DeleteModal type settings
function modalDelete(name) {
  myModal();

  //Styling with the correct classes
  document.getElementsByClassName("modal-title")[0].className += " warning";
  document.getElementsByClassName("modal-footer")[0].className += " warning";

  //Adding the text
  document.getElementsByClassName("modal-title")[0].innerHTML = "<p>Delete request</p>";
  document.getElementsByClassName("modal-body")[0].innerHTML = "Are you sure you want to delete " + name + " item from your basket?";
  document.getElementsByClassName("modal-footer")[0].innerHTML = `<button type="button" onclick="yesDeleteAnswer('${name}')">Yes</button>
																																	<button type="button" onclick="noDeleteAnswer()">Nope</button>`;
}

//AlertModal type settings
function modalAlert() {
  myModal();

  //Styling with the correct classes
  document.getElementsByClassName("modal-title")[0].className += " alert";
  document.getElementsByClassName("modal-footer")[0].className += " alert";

  //Adding the text
  document.getElementsByClassName("modal-title")[0].innerHTML = "<p>Oooops, it looks like you have left something in the basket</p>";
  document.getElementsByClassName("modal-body")[0].innerHTML = "Do you wanna continue with the previous purchase?";
  document.getElementsByClassName("modal-footer")[0].innerHTML = `<button type="button" onclick="yesModalAlertAnswer()">Yes</button>
																																	<button type="button" onclick="noModalAlertAnswer()">Nope</button>`;
};

//MessageModal type settings
function modalMessage(recipt) {
  myModal();

  //Styling with the correct classes
  document.getElementsByClassName("modal-title")[0].className += " messages";
  document.getElementsByClassName("modal-footer")[0].className += " messages";

  //Adding the text
  document.getElementsByClassName("modal-title")[0].innerHTML = "<p>Thank you for your purchase! Here there is your bill:</p>";
  document.getElementsByClassName("modal-body")[0].innerHTML = renderTableRecipt(recipt);
  document.getElementsByClassName("modal-footer")[0].innerHTML = '<h2>See you soon!</h2>'
};


function yesDeleteAnswer(name) {
  deleteCookie(name);
  deleteItem(name);
  closeMyModal();
  partial_cost();
};

function noDeleteAnswer() {
  closeMyModal();
};

function yesModalAlertAnswer() {
  renderRow();
  closeMyModal();
};

function noModalAlertAnswer() {
  deleteAllCookies();
  closeMyModal();
};

function yesModalWarningAnswer() {
  deleteAllCookies();
  closeMyModal();
};

function noModalWarningAnswer() {
  //deleteAllCookies();
};
