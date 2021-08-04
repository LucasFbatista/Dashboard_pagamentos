const INITIAL_STATE = { summary: { credit: 800, debt:500 }}

export default function (state = INITIAL_STATE, action) {
    
    switch(action.type) {

        case 'BILLING_SUMMARY_FETCHED':
            return { ...state, summary: action.payload.data }
        default:
            return state
    }
}