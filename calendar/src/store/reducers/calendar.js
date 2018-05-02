import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    events: [],
    loadingCalendarEvents: false,
    loadingDeleteEvent: false,
    modalOpen: false
};

const mapEvents = (state, events) => {
    const mappedEvents = [];
    for (let key in events) {
        mappedEvents.push({
            id: key,
            title: events[key].subject,
            start: new Date(events[key].times.begin),
            end: new Date(events[key].times.end)
        });
    }
    return updateObject(state, {
        loading: false,
        events: state.events.concat(mappedEvents)
    });
};

const mapEvent = (state, formData, id) => {
    const newEvent = {
        id,
        title: formData.subject,
        start: new Date(formData.times.begin),
        end: new Date(formData.times.end)
    };
    return updateObject(state, { events: state.events.concat(newEvent) });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_CALENDAR_EVENTS_START:
            return updateObject(state, { loadingCalendarEvents: true });
        case actionTypes.DELETE_CALENDAR_EVENT_START:
            return updateObject(state, { loadingDeleteEvent: true });
        case actionTypes.LOAD_CALENDAR_EVENTS_SUCCESS:
            return mapEvents(state, action.events);
        case actionTypes.DELETE_CALENDAR_EVENT_SUCCESS:
            return updateObject(state, {
                loadingDeleteEvent: false,
                events: state.events.filter(event => event.id !== action.id)
            });
        case actionTypes.ADD_SUBMIT_SUCCESS:
            return mapEvent(state, action.formData, action.id);
        case actionTypes.LOAD_CALENDAR_EVENTS_FAIL:
            return updateObject(state, { loadingCalendarEvents: false });
        case actionTypes.DELETE_CALENDAR_EVENT_FAIL:
            return updateObject(state, { loadingDeleteEvent: false });
        default:
            return state;
    }
};

export default reducer;
