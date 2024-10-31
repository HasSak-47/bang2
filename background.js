let database = new Promise(() => null);

/**
	* @returns {Promise<[Object.<string, {name: string, url: string, format: boolean}>]>}
	*/
async function load_db(){
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

async function input_started(){
	const utils_db = await import("./utils/db.js");
	console.log('util loaded')
	console.log(utils_db)

	database = await utils_db.load_db();
	console.log('database loaded')
	console.log('db: ' + database);
}

async function unload_database(){
	console.log('database unload')
	database = new Promise(() => null);
}

async function input_canceled(){
	await unload_database()
}


/**
	* @param {string} text 
	* @param {"currentTab" | "newForegroundTab" | "newBackgroundTab" } disposition
	*/
async function input_entered(text, disposition){
	let split = text.split(' ');
	let db = (await database).bangs;
	if(db == null){
		console.log('database not loadead!!');
	}

	let site = db.find(p => p.shorthand == split[0])
	
	if(site === undefined)
		return [];

	let url = site.url
	let k = ''
	for (let index = 1; index < split.length; ++index)
		k += split[index];

	if(site.format)
		url = site.url.replace('{}', k);
	console.log(url)

	switch (disposition) {
    case "currentTab":
      browser.tabs.update({url});
      break;
    case "newForegroundTab":
      browser.tabs.create({url});
      break;
    case "newBackgroundTab":
      browser.tabs.create({url, active: false});
      break;
  }
	unload_database()
}

browser.omnibox.onInputStarted.addListener( input_started );
browser.omnibox.onInputEntered.addListener( input_entered );
