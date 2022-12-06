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
	
	/**
	 * Checks if screen size is smaller or bigger than the media query set and return true/false depending on outcome.
	 * 
	 * @param {boolean} biggerDevice shows true or false depending on if the screen size matches the min-width set.
	 */
	function handleDeviceChange(biggerDevice) {
		showCountdown(biggerDevice);
	}

	/**
	 * Makes countdown visble by dragging it down. The direction varies depending on the screen size
	 */
	function showCountdown(biggerDevice) {
		if (biggerDevice.matches && clicked) {
			dragdown.style.transform = 'translate(0, 0)';
		} else if (biggerDevice.matches && !clicked) {
			dragdown.style.transform = 'translate(100%, 0)';		
		} else if (!biggerDevice.matches && clicked) {
			dragdown.style.transform = 'translate(0, 0)';
		} else if (!biggerDevice.matches && !clicked) {
			dragdown.style.transform = 'translate(0, -100%)';		
		}
	}
}