import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {
  @ViewChild('modelAddEdit') public modelAddEdit: ModalDirective;
  public pageIndex = 1;
  public pageSize = 20;
  public pageDisplay = 10;
  public totalRows: number;
  public filter = '';
  public roles: any[];
  public entity: any;
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // tslint:disable-next-line:max-line-length
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter + '').subscribe((response: any) => {
      this.roles = response.Items;
      this.pageIndex = response.PageIndex;
      this.pageSize = response.PageSize;
      this.totalRows = response.TotalRows;
    });
  }

  // load role
  loadRole(id: any) {
    this._dataService.get('/api/appRole/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      console.log(this.entity);
    });
  }

  // function page change
  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  // show add model
  showAddModel() {
    this.entity = {};
    this.modelAddEdit.show();
  }

  // show edit model
  showEditModel(id: any) {
    this.loadRole(id);
    this.modelAddEdit.show();
  }

  // update
  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id === undefined) {
        this._dataService.post('/api/appRole/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.modelAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      } else {
        this._dataService.put('/api/appRole/update', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.modelAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
    }
  }

  // delete item
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog("Nofication", MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appRole/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
}
