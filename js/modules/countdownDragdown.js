export default function Dragdown() {
	let clicked = false;
	
	const tabletDevice = window.matchMedia('(min-width: 768px)');
	const dragdownButton = document.querySelector('.countdown__dragdown--button');
	const dragdown = document.querySelector('.countdown__dragdown');

	if (dragdownButton !== null) {
		dragdownButton.addEventListener('click', handleDradownButtonClick);
		tabletDevice.addListener(handleDeviceChange);
	}



	function handleDradownButtonClick() {
		handleDeviceChange(tabletDevice);

		// showCountdownMobile();
		// showCountdownTablet(mediaQuery)
	}
	
	function handleDeviceChange(e) {
		clicked = !clicked;

		if(e.matches && clicked) {
			dragdown.style.transform = 'translate(0, 0)';
			console.log('tablet', clicked);
		} else if(e.matches && clicked === false) {
			dragdown.style.transform = 'translate(100%, 0)';
			console.log('tablet', clicked);
		
		} else if(!e.matches && clicked) {
			dragdown.style.transform = 'translateY(0)';
			console.log('mobile');
		}else if(!e.matches && !clicked) {
			dragdown.style.transform = 'translateY(-100%)';		
		}
	}

	// handleDeviceChange(tabletDevice);


	/**
	 * Makes countdown viisble by dragging it down
	 * 
	 * @todo media query, translateX when min-width=768
	 */
	// function showCountdownMobile() {
	// 	clicked = !clicked;

	// 	if(clicked) {
	// 		dragdown.style.transform = 'translateY(0)';
	// 	}else {
	// 		dragdown.style.transform = 'translateY(-100%)';		
	// 	}
	// }
	// function showCountdownTablet(mediaQuery) {
	// 	clicked = !clicked;

	// 	if(mediaQuery.matches && clicked) {
	// 		dragdown.style.transform = 'translate(0, 0)';
	// 	  }else {
	// 		dragdown.style.transform = 'translate(100%, 0)';
	//  	 }
	// }
	


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