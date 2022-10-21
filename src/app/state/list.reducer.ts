import { createReducer, on, Action } from '@ngrx/store';
import {
  setList,
  setParams,
  increasePage,
  refreshState,
  setLoader,
} from './list.action';
import { initialState } from './list.state';

const _listReducer = createReducer(
  initialState,
  on(setList, (state: any, action) => {
    let list = [...state.list, ...action.list];

    let loadMore = !!action.list.length;

    return {
      ...state,
      list,
      loadMore,
    };
  }),
  on(setLoader, (state: any, action) => {
    return {
      ...state,
      load: action.data,
    };
  }),
  on(setParams, (state: any, action) => {
    return {
      ...state,
      searchParams: action.data,
    };
  }),

  on(increasePage, (state) => {
    return {
      ...state,
      page: state.page + 1,
    };
  }),
  on(refreshState, (state) => {
    return {
      ...state,
      list: [],
      page: 0,
    };
  })
);

export function listReducer(state: any, action: Action) {
  return _listReducer(state, action);
}
