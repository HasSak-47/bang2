
browser.tabs.executeScript({code: ''})
	.then(() => {
		document.addEventListener("submit", () => 
			document.getElementById('popup-botton').addEventListener('click', () => {
				let name = document.getElementById('input-name');
				let shorthand = document.getElementById('input-shorthand');
				let url = document.getElementById('input-url');
				name.value = 'test val';
				console.log('log!');
		}));
	})
	.catch(e => {
		console.error('kurwą mać');
		console.error(e);
	});
