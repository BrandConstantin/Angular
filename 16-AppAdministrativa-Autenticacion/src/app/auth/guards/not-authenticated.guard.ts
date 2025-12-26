import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.services";
import { firstValueFrom } from "rxjs";

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());

  if (isAuthenticated) {
    router.navigateByUrl('/');
    console.log('Authenticated user tried to access auth routes. Redirecting to home.');
    return false;
  }

  console.log('NotAuthenticatedGuard: access granted to auth routes');

  return true;
};