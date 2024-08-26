export const initialState = { open: false, topics: [], topic: {}, photos: [] }
export const actionTypes = {
SET_OPEN: "SET_OPEN",
SET_TOPICS: "SET_TOPICS",
SET_TOPIC: "SET_TOPIC",
SET_PHOTOS: "SET_PHOTOS",
}
const reducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_OPEN:
            return {
                ...state,
                open: action.open
            }
        case actionTypes.SET_TOPICS:
            return {
                ...state,
                topics: action.topics
            }
        case actionTypes.SET_TOPIC:
            return {
                ...state,
                topic: action.topic
            }
        case actionTypes.SET_PHOTOS:
            return {
                ...state,
                photos: action.photos
            }
        default:
            return state
        }
}
export default reducer