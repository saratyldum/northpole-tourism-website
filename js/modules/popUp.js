export default function PopUp() {
	const popUp = document.querySelector('.popUp');
	const closeButton = document.querySelector('.popUp__close-button');
	const blur = document.querySelector('#blur');

	closeButton.addEventListener('click', handleCloseButtonClick);

	function handleCloseButtonClick() {
		closePopUp();
	}

	function closePopUp() {
		popUp.close();
	}

	function showPopUp() {
		popUp.showModal();
	}
	setTimeout(showPopUp, 2000)

	//closer den automatisk
	// function hidePopUpTime() {
	// 	popUp.style.display = 'none'
	// }
	// setTimeout(closePopUp, 10000)
	
}