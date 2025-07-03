export type Database = BangEntry[];

export type BangEntry = {
	shorthand: string,
	name: string,
	url: string,
	format: boolean,
};

const STORAGE_KEY = 'bangs';

export async function load_db(): Promise<Database> {
	let result = await browser.storage.local.get(STORAGE_KEY);
	let bangs = result[STORAGE_KEY];

	if (!Array.isArray(bangs) || bangs.length === 0) {
		bangs = [
			{
				shorthand: 'drs',
				name: 'rust docs',
				url: 'https://docs.rs/{}',
				format: true,
			},
			{
				shorthand: 'w',
				name: 'wikipedia',
				url: 'https://en.wikipedia.org/w/index.php?go=Go&search={}',
				format: true,
			},
		];
		await browser.storage.local.set({ [STORAGE_KEY]: bangs });
	}

	return bangs;
}

export async function add_data(name: string, shorthand: string, url: string): Promise<boolean> {
	let bangs = await load_db();
	let is_format = url.includes('{}');

	if (!name || !shorthand || !url) {
		return false;
	}

	let found = bangs.find(item => item.shorthand === shorthand);
	if (found !== undefined) {
		console.warn(`${shorthand} already exists`);
		return false;
	}

	bangs.push({
		name,
		shorthand,
		url,
		format: is_format,
	});
	console.log('Updated bangs:', bangs);

	await browser.storage.local.set({ [STORAGE_KEY]: bangs });

	return true;
}

export async function search_bang(name: string, shorthand: string): Promise<BangEntry | undefined> {
	let bangs = await load_db();
	return bangs.find(e => e.name === name || e.shorthand === shorthand);
}

export async function delete_bang(shorthand: string): Promise<void> {
	let bangs = await load_db();
	bangs = bangs.filter(e => e.shorthand !== shorthand);
	await browser.storage.local.set({ [STORAGE_KEY]: bangs });
}
