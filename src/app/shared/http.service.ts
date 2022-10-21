import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public key: string = 'VEBcQtfub0iyDqizrJDmhXJwd7Hh7NWel0LqvcS7';
  public url: string = 'https://api.nasa.gov/mars-photos/api/v1/';

  httpListCard(data: any) {
    return this.http
      .get<any>(
        `${this.url}rovers/${data.params.rover}/photos?sol=${data.params.sol}&camera=${data.params.camera}&page=${data.page}&api_key=${this.key}`
      )
      .pipe(
        map((res: any) => {
          return res.photos;
        })
      );
  }
}
