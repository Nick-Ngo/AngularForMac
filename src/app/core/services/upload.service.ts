import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { UrlConstants } from '../common/url.constants';
import { UtilityService } from './utility.service';

@Injectable()
export class UploadService {
  public responseData: any;

  constructor(private _dataService: DataService, _utilityService: UtilityService) { }

  // post file
  postWithFile(url: string, postData: any, files: File[]) {
    const formData: FormData = new FormData();
    // add filename to formdata
    formData.append('files', files[0], files[0].name);
    // check post file
    if (postData !== '' && postData !== undefined && postData !== null) {
      for (const property in postData) {
        if (property.hasOwnProperty(property)) {
          formData.append(property, postData[property]);
        }
      }
    }
    // create promise
    // đảm bảo tuần tự thực thi hàm bất đồng bộ
    const returnResponse = new Promise((resolve, reject) => {
      this._dataService.postFile(url, formData).subscribe(res => {
        this.responseData = res;
        resolve(this.responseData);
      }, error => {
        this._dataService.handleError(error);
      });
    });
    return returnResponse;
  }
}
