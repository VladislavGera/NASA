import { Component, Inject, Input, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import {
  refreshState,
  setParams,
  setLoader,
  setLoadMore,
} from '../../state/list.action';
import { getSearchParams } from '../../state/list.selectors';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InputParams } from 'src/app/models/inputParams.model';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AppState } from 'src/app/models/appState.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  rover!: string;
  camera!: string;
  sol!: number;
  @Input() getList: any;

  constructor(
    public dialog: MatDialog,
    private api: HttpService,
    private store: Store<AppState>,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.store.select(getSearchParams).subscribe((data) => {
      this.rover = data.params.rover;
      this.camera = data.params.camera;
      this.sol = data.params.sol;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {
        rover: this.rover,
        camera: this.camera,
        sol: this.sol,
      },
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!!data) {
        if (data.sol > 0) {
          this.store.dispatch(setLoader({ data: true }));
          this.store.dispatch(setLoadMore({ data: true }));
          this.store.dispatch(refreshState());
          this.store.dispatch(setParams({ data }));
          this.getList();
        } else {
          this._snackBar.open('Please enter a positive number', 'Undo', {
            duration: 5000,
          });
        }
      }
    });
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./header.component.scss'],
})
export class DialogOverviewExampleDialog {
  solDay: number = 1000;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: InputParams
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
