export async function load_db(){
	console.log('loading bang db')
	let bangs = await browser.storage.local.get('bangs')
	if(bangs == null || bangs == undefined || Object.keys(bangs).length === 0){
		browser.storage.local.set({bangs: [
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
		]})
	}
	return await browser.storage.local.get('bangs');
}

/**
	* @param {string} name
	* @param {string} shorthand
	* @param {string} url
	*/
export async function add_data(name, shorthand, url){
	let bangs = await load_db();
	console.log(name);
	console.log(shorthand);
	console.log(url);
	let is_format = url.includes('{}');
	console.log(bangs);
	
	let found = bangs.bangs.find((item) => {
		item.shorthand == shorthand
	})
	if(found !== undefined){
		console.warn(`${shorthand} already exists`);
		return;
	}

	bangs.bangs.push({
		name: name,
		shorthand: shorthand,
		url: url,
		format: is_format,
	});
	console.log(bangs);
	await browser.storage.local.set(bangs)
}
