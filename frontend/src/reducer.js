import { ACTIONS } from "./constants";

export const initialState = {
  fileName: "",
  loading_summary: false,
  newSummary: "",
  clientData: [],
  allSummaries: [],
  error: "",
  message: "",
  loadingStatus: "",
  audioUrl: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_FILE_NAME:
      return {
        ...state,
        fileName: action.payload,
      };

    case ACTIONS.FETCH_AUDIO_URL:
      return {
        ...state,
        audioUrl: action.payload,
      };

    case ACTIONS.REPORT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    case ACTIONS.LOADING_STATUS:
      return {
        ...state,
        loadingStatus: action.payload,
        // sending audio, converting audio, summarizing
      };

    // To fix
    case ACTIONS.PICKUP_PHONE:
      return {
        ...state,
      };

    case ACTIONS.SUMMARIZE:
      return {
        ...state,
        error: "",
        newSummary: action.payload,
      };

    // get client
    case ACTIONS.FETCH_CLIENT_DATA:
      return {
        ...state,
        error: "",
        clientData: action.payload,
      };

    case ACTIONS.CLEAR_CLIENT_DATA:
      return {
        ...state,
        clientData: [],
      };

    // store summary
    case ACTIONS.STORE_SUMMARY:
      return {
        ...state,
        message: action.payload,
      };

    case ACTIONS.FETCH_SUMMARY_LIST:
      return {
        ...state,
        error: "",
        allSummaries: action.payload,
      };

    default:
      return state;
  }
}
