export default function Wishlist() {
	// array of objects { name: "", id: "" }
	let wishlistStorageName = "my-wishlist";
	let wishlistItems = getWishlistFromLocal();
	let isEditing = false;
	let isConfirmed = false;
	let isShowingAlert = false;
	let editID = '';

	/**
	 * @TODO	rename classes that don't adhere to BEM naming system
	 */

	const alert = document.querySelector('.alert');									// too vague
	const form = document.querySelector('.wishlist__form');
	const wishlistInput = document.querySelector('#wishlist');							// inconsistents
	const submitButton = document.querySelector('.wishlist__button--submit');
	const wishlistContainer = document.querySelector('.wishlist__container');					// remove __E
	const wishlistListContainer = document.querySelector('.wishlist__list');
	const clearButton = document.querySelector('.wishlist__button--clear');
	const sendButton = document.querySelector('.wishlist__button--send');
	const flyingSanta = document.querySelector('.flying-santa');				// inconsistent
	const sentMessage = document.querySelector('.wishlist__sent');

	if (wishlist) {
		form.addEventListener('submit', handleFormSubmit);
		clearButton.addEventListener('click', handleClearButtonClick);
		sendButton.addEventListener('click', handleSendButtonClick);
	}

	// handle Wish/Edit button click
	function handleFormSubmit(event) {
		event.preventDefault();

		if (wishlistInput.value === '') {
			displayAlert('Please add a wish', 'danger')
		} else if (isEditing) {
			editWishlistItem();
			disableEditingMode();
			storeWishlistLocal();
			displayAlert('Edited wish', 'success');
		} else {
			addNewWishlistItem();
			storeWishlistLocal();
			displayAlert('Wish added to wishlist', 'success');
		}

		renderHTML();
	}

	function handleDeleteButtonClick(event) {
		const wishlistItem = event.currentTarget.parentElement.parentElement;
		const wishlistItemID = wishlistItem.dataset.id;

		deleteWishlistItem(wishlistItemID);
		storeWishlistLocal();
		displayAlert('Wish removed', 'danger');
		renderHTML();
	}

	function handleEditButtonClick(event) {
		const wishlistItem = event.currentTarget.parentElement.parentElement;
		const wishlistItemID = wishlistItem.dataset.id;

		enableEditingMode(wishlistItemID);
		renderHTML();
	}

	function handleClearButtonClick() {
		clearWishlistItems();
		clearWishlistLocal();
		displayAlert('wishlist is empty', 'danger');
		renderHTML();
	}

	function handleSendButtonClick() {
		clearWishlistItems();
		clearWishlistLocal();
		renderHTML();
		sentWishlistConfirmation();
	}

	function addNewWishlistItem() {
		//creates a random string sequence to use as ID
		const wishlistItemID = Math.random().toString(32).slice(2);
		const wishlistInputvalue = wishlistInput.value;
		
		wishlistItems.push({
			id: wishlistItemID,
			name: wishlistInputvalue
		});
	}

	function editWishlistItem() {
		const currentlyEditingIndex = wishlistItems.findIndex(item => item.id === editID);
		wishlistItems[currentlyEditingIndex].name = wishlistInput.value;
	}

	/**
	 * Deletes selected item from the wishlist and local storage
	 * 
	 * @param {*} event Gives us the exact item that is clicked
	 */
	function deleteWishlistItem(id) {
		const indexOfItem = wishlistItems.findIndex(item => item.id === id);
		wishlistItems.splice(indexOfItem, 1);
	}

	/**
	 * Clears all items from the wishlist and the local storage
	 */
	function clearWishlistItems() {
		wishlistItems = [];
	}
	

	function returnWishlistDOMElement(item) {
		//create wishlist DOM element
		const itemContainer = document.createElement('div');

		itemContainer.classList.add('wishlist__item');
		itemContainer.setAttribute('data-id', item.id);
		itemContainer.innerHTML = `
			<p class="title">${item.name}</p>

			<div class="wishlist__button-container">
				<button class="wishlist__button--edit">
					<img src="./assets/icons/edit.png" class="wishlist__button--edit-img">
				</button>
				
				<button class="wishlist__button--delete">
					<img src="../assets/icons/trash.png" class="wishlist__button--trash-img">
				</button>
			</div>`;

		const editButton = itemContainer.querySelector('.wishlist__button--edit');
		const deleteButton = itemContainer.querySelector('.wishlist__button--delete');

		deleteButton.addEventListener('click', handleDeleteButtonClick);
		editButton.addEventListener('click', handleEditButtonClick);

		return itemContainer;
	}
	
	function renderHTML() {
		// reset misc values
		wishlistListContainer.innerHTML = '';
		wishlistInput.value = '';

		// handle controls if editing a wishlist item
		if (isEditing) {
			const editingElement = wishlistItems.find(item => item.id === editID);

			wishlistInput.value = editingElement.name;
			submitButton.textContent = 'Edit';
		} else {
			submitButton.textContent = 'Wish';
		}

		// show controls only if wishlist elements exist
		if (wishlistItems.length > 0) {
			wishlistContainer.classList.add('show-container');
		} else {
			wishlistContainer.classList.remove('show-container');
		}

		// show wishlist elements
		for (const item of wishlistItems) {
			const wishlistDOMElement = returnWishlistDOMElement(item);
			wishlistListContainer.appendChild(wishlistDOMElement);
		}
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
	 * Edits the value of an existing item on the wishlist
	 * 
	 * @param {*} event Gives us the item we want to edit
	 */
	function enableEditingMode(id) {
		isEditing = true;
		editID = id;
	}

	function disableEditingMode() {
		isEditing = false;
		editID = null;
	}
	
	/**
	 * Shows popUp modal confirming that the wishlist has been sent
	 */
	function sentWishlistConfirmation() {
		sentMessage.style.display = 'block';
		flyingSanta.classList.add('flying-santa__animation');
	}

	function getWishlistFromLocal() {
		const storedWishlist = window.localStorage.getItem(wishlistStorageName);

		if (storedWishlist) {
			return JSON.parse(storedWishlist);
		} else {
			return [];
		}
	}

	function storeWishlistLocal() {
		window.localStorage.setItem(wishlistStorageName, JSON.stringify(wishlistItems));
	}

	function clearWishlistLocal() {
		window.localStorage.clear(wishlistStorageName);
	}

	renderHTML();
}