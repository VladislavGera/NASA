import { CardModel } from './card.model';
import { InputParams } from './inputParams.model';

export interface AppState {
  searchParams: InputParams;
  page: number;
  load: boolean;
  loadMore: boolean;
  list: CardModel[];
}
