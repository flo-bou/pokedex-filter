import React from "react";
// import noImage from "../noimage.png";
import questionmark from "../questionmark.png";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.requestPokemonInfo = this.requestPokemonInfo.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = { };
    }

    // componentDidMount(){
    //     this.requestEntriesInCategory('generation');
	// }

	requestPokemonInfo(pokemon){
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then( responseObject => {
            return responseObject.json();
        })
        .then( data => {
            this.setState( data, () => {
                console.log('State after requestPokemonInfo for ', pokemon, ' : ', this.state);
            });
            return data;
        })
        .catch( error => {
            console.error(pokemon, error);
            console.error("fetch from PokeAPI failed :( during pokemon ", pokemon)
            return [];
        });
    }

    // replaceDefaultInfo(){
    //     const modal = document.getElementById(this.props.name + "modal");
    // }

    toggleModal(){
        let element = document.getElementById(this.props.name + "modal");
        element.classList.toggle("hidden");
    }

    render() {
        return (
            <div className="rounded overflow-hidden shadow-lg">
                {/* <img className="w-full" src="/public/img/noimage.png" alt="No image" /> */}
                <button type="button" className="px-6 py-0 w-full rounded border border-transparent hover:border-gray-400" onClick={ () => { this.toggleModal(); this.requestPokemonInfo(this.props.name)} } onMouseOver={ () => { if (!this.state.name) this.requestPokemonInfo(this.props.name)} } >
                    <div className="flex justify-between items-center">
                        <p className="text-xl capitalize py-4">
                            {this.props.name}
                        </p>
                        { 
                            this.state.name
                            ? <img className="h-14" src={this.state.sprites.front_default} alt={"Picture of " + this.props.name} />
                            : ""
                        }
                    </div>
                    {/* <p className="text-gray-700 text-base">
                        
                    </p> */}
                </button>

                {/* <!-- Modal --> */}
                <div id={this.props.name + "modal"} aria-hidden="true" className="hidden bg-slate-800 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0">
                    {/* <!-- Modal wrapper --> */}
                    <div className="px-4 max-w-md fixed top-0 right-0 bottom-0 left-0 flex items-center mx-auto">
                        {/* <!-- Modal content --> */}
                        <div className="bg-white rounded-lg shadow-md w-full">

                            {/* <!-- Modal header --> */}
                            <div className="flex justify-between items-start p-5 rounded-t">
                                <h3 className="text-2xl capitalize font-semibold">
                                    { 
                                        this.state.name
                                        ? this.state.name
                                        : "Not Found :("
                                    }
                                </h3>
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={ () => this.toggleModal() }>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>  
                                </button>
                            </div>

                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6">
                                { 
                                    this.state.name
                                    ? <img className="w-full" src={this.state.sprites.other['official-artwork']['front_default']} alt={this.state.name + "'s Artwork"} />
                                    : <img className="w-full" src={questionmark} alt="" />
                                }

                                <table>
                                    <tbody>
                                        <tr>
                                            <th className="text-left px-3">Type(s)</th>
                                            <td className="capitalize">
                                                { 
                                                    this.state.name
                                                    ? this.state.types.map( value => value.type.name + " ")
                                                    : "?"
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-left px-3">Height</th>
                                            <td>
                                                { 
                                                    this.state.name
                                                    ? this.state.height + " dm"
                                                    : "?"
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="text-left px-3">Weight</th>
                                            <td>
                                                { 
                                                    this.state.name
                                                    ? this.state.weight + " hg"
                                                    : "?"
                                                }
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Card;