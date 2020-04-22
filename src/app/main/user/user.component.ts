import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from 'app/core/services/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'app/core/common/message.constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
declare var moment: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @ViewChild('modelAddEdit') public modelAddEdit: ModalDirective;
  public myRoles: string[] = [];
  public pageIndex = 1;
  public pageSize = 20;
  public pageDisplay = 10;
  public totalRows: number;
  public filter = '';
  public users: any[];
  public entity: any;
  // list role
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];
  // datepicer
  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' }, // fromat date
    alwaysShowCalendars: false, // auto show calendar
    singleDatePicker: true // single date
  };
  // contructor
  constructor(private _dataService: DataService, private _notificationService: NotificationService) { }

  ngOnInit() {
    this.loadRoles();
    this.loadData();
  }

  // load list user paging
  loadData() {
    // tslint:disable-next-line:max-line-length
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter + '').subscribe((response: any) => {
      this.users = response.Items;
      this.pageIndex = response.PageIndex;
      this.pageSize = response.PageSize;
      this.totalRows = response.TotalRows;
    });
  }

  // load role
  loadRoles() {
    this._dataService.get('/api/appRole/getlistall').subscribe((response: any[]) => {
      this.allRoles = [];
      for (let role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  // load user
  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        for(let role of this.entity.Roles){
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format("DD/MM/YYYY");
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
    this.loadUserDetail(id);
    this.modelAddEdit.show();
  }

  // update
  saveChange(valid: boolean) {
    if (valid) {
      if (this.entity.Id === undefined) {
        // call api create user
        this._dataService.post('/api/appUser/add', JSON.stringify(this.entity)).subscribe((response: any) => {
          this.loadData();
          this.modelAddEdit.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      } else {
        // call api update user
        this._dataService.put('/api/appUser/update', JSON.stringify(this.entity)).subscribe((response: any) => {
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

  // function delete confirm
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

  // get value gender in radio button
  public selectGender(event){
    this.entity.Gender = event.target.value
  }
}
