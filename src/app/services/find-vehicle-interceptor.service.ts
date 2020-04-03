import {HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {SigninDynamicService} from './signinDynamic.service';
import {Injectable} from '@angular/core';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class FindVehicleInterceptorService implements HttpInterceptor {
  constructor(private authService: SigninDynamicService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      } else {
        const modifiedReq = req.clone({
            headers: new HttpHeaders({
              'Authorization':  "Barer " + user.myToken,
              'Admin': '' + user.isAdmin
            })
          }
        );
        return next.handle(modifiedReq);
      }
    }));
  }
}

// {headers: {
// //   'Content-Type': 'application/json; charset=UTF-8',
// //     'Access-Control-Allow-Methods': '*',
// //     'Access-Control-Allow-Origin': '*',
// //     'Access-Control-Allow-Headers': '*'
// // }}
