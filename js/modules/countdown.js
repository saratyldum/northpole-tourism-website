export default function Countdown() {
	const days = document.querySelector('#days');
	const hours = document.querySelector('#hours');
	const minutes = document.querySelector('#minutes');
	const seconds = document.querySelector('#seconds');

	const christmasTime = new Date(`2022-12-24 00:00:00`);

	function updateCountdownTime() {
		const currentTime = new Date();
		const difference = christmasTime - currentTime;


		const day = Math.floor(difference / 1000 / 60 / 60 / 24);
		const hour = Math.floor(difference / 1000 / 60 / 60) % 24;
		const minute = Math.floor(difference / 1000 / 60) % 60;
		const second = Math.floor(difference / 1000) % 60;

		days.innerHTML = day;
		hours.innerHTML = hour < 10 ? '0' + hour : hour;
		minutes.innerHTML = minute < 10 ? '0' + minute : minute;
		seconds.innerHTML = second < 10 ? '0' + second : second;
	}

	setInterval(updateCountdownTime, 1000)
}
