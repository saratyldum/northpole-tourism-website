export default function Dragdown() {
	let clicked = false;
	
	const biggerDevice = window.matchMedia('(min-width: 768px)');
	const dragdownButton = document.querySelector('.countdown-container__button');
	const dragdown = document.querySelector('.countdown-container');

	if (dragdownButton !== null) {
		biggerDevice.addEventListener('change', handleDeviceChange);
		dragdownButton.addEventListener('click', handleDradownButtonClick);
	}



	function handleDradownButtonClick() {
		clicked = !clicked;
		handleDeviceChange(biggerDevice);
	}
	
	function handleDeviceChange(biggerDevice) {
		showCountdown(biggerDevice);
	}


	/**
	 * Makes countdown viisble by dragging it down. Tha direction varies depending on the screen size
	 * 
	 */

	function showCountdown(biggerDevice) {
		if(biggerDevice.matches && clicked) {
			dragdown.style.transform = 'translate(0, 0)';
		}else if(biggerDevice.matches && !clicked) {
			dragdown.style.transform = 'translate(100%, 0)';		
		}else if(!biggerDevice.matches && clicked) {
			dragdown.style.transform = 'translate(0, 0)';
		}else if(!biggerDevice.matches && !clicked) {
			dragdown.style.transform = 'translate(0, -100%)';		
		}
	}
}