const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			isLoggedIn: false,
			token: null,
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
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
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
			},


			//para registrar usuarios
			signup: async (email, password) => {
				console.log("register");
				const user = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
						is_active: "activo"
					}),
				};
				console.log("hola desde el backend");
				try {
					const res = await fetch(
						process.env.BACKEND_URL + "/api/signup",
						user
					);
					const data = await res.json();
					console.log("Mensaje desde Backend", data);
					return res.status;
				} catch (error) {
					console.log(`Nuevo error en el usuario: ${error}`);
				}
			},


			//para loguearse
			login: async (email, password) => {
				const user = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				try {
					const res = await fetch(process.env.BACKEND_URL + "/api/login", user);
					if (res.status !== 200) {
						throw new Error("Error", Error);
					}
					const data = await res.json();
					console.log("Mensaje desde Backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return data;
				} catch (error) {
					console.log(`Nuevo error en el login: ${error}`);
				}
			},


			//Crear token
			createToken: async (email, password) => {
				sessionStorage.setItem("email", email);

				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					body: JSON.stringify({
						email: email,
						password: password,
					}),
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				});
				const data = await response.json();
				console.log("_".repeat(80));
				console.log(data);
				if (response.ok == false) {
					setErrormessage(
						"Su usuario no está registrado en plataforma, o bien se ha equivocado en su contraseña"
					);
				} else {
					sessionStorage.setItem("token", data.access_token);
					sessionStorage.setItem("email", data.email);
					//reset the global store- Función que cambia el estado de isLoggedIn del store a true
					setStore({ isLoggedIn: true, email: data.email });
					//   history.push("/miscursos"); //Código para enviar a otra vista
				}
			},


			//Destruir token
			deleteToken: () => {
				sessionStorage.clear();
				setStore({ isLoggedIn: false });
			},


			//Usuario logueado
			getIsLoggedIn: () => {
				return getStore().isLoggedIn;
			},
		}
	};
};

export default getState;
