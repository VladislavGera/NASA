import { createAction, props } from '@ngrx/store';
import { CardModel } from '../models/card.model';
import { SearchParams } from '../models/searchParms.model';

export const setList = createAction('setList', props<{ list: CardModel[] }>());
export const setLoader = createAction('setLoader', props<{ data: boolean }>());
export const setLoadMore = createAction('setLoadMore', props<{ data: boolean }>());
export const setParams = createAction(
  'setParams',
  props<{ data: SearchParams }>()
);

export const increasePage = createAction('increasePage');
export const refreshState = createAction('refreshState');
