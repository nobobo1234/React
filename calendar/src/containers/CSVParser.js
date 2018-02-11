import React from "react";

import csv from "csvtojson";

class CsvParse extends React.Component {
    formatFileResult(file, fileHeaders) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            let csvtext = reader.result;
            let endarray = [];
            csv({
                delimiter: ";",
                noheader: false,
                headers: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ]
            })
                .fromString(csvtext)
                .on("json", jsonObj => {
                    endarray.push(jsonObj);
                })
                .on("done", () => {
                    this.props.onDataUploaded(endarray);
                });
        };
    }

    handleOnChange = event => {
        const file = event.target.files[0];
        this.formatFileResult(file, this.props.fileHeaders);
    };

    render() {
        return this.props.render(this.handleOnChange);
    }
}

export default CsvParse;
