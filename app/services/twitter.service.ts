import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TwitterService {

  constructor(private _http: Http) {
  }

  // 1. REQUEST TOKEN
  requestToken () {

  //   console.log("requestToken fired");
  //
  //   let url = 'https://api.twitter.com/oauth/request_token';
  //   let body = JSON.stringify({});
  //   let headers = new Headers({
  //     'oauth_callback': 'javascript:undefined',
  //     'x_auth_access_type': 'write'
  //   });
  //   let options = new RequestOptions({ headers: headers });
  //
  //   return this._http.post(url, body, options)
  //                    .map(response => response.json())
  //                    .catch(this.handleError);
  // }
  //
  // private handleError (error: Response) {
  //   // in a real world app, we may send the error to some remote logging infrastructure
  //   // instead of just logging it to the console
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }

}
