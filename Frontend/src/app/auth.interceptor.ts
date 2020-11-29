import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AccessToken } from './models/access-token';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshInProgress = false;
  private refreshSubject = new BehaviorSubject<AccessToken>(null);

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/auth') !== -1) {
      return next.handle(req);
    }

    req = this.addAccessToken(req);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const token = this.auth.getAccessToken();

        if (token === null) {
          return throwError(err);
        }

        if (err && err.status === 401 && this.auth.isExpired()) {
          if (this.refreshInProgress) {
            // If refreshInProgress is true, we will wait until refreshSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAccessToken(req)))
            );
          } else {
            this.refreshInProgress = true;
            // Set the refreshSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshSubject.next(null);

            return this.auth.refresh(this.auth.getAccessToken()).pipe(
              switchMap((val: AccessToken) => {
                this.auth.setAccessToken(val);
                this.refreshSubject.next(val);
                return next.handle(this.addAccessToken(req));
              }),
              // When the call to refresh completes we reset the refreshInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refreshInProgress = false)
            );
          }
        } else {
          return throwError(err);
        }
      })
    );
  }

  private addAccessToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.auth.getAccessToken();

    if (token === null) {
      return request;
    }

    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token.token),
    });
  }
}
