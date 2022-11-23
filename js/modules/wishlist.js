export default function Wishlist() {
	let editingElement;
	let isEditing = false;

	const alert = document.querySelector('.alert');
	const form = document.querySelector('.wishlist__form');
	const wishlist = document.querySelector('#wishlist');
	const submitButton = document.querySelector('.wishlist__button--submit');
	const container = document.querySelector('.wishlist__container');
	const list = document.querySelector('.wishlist__list');
	const clearButton = document.querySelector('.wishlist__button--clear');
	const sendButton = document.querySelector('.wishlist__button--send');
	const editButton = document.querySelector('.wishlist__button--edit');

	if ( wishlist !== null) {
		form.addEventListener('submit', handleFormSubmit);
		clearButton.addEventListener('click', handleClearButtonClick);
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

	function addItem(event) {
		event.preventDefault();
		const value = wishlist.value;
		
		if(value !== '' && isEditing === false) {
			//create element
			const element = document.createElement('article');
			element.classList.add('wishlist__item');

			element.innerHTML = `<p class="title">${value}</p>
										<div class="wishlist__button-container">
										<button class="wishlist__button--edit">
										<img src="./assets/images/edit.svg" class="wishlist__button--edit-img">
										</button>
										<button class="wishlist__button--delete">
										<img src="../assets/images/trash.svg" class="wishlist__button--trash-img"></button>
										</div>`;

			
			// append child
			list.appendChild(element);

			const editButton = element.querySelector('.wishlist__button--edit');
			const deleteButton = element.querySelector('.wishlist__button--delete');

			deleteButton.addEventListener('click', deleteItem);
			editButton.addEventListener('click', editItem);

			
			container.classList.add('show-container');
			displayAlert('item added to wishlist', 'success');


		}else if(value !== '' && isEditing === true) {
			editingElement.innerHTML = value;
			displayAlert('Value changed', 'success')

		}else {

		}
	}

	function displayAlert(text, action) {
		alert.textContent = text;
		alert.classList.add(`alert-${action}`);

		setTimeout(() => {
			alert.textContent = '';
			alert.classList.remove(`alert-${action}`)
		}, 1500);
	}

	function clearItems() {
		const items = document.querySelectorAll('.wishlist__item');

		if(items.length > 0) {
			for (const item of items ) {
				list.removeChild(item)
				container.classList.remove('show-container');
			}
		}
	}

	function deleteItem(event) {
		const element = event.currentTarget.parentElement.parentElement;
		list.removeChild(element);
		
		if(list.children.length === 0) {
			container.classList.remove('show-container')
		}
		displayAlert('item removed', 'danger');
	}

	function editItem(event) {
		const element = event.currentTarget.parentElement.parentElement;

		editingElement = event.currentTarget.parentElement.previousElementSibling;
		wishlist.value = editingElement.innerHTML;
		submitButton.textContent = 'Edit Item'
		isEditing = true;
	}
	
	function setBackToDefault() {
		wishlist.value = '';
		submitButton.textContent = 'Add Wish';
		isEditing = false;
	}
}