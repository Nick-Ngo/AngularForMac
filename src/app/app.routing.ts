import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',
    data: {
      functionCode: 'DASHBOARD'
    },
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'not-found' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  { path: 'auth-callback', loadChildren: '../app/auth/auth-callback/auth-callback.module#AuthCallbackModule' },
  { path: 'not-found', loadChildren: '../app/pages/not-found.module#NotFoundModule' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
