import { MessageContstants } from './../../core/common/message.constants';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeComponent } from 'angular-tree-component';
import { NotificationService } from '../../core/services/notification.service';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {
  @ViewChild('addEditModel') public addEditModel: ModalDirective;
  @ViewChild('permissionModal') public permissionModal: ModalDirective;
  @ViewChild(TreeComponent)
  private treeFunction: TreeComponent;
  // create property
  public _functionHierachy: any[];
  public functions: any[];
  public entity: any;
  public editFlag: boolean; // check pop show hiden
  public filter = ''; // filter select option
  public functionId: string;
  public _permission: any[];
  // tslint:disable-next-line:max-line-length
  constructor(private _notificationService: NotificationService, private _dataService: DataService, private _utilityService: UtilityService) { }

  ngOnInit() {
    this.search();
  }

  // show form
  public showAddModel() {
    this.entity = {};
    this.addEditModel.show();
    this.editFlag = false;
  }

  // function search
  public search() {
    this._dataService.get('/api/function/getall?filter=' + this.filter).subscribe((response: any[]) => {
      // list function and get parent = null
      this.functions = response.filter(x => x.ParentId == null);
      // convert list to list tree
      this._functionHierachy = this._utilityService.Unflatten(response);
    }, error => this._dataService.handleError(error));
  }

  // function save change
  saveChange(valid: boolean) {
    if (valid) {
      if (this.editFlag === false) {
        this._dataService.post('/api/function/add', JSON.stringify(this.entity)).subscribe((response: Response) => {
          this.search();
          this.addEditModel.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, error => this._dataService.handleError(error));
      }
    } else {
      this._dataService.put('/api/function/update', JSON.stringify(this.entity)).subscribe((response: any) => {
        this.search();
        this.addEditModel.hide();
        this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
      }, error => this._dataService.handleError(error));
    }
  }

  // Show edit form
  public showEdit(id: string) {
    this._dataService.get('/api/function/detail/' + id).subscribe((response: any) => {
      this.entity = response;
      this.editFlag = true;
      this.addEditModel.show();
    }, error => this._dataService.handleError(error));
  }

  // Action delete
  public deleteConfirm(id: string): void {
    this._dataService.delete('/api/function/delete', 'id', id).subscribe((response: any) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.search();
    }, error => this._dataService.handleError(error));
  }

  // Click button delete turn on confirm
  public delete(id: string) {
    this._notificationService.printConfirmationDialog('Nofication', MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteConfirm(id));
  }

  // show permission
  public showPermission(id: any) {
    this._dataService.get('/api/appRole/getAllPermission?functionId=' + id).subscribe((response: any[]) => {
      this.functionId = id;
      this._permission = response;
      this.permissionModal.show();
    }, error => this._dataService.handleError(error));
  }

  // save permission
  public savePermission(valid: boolean, _permission: any) {
    if (valid) {
      const data = {
        Permissions: _permission,
        FunctionId: this.functionId
      };
      this._dataService.post('/api/appRole/savePermission', JSON.stringify(data)).subscribe((response: any) => {
        this._notificationService.printSuccessMessage(response);
        this.permissionModal.hide();
      });
    } else {

    }
  }
}
