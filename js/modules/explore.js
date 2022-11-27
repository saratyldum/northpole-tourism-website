export default function Explore() {
	/**
	 * @todo MAKE IT SNOW
	 */
	
	const exploreButton = document.querySelector('.hero__explore-button');

	if (exploreButton !== null) {
		exploreButton.addEventListener('click', handleExploreButtonClick);
	}
	
	/**
	 * Makes the site scroll down to the next page when the Explore Button is clicked
	 * 
	 * @param {*} event 
	 */
	function handleExploreButtonClick(event) {
		let y = window.innerHeight;
		window.scrollTo({
			top: y,
			left: 0,
			behavior: "smooth"
		});
	}
}

