import React, { Component } from "react";
import ColumnResizer from "column-resizer";
import ReactDOM from "react-dom";

class Table extends Component {
    componentDidMount() {
        if (this.props.resizable) {
            this.enableResize();
        }
    }

    componentWillUnmount() {
        if (this.props.resizable) {
            this.disableResize();
        }
    }

    componentDidUpdate() {
        if (this.props.resizable) {
            this.enableResize();
        }
    }

    componentWillUpdate() {
        if (this.props.resizable) {
            this.disableResize();
        }
    }

    render() {
        return (
            <table id="dynamicTable" width="100%">
                <tbody className="table-body">
                    <tr>
                        <th className="table-header">Revenue </th>
                        <th className="table-header">Religious</th>
                        <th className="table-header">Recipient</th>
                        <th className="table-header">Results</th>
                    </tr>
                    <tr>
                        <td className="left">A %</td>
                        <td>B %</td>
                        <td>C %</td>
                        <td>D %</td>
                    </tr>
                    <tr>
                        <td className="left">a %</td>
                        <td>a %</td>
                        <td>a %</td>
                        <td>a %</td>
                    </tr>
                    <tr>
                        <td className="left bottom">50% points</td>
                        <td className="bottom">21% points</td>
                        <td>60% points</td>
                        <td>40% points</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    enableResize() {
        const normalRemote = ReactDOM.findDOMNode(this).querySelector(
            `#dynamicTable`
        );
        const options = {
            liveDrag: true,
            draggingClass: "rangeDrag",
            gripInnerHtml: "<div class='rangeGrip'></div>"
        };
        options.remoteTable = normalRemote;
        if (!this.resizer) {
            this.resizer = new ColumnResizer(
                ReactDOM.findDOMNode(this).querySelector(`.table-body`),
                options
            );
        } else {
            this.resizer.reset(options);
        }
    }

    disableResize() {
        if (this.resizer) {
            // This will return the current state of the
            // options including column widths.
            // These widths can be saved so the table
            // can be initialized with them.
            this.resizer.reset({ disable: true });
        }
    }
}

export default Table;
