import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import axios from "../../axios";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";

import Aux from "../../hoc/ReactAux";
import "moment/locale/nl";
import "react-big-calendar/lib/css/react-big-calendar.css";

const styles = {
    paper: {
        position: "absolute",
        width: "70%",
        backgroundColor: "white",
        boxShadow: "1px 1px 1px black",
        padding: "16px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
};

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

class Calendar extends Component {
    state = {
        events: [],
        open: false,
        selectedEvent: {}
    };

    async componentDidMount() {
        const events = [];
        const response = await axios.get("/events.json");
        for (let key in response.data) {
            events.push({
                id: key,
                title: response.data[key].subject,
                start: new Date(response.data[key].times.begin),
                end: new Date(response.data[key].times.end)
            });
        }
        this.setState({ events });
    }

    selectEventHandler = event => {
        this.setState({ open: true, selectedEvent: event });
    };

    closeModalHandler = () => {
        this.setState({ open: false });
    };

    deleteEventHandler = async id => {};

    render() {
        const { classes } = this.props;
        return (
            <Aux>
                <BigCalendar
                    defaultView="week"
                    events={this.state.events}
                    min={moment("6", "H").toDate()}
                    views={["day", "week", "agenda"]}
                    culture="nl-NL"
                    popup={true}
                    onSelectEvent={this.selectEventHandler}
                />
                <Modal open={this.state.open} onClose={this.closeModalHandler}>
                    <div className={classes.paper}>
                        <Typography variant="title">
                            {this.state.selectedEvent.title}
                        </Typography>
                        <Typography variant="subheading">
                            Frans van{" "}
                            {moment(this.state.selectedEvent.start).format(
                                "HH:mm"
                            )}{" "}
                            tot{" "}
                            {moment(this.state.selectedEvent.end).format(
                                "HH:mm"
                            )}
                        </Typography>
                        <Button
                            color="secondary"
                            onClick={this.closeModalHandler}>
                            Delete Event
                        </Button>
                    </div>
                </Modal>
            </Aux>
        );
    }
}

export default withStyles(styles)(Calendar);
