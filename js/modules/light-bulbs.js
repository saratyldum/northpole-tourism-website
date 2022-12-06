export default function LightBulbs() {
	let duration;
	let intervalChanging = false;

	const checkboxContainer = document.querySelector('.light-bulb__checkbox-container');
	const lightSwitch = document.querySelector('.light-switch');
	const lightSwitchContainer = document.querySelector('.light-bulb__checkbox-container');
	const lightBulbContainer = document.querySelector('.light-bulbs');
	const lightBulbs = document.querySelectorAll('.light-bulb');
	const intervalControl = document.querySelector('.interval-control');
	const lightSwitchState = document.querySelector('.light-bulb__switch--state');
	const lightSwitchLabels = {
		on: 'off',
		off: 'on'
	};

	if (checkboxContainer !== null) {
		checkboxContainer.addEventListener('click', handleCheckboxContainerClick);
		intervalControl.addEventListener('change', handleIntervalControlChange);
	}

	function handleCheckboxContainerClick() {
		intervalChanging = false;
		renderHTML()
	}

	function handleIntervalControlChange(event) {
		intervalChanging = true;
		controlLightIntervals(event);
	}

	/**
	 * 
	 */
	function controlLightsOnOff() {
		lightBulbContainer.classList.toggle('on');
		lightSwitchState.textContent = lightSwitchLabels[lightSwitchState.textContent]	
	}

	function controlLightIntervals(event) {
		duration = event.target.value;
		
		lightBulbs.forEach(lightBulb => {
			lightBulb.style.animationDuration = `${duration}s`;
		});
	}

	function renderHTML(event) {
		if (!intervalChanging) {
			controlLightsOnOff();
		} else if(intervalChanging) {
			controlLightIntervals(event);
		}
	}

}