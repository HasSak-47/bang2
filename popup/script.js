/**
	* @param {SubmitEvent} event 
	*/
async function add_bang(event) {
  event.preventDefault();
	const form_data = new FormData(event.target);
	const data = Object.fromEntries( form_data.entries() );

	console.log(form_data);
	console.log(data);

	const db = await import('../utils/db.js');
	await db.add_data(
		data["bang-name"],
		data["bang-shorthand"],
		data["bang-url"]
	);
}

/**
	* @param {InputEvent} event 
	* @param {string} name
	*/
async function search_bang(event, name) {
}

/**
	* @param {HTMLElement} element
	*/
async function list_bangs(element){
	while(element.hasChildNodes()){
		element.childNodes.forEach(e => element.removeChild(e));
	}

	const db = await import('../utils/db.js');
	let data = await db.load_db();
	let entries = data.bangs.map((entry) => {
		console.log(entry);
		let element = document.createElement("div")
		element.innerText = `${entry.shorthand} ${entry.name}`;
		return element;
	})

	for (const entry of entries) {
		element.appendChild(entry);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	console.log('pop up opened');

	let option_list   = document.getElementById('option-list');
	let option_add    = document.getElementById('option-add');
	let option_search = document.getElementById('option-search');

	let list   = document.getElementById('list-bang');
  let form   = document.getElementById('add-bang');
	let search = document.getElementById('search-bang');

	let search_name = document.getElementById('list-name');
	let search_bang = document.getElementById('list-bang');

	// list
	option_list.addEventListener('click', async function() {
		await list_bangs(list);
		list.style.display   = 'block';
		form.style.display   = 'none';
		search.style.display = 'none';
	});

	option_add.addEventListener('click', async function() {
		list.style.display   = 'none';
		form.style.display   = 'block';
		search.style.display = 'none';
	});

	option_search.addEventListener('click', async function() {
		list.style.display   = 'none';
		form.style.display   = 'none';
		search.style.display = 'block';
	});


	form.addEventListener('submit', add_bang);
});
