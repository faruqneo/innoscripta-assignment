import { SEARCH_INITTATED, SEARCH_FINISHED, SEARCH_INPROGRESS } from "./constant";

export type ReducerState = {
  rowsPerPage?: number;
  page?: number;
  isLoading: boolean;
  source: string;
  categories: string;
  authors: string;
  dataSources: string;
};

export type ActionType = {
  type: string;
  payload?: any;
};

export const initialState: ReducerState = { rowsPerPage: 10, page: 1, isLoading: false, source: '', categories: '', authors: '', dataSources: '' };

export const reducer = (state: ReducerState, action: ActionType): ReducerState => {
  switch (action.type) {
    case SEARCH_INITTATED:
      return {
        ...state,
        source: action?.payload?.source,
        categories: action?.payload?.categories,
        authors: action?.payload?.authors,
        dataSources: action?.payload?.dataSources,
        isLoading: true
      };
    case SEARCH_INPROGRESS:
      return {
        ...state,
        rowsPerPage: action?.payload?.rowsPerPage,
        page: action?.payload?.page,
        isLoading: true
      };
    case SEARCH_FINISHED:
      return {
        ...state,
        isLoading: false
      };
    default:
      throw new Error();
  }
};
