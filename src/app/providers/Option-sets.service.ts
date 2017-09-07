import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import {OptionSet} from "../option-set"
/*
  Generated class for the DataSets provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OptionSetsService {

    headers: Headers;
    options: RequestOptions;

	  constructor(private http:Http) {
this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
this.options = new RequestOptions({ headers: this.headers });  }



  getOptionSetsService(url: string): Promise<any> {
  return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

  getData(url: string): Observable<OptionSet[]> {
    return this.http.get(url).map(response => response.json());
  }


}
