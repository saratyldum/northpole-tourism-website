export default function Header() {
	// const mediaQuery = window.matchMedia('max-width: 992px')
	const headerVisibleThreshold = 200;
	let currentScrollDirection = null;
	let previousScrollPosition = 0;
	
	const smallerDevice = window.matchMedia('(max-width: 992px)');
	const navigation = document.querySelector('.navigation');
	const logo = document.querySelector('.logo');

	if (navigation !== null) {
		smallerDevice.addEventListener('change', handleDeviceChange)
		window.addEventListener('scroll', handleWindowScroll);
	}

	function handleWindowScroll() {
		handleDeviceChange(smallerDevice);
	}

	/**
	 * Checks if screen size is smaller or bigger than the media query set and return true/false depending on outcome.
	 * 
	 * @param {boolean} smallerDevice shows true or false depending on if the screen size matches the min-width set.
	 */
	function handleDeviceChange(smallerDevice) {
		if (smallerDevice.matches) {
			toggleNavigationVisibility(event);
		}
	}

	/**
	 * shows navigation when user is scrolling up and hides it when scrolling down. Only happens when screen width is under 992px. On desktop the navigation has a fixed position.
	 */
	function toggleNavigationVisibility(event) {
		const scrollY = window.scrollY;
		let yPos = window.pageYOffset + 16;

		if (scrollY > previousScrollPosition) {
			currentScrollDirection = 'down';
		} else {
			currentScrollDirection = 'up';
		}

		if (currentScrollDirection === 'down' && scrollY >= headerVisibleThreshold) {
			navigation.style.top = 0 + 'px'
		} else {
			navigation.style.top = yPos + 'px';
		}
		previousScrollPosition = scrollY;
	}

	/**
	 * Takes the scroll position to the top of the page when HTML is refreshed.
	 */
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	 }
}