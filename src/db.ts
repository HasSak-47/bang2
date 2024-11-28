export type Database = BangEntry[];

export type BangEntry = {
	shorthand: string,
	name: string,
	url: string,
	format: boolean,
};

export async function load_db(){
	console.log('loading bang db')
	let bangs = await browser.storage.local.get('bangs')
	if(bangs == null || bangs == undefined || Object.keys(bangs).length === 0){
		browser.storage.local.set([
			{
				shorthand: 'drs',
				name: 'rust docs',
				url : 'https://docs.rs/{}',
				format: true,
			},
			{
				shorthand: 'w',
				name: 'wikipedia',
				url : 'https://en.wikipedia.org/w/index.php?go=Go&search={}',
				format: true,
			},
		])
	}
	let rbangs = await browser.storage.local.get('bangs') as BangEntry[];
	return rbangs;
}

export async function add_data(name: string, shorthand: string, url: string){
	let bangs = await load_db();
	let is_format = url.includes('{}');
	console.log(bangs);
	
	let found = bangs.find(item => {
		item.shorthand == shorthand
	})
	if(found !== undefined){
		console.warn(`${shorthand} already exists`);
		return false;
	}
	if(name == '' && shorthand == '' && url == ''){
		return false;
	}

	bangs.push({
		name: name,
		shorthand: shorthand,
		url: url,
		format: is_format,
	});
	console.log(bangs);
	await browser.storage.local.set(bangs)

	return true;
}

export async function search_bang(name: string, shorthand: string){
	let bangs = await load_db();
	return bangs.find(e => {
		console.log(e);
		console.log(name);
		console.log(shorthand);
		return e.name == name || e.shorthand == shorthand;
	})
}

export async function delete_bang(shorthand: string){
	let bangs = await load_db();
	bangs = bangs.filter(e => e.shorthand != shorthand);
	browser.storage.local.set( bangs );
}
