import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {SigninDynamicService} from './signinDynamic.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: SigninDynamicService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let auth;
    this.authService.user.subscribe(
      (userBool) => {
        auth = userBool && userBool.isAdmin === 'ADMIN';
      }
    );
    if (auth === true) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
