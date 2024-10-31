export async function load_db(){
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
