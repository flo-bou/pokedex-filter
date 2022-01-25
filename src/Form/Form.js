import React from "react";

function Form(props) {

    const sendSelection = (categorie) => {
        let value = document.getElementById(categorie).value;
        props.sendRequestedCategory(categorie, value)
    };

    return (
        <div className="mb-3">
            <p className="my-3">
                Choisissez les pokémons à afficher :
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-3">

                <select name="generation" id="generation" className="border rounded p-1" onChange={ () => sendSelection('generation') }>
                    <option value="void">Per generation</option>
                    {/* {console.log('props.entriesInCategory : ', props.entriesInCategory)} */}
                    {props.entriesInCategory['generation'].map( (entry) => {
                        return (
                            <option value={entry} key={'generation' + entry}>
                                {entry}
                            </option>
                        );
                    })}
                </select>

                <select name="type" id="type" className="border rounded p-1" onChange={ () => sendSelection('type') }>
                    <option value="void">Per type</option>
                    {props.entriesInCategory['type'].map( (entry) => {
                        return (
                            <option value={entry} key={'type' + entry}>
                                {entry}
                            </option>
                        );
                    })}
                </select>

                <select name="pokemon-shape" id="pokemon-shape" className="border rounded p-1" onChange={ () => sendSelection('pokemon-shape') }>
                    <option value="void">Per body shape</option>
                    {props.entriesInCategory['pokemon-shape'].map( (entry) => {
                        return (
                            <option value={entry} key={'pokemon-shape' + entry}>
                                {entry}
                            </option>
                        );
                    })}
                </select>

                <select name="pokemon-habitat" id="pokemon-habitat" className="border rounded p-1" onChange={ () => sendSelection('pokemon-habitat') }>
                    <option value="void">Per habitat</option>
                    {props.entriesInCategory['pokemon-habitat'].map( (entry) => {
                        return (
                            <option value={entry} key={'pokemon-habitat' + entry}>
                                {entry}
                            </option>
                        );
                    })}
                </select>

            </div>
        </div>
    );

}

export default Form;