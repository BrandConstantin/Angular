import { inject } from "@angular/core";
import { CanMatchFn, Route, Router, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.services";
import { firstValueFrom } from "rxjs";

export const IsAdminGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);

/*
  const router = inject(Router);
  const isAuthenticated = await firstValueFrom(authService.checkAuthStatus());
  const isAdmin = authService.user()?.roles.includes('admin') ?? false;

  if (isAuthenticated && isAdmin) {
    router.navigateByUrl('/admin-products');
    console.log('Authenticated admin tried to access to dashboard auth routes, redirected to /');
    return false;
  }

  console.log('IsAdminGuard: access granted to auth admin routes');

  return true;
*/
    await firstValueFrom(authService.checkAuthStatus());
    return authService.isAdmin();
};