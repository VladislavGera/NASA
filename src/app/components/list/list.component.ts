import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpService } from 'src/app/shared/http.service';
import { increasePage, setLoader } from '../../state/list.action';
import { getListPhotos } from '../../state/list.selectors';
import { CardModel } from 'src/app/models/card.model';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AppState } from 'src/app/models/appState.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  list!: CardModel[];
  load!: boolean;
  loadMore!: boolean;
  @Input() getList: any;

  constructor(
    private api: HttpService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  lodeMore() {
    this.store.dispatch(setLoader({ data: true }));
    this.store.dispatch(increasePage());
    this.getList();
  }

  ngOnInit(): void {
    this.store.select(getListPhotos).subscribe((data) => {
      this.list = data.list;
      this.load = data.load;
      this.loadMore = data.loadMore;
    });
  }
}
