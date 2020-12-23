import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})

export class MessageService {
  constructor(
    private toastr: ToastrService,
  ) { }

  showSuccess(msg:string, title:string): void {
    this.toastr.success(msg, title, {
      timeOut: 4000,
      progressBar: true,
    });
  }

  showError(msg:string, title:string): void {
    this.toastr.error(msg, title, {
      timeOut: 4000,
      progressBar: true,
    });
  }

  showInfo(msg:string, title:string): void {
    this.toastr.info(msg, title, {
      timeOut: 4000,
      progressBar: true,
    });
  }

  showWarning(msg:string, title:string): void {
    this.toastr.warning(msg, title, {
      timeOut: 4000,
      progressBar: true,
    });
  }
}
