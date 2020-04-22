import { Injectable } from '@angular/core';

declare var alertify: any;
@Injectable()
export class NotificationService {
  printSuccessMessage(message: string) {
    alertify.success(message);
  }

  printErrorMessage(message: string) {
    alertify.error(message);
  }

  printConfirmationDialog(title: string, message: string, okCallback: () => any) {
    alertify.confirm(title, message, function () { okCallback(); }, function () { alertify.error('Cancel') });
  }
}
