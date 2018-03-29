import dispatcher from "../dispatcher"

export function test(id) {
    dispatcher.dispatch({
        type: "tester",
        id
    });
}