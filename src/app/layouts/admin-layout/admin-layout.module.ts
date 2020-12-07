import { ContentModule } from './../../pages/content/content.module';
import { SystemModule } from './../../pages/system/system.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { AppLayoutRouting } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AdminLayoutComponent } from './admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    SystemModule,
    ContentModule,
    ClipboardModule,
    AppLayoutRouting,
    ToastrModule.forRoot()
  ],
  declarations: [
    AdminLayoutComponent,
    DashboardComponent,
  ]
})

export class AdminLayoutModule { }
