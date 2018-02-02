import React from 'react';

const validationComponent = (props) => {
    let validationText;

    if(props.text.length >= 5) validationText = <p>Text long enough</p>
    else if(props.text.length < 5) validationText = <p>Text too short</p>

    return (
        <div>
            {validationText}
        </div>
    )
};

export default validationComponent;