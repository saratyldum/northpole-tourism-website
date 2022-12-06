export default function Slideshow() {
	let currentInfoSlideIndex = 0;
	let currentImageIndex = 0;
	let isPlacesVisible;
	let isCrewVisible;

	const slideshow = document.querySelectorAll('.slideshow');
	const buttons = document.querySelectorAll('.slideshow__button');
	const dots = document.querySelectorAll('.slideshow__dot');
	const infoText = document.querySelectorAll('.slideshow__info');
	const images = document.querySelectorAll('.slideshow__image');

	if (slideshow !== null) {
		for (let index = 0; index < buttons.length; index +=1) {
			buttons[index].addEventListener('click', event => {
				handleButtonsClick(event, index)
			});
		};

		for (let index = 0; index < dots.length; index +=1) {
			dots[index].addEventListener('click', event => {
				handleDotsClick(event, index)
			});
		};
	}


	function handleButtonsClick(event, index) {
		changeCurrentIndex(index);
		isPlacesInViewport();
		isCrewInViewport();
		renderHTML(index);
	}

	function handleDotsClick(event, index) {
		changeCurrentIndexDots(index);
		isCrewInViewport();
		isPlacesInViewport();
		renderHTML(index);
	}
	
	function changeCurrentIndex(index) {
		currentInfoSlideIndex = index;
		currentImageIndex = index;
	}

	/**
	 * When the dots are being clicked we have to add 4 to the index since the first 4 elements belongs to the Places slideshow so we only target the relevant items in the Crew slideshow.
	 * 
	 * I am aware this is not the best way to do it and will look in to using a loop to do the same thing next time.
	 * 
	 * @param {number} index the index of the item in the array that is being clicked
	 */
		 function changeCurrentIndexDots(index) {
			currentInfoSlideIndex = index + 4;
			currentImageIndex = index + 4;
		}

	/**
	 * Checks if 50% of the destination slideshow is visable
	 * 
	 * inspiration:
	 *	https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
	 *
	 * @returns true if more than 50% visible and false if less than 50% is visible
	 */
	function isPlacesInViewport() {
		let slideshowPlacesPosition = slideshow[0].getBoundingClientRect();

		isPlacesVisible = 
								slideshowPlacesPosition.top + (slideshowPlacesPosition.height/2) > 0 && slideshowPlacesPosition.left + (slideshowPlacesPosition.width/2) > 0 && slideshowPlacesPosition.top + (slideshowPlacesPosition.height/2) < (window.innerHeight || document.documentElement.clientHeight) && 
								slideshowPlacesPosition.left + (slideshowPlacesPosition.width/2) < (window.innerWidth || document.documentElement.clientWidth);

		return isPlacesVisible;
	}
	
	/**
	 * Checks if 50% of the crew slideshow is visable
	 * 
	 * inspiration:
	 *	https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
	 *
	 * @returns true if more than 50% visible and false if less than 50% is visible
	 */
	function isCrewInViewport() {
		let slideshowCrewPosition = slideshow[1].getBoundingClientRect();

		isCrewVisible = 
							slideshowCrewPosition.top + (slideshowCrewPosition.height/2) > 0 && 
							slideshowCrewPosition.left + (slideshowCrewPosition.width/2) > 0 && 
							slideshowCrewPosition.top + (slideshowCrewPosition.height/2) < (window.innerHeight || document.documentElement.clientHeight) && 
							slideshowCrewPosition.left + (slideshowCrewPosition.width/2) < (window.innerWidth || document.documentElement.clientWidth)	
		;

		return isCrewVisible;
	}

	/**
	 * * The only function that makes changes to the DOM. Every action and change to the DOM will be handled with this function.
	 */
	function renderHTML() {
		/**
		 * Takes the full array of items and makes a two new ones, one for the crew and one for the places so that we can work with one at a time.
		 * 
		 * I am aware this is not the best solution and will look into using a loop for this instead next time.
		 */
		const infoTextArray = Array.from(infoText);
		const infoTextPlaces = infoTextArray.slice(0, 4);
		const infoTextCrew = infoTextArray.slice(-4);
		
		const imageArray = Array.from(images);
		const imagePlaces = imageArray.slice(0, 4);
		const imageCrew = imageArray.slice(-4);

		/**
		 * checks if the places slideshow or crew slideshow is visible and removes the active class only on the array connected to the visible slideshow.
		 */
		if(isPlacesVisible) {
			for (const infoSlide of infoTextPlaces) {
				infoSlide.classList.remove('slideshow__info--active');
			}
	
			for (const image of imagePlaces) {
				image.classList.remove('slideshow__image--active');
			}
		} else if(isCrewVisible){
			for (const infoSlide of infoTextCrew) {
				infoSlide.classList.remove('slideshow__info--active');
			}	
	
			for (const image of imageCrew) {
				image.classList.remove('slideshow__image--active');
			}
		}
	
		//adds the active class to the index that is being clicked and viewed.
		infoText[currentInfoSlideIndex].classList.add('slideshow__info--active');
		images[currentImageIndex].classList.add('slideshow__image--active');
		
	}
}