export default function Todo() {
	// model
	const items = getFromLocalStorage();
	


	// methods
	// will only mutate model variables
	function addNewItem() {
		items.push({
			text: wishListInput.value
		})
	}

	function getFromLocalStorage() {
		//[{"id":"1669642470099","value":"lego"},{"id":"1669642506498","value":"cola"}]

		return JSON.parse(localStorage.getItem("list"));
	}

	// render
	// render is the only function that generates HTML
	// and/or alters DOM elements.
	// i.e. .innerText, .classList.add, .innerHTML

	function renderHTML() {
		for (const item in items) {
			wishListContainer.innerHTML += `
				<div>
				</div>
			`
		}
	}
}