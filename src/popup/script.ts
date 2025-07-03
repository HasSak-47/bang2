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

async function list_bangs(element: HTMLElement) {
  const data = await load_db();

	let el = document.createElement("div");

  if (data.length === 0) {
    const emptyMsg = document.createElement("div");
    emptyMsg.className = "text-sm italic text-gray-600";
    emptyMsg.textContent = "No items yet.";
    el.appendChild(emptyMsg);
    return;
  }

  const header = document.createElement("div");
  header.className = "grid grid-cols-3 gap-4 font-semibold border-b border-gray-300 pb-2 mb-2";
  header.innerHTML = `
    <div>Shorthand</div>
    <div>Name</div>
  `;
  el.appendChild(header);

  data.forEach(entry => {
    const row = document.createElement("div");
    row.className = "grid grid-cols-3 gap-4 py-1 border-b border-gray-200";

    const shorthandCol = document.createElement("div");
    shorthandCol.textContent = entry.shorthand;
    shorthandCol.className = "font-mono";

    const nameCol = document.createElement("div");
    nameCol.textContent = entry.name;

    row.appendChild(shorthandCol);
    row.appendChild(nameCol);

    el.appendChild(row);
  });

  element.innerHTML = el.innerHTML;
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

console.log('test')

const sections = {
  list: document.getElementById("list-bang")!,
  add: document.getElementById("add-bang")!,
  search: document.getElementById("search-bang")!,
};
type SectionKey = keyof typeof sections; // "list" | "add" | "search"

function showOnly(id: SectionKey) {
  Object.values(sections).forEach((el) => el!.classList.add("hidden"));
  sections[id].classList.remove("hidden");
}

document.getElementById("option-list")!.addEventListener("click", () => showOnly("list"));
document.getElementById("option-add")!.addEventListener("click", () => showOnly("add"));
document.getElementById("option-search")!.addEventListener("click", () => showOnly("search"));

// show "add" by default
showOnly("add");
