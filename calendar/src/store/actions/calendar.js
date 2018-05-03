import * as actionTypes from "./actionTypes";

export const loadCalendarEventsStart = () => {
    return {
        type: actionTypes.LOAD_CALENDAR_EVENTS_START
    };
};

export const deleteCalendarEventStart = () => {
    return {
        type: actionTypes.DELETE_CALENDAR_EVENT_START
    };
};

export const loadCalendarEventsSuccess = events => {
    return {
        type: actionTypes.LOAD_CALENDAR_EVENTS_SUCCESS,
        events
    };
};

export const deleteCalendarEventSuccess = id => {
    return {
        type: actionTypes.DELETE_CALENDAR_EVENT_SUCCESS,
        id
    };
};

export const loadCalendarEventsFail = error => {
    return {
        type: actionTypes.LOAD_CALENDAR_EVENTS_FAIL,
        error
    };
};

export const deleteCalendarEventFail = error => {
    return {
        type: actionTypes.DELETE_CALENDAR_EVENT_FAIL,
        error
    };
};

export const loadCalendarEvents = () => {
    return dispatch => {
        dispatch(loadCalendarEventsStart());
    };
};

export const deleteCalendarEvent = (id, closeModalHandler) => {
    return dispatch => {
        dispatch(deleteCalendarEventStart());
        axios
            .delete(`/events/${id}.json`)
            .then(() => {
                closeModalHandler();
                dispatch(deleteCalendarEventSuccess(id));
            })
            .catch(err => {
                closeModalHandler();
                dispatch(deleteCalendarEventFail(err));
            });
    };
};
