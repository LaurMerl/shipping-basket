//Some environment settings
window.onload = function (event) {
	//Checking if the cookie obj is initialized = previous configuration
	if (document.cookie) {
		modalAlert();
	}

	//Storing for the first time the value of all the items
	localStorage.setItem("Apple", JSON.stringify({ "price": 0.25, "quantity": 1, "sale": "" }));
	localStorage.setItem("Banana", JSON.stringify({ "price": 0.30, "quantity": 1, "sale": "" }));
	localStorage.setItem("Orange", JSON.stringify({ "price": 0.15, "quantity": 1, "sale": "" }));
	localStorage.setItem("Papaya", JSON.stringify({ "price": 0.50, "quantity": 1, "sale": "3x2" }));
};

function renderTableRecipt(recipt) {
	var finalString = "";
	var date = new Date();;
	finalString += `<h2>Laura's Grocery Shop</h2>
									<em>`+ date + `</em>
									<table class="bill">`;

	var cookie = parseCookies();

	for (let key in cookie) {
		if (cookie.hasOwnProperty(key)) {
			cookieName = JSON.parse(cookie[key]);

			var name = document.getElementById(`price${key}`).value;
			finalString += `<tr>
													<td>`+ key + `</td>
													<td>`+ cookieName["price"] + ` x </td>
													<td>`+ cookieName["quantity"] + `</td>
													<td>`+ cookieName["sale"] + `</td>
													<td>€ `+ document.getElementById(`price${key}`).innerHTML + `</td>
											</tr>`
		}
	}
	finalString += `</table>
									<p>Total amount due: ` + document.getElementById("totalAmount").innerHTML + `</p>
									<h3><i>"The grocery store is the great equalizer where mankind comes to grips with the facts of life, like toilet tissue."</i></h3>`;

	return finalString;
}

// Update the partial cost for items of the same type
function partial_cost() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("totalAmount").innerHTML = this.responseText;
		}
	};
	if (document.cookie.length > 0) {
		xhttp.open("GET", "http://localhost:3000/getResult/" + document.cookie, true);
	} else {
		xhttp.open("GET", "http://localhost:3000/getResult/", true);
	}
	xhttp.send();
}

//Local calculation of the item result
function partialItem(name, price, quantity) {
	if (document.cookie.length > 0) {
		var theCookies = document.cookie.split(';');
		var aString = '';
		var partialCost = 0;
		for (var i = 1; i <= theCookies.length; i++) {
			aString = theCookies[i - 1];
			var finalSplit = aString.split('=');

			if (((JSON.parse(finalSplit[1]).sale).length !== 0) && (finalSplit[0] === "Papaya")) {
				document.getElementById(`price${name}`).innerHTML = ((quantity - Math.floor(quantity / 3) * 3) * price + Math.floor(quantity / 3) * price * 2).toFixed(2);;
			} else {
				document.getElementById(`price${name}`).innerHTML = (price * quantity).toFixed(2);
			}
		}
	}
}

//Sending all the data before crating the recipt
function sendCookie() {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:3000/sendBasketOrder/" + document.cookie, true);
	xhttp.send();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			modalMessage(xhttp.responseText);
		}
	};
}

// Subtract 1 unity from the amount
function sub(name) {
	let actualQuantity = document.getElementById("qty" + name).value;
	var newQuantity = parseInt(actualQuantity) - 1;
	var actualPartial = document.getElementById("price" + name).value;
	var newPartial = parseInt(actualPartial) + parseInt(document.getElementById("priceUnity" + name).value);

	objectItem = JSON.parse(localStorage.getItem(`${name}`));

	if (actualQuantity <= 1) {
		modalDelete(name);
		deleteItem(name);
		deleteCookie(name);
	}
	else {
		document.getElementById("qty" + name).value = newQuantity;
		document.getElementById("price" + name).value = newQuantity;

		document.cookie = `${name}=` + JSON.stringify({ "price": objectItem.price, "quantity": newQuantity, "sale": objectItem.sale });
	}
	console.log(objectItem.quantity)
	/* if (objectItem.quantity == 1) {
		deleteItem(name)
	} else {
		partialItem(name, objectItem.price, newQuantity);
	} */
	partial_cost();
};

// Add 1 unity from the amount
function add(name) {
	let actualQuantity = document.getElementById("qty" + name).value;
	var newQuantity = parseInt(actualQuantity) + 1;
	document.getElementById("qty" + name).value = newQuantity;

	objectItem = JSON.parse(localStorage.getItem(`${name}`));

	document.cookie = `${name}=` + JSON.stringify({ "price": objectItem.price, "quantity": newQuantity, "sale": objectItem.sale });

	partialItem(name, objectItem.price, newQuantity);
	partial_cost();
};

//Check if a element has a class
function hasClass(element, cls) {
	return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

//Delete all the items with no modalPopUp
function deleteAllItems(name) {
	//console.log('deleteAllItems', name)
	var table = document.getElementById("basketTable");
	var rows = table.rows;

	for (var i = 1; i < rows.length; i++) {
		table.deleteRow(i);
	}

	//Removing all the white spaces inherited from the class name
	name = name.trim();
	//Enabling the button choice from the items list
	var partial = name.toLowerCase() + 'Button';
	document.getElementById(partial).removeAttribute("disabled");

	deleteCookie(name);
	partial_cost();
}

// Delete the whole row of an item from the desired list
function deleteItem(name) {
	var table = document.getElementById("basketTable");
	var row = document.getElementsByClassName(`row${name}`);
	row[0].classList.add("toBeDeleted");
	//console.log(name, row);

	//Checking the actual row that have to be deleted
	var rows = table.rows;
	var index = -1;

	for (var i = 0; i < rows.length; i++) {
		var riga = rows[i];
		if (rows[i].classList.contains('toBeDeleted')) {
			index = i;
		}
	}

	//Enabling the button choice from the items list
	var partial = name.toLowerCase() + 'Button';
	document.getElementById(partial).removeAttribute("disabled");
	modalDelete(name);

	table.deleteRow(index);
	deleteCookie(name);
	partial_cost();
}

//Rendering all the saved rows
function renderRow() {
	var cookies = document.cookie.split(";");

	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i];
		var eqPos = cookie.indexOf("=");
		var name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).replace(/\s/g, '');
		addProductToTable(name);
	}
}

function addItem(name, objectItem) {
	//adding the row of an item
	var table = document.getElementById("basketTable");
	var row = table.insertRow(1);

	row.classList.add(`row${name}`);
	var cell1 = row.insertCell(0).innerHTML = name;
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var cell5 = row.insertCell(4);

	//Adding the new itemRow
	cell1.innerHTML = name;
	cell2.innerHTML = `<td>&#8364;<em name='price' class='price' id='priceUnity${name}'/>` + objectItem.price + `</em></td>`;
	cell3.innerHTML = `<td>
											<i class='fa fa-minus' title='Decrease Qty' onClick='sub("${name}")'></i>
											<input class='qty' value='` + objectItem.quantity + `' id='qty${name}' readonly/>
											<i class='fa fa-plus' title='Increase Qty' onClick='add("${name}")'></i>
										</td>`;
	cell4.innerHTML = `<td>&#8364;<em name='price' class='price' id='price${name}'/></em></td>`;
	cell5.innerHTML = `<td><i class='fa fa-trash-o' title='Delete Item' onClick='modalDelete("${name}")'></i></td>`;

	cell5.className += " last";

	partialItem(name, objectItem.price, objectItem.quantity);
	partial_cost();
}

function addProductToTable(name) {
	//Disabling the button choice from the items list
	var partial = name.toLowerCase() + 'Button';
	document.getElementById(partial).setAttribute("disabled", "disabled");

	//Getting the right obj stored in localStorage
	var objectItem;

	if (getCookie(name)) {
		addItem(name, JSON.parse(getCookie(name)))
	} else {
		objectItem = JSON.parse(localStorage.getItem(`${name}`));
		document.cookie = `${name}=` + JSON.stringify({ "price": objectItem.price, "quantity": objectItem.quantity, "sale": objectItem.sale });
		addItem(name, objectItem)
	}
};

function clearAllBasket() {
	cookieNameArray = getAllCookiesName();
	cookieNameArray.forEach(function (name) {
		//console.log(name)
		deleteAllItems(name)
	});
	//console.log(document.cookie)
	//deleteAllCookies();
};