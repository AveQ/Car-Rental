import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

export class FindVehicleInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifedRequest = req.clone(
      {
        headers:
          req.headers.append('Access-Control-Allow-Methods', '*')
      });

    return next.handle(modifedRequest);
  }
}

// {headers: {
// //   'Content-Type': 'application/json; charset=UTF-8',
// //     'Access-Control-Allow-Methods': '*',
// //     'Access-Control-Allow-Origin': '*',
// //     'Access-Control-Allow-Headers': '*'
// // }}
