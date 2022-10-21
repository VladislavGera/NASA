import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/appState.model';

const getListState = createFeatureSelector<AppState>('list');

export const getListPhotos = createSelector(getListState, (state) => {
  return state;
});

export const getSearchParams = createSelector(getListState, (state) => {
  return {
    params: state.searchParams,
    page: state.page,
  };
});
