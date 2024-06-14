import './utils';

export async function getFromUrl(url: string): Promise<string> {
	return fetch(url)
		.then(response => {
			if (!response.ok) throw new Error('Network response was not ok');
			return response.blob();
		})
		.then(async data => {
			const reader = new FileReader();
			reader.readAsDataURL(data);
			while (reader.readyState !== 2) await sleep(100);
			return String(reader.result);
		});
}
