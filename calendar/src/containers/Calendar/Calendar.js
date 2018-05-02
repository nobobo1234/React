import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Modal from "material-ui/Modal";
import Button from "material-ui/Button";
import { connect } from "react-redux";

import Aux from "../../hoc/ReactAux";
import "moment/locale/nl";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as actions from "../../store/actions";
import Spinner from "../../components/UI/Spinner/Spinner";

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
        selectedEvent: {},
        open: false
    };

    componentDidMount() {
        if (this.props.events.length === 0) {
            this.props.loadCalendarEvents();
        }
    }

    selectEventHandler = event => {
        this.setState({ open: true, selectedEvent: event });
    };

    closeModalHandler = () => {
        this.setState({ open: false, selectedEvent: {} });
    };

    render() {
        const { classes } = this.props;
        let calendar = <Spinner />;
        if (this.props.loadingCalendarEvents) {
            calendar = (
                <BigCalendar
                    defaultView="week"
                    events={this.props.events}
                    min={moment("6", "H").toDate()}
                    views={["day", "week", "agenda"]}
                    culture="nl-NL"
                    popup={true}
                    onSelectEvent={this.selectEventHandler}
                />
            );
        }
        return (
            <Aux>
                {calendar}
                <Modal open={this.state.open} onClose={this.closeModalHandler}>
                    <div className={classes.paper}>
                        <Typography variant="title">{this.state.selectedEvent.title}</Typography>
                        <Typography variant="subheading">
                            Frans van {moment(this.state.selectedEvent.start).format("HH:mm")} tot{" "}
                            {moment(this.state.selectedEvent.end).format("HH:mm")}
                        </Typography>
                        {this.props.isAuthenticated ? (
                            <Button
                                color="secondary"
                                onClick={() =>
                                    this.props.deleteCalendarEvent(
                                        this.state.selectedEvent.id,
                                        this.closeModalHandler
                                    )
                                }>
                                Delete Event
                            </Button>
                        ) : null}
                    </div>
                </Modal>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        events: state.calendar.events,
        loadingCalendarEvents: state.calendar.loadingCalendarEvents,
        loadingDeleteEvent: state.calendar.loadingDeleteEvent,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCalendarEvents: token => dispatch(actions.loadCalendarEvents(token)),
        deleteCalendarEvent: (id, closeModalHandler) =>
            dispatch(actions.deleteCalendarEvent(id, closeModalHandler))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Calendar));
