import { AdminLayoutComponent } from './admin-layout.component';
import { AuthGuard } from './../../shared/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            {
                path: 'dashboard',
                component: DashboardComponent,
                data: {
                    functionCode: 'DASHBOARD'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'systems',
                loadChildren: './pages/system/system.module#SystemModule',
                data: {
                    functionCode: 'SYSTEM'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'contents',
                loadChildren: './pages/content/content.module#ContentModule',
                data: {
                    functionCode: 'CONTENT'
                },
                canActivate: [AuthGuard]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  
  export class AppLayoutRouting { }