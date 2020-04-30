import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from 'app/core/services/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from 'app/core/common/message.constants';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { UploadService } from '../../core/services/upload.service';
import { SystemConstants } from '../../core/common/system.constants';

// create moment
declare var moment: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @ViewChild('modelAddEdit') public modelAddEdit: ModalDirective;
  @ViewChild('avatar') avatar;
  public baseFolder: string = SystemConstants.BASE_API;
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

  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }

  // contructor
  // tslint:disable-next-line:max-line-length
  constructor(private _dataService: DataService, private _notificationService: NotificationService, private _uploadService: UploadService) { }

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
      for (const role of response) {
        this.allRoles.push({ id: role.Name, name: role.Description });
      }
    }, error => this._dataService.handleError(error));
  }

  // load user
  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((response: any) => {
        this.entity = response;
        for (const role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        let a = this.baseFolder;
        a = a + '/UploadedFiles/' + this.entity.Avatar;
        this.entity.Avatar = a;
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
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
      // upload image
      this.entity.Roles = this.myRoles;
      const file = this.avatar.nativeElement;
      // post file
      if (file.files.length > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage', null, file.files).then((imgUrl: string) => {
          this.entity.Avatar = imgUrl;
        }).then(() => {
          this.saveData();
        });
      } else {
        this.saveData();
      }
    }
  }

  // save data
  private saveData() {
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

  // delete item
  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog('Nofication', MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }

  // function delete confirm
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

  // get value gender in radio button
  public selectGender(event) {
    this.entity.Gender = event.target.value;
  }
}
