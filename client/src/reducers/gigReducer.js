import gigActions from "./gigActions";

export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id,
    title: "",
    cat: "design",
    cover: "",
    images: [],
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [],
    price: 0
};

export const gigReducer = (state, action) => {
    switch (action.type) {
        case gigActions.CHANGE_INPUT:
            return {
                ...state,
                [action.payload.name]:action.payload.value,
            }
        case gigActions.ADD_IMAGES:
            return {
                ...state,
                images: action.payload.images,
                cover: action.payload.cover
            }
        case gigActions.ADD_FEATURES:
            return {
                ...state,
                features: [...state.features, action.payload]
            }
        case gigActions.REMOVE_FEATURES:
            return {
                ...state,
                features: state.features.filter((feature)=> feature !== action.payload)
            }
        default:
            state;
    }
}