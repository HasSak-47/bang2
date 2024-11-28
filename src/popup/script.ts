import { add_data, delete_bang, load_db, search_bang } from '../db.js';

async function add_bang(event: SubmitEvent) {
  event.preventDefault();
	const form_data = new FormData( event.target! as HTMLFormElement );
	//const data = Object.fromEntries(form_data.entries());
	const data = Object.fromEntries( new FormData( event.target! as HTMLFormElement ) );

	console.log(form_data);
	console.log(data);

	await add_data(
		data["bang-name"].toString(),
		data["bang-shorthand"].toString(),
		data["bang-url"].toString()
	);
}

async function list_bangs(element: Element){
	while(element.hasChildNodes()){
		element.childNodes.forEach(e => element.removeChild(e));
	}

	let data = await load_db();
	let entries = data.map(entry => {
		let element = document.createElement("div")
		element.innerText = `${entry.shorthand} ${entry.name}`;
		return element;
	})

	for (const entry of entries) {
		element.appendChild(entry);
	}
}

document.addEventListener('DOMContentLoaded', function() {
	let option_list   = document.getElementById('option-list')!;
	let option_add    = document.getElementById('option-add')!;
	let option_search = document.getElementById('option-search')!;

	let list   = document.getElementById('list-bang')!;
  let form   = document.getElementById('add-bang')!;
	let search = document.getElementById('search-bang')!;

	let searc  = document.getElementById('search')!;
	let delet  = document.getElementById('delete')!;

	// list
	option_list.addEventListener('click', async function() {
		console.log('list');
		await list_bangs(list);
		list.style.display   = 'block';
		form.style.display   = 'none';
		search.style.display = 'none';
	});

	// add
	option_add.addEventListener('click', async function() {
		console.log('add');
		list.style.display   = 'none';
		form.style.display   = 'block';
		search.style.display = 'none';
	});

	// search
	option_search.addEventListener('click', async function() {
		console.log('search');
		list.style.display   = 'none';
		form.style.display   = 'none';
		search.style.display = 'block';
	});

	form.addEventListener('submit', add_bang);

	let find_shorthang = document.getElementById('find-bang-shorthand')! as HTMLInputElement;
	let find_name      = document.getElementById('find-bang-name')! as HTMLInputElement;

	searc.addEventListener('click', async function() {
		let result = await search_bang(find_name.value, find_shorthang.value);
		if (result == undefined) {
			console.log('not found');
			return;
		}
		console.log(result);
		find_name.value = result.name;
		find_shorthang.value = result.shorthand;
	})

	delet.addEventListener('click', async function() {
		await delete_bang(find_shorthang.value);
	})
});
