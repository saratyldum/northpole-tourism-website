export default function Countdown() {
	// const countdownContainer = document.querySelector('#countdown');

	// function updateCountdownDate() {
	// 	/* define dates */
	// 	const countdownTarget = new Date('2022-12-24 16:00');
	// 	const rightNow = new Date();
	
	// 	/* 
	// 		getTime() returns the date in milliseconds (from unix time). 
	// 		calculate the difference in milliseconds 
	// 	*/
	// 	const difference = countdownTarget.getTime() - rightNow.getTime();
	
	// 	/* define some helper variables to make calculations more readable */
	// 	const oneDay = 1000 * 60 * 60 * 24;
	// 	const oneHour = 1000 * 60 * 60;
	// 	const oneMinute = 1000 * 60;
	// 	const oneSecond = 1000;
		
	// 	/* 
	// 		divide the total amount of milliseconds into days, hours, minutes, seconds 
	// 	*/
	// 	const daysLeft = Math.floor(difference / oneDay);
	// 	const hoursLeft = Math.floor(difference % oneDay / oneHour);
	// 	const minutesLeft = Math.floor(difference % oneHour / oneMinute);
	// 	const secondsLeft = Math.floor(difference % oneMinute / oneSecond);
	
	// 	/* insert into HTML */
	// 	countdownContainer.innerText = `${daysLeft} days, ${hoursLeft} hours, ${minutesLeft} minutes, ${secondsLeft} seconds`;
	// }
	// setInterval(updateCountdownDate, 1000);

	// updateCountdownDate();
}