import { Component, OnInit } from '@angular/core';
import { HttpService } from './shared/http.service';
import { Store } from '@ngrx/store';
import { getSearchParams } from './state/list.selectors';
import { setList, setLoader } from './state/list.action';
import { AppState } from './models/appState.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchParams } from './models/searchParms.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  params!: SearchParams;

  constructor(
    private api: HttpService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  getList() {
    this.store.select(getSearchParams).subscribe((params) => {
      this.params = params;
    });

    this.api.httpListCard(this.params).subscribe(
      (list) => {
        this.store.dispatch(setList({ list }));
        this.store.dispatch(setLoader({ data: false }));
      },
      (err: any) => {
        this._snackBar.open(err.message, 'Undo', {
          duration: 8000,
        });
      }
    );
  }

  ngOnInit(): void {
    this.getList();
  }
}
