export default function LightBulbs() {
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

	function handleCheckboxContainerClick(event) {
		controlLightsAndIntervals(event);
	}

	function handleIntervalControlChange(event) {
		controlLightsAndIntervals(event);
	}

	function controlLightsAndIntervals(event) {
		const duration = event.target.value;

		lightBulbs.forEach(lightBulb => {
			lightBulb.style.animationDuration = `${duration}s`;
		})

		lightBulbContainer.classList.toggle('on');
		lightSwitchState.textContent = lightSwitchLabels[lightSwitchState.textContent]
	}
}