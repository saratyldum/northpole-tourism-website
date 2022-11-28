export default function Dragdown() {
	let clicked = false;
	
	const biggerDevice = window.matchMedia('(min-width: 768px)');
	const dragdownButton = document.querySelector('.countdown__dragdown--button');
	const dragdown = document.querySelector('.countdown__dragdown');

	if (dragdownButton !== null) {
		biggerDevice.addEventListener('change', handleDeviceChange);
		dragdownButton.addEventListener('click', handleDradownButtonClick);
	}



	function handleDradownButtonClick() {
		handleDeviceChange(biggerDevice);
	}
	
	function handleDeviceChange(biggerDevice) {
		if(biggerDevice.matches) {
			showCountdownBiggerScreen();
		} else {
			showCountdownMobile();
		}
	}


	/**
	 * Makes countdown viisble by dragging it down
	 * 
	 */
	function showCountdownMobile() {
		clicked = !clicked;
		console.log(clicked);

		if(clicked) {
			dragdown.style.transform = 'translate(0, 0)';
		}else {
			dragdown.style.transform = 'translate(0, -100%)';		
		}
	}
	function showCountdownBiggerScreen() {
		clicked = !clicked;

		if(clicked) {
			dragdown.style.transform = 'translate(0, 0)';
		}else {
			dragdown.style.transform = 'translate(100%, 0)';		
		}
	}
	


	/**
	 * shows modal after 2 seconds
	 */
	// if (popUp !== null) {
	// 	setTimeout(showPopUp, 2000)
	// }

	//closer den automatisk
	// function hidePopUpTime() {
	// 	popUp.style.display = 'none'
	// }
	// setTimeout(closePopUp, 10000)
	
}