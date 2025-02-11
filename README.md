# Bangs2!
This firefox extensions creates custom search shortcuts called "bangs" (like a shebang) that can be used in the address bar.
These bangs redirect to specific URLS with or without earch queries. it is based in duckduckgo's bangs

## Features
- Custom Bangs: Define your own search shortcuts with a shorthand, name, URL, and formatting options.
- Dynamic URL Formatting: Use {} in the URL to dynamically insert search queries.
- Omnibox Integration: Use your bangs directly from the browser's address bar.
- Manage Bangs: Add, search, and delete bangs through a user-friendly interface.

## Usage
### Adding a bang
- Open the extension's popup or options page.
- Navigate to the "Add" section.
- Fill in the form with the shorthand, name, URL, and enable/disable formatting.
- Submit the form to save the bang.

### Using a Bang
- Type `b2!` folowed by the shorthand and the search query in the omnibox (eg `!b2 drs Vec`).
- Press Enter to get redirected to the search


### Listing Bangs
- Open the extension's popup or options page.
- Navigate to the "List" section to view all saved bangs.

### Searching and Deleting Bangs
- Open the extension's popup or options page.
- Navigate to the "Search" section.
- Enter the shorthand or name of the bang to search for it.
- Use the "Delete" button to remove a bang.

# POTENTIAL WAYS IT SHOULD WORK
!b2 {ident(.{ident})*} {(search)?} -> takes you at {ident.*} to saerch {saerch} if it exists other wise it takes you to ident

posible ways:
{ident(.{ident})*}
{ident( {ident})*} "?{search}"?


