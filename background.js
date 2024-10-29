
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

async function filter(text){ }

// Update the suggestions whenever the input is changed.
// browser.omnibox.onInputChanged.addListener(async (text, addSuggestions) => { });

browser.omnibox.onInputEntered.addListener(
	/**
	* @param {string} text 
	*/
	async (text, disposition) => {
		let split = text.split(' ');
		let db = (await load_db()).bangs;

		// lmaoooo
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
	}
);
