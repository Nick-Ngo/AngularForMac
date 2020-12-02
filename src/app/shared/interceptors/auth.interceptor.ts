// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { AuthService } from '../services/auth.service';
// import { Observable } from 'rxjs';


// @Injectable({
//     providedIn: 'root'
// })
// export class AuthInterceptor implements HttpInterceptor {

//     constructor(private authService: AuthService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         request = request.clone({
//             setHeaders: {
//                 Authorization: `${this.authService.authorizationHeaderValue}`
//             }
//         });
//         return next.handle(request);
//     }
// }
