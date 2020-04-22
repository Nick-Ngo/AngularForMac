import { Routes } from '@angular/router';
import { RoleComponent } from './role.component';
export const roleRoutes: Routes = [
    // 4200/main/user
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    // 4200/main/home/index
    { path: 'index', component: RoleComponent }
];
