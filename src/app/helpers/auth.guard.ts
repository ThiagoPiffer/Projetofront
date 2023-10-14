// auth.guard.ts

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { IdentidadeService } from '../componente/identidade/identidade.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private identidadeService: IdentidadeService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        const currentUser = this.identidadeService.valorUsuarioAtual;

        if (currentUser && currentUser.accessToken) {
            // Usuario autenticado
            return true;
        }

        // Usuario não autenticado, então redirecione para a página de login com a URL que eles tentaram acessar
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
