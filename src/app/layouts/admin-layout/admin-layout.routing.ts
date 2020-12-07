import { AuthGuard } from './../../shared/guards/auth.guard';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    {
        path: 'systems',
        loadChildren: './../../pages/system/system.module#SystemModule',
        data: {
            functionCode: 'SYSTEM'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'contents', 
        loadChildren: './../../pages/content/content.module#ContentModule',
        data: {
            functionCode: 'CONTENT'
        },
        canActivate: [AuthGuard]
    },
];
