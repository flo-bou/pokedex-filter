import React from "react";

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerOrder = this.changeStickerOrder.bind(this);
        // this.state = this.props.dataColonne;
    }

    changeStickerOrder(){

    }

    render() {
        return (
			<header className="mb-5 px-3 md:px-8">
				<nav className="container mx-auto flex justify-between py-5">
					<p className='text-2xl'>
						Welcome to the pokedex filter!
					</p>
				</nav>
			</header>
        );
    }
}

export default Nav;