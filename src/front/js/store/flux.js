const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth: false,
			authAdmin: false,
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
			singleSong: [],
			favoriteArtists: [],
			favoriteUserArtists: [],
			favoriteAlbums: [],
			favoriteUserAlbums: [],
			favoriteSongs: [],
			favoriteUserSongs: [],
			userId: 0,
			username: "",
			friends: [],
			userFriends: [],
			profileName: "",
			suggestion: '',
			prompt: "",
			spotifyAccessToken: '',
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
					mode: 'cors',
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
					mode: 'cors',
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
					mode: 'cors',
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

			addFavoriteArtist: (artistId) => {
				const store = getStore();
				var requestOptions = {
					method: 'POST',
					mode: 'cors',
					body: "",
					redirect: 'follow'
				};
				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/artist/" + artistId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFavoriteArtists(store.userId))
					.catch(error => console.log('error', error));
			},

			addFavoriteAlbum: (albumId) => {
				const store = getStore();
				var requestOptions = {
					method: 'POST',
					mode: 'cors',
					body: "",
					redirect: 'follow'
				};
				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/album/" + albumId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFavoriteAlbums(store.userId))
					.catch(error => console.log('error', error));
			},

			addFavoriteSong: (songId) => {
				const store = getStore();
				var requestOptions = {
					method: 'POST',
					mode: 'cors',
					body: "",
					redirect: 'follow'
				};
				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/song/" + songId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFavoriteSongs(store.userId))
					.catch(error => console.log('error', error));
			},

			addFriend: (id) => {
				const store = getStore();
				var requestOptions = {
					method: 'POST',
					body: "",
					redirect: 'follow'
				};
				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/friends/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFriends(store.userId))
					.catch(error => console.log('error', error));
			},

			getAlbum: () => {
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
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
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/artist", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ artist: data }))
					.catch(error => console.log('error', error));
			},

			getFavoriteArtists: (id) => {
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + id + "/favorites/artist", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ favoriteArtists: data }))
					.catch(error => console.log('error', error));
			},

			getFavoriteUserArtists: () => {
				const store = getStore();
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/artist", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ favoriteUserArtists: data }))
					.catch(error => console.log('error', error));
			},

			getFavoriteAlbums: (id) => {
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + id + "/favorites/album", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ favoriteAlbums: data }))
					.catch(error => console.log('error', error));
			},

			getFavoriteUserAlbums: () => {
				const store = getStore();
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/album", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ favoriteUserAlbums: data }))
					.catch(error => console.log('error', error));
			},

			getFavoriteSongs: (id) => {
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + id + "/favorites/song", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ favoriteSongs: data }))
					.catch(error => console.log('error', error));
			},

			getFavoriteUserSongs: () => {
				const store = getStore();
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/song", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ favoriteUserSongs: data }))
					.catch(error => console.log('error', error));
			},

			getFriends: (id) => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + id + "/friends", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ friends: data }))
					.catch(error => console.log('error', error));
			},

			getUserFriends: () => {
				const store = getStore();
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/friends", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ userFriends: data }))
					.catch(error => console.log('error', error));
			},

			getFriends: (id) => {
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + id + "/friends", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ friends: data }))
					.catch(error => console.log('error', error));
			},

			getUserFriends: () => {
				const store = getStore();
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/friends", requestOptions)
					.then(response => response.json())
					.then(data => setStore({ userFriends: data }))
					.catch(error => console.log('error', error));
			},

			getSong: () => {
				var requestOptions = {
					method: 'GET',
					mode: 'cors',
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
					mode: 'cors',
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
					mode: 'cors',
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
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/song/" + id, requestOptions)
					.then(response => response.json())
					.then(data => setStore({ singleSong: data }))
					.catch(error => console.log('error', error));
			},

			getUser: (id) => {
				const store = getStore();
				var requestOptions = {
					method: 'GET',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + id, requestOptions)
					.then(response => response.json())
					.then(data => setStore({ profileName: data }))
					.catch(error => console.log('error', error));
			},

			deleteAlbum: (id) => {
				var requestOptions = {
					method: 'DELETE',
					mode: 'cors',
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
					mode: 'cors',
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/artist/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getArtist())
					.catch(error => console.log('error', error));
			},

			deleteFavoriteArtist: (artistId) => {
				const store = getStore();
				var requestOptions = {
					method: 'DELETE',
					mode: 'cors',
					body: "",
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/artist/" + artistId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFavoriteArtists(store.userId))
					.catch(error => console.log('error', error));
			},

			deleteFavoriteAlbum: (albumId) => {
				const store = getStore();
				var requestOptions = {
					method: 'DELETE',
					mode: 'cors',
					body: "",
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/album/" + albumId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFavoriteAlbums(store.userId))
					.catch(error => console.log('error', error));
			},

			deleteFavoriteSong: (songId) => {
				const store = getStore();
				var requestOptions = {
					method: 'DELETE',
					mode: 'cors',
					body: "",
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/favorites/song/" + songId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFavoriteSongs(store.userId))
					.catch(error => console.log('error', error));
			},

			deleteFriend: (id) => {
				const store = getStore();
				var requestOptions = {
					method: 'DELETE',
					body: "",
					redirect: 'follow'
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId + "/friends/" + id, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => getActions().getFriends(store.userId))
					.catch(error => console.log('error', error));
			},

			deleteSong: (id) => {
				var requestOptions = {
					method: 'DELETE',
					mode: 'cors',
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
					mode: 'cors',
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
					mode: 'cors',
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
					mode: 'cors',
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

			matchPercentage: (user, friend) => {
				const shorterArray = user.length <= friend.length ? user : friend
				const longerArray = user.length <= friend.length ? friend : user
				const matchingItems = shorterArray.filter(item => longerArray.includes(item))
				const percentage = (matchingItems.length / ((longerArray.length + shorterArray.length) / 2)) * 100
				return percentage.toFixed(0)
			},

			totalMatch: (artist, album, song) => {
				const match = (artist * 0.7) + (album * 0.2) + (song * 0.1)
				return match.toFixed(0)
			},

			login: (email, password) => {
				const requestOptions = {
					method: 'POST',
					mode: 'cors',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password,
					}),
				};

				fetch(process.env.BACKEND_URL + "/api/login", requestOptions)
					.then(response => {
						if (response.status === 200) {
							return response.json();
						} else {
							throw new Error('Authentication failed');
						}
					})
					.then(data => { setStore({ auth: true, userId: data.id, username: data.name }) })
					.catch(error => console.log('Error:', error));
			},

			adminLogin: (email, password) => {
				const requestOptions = {
					method: 'POST',
					mode: 'cors',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password,
					})
				};

				fetch(process.env.BACKEND_URL + "/api/adminlogin", requestOptions)
					.then(response => {
						if (response.status == 200) {
							setStore({ authAdmin: true });
						}
						return response.text()
					})
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},

			signup: (email, password) => {
				const requestOptions = {
					method: 'POST',
					mode: 'cors',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				fetch(process.env.BACKEND_URL + "/api/users", requestOptions)
					.then(response => {
						if (response.status === 201) {
							return response.json();
						} else {
							throw new Error('Signup failed');
						}
					})
					.then(data => { setStore({ auth: true, userId: data.id }) })
					.catch(error => console.log('Error:', error));
			},

			editProfileName: (name) => {
				const store = getStore();
				var requestOptions = {
					method: 'PUT',
					mode: 'cors',
					redirect: 'follow',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"name": name
					})
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.then(() => { setStore({ username: name }) })
					.catch(error => console.log('error', error));
			},

			editPassword: (password) => {
				const store = getStore();
				var requestOptions = {
					method: 'PUT',
					mode: 'cors',
					redirect: 'follow',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"password": password
					})
				};

				fetch(process.env.BACKEND_URL + "/api/users/" + store.userId, requestOptions)
					.then(response => response.text())
					.then(result => console.log(result))
					.catch(error => console.log('error', error));
			},

			logout: () => {
				const store = getStore();
				setStore({ auth: false });
			},

			adminLogout: () => {
				const store = getStore();
				setStore({ authAdmin: false });
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

			// ...
			getGPT3Suggestion: async (actions) => {
				try {
					const prompt = 'Genera una lista de 5 artistas aleatorios';
					const response = await fetch(process.env.BACKEND_URL + "/api/generate_recommendation", {
						method: 'POST',
						mode: 'cors',
						headers: {
							'Authorization': 'Bearer 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',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ prompt, model: "gpt-3.5-turbo" }),
					});

					if (response.ok) {
						const result = await response.json();
						const suggested_track_id = result.suggested_track_id || 'Error al obtener información de la pista';
						const track_title = result.track_title || 'Error al obtener información de la pista';

						const store = getStore();
						store.suggested_track_id = result.suggested_track_id || 'Error al obtener información de la pista';
						store.track_title = result.track_title || 'Error al obtener información de la pista';
						setStore(store);

						// Obtén las recomendaciones de canciones de Spotify
						const spotifyAccessToken = 'tu_token_de_acceso_de_spotify'; // Reemplázalo con tu lógica para obtener el token
						await actions.getActualSongRecommendations(result.userArtists, spotifyAccessToken);
					} else {
						console.error('Error al obtener sugerencia de OpenAI GPT-3:', response.status, response.statusText);

						const store = getStore();
						store.suggested_track_id = 'Error al obtener información de la pista';
						store.track_title = 'Error al obtener información de la pista';
					}
				} catch (error) {
					console.error('Error al obtener sugerencia de OpenAI GPT-3', error);

					const store = getStore();
					store.suggested_track_id = 'Error al obtener información de la pista';
					store.track_title = 'Error al obtener información de la pista';
				}
			},

			// Añade esta función a tu objeto actions
			getSongRecommendations: async (userArtists) => {
				try {
					const actions = getActions();

					// Llama a la función que realiza la llamada real al servidor
					await actions.getActualSongRecommendations(userArtists);
				} catch (error) {
					console.error('Error al obtener recomendaciones de canciones', error);
				}
			},

			// Otra función para realizar la llamada real al servidor
			getActualSongRecommendations: async (userArtists, spotifyAccessToken) => {
				try {
					const response = await fetch("https://api.spotify.com/v1/recommendations", {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${spotifyAccessToken}`,
							'Content-Type': 'application/json',
						},
						// Aquí puedes personalizar los parámetros de la solicitud de recomendación de Spotify
						// Consulta la documentación de Spotify para más detalles.
					});

					if (response.ok) {
						const result = await response.json();
						setStore({ songRecommendations: result.tracks });
					} else if (response.status === 401) {
						console.error('Respuesta inesperada del servidor para las recomendaciones de canciones:', response.status, response.statusText);
					}
				} catch (error) {
					console.error('Error al obtener recomendaciones de canciones', error);
				}
			},

			setSpotifyAccessToken: (token) => {
				// Actualiza el token de acceso de Spotify en el estado
				setStore({
					spotifyAccessToken: token
				});
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