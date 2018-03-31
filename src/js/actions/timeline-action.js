//TODO: fix

export function fetchTimeline() {

    return function (dispatch) {
        dispatch({ type: "FETCH_TIMELINE" })
        dispatch({ type: "FETCH_TIMELINE_FULFILLED", payload: getTimeline()})

        // on error
        // dispatch({ type: "FETCH_TIMELINE_REJECTED", payload: 'err' })
    }
}

function getTimeline(){
    return new SB.Timeline({
        debug: true, // truthy value, will visualise the timeline
        framerate: 30, // frames per second, default: 25
        cycleTime: 3000, // milliseconds, length of the timeline cycle, default: 0
    })
}