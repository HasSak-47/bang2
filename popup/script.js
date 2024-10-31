document.addEventListener('DOMContentLoaded', async function () {
    document.getElementById('bang-form').addEventListener('submit', function (event) {
			event.preventDefault();

			const form_data= new FormData(event.target);
			const data = Object.fromEntries(form_data.entries());
			if(data['bang-name'] == '') return;
			if(data['bang-shorthand'] == '') return;
			if(data['bang-url'] == '') return;
    });
});
