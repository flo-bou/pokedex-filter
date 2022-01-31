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
		this.requestPokemonNamesOfEntry = this.requestPokemonNamesOfEntry.bind(this);
		this.generateFinalList = this.generateFinalList.bind(this);
		this.sendRequestedCategory = this.sendRequestedCategory.bind(this);
		this.state = {
            categoryNames: [ // strings of categories name
                'pokemon-shape',
                'pokemon-habitat',
                'pokemon-color',
                'generation'
            ],
			entriesInCategory:{ // arrays of every entries in categories, to send to Form Component
				'pokemon-shape': [],
				'pokemon-habitat': [],
				'pokemon-color': [],
				'generation': []
			},
			reqPokemon: {  // strings of requested values in each category, send by Form component
				"pokemon-shape": 'void',
				'pokemon-habitat': 'void',
				'pokemon-color': 'void',
				'generation': 'void'
			},
			dataPokemon: {  // arrays of pokemons corresponding to requested entries in category, used to generate cards
				"pokemon-shape": [],
				'pokemon-habitat': [],
				'pokemon-color': [],
				'generation': []
			},
			finalList: [] // filtered list
		};
    }

	render() {
		// this.requestEntriesInCategory('pokemon/1');

		return (
			<div className="App min-h-screen flex flex-col flex-nowrap justify-between">

				<Nav />

				<main className="container mx-auto my-4 px-3 md:px-8">

					<Form
						categoryNames={this.state.categoryNames}
						entriesInCategory={this.state.entriesInCategory}
						sendRequestedCategory={this.sendRequestedCategory}
					/>

					<hr className='my-5' />

					<div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 my-5">

						{this.state.finalList.map((value) => {
							return (
								<Card
									name={value}
									key={value}
									// flavor_text={value.flavor_text_entries[0].flavor_text}
								/>
							);
						})}
					</div>
				</main>

				<footer className="bg-slate-200 mt-5">
					<div className="container mx-auto p-4 flex flex-col">
						<p className="text-center">
							Project by <a href="http://www.florent-b.fr/" className='no-underline text-cyan-500 hover:underline hover:text-cyan-400'>Florent B</a>
						</p>
						<p className="text-center">
							Code & infos on <a href="https://github.com/flo-bou/pokedex-filter" className='no-underline text-cyan-500 hover:underline hover:text-cyan-400'>GitHub</a>
						</p>
					</div>
				</footer>
			</div>
		);
	}

    componentDidMount(){
        this.requestEntriesInCategory('generation');
        this.requestEntriesInCategory('pokemon-color');
        this.requestEntriesInCategory('pokemon-shape');
        this.requestEntriesInCategory('pokemon-habitat');
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
                console.log('State after requestEntriesInCategory for ', request, ' : ', this.state);
            });
            return data;
        })
        .catch( error => {
            console.error(request, error);
            console.error("fetch from PokeAPI failed :( during request ", request)
            return [];
        });
    }

	requestPokemonNamesOfEntry(entry, category){
        fetch("https://pokeapi.co/api/v2/" + entry)
        .then( responseObject => {
            return responseObject.json();
        })
        .then( data => {
            // console.log('Datas for ', entry, ' : ', data);
            let listOfPokemons = data.pokemon_species.map((value) => value.name);
			// console.log('listOfPokemons : ', listOfPokemons);
            this.setState( (prevState) => {
					prevState.dataPokemon[category] = listOfPokemons;
					return prevState;
				}, () => {
                console.log('State after requestPokemonNamesOfEntry for ', entry, ' : ', this.state);
            });
            return data;
        })
		.then( data => {
			// console.log('Generating final list to display');
			this.generateFinalList(category);
			return data;
		})
        .catch( error => {
            console.error(entry, error);
            console.error("fetch from PokeAPI failed :( during request ", entry)
            return [];
        });
    }

	// get categories requests from Form component
	sendRequestedCategory(category, entryChosen){
		if (entryChosen!=="void"){
			this.requestPokemonNamesOfEntry(category + '/' + entryChosen, category);
		} else{
			this.setState( (prevState) => {
				prevState.dataPokemon[category] = [];
				return prevState;
			}, () => {
				this.generateFinalList(category);
			});
		}
		this.setState( (prevState) => {
			prevState.reqPokemon[category] = entryChosen;
			return prevState;
		});
	}

	generateFinalList(){
		// parcourir l'objet dataPokemon, pour les entrées non vide, chercher les correspondances puis mettre le tableau filtré dans state
		// JSON.parse and JSON.stringify can make deep copies
		// numbersCopy = JSON.parse(JSON.stringify(nestedNumbers));
		let pokemonShape = this.state.dataPokemon['pokemon-shape'];
		let pokemonHabitat = this.state.dataPokemon['pokemon-habitat'];
		let pokemonColor = this.state.dataPokemon['pokemon-color'];
		let generation = this.state.dataPokemon['generation'];

		let intersections = [];

		for (let entry of [pokemonShape, pokemonHabitat, pokemonColor, generation]) {
			if (entry.length!==0){
				if (intersections.length===0){
					intersections = entry.slice();
				} else {
					intersections = intersections.filter( element => entry.includes(element));
				}
			}
		}

		intersections.sort();

		this.setState((prevState) => {
			prevState.finalList = intersections;
			return prevState;
		}, () => {
			console.log('State after generateFinalList :', this.state);
		});
	}

	// ordering(arrayOfStrings){

	// }

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
