import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class AppSettingsService {
  private apiUrl: string = '/api';
  private appSettingsUrl: string = `${this.apiUrl}/tenant/public-app-settings`;

  constructor(private http: Http) {
  }

  getIntercomAppId(): Observable<any> {
    return this.http.get(this.appSettingsUrl)
      .map(res => res.json())
      .catch(this.handleError)
  }

  private handleError(err: Response): Observable<any> {
    console.error(err);
    return Observable.throw(err);
  }

}