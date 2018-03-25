import React from "react";

import BigCalendar from "react-big-calendar";
import moment from "moment";
import Aux from "../../hoc/ReactAux";
import "moment/locale/nl";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const calendar = props => {
    let demoevents = [
        {
            id: 0,
            title: "Test1111111",
            end: moment()
                .subtract(1, "minutes")
                .toDate(),
            start: moment()
                .subtract(30, "minutes")
                .toDate()
        }
    ];

    return (
        <Aux>
            <BigCalendar
                defaultView="week"
                events={demoevents}
                min={moment("6", "H").toDate()}
                views={["day", "week", "agenda"]}
                culture="nl-NL"
                popup={true}
            />
            <button>Export current day to clipboard</button>
        </Aux>
    );
};

export default calendar;
