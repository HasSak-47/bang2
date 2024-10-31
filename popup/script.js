document.addEventListener('DOMContentLoaded', function() {
	console.log('pop up opened');
  let form = document.getElementById('bang-form');
	if(form == null){
		console.error('form not foudn')
		return;
	}
	console.log(form);

	form.addEventListener('submit', async function (event) {
    event.preventDefault();
		const form_data = new FormData(event.target);
		const data = Object.fromEntries( form_data.entries() );

		console.log(form_data);
		console.log(data);


		const db = await import('../utils/db.js');
		await db.add_data(
			data["bang-name"],
			data["bang-shorthand"],
			data["bang-url"]
		);
  });
});
