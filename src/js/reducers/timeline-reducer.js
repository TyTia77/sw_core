export function timeline(
    state = {
        timeline: false,
        fetching: false,
        fetched: false,
        error: null
    },
    action
) {
    switch (action.type) {
        case "FETCH_TIMELINE": {
            return { ...state, fetching: true }
        }
        case "FETCH_TIMELINE_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
        }
        case "FETCH_TIMELINE_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                timeline: action.payload
            };
        }
    }

    return state;
}