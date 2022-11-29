export default function Wishlist() {
	let editingElement;
	let isEditing = false;
	let editID = '';

	const alert = document.querySelector('.alert');
	const form = document.querySelector('.wishlist__form');
	const wishlist = document.querySelector('#wishlist');
	const submitButton = document.querySelector('.wishlist__button--submit');
	const container = document.querySelector('.wishlist__container');
	const list = document.querySelector('.wishlist__list');
	const clearButton = document.querySelector('.wishlist__button--clear');
	const sendButton = document.querySelector('.wishlist__button--send');
	const editButton = document.querySelector('.wishlist__button--edit');
	const flyingSanta = document.querySelector('.flying-santa');
	const sentMessage = document.querySelector('.wishlist__sent');

	if ( wishlist !== null) {
		form.addEventListener('submit', handleFormSubmit);
		clearButton.addEventListener('click', handleClearButtonClick);
		sendButton.addEventListener('click', handleSendButtonClick);
		window.addEventListener('DOMContentLoaded', setupItems);
	}


	function handleFormSubmit(event) {
		addItem(event);
		setBackToDefault();

	}

	function handleClearButtonClick() {
		clearItems();
		displayAlert('wishlist is empty', 'danger');
		setBackToDefault();
	}

	function handleSendButtonClick() {
		clearItems();
		setBackToDefault();
		sentWishlistConfirmation();
	}

	/**
	 * Adds or edits items in/to the wishlist depending on the values and adds them to or edits the local storage
	 * 
	 * @param {*} event 
	 *  
	 */
	function addItem(event) {
		event.preventDefault();
		const value = wishlist.value;

		//creates a random number that works as ID
		const id = new Date().getTime().toString();
		
		if(value !== '' && isEditing === false) {
			createListItem(id, value)
			
			container.classList.add('show-container');
			displayAlert('Wish added to wishlist', 'success')
			addToLocalStorage(id, value);


		}else if(value !== '' && isEditing === true) {
			editingElement.innerHTML = value;
			displayAlert('Wish changed', 'success')
			editLocalStorage(editID, value);
			setBackToDefault();
		}else {
			displayAlert('Please add a wish', 'danger')
		}
	}

	/**
	 * Creates an item and adds it to the wishlist, or grabs an already existing item and changes its value
	 * 
	 * @param {string} id The unique ID the element we want to add (or edit) has
	 * @param {string} value the input from the wishlist
	 */

	function createListItem(id, value) {
		//create element
		const element = document.createElement('article');
		element.classList.add('wishlist__item');
		//giveb id
		const attribute = document.createAttribute('data-id');
		attribute.value = id;
		element.setAttributeNode(attribute);

		element.innerHTML = `<p class="title">${value}</p>
									<div class="wishlist__button-container">
									<button class="wishlist__button--edit">
									<img src="./assets/icons/edit.png" class="wishlist__button--edit-img">
									</button>
									<button class="wishlist__button--delete">
									<img src="../assets/icons/trash.png" class="wishlist__button--trash-img"></button>
									</div>`;

		list.appendChild(element);

		const editButton = element.querySelector('.wishlist__button--edit');
		const deleteButton = element.querySelector('.wishlist__button--delete');

		deleteButton.addEventListener('click', deleteItem);
		editButton.addEventListener('click', editItem);
	}

	/**
	 * Displays an alert message on the top of the wishlist for two seconds
	 * 
	 * @param {string} text The message to display
	 * @param {string} action The 'success' or 'danger', each contected to a class with a different styling giving the alert a different color depending the action.
	 */
	function displayAlert(text, action) {
		alert.textContent = text;
		alert.classList.add(`alert-${action}`);

		setTimeout(() => {
			alert.textContent = '';
			alert.classList.remove(`alert-${action}`)
		}, 2000);
	}

	/**
	 * Clears all items from the wishlist and the local storage
	 */
	function clearItems() {
		const items = document.querySelectorAll('.wishlist__item');

		if(items.length > 0) {
			for (const item of items ) {
				list.removeChild(item)
			}
			container.classList.remove('show-container');
			localStorage.removeItem('list');
		}
	}

	/**
	 * Deletes selected item from the wishlist and local storage
	 * 
	 * @param {*} event Gives us the exact item that is clicked
	 */
	function deleteItem(event) {
		const element = event.currentTarget.parentElement.parentElement;
		const id = element.dataset.id;
		list.removeChild(element);
		
		if(list.children.length === 0) {
			container.classList.remove('show-container')
		}
		displayAlert('item removed', 'danger');
		removeFromLocalStorage(id);
	}

	/**
	 * Edits the value of an existing item on the wishlist
	 * 
	 * @param {*} event Gives us the item we want to edit
	 */
	function editItem(event) {
		const element = event.currentTarget.parentElement.parentElement;

		editingElement = event.currentTarget.parentElement.previousElementSibling;
		wishlist.value = editingElement.innerHTML;
		submitButton.textContent = 'Edit'
		isEditing = true;
		editID = element.dataset.id;
	}

	/**
	 * Shows popUp modal confirming that the wishlist has been sent
	 */
	function sentWishlistConfirmation() {
		sentMessage.style.display = 'block';
		flyingSanta.classList.add('flying-santa__animation');
	}
	
	/**
	 * Sets all values back to their default state
	 */
	function setBackToDefault() {
		wishlist.value = '';
		submitButton.textContent = 'Wish';
		isEditing = false;
		editID = '';
	}


	/************** LOCAL STORAGE **************/

	/**
	 * Saves items that are added to the wishlist to the Local Storage
	 * 
	 * @param {string} id The unique ID the element we want to add has
	 * @param {string} value the input from the wishlist
	 */
	function addToLocalStorage(id, value) {
		const wish = { id:id, value:value }
		let items = getLocalStorage();
		
		items.push(wish);
		localStorage.setItem('list', JSON.stringify(items))
	}

	/**
	 * Gets information from the local storage and removes the chosen item from there
	 * 
	 * @param {string} id The unique ID the element we want to remove has
	 * 
	 * @see getLocalStorage()
	 */
	function removeFromLocalStorage(id) {
		let items = getLocalStorage();

		items = items.filter(function(item) {
			if(item.id !==id) {
				return item;
			}
		});
		localStorage.setItem('list', JSON.stringify(items))
	}

	/**
	 * Gets information from the local storage and edits the relevant key value pairs in when the value is changed in the wishlist
	 * 
	 * @param {string} id The unique ID the element we want to edit has
	 * @param {string} value the new input from the wishlist we want the value to change to 
	 * 
	 * @see getLocalStorage()
	 */
	function editLocalStorage(id, value) {
		let items = getLocalStorage();
		items = items.map(function(item) {
			if(item.id === id) {
				item.value = value;
			}
			return item;
		});
		localStorage.setItem('list', JSON.stringify(items))
	}

	/**
	 * Gives us all the key value pairs we have in our local storage
	 * 
	 * @returns the list of key value pairs we have in the local storage
	 */
	function getLocalStorage() {
		return localStorage.getItem('list') 
		? JSON.parse(localStorage.getItem('list'))
		: [];
	}

	/**
	 * Takes the items from the local storage and cre
	 * @todo Få til å funke??
	 */
	function setupItems() {
		let items = getLocalStorage();
		if(items.length > 0) {
			items.forEach(function (item) {
				createListItem(item.id, item.value)
			});

			container.classList.add('show-container');
		}
	}
 }