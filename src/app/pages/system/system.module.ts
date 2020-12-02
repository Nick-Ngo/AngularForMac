import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function/function.component';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';
import { PermissionComponent } from './permission/permission.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { FunctionDetailComponent } from './function/function-detail/function-detail.component';
import { CommandDetailComponent } from './function/command-detail/command-detail.component';


@NgModule({
  declarations: [
    FunctionComponent,
    RoleComponent,
    UserComponent,
    PermissionComponent,
    RoleDetailComponent,
    UserDetailComponent,
    FunctionDetailComponent,
    CommandDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SystemModule { }
