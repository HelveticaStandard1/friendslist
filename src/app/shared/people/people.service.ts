import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable()
export class PeopleService {
  public API = '/api';
  public PERSON_API = this.API + '/people';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getPeople(): Observable<any> {
    return this.http.get(this.PERSON_API, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  getPerson(id: string): Observable<any> {
    const url = `${this.PERSON_API}/${id}`;
    return this.http.get(url, this.httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  postPerson(data): Observable<any> {
    return this.http.post(this.PERSON_API, data, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updatePerson(form, id): Observable<any> {
    const url = this.PERSON_API + '/' + id;
    return this.http.put(url, form, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deletePerson(id: string): Observable<{}> {
    const url = `${this.PERSON_API}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
