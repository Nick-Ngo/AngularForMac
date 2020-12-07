import { AuthGuard } from './../../shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionComponent } from './function/function.component';
import { PermissionComponent } from './permission/permission.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: '', component: UserComponent },
    {
        path: 'users', component: UserComponent,
        data: {
            functionCode: 'SYSTEM_USER'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'functions', component: FunctionComponent,
        data: {
            functionCode: 'SYSTEM_FUNCTION'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'roles', component: RoleComponent,
        data: {
            functionCode: 'SYSTEM_ROLE'
        },
        canActivate: [AuthGuard]
    },
    {
        path: 'permissions', component: PermissionComponent,
        data: {
            functionCode: 'SYSTEM_PERMISSION'
        },
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRouting { }
