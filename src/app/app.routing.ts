import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
        data: {
          functionCode: 'DASHBOARD'
        },
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' },
  { path: 'auth-callback', loadChildren: '../app/auth/auth-callback/auth-callback.module#AuthCallbackModule' },
  { path: 'not-found', loadChildren: './pages/not-found/not-found.module#NotFoundModule' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
