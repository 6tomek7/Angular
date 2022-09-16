import { MoviesService } from './../movies.service';
import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { LoginWindowComponent } from '../login-window/login-window.component';

@Component({
  selector: 'app-modal',
  template: `
  <div class="modal-header">
      <h4 class="modal-title">Hello</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <p>
        Angular is asking for your permission to read and write data on your behalf. 
        This is necessary if you want to do things like maintain your lists or rate movies outside of TMDB. 
        Go to <a target="_blank" href="{{permission}}{{tokenNumber}}?redirect_to={{actuallyUrl}}/approved">TMDB</a> to confirm or login here.
      </p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" (click)="openModal()" (click)="activeModal.close('Close click')">Login</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>`

})
export class ModalComponent {
  actuallyUrl = window.location
  permission = environment.authenticate
  tokenNumber = this.moviesService.tokenRequest?.request_token
  constructor(
    public activeModal: NgbActiveModal,
    private moviesService: MoviesService,
    private modalService: NgbModal) { }

    openModal() {
      const modalRef = this.modalService.open(LoginWindowComponent);
    }
}
