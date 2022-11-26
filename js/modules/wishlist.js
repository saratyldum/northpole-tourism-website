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
	const modal = document.querySelector('.wishlist__modal');

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
		openModal();
	}

	function addItem(event) {
		event.preventDefault();
		const value = wishlist.value;
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

	function displayAlert(text, action) {
		alert.textContent = text;
		alert.classList.add(`alert-${action}`);

		setTimeout(() => {
			alert.textContent = '';
			alert.classList.remove(`alert-${action}`)
		}, 2000);
	}

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

	function editItem(event) {
		const element = event.currentTarget.parentElement.parentElement;

		editingElement = event.currentTarget.parentElement.previousElementSibling;
		wishlist.value = editingElement.innerHTML;
		submitButton.textContent = 'Edit'
		isEditing = true;
		editID = element.dataset.id;
	}

	function openModal() {
		modal.showModal()
	}
	
	function setBackToDefault() {
		wishlist.value = '';
		submitButton.textContent = 'Wish';
		isEditing = false;
		editID = '';
	}

	/************** LOCAL STORAGE **************/

	function addToLocalStorage(id, value) {
		const wish = { id:id, value:value }
		let items = getLocalStorage();
		
		items.push(wish);
		localStorage.setItem('list', JSON.stringify(items))
	}

	function removeFromLocalStorage(id) {
		let items = getLocalStorage();

		items = items.filter(function(item) {
			if(item.id !==id) {
				return item;
			}
		});
		localStorage.setItem('list', JSON.stringify(items))
	}

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

	function getLocalStorage() {
		return localStorage.getItem('list') 
		? JSON.parse(localStorage.getItem('list'))
		: [];
	}

	function setupItems() {
		let items = getLocalStorage();
		if(items.lenght > 0) {
			items.forEach(function (item) {
				createListItem(item.id, item.value)
			});

			container.classList.ass('show-container');
		}
	}
	

	function createListItem(id, value) {
		//create element
		const element = document.createElement('article');
		element.classList.add('wishlist__item');
		//lag id
		const attribute = document.createAttribute('data-id');
		attribute.value = id;
		element.setAttributeNode(attribute);

		element.innerHTML = `<p class="title">${value}</p>
									<div class="wishlist__button-container">
									<button class="wishlist__button--edit">
									<img src="./assets/images/edit.svg" class="wishlist__button--edit-img">
									</button>
									<button class="wishlist__button--delete">
									<img src="../assets/images/trash.svg" class="wishlist__button--trash-img"></button>
									</div>`;

		list.appendChild(element);

		const editButton = element.querySelector('.wishlist__button--edit');
		const deleteButton = element.querySelector('.wishlist__button--delete');

		deleteButton.addEventListener('click', deleteItem);
		editButton.addEventListener('click', editItem);
	}
 }