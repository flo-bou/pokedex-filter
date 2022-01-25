// import logo from './logo.svg';
import './App.css';
import Card from './Card/Card';
import Form from './Form/Form';
import React from 'react';
import Nav from './Nav/Nav';

// const generation = require('./generation.json');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.requestEntriesInCategory = this.requestEntriesInCategory.bind(this);
		this.requestPokemonsOfEntry = this.requestPokemonsOfEntry.bind(this);
		this.generateFinalList = this.generateFinalList.bind(this);
		this.sendRequestedCategory = this.sendRequestedCategory.bind(this);
		this.state = {
            categoryNames: [ // strings of categories name
                'pokemon-shape',
                'pokemon-habitat',
                'type',
                'generation'
            ],
			entriesInCategory:{ // arrays of every entries in categories, to send to Form Component
				'pokemon-shape': [],
				'pokemon-habitat': [],
				'type': [],
				'generation': []
			},
			reqPokemon: {  // strings of requested values in each category, send by Form component
				"pokemon-shape": null,
				'pokemon-habitat': null,
				'type': null,
				'generation': null
			},
			dataPokemon: {  // arrays of pokemons corresponding to requested entries in category, used to generate cards
				"pokemon-shape": [],
				'pokemon-habitat': [],
				'type': [],
				'generation': []
			},
			finalList: []
		};
    }

	render() {
		// this.requestEntriesInCategory('pokemon/1');

		return (
			<div className="App min-h-screen flex flex-col flex-nowrap justify-between">

				<Nav />

				<main className="container mx-auto my-4">

					<Form
						categoryNames={this.state.categoryNames}
						entriesInCategory={this.state.entriesInCategory}
						sendRequestedCategory={this.sendRequestedCategory}
					/>

					<div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-3">

						{this.state.finalList.map((value) => {
							return (
								<Card
									name={value}
									// flavor_text={value.flavor_text_entries[0].flavor_text}
								/>
							);
						})}
					</div>
				</main>

				<footer className="bg-slate-200 mt-5">
					<div className="container mx-auto p-4">
						Footer
					</div>
				</footer>
			</div>
		);
	}

    componentDidMount(){
        this.requestEntriesInCategory('generation');
        // this.requestEntriesInCategory('type');
        // this.requestEntriesInCategory('pokemon-shape');
        // this.requestEntriesInCategory('pokemon-habitat');
	}

	componentDidUpdate(){

	}

	componentWillUnmount(){

	}

	requestEntriesInCategory(request){
        fetch("https://pokeapi.co/api/v2/" + request)
        .then( responseObject => {
            return responseObject.json(); // on transmet le Body de l'objet Response en format json dans la promesse créée par la méthode json()
        })
        .then( data => {
            // console.log('Datas for ', request, ' : ', data);
            let listOfEntries = data.results.map((value) => value.name);
            this.setState( (prevState, props) => {
					prevState.entriesInCategory[request] = listOfEntries;
					return prevState;
				}, () => {
                console.log('State after request for ', request, ' : ', this.state);
            });
            return data;
        })
        .catch( error => {
            console.error(request, error);
            console.error("fetch from PokeAPI failed :( during request ", request)
            return [];
        });
    }

	requestPokemonsOfEntry(request, entry, jsonPath){
        fetch("https://pokeapi.co/api/v2/" + request)
        .then( responseObject => {
            return responseObject.json();
        })
        .then( data => {
            // console.log('Datas for ', request, ' : ', data);
            let listOfPokemons = data.pokemon_species.map((value) => value.name);
			// console.log('listOfPokemons : ', listOfPokemons);
            this.setState( (prevState, props) => {
					prevState.dataPokemon[entry] = listOfPokemons;
					return prevState;
				}, () => {
                console.log('State after request Entry for ', request, ' : ', this.state);
            });
            return data;
        })
        .catch( error => {
            console.error(request, error);
            console.error("fetch from PokeAPI failed :( during request ", request)
            return [];
        })
		.finally(() => {
			// console.log('Generating final list to display');
			this.generateFinalList();
		});
    }

	// get categories requests from Form component
	sendRequestedCategory(categoryName, entryChosen){
		this.setState( (prevState, props) => {
			prevState.reqPokemon[categoryName] = entryChosen;
			return prevState;
		}
		, () => {
			// console.log('state value in App after sendRequestedCategory for  : ', entryChosen, ' : ', this.state);
			this.requestPokemonsOfEntry('generation/generation-i', 'generation');
		})
	}

	generateFinalList(){
		// parcourir l'objet dataPokemon, pour les entrées non vide, chercher les correspondances puis mettre le tableau filtré dans state
		// const dataObject = this.state.dataPokemon;
		let pokemonShape = this.state.dataPokemon['pokemon-shape'];
		let pokemonHabitat = this.state.dataPokemon['pokemon-habitat'];
		let type = this.state.dataPokemon.type;
		let generation = this.state.dataPokemon.generation;
		// console.log(type, generation);
		for (let prop in dataObject){
			if (prop!==[]){

			}
		}

		this.setState((prevState) => {
			prevState.finalList = prevState.dataPokemon.generation;
			return prevState;
		}, () => {
			console.log('State after generateFinalList :', this.state);
		});
	}

	displayPokemons(pokemons){
		// faire une requête sur la première entrée
		// générer l''élément
		// l'insérer dans le composant
		// recommencer avec l'entrée suivante
	}

	addPokemonToState(pokemon){
		// Ou
		// faire une requête sur la première entrée
		// insérer les données dans state
		// se reposer sur un autre composant qui utilise state pour créer les éléments Card
		// recommencer avec l'entrée suivante
	}
}

export default App;
