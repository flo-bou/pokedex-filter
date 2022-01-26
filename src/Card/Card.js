import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.requestPokemonInfo = this.requestPokemonInfo.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = { };
    }

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

    toggleModal(){
        let element = document.getElementById(this.props.name + "modal");
        element.classList.toggle("hidden");
    }

    render() {
        return (
            <div className="rounded overflow-hidden shadow-lg">
                {/* <img className="w-full" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic3.depositphotos.com%2F1002772%2F156%2Fi%2F600%2Fdepositphotos_1561006-stock-photo-monch-montain.jpg&sp=1642547177Tbc1afe07aaa057d5df6d4a5c9f29e6c46595dd03e4921c2588a4165e24a0e7a8" alt="Mountain" /> */}
                <button type="button" className="px-6 py-4 w-full" onClick={ () => {this.requestPokemonInfo(); this.toggleModal();} }>
                    <div className="text-xl mb-2">
                        {this.props.name}
                    </div>
                    <p className="text-gray-700 text-base">
                        {/* {this.props.flavor_text} */}
                    </p>
                </button>
                {/* modal */}
                <div class="bg-slate-800 bg-opacity-50 absolute top-0 right-0 bottom-0 left-0 hidden" id={this.props.name + "modal"} onClick={ () => {this.toggleModal()} }>
                    <div class="flex justify-center items-center">
                        <div class="bg-white px-16 py-14 rounded-md text-center">
                            <h3 class="text-xl mb-4 font-bold text-slate-500">{this.props.name}</h3>
                            {/* add a close button */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Card;