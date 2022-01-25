import React from "react";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.changeStickerOrder = this.changeStickerOrder.bind(this);
        // this.state = this.props.dataColonne;
    }

    changeStickerOrder(){

    }

    render() {
        return (
            <div className="rounded overflow-hidden shadow-lg">
                <img className="w-full" src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Fstatic3.depositphotos.com%2F1002772%2F156%2Fi%2F600%2Fdepositphotos_1561006-stock-photo-monch-montain.jpg&sp=1642547177Tbc1afe07aaa057d5df6d4a5c9f29e6c46595dd03e4921c2588a4165e24a0e7a8" alt="Mountain" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                        {this.props.name}
                    </div>
                    <p className="text-gray-700 text-base">
                        {this.props.flavor_text}
                    </p>
                </div>
            </div>
        );
    }
}

export default Card;