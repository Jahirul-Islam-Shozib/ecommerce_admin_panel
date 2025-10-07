import {
  HttpErrorResponse, HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {inject} from '@angular/core';
import {Router} from "@angular/router";
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {SessionManagementService} from '../../security/session.management.service';
import {environment} from '../../../environments/environment';


export const DefaultInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const sessionManagementService = inject(SessionManagementService);
  const router = inject(Router);
  let url = req.url;
  if (!url.startsWith('https://') && !url.startsWith('http://') && !url.endsWith('.json')) {
    url = environment.API_BASE_URL + url;
  }

  const token = localStorage?.getItem('userToken') ? localStorage?.getItem('userToken') : ''
  let headers = req.headers.set('X-request-source', 'web').set('Authorization', `Bearer ${token}`);
  const newReq = req.clone({url, withCredentials: true});

  return next(newReq).pipe(
    mergeMap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // Only handle HttpResponse here
        return handleData(event);
      }
      // Pass through other events (e.g., upload progress)
      return of(event);
    }),
    catchError((error: HttpErrorResponse) => {
      handleError(error);
      return throwError(() => error);
    })
  );

  function handleData(event: HttpResponse<any>): Observable<any> {

    switch (event.status) {
      case 200:
        break;
      case 201:
        break;
    }
    return of(event);
  }

  function handleError(event: HttpErrorResponse) {
    switch (event.status) {
      case 400:
        handle400Error(event);
        break;
      case 401:
        handle401Error(event);
        break;
      case 403:
        handle403Error(event);
        break;
      case 404:
        handle404Error(event);
        break;
      case 500:
        handle500Error(event);
        break;
    }
    return of(event);
  }

  function handle400Error(event: HttpResponse<any> | HttpErrorResponse) {
  }

  function handle401Error(event: HttpResponse<any> | HttpErrorResponse) {
    // sessionManagementService.loggedOut(true);
    // router.navigate(['auth/login']);
    sessionManagementService.loggedOut(true);
    sessionManagementService.refreshSession().then(() => {
      window.location.href = environment.AUTH_REDIRECT_URL;
    });
  }

  function handle403Error(event: HttpResponse<any> | HttpErrorResponse) {
  }

  function handle404Error(event: HttpResponse<any> | HttpErrorResponse) {
  }

  function handle405Error(event: HttpResponse<any> | HttpErrorResponse) {
  }

  function handle409Error(event: HttpResponse<any> | HttpErrorResponse) {
  }

  function handle500Error(event: HttpResponse<any> | HttpErrorResponse) {
  }
}
