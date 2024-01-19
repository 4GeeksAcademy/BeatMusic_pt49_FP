const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			album: [],
			singleAlbum: [],
			artist: [],
			singleArtist: [],
			song: [],
			singleSong: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			createAlbum: (name, url) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(
						{
							"name": name,
							"img_url": url
						}
					)
				};

				fetch(process.env.BACKEND_URL + "/api/album", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getAlbum())
					.catch(error => console.log('error', error));
			},

			createArtist: (name, url) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(
						{
							"name": name,
							"img_url": url
						}
					)
				};
				fetch(process.env.BACKEND_URL + "/api/artist", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getArtist())
					.catch(error => console.log('error', error));
			},

			createSong: (name, length) => {
				const requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(
						{
							"name": name,
							"length": length
						}
					)
				};
				fetch(process.env.BACKEND_URL + "/api/song", requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getSong())
					.catch(error => console.log('error', error));
			},

			getAlbum: () => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/album", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ album: data }))
					.catch(error => console.log('error', error));
			},

			getArtist: () => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/artist", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ artist: data }))
					.catch(error => console.log('error', error));
			},

			getSong: () => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/song", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ song: data }))
					.catch(error => console.log('error', error));
			},

			getSingleAlbum: (id) => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/album/" + id, requestOptions)
					.then(response => response.json())
					.then(data => setStore({ singleAlbum: data }))
					.catch(error => console.log('error', error));
			},

			getSingleArtist: (id) => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/artist/" + id, requestOptions)
					.then(response => response.json())
					.then(data => setStore({ singleArtist: data }))
					.catch(error => console.log('error', error));
			},

			getSingleSong: (id) => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/song/" + id, requestOptions)
					.then(response => response.json())
					.then(data => setStore({ singleSong: data }))
					.catch(error => console.log('error', error));
			},

			deleteAlbum: (id) => {
				var requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/album/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getAlbum())
					.catch(error => console.log('error', error));
			},

			deleteArtist: (id) => {
				var requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/artist/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getArtist())
					.catch(error => console.log('error', error));
			},

			deleteSong: (id) => {
				var requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/song/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getSong())
					.catch(error => console.log('error', error));
			},

			updateAlbum: (id, name, url) => {
				var requestOptions = {
					method: 'PUT',
					redirect: 'follow',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"name": name,
						"img_url": url
					})
				};

				fetch(process.env.BACKEND_URL + "/api/album/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getAlbum())
					.catch(error => console.log('error', error));
			},

			updateArtist: (id, name, url) => {
				var requestOptions = {
					method: 'PUT',
					redirect: 'follow',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"name": name,
						"img_url": url
					})
				};

				fetch(process.env.BACKEND_URL + "/api/artist/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getArtist())
					.catch(error => console.log('error', error));
			},

			updateSong: (id, name, length) => {
				var requestOptions = {
					method: 'PUT',
					redirect: 'follow',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"name": name,
						"length": length
					})
				};

				fetch(process.env.BACKEND_URL + "/api/song/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getSong())
					.catch(error => console.log('error', error));
			},
			
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;