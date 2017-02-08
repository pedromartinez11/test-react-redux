const initialState = {
    tweets: [],
    fetching: false,
    fetched: false,
    error: null
};

export default function reducer(state = initialState, action) {
    switch( action.type) {
        case 'FETCH_TWEETS': {
            return {
                ...state,
                fetching: true
            };
        }
        case 'FETH_TWEETS_REJECTED': {
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        }
        case 'FETCH_TWEETS_FULFILLED': {
            return {
                ...state,
                fetching: false,
                fetched: true,
                tweets: action.payload
            }
        }
        case 'ADD_TWEET': {
            return {
                ...state,
                tweets: [...state.tweets, action.payload] // add a new one to the end
            };
        }
        case 'UPDATE_TWEET': { // replace a tweet
            const { id } = action.payload;
            const newTweets = [...state.tweets];
            const tweetToUpdateIndex = newTweets.findIndex((tweet) => {
                return tweet.id === id;
            });
            newTweets[tweetToUpdateIndex] = action.payload;

            return {
                ...state,
                tweets: newTweets
            }
        }
        case 'DELETE_TWEET': {
            return {
                ...state,
                tweets: state.tweets.filter(tweet => tweet.id != action.payload)
            };
        }
    }

    // don't know how to handle, return same state
    return state;
}