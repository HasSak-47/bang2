import { Database, load_db } from "./db.js";

let database : Promise<Database | null> = new Promise(() => null);

async function input_started(){
	database = load_db();
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

async function input_entered(text: string, disposition: browser.omnibox.OnInputEnteredDisposition){
	let split = text.split(' ');

	let db = (await database)!;
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
browser.omnibox.onInputCancelled.addListener( input_canceled );
