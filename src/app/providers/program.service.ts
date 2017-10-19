import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseOptions, URLSearchParams } from '@angular/http';

/*
  Generated class for the DataSets provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProgramService {

    headers: Headers;
    options: RequestOptions;

  headersMultipart: Headers;
  optionsMultipart: ResponseOptions;

constructor(private http:Http) {
this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
this.options = new RequestOptions({ headers: this.headers });



this.headersMultipart = new Headers({'Accept': 'q=0.8;application/json;q=0.9;text/plain'});
this.optionsMultipart =new ResponseOptions({ headers: this.headersMultipart });
}
  getprograms(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getTrackEntityInstance(url: string): Promise<any> {
    return this.http
      .get(url, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  getProgramStage(url: string): Promise<any> {
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

 enrolApplicant(url: string, param: any): Promise<any> {
    let body = JSON.stringify(param);
    return this.http
      .post(url, body, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  registerEvent(url: string, param: any): Promise<any> {
    let body = JSON.stringify(param);
    return this.http
      .post(url, body, this.options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }
  postFile(url: string, formData: FormData): Promise<any> {
       return this.http
      .post(url, formData, this.optionsMultipart)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


}
