export default function Wishlist() {
	let wishlistStorageName = "my-wishlist";
	let wishlistItems = getWishlistFromLocal();
	let isEditing = false;
	let isConfirmed = false;
	let isShowingAlert = false;
	let editID = '';

	const alertMessage = document.querySelector('.wishlist__popup-alert');								
	const wishlistSubmitButton = document.querySelector('.wishlist__form');
	const wishlistInput = document.querySelector('.wishlist__input');							
	const submitButton = document.querySelector('.wishlist__button-submit');
	const wishlistContainer = document.querySelector('.wishlist__container');					
	const wishlistListContainer = document.querySelector('.wishlist__list');
	const clearButton = document.querySelector('.wishlist__button-clear');
	const sendButton = document.querySelector('.wishlist__button-send');
	const flyingSanta = document.querySelector('.wishlist__flying-santa');				
	const sentMessage = document.querySelector('.wishlist__sent');

	if (wishlistListContainer !== null) {
		wishlistSubmitButton.addEventListener('submit', handleWishlistSubmitButtonSubmit);
		clearButton.addEventListener('click', handleClearButtonClick);
		sendButton.addEventListener('click', handleSendButtonClick);
	}

	/**
	 * Controls what happens when the wish/edit button is clicked in the wishlist. What happens varies depending on the input and whether or not editingMode is on.
	 * 
	 * @param {*} event prevents default actions that belongs to the submit action in a form.
	 * @see enableEditingMode()
	 */
	function handleWishlistSubmitButtonSubmit(event) {
		event.preventDefault();

		if (wishlistInput.value === '') {
			displayAlert('Please add a wish', 'danger')
		} else if (isEditing) {
			editWishlistItem();
			disableEditingMode();
			storeWishlistLocal();
			displayAlert('Wish edited', 'success');
		} else {
			addNewWishlistItem();
			storeWishlistLocal();
			displayAlert('Wish added to wishlist', 'success');
		}

		renderHTML();
	}

	/**
	 * Controls everything that happens when the user want to delete an item from the wishlist.
	 * 
	 * @param {string} event Gives us the exact item that is clicked
	 */
	function handleDeleteButtonClick(event) {
		const wishlistItem = event.currentTarget.parentElement.parentElement;
		const wishlistItemID = wishlistItem.dataset.id;

		deleteWishlistItem(wishlistItemID);
		storeWishlistLocal();
		displayAlert('Wish removed', 'danger');
		renderHTML();
	}

	/**
	 * Controls everything that happenns when the user want to edit an item from the wishlist.
	 * 
	 * @param {string} event Gives us the exact item that is clicked
	 */
	function handleEditButtonClick(event) {
		const wishlistItem = event.currentTarget.parentElement.parentElement;
		const wishlistItemID = wishlistItem.dataset.id;

		enableEditingMode(wishlistItemID);
		renderHTML();
	}

	/**
	 * Controls what happenns when the user want to clear the wishlist.
	 */
	function handleClearButtonClick() {
		clearWishlistItems();
		clearWishlistLocal();
		displayAlert('wishlist is empty', 'danger');
		renderHTML();
	}

	/**
	 * Controls what happenns when the user want to send the wishlist.
	 */
	function handleSendButtonClick() {
		clearWishlistItems();
		clearWishlistLocal();
		renderHTML();
		sentWishlistConfirmation();
	}

	/**
	 * Takes the value from the input and pushes it to an array of all the wishlist items together with a unique ID saves it to local storage.
	 */
	function addNewWishlistItem() {
		//creates a random string sequence to use as ID
		const wishlistItemID = Math.random().toString(32).slice(2);
		const wishlistInputvalue = wishlistInput.value;
		
		wishlistItems.push({
			id: wishlistItemID,
			name: wishlistInputvalue
		});
	}

	/**
	 * Finds the ID of the element that is being edited and changes its value to the new input value.
	 */
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
	 * Clears all items from the wishlist and the local storage by replacing the existing array with an empty array.
	 */
	function clearWishlistItems() {
		wishlistItems = [];
	}
	

	/**
	 * Takes the value and ID of a wishlist item and creates the DOM-element we see on the wishlist.
	 * 
	 * @param {object} item The item from the wishlistItems array that needs to be created as a DOMelement
	 * @returns itemContainer - The div with all the information and styling needed for the item to be visible in the DOM.
	 * @see wishlistItems
	 */
	function returnWishlistDOMElement(item) {
		//create wishlist DOM element
		const itemContainer = document.createElement('div');

		itemContainer.classList.add('wishlist__item');
		itemContainer.setAttribute('data-id', item.id);
		itemContainer.innerHTML = `
			<p class="title">${item.name}</p>

			<div class="wishlist__button-container">
				<button class="wishlist__button-edit">
					<img src="./assets/icons/edit.png" class="wishlist__button-edit-img">
				</button>
				
				<button class="wishlist__button-delete">
					<img src="../assets/icons/trash.png" class="wishlist__button-trash-img">
				</button>
			</div>`;

		const editButton = itemContainer.querySelector('.wishlist__button-edit');
		const deleteButton = itemContainer.querySelector('.wishlist__button-delete');

		deleteButton.addEventListener('click', handleDeleteButtonClick);
		editButton.addEventListener('click', handleEditButtonClick);

		return itemContainer;
	}
	
	/**
	 * The only function that makes changes to the DOM. Every action and change to the DOM will be handled with this function.
	 */
	function renderHTML() {
		// reset main values
		wishlistListContainer.innerHTML = '';
		wishlistInput.value = '';

		// finds the element that is being edited and puts its value in the input field and changes its value to whatever the new input is. Also changes the submit button text if item is being edited.
		if (isEditing) {
			const editingElement = wishlistItems.find(item => item.id === editID);

			wishlistInput.value = editingElement.name;
			submitButton.textContent = 'Edit';
		} else {
			submitButton.textContent = 'Wish';
		}

		// show delete/send/item controls only if wishlist elements exist
		if (wishlistItems.length > 0) {
			wishlistContainer.classList.add('show-container');
		} else {
			wishlistContainer.classList.remove('show-container');
		}

		/**
		 * Gets the created wishlist DOM-elements from returnWishlistDOMelement() and displays them
		 * @see returnWishlistDOMElement()
		 */
		for (const item of wishlistItems) {
			const wishlistDOMElement = returnWishlistDOMElement(item);
			wishlistListContainer.appendChild(wishlistDOMElement);
		}
	}


	/**
	 * Displays an alert message on the top of the wishlist for two seconds.
	 * 
	 * @param {string} text The message to display
	 * @param {string} action The 'success' or 'danger', each contected to a class with a different styling giving the alert a different color depending the action.
	 */
	function displayAlert(text, action) {
		alertMessage.textContent = text;
		alertMessage.classList.add(`wishlist__popup-alert-${action}`);

		setTimeout(() => {
			alertMessage.textContent = '';
			alertMessage.classList.remove(`wishlist__popup-alert-${action}`)
		}, 2000);
	}

	/**
	 * Turns on editing mode when the edit button/icon is clicked
	 * 
	 * @param {string} id an unique string of number that gives us the exact item that is being edited.
	 */
	function enableEditingMode(id) {
		isEditing = true;
		editID = id;
	}

	/**
	 * disables the editing mode when we are done editing an item.
	 */
	function disableEditingMode() {
		isEditing = false;
		editID = null;
	}
	
	/**
	 * Shows popUp modal confirming that the wishlist has been sent and starts the flying santa animation
	 */
	function sentWishlistConfirmation() {
		sentMessage.style.display = 'block';
		flyingSanta.classList.add('wishlist__flying-santa-animation');
	}

	/**
	 * Sees if there are any elements in the local storage and returns them.
	 * 
	 * @returns either all the items that are stored in the local storage or an ampty arrays if there are no items saved yet.
	 */
	function getWishlistFromLocal() {
		const storedWishlist = window.localStorage.getItem(wishlistStorageName);

		if (storedWishlist) {
			return JSON.parse(storedWishlist);
		} else {
			return [];
		}
	}

	/**
	 * Takes our array of wishlist items and pushes it to the local storage
	 */
	function storeWishlistLocal() {
		window.localStorage.setItem(wishlistStorageName, JSON.stringify(wishlistItems));
	}

	/**
	 * Clears the local storage of any data
	 */
	function clearWishlistLocal() {
		window.localStorage.clear(wishlistStorageName);
	}

	/**
	 * Renders at least once after loading the module for the first time.
	 * 
	 * @see renderHTML()
	 */
	if (wishlistListContainer !== null) {
		renderHTML();
	}
}