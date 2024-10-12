
/**
	* @type {Object.<string, {desc: string, url: string, format: boolean}>}
	*/
const URLS = {
	"ww": {
		desc: "web whatsapp",
		url: "https://web.whatsapp.com",
		format: false,
	},
	"tlr": {
		desc: "tumblr",
		url: "https://tumblr.com",
		format: false,
	},
	"drs":{
		desc: "rust docs",
		url: "https://docs.rs/{}",
		format: true,
	},
};

function filter(text){
	split = text.split(' ');

	let site = URLS[split[0]]
	if(site === undefined)
		return [];

	let url = site.url
	if(site.format){
		url = site.url.replace('{}', split[1]);
	}
	console.log(url)
	
	return [{
		content: url,
		description: url.desc,
	}]
}

// Update the suggestions whenever the input is changed.
browser.omnibox.onInputChanged.addListener((text, addSuggestions) => {
	addSuggestions(filter(text))
});

browser.omnibox.onInputEntered.addListener((text, disposition) => {
  let url = text;
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
});
