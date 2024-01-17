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
			singleAlbum: []
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
							"name":name,
							"img_url":url
						}
					)
				};
				  
				fetch(process.env.BACKEND_URL + "/api/album", requestOptions)
				.then(response => response.text())
				.then(result => console.log(result))
				.then(() => getActions().getAlbum())
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
            updateAlbum:(id, name, url) => {
				var requestOptions = {
					method: 'PUT',
					redirect: 'follow',
					headers: {
						"Content-Type": "application/json",
					  },
					  body: JSON.stringify({ name, img_url: url })
					};
				fetch(process.env.BACKEND_URL + "/api/album/" + id, requestOptions)
				 
				  .then((res) => res.json())
				  .then((data) => {
					// Puedes manejar la lógica después de actualizar el álbum aquí, si es necesario.
				  })
				  .catch((error) => console.error("Error:", error));
			  },
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
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