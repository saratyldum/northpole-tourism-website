export default function Slideshow() {
	let currentInfoSlideIndex = 0;
	let currentImageIndex = 0;

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
		renderHTML();
	}

	function handleDotsClick(event, index) {
		changeCurrentIndexDots(index);
		renderHTML();
	}

	function changeCurrentIndexDots(index) {
		currentInfoSlideIndex = index + 4;
		currentImageIndex = index + 4;
	}
	function changeCurrentIndex(index) {
		currentInfoSlideIndex = index;
		currentImageIndex = index;
	}



	function renderHTML() {
		for (const infoSlide of infoText) {
			infoSlide.classList.remove('slideshow__info--active');
		}

		for (const image of images) {
			image.classList.remove('slideshow__image--active');
		}

		infoText[currentInfoSlideIndex].scrollIntoView({
			behaviour: 'smooth',
			inline: 'center'
		});

		images[currentImageIndex].scrollIntoView({
			behaviour: 'smooth',
			inline: 'center'
		});

		infoText[currentInfoSlideIndex].classList.add('slideshow__info--active');
		images[currentImageIndex].classList.add('slideshow__image--active');
	}
}