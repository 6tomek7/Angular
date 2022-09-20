import { MoviesService } from './../movies.service';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-window',
  template: `
  <div class="modal-header">
  <h4>Login to your account. </h4>
  </div>
    <div class="modal-body">
    <div class="login-table">
        <div class="nick">
            <div>
                <b>Nick:</b>
            </div>
            <div>
                <input placeholder="Your nick" #nick>
            </div>  
        </div>
        <div type="text" class="password mb-4">
            <div>
                <b>Password:</b>
            </div>
            <div>
                <input type="password" placeholder="Your password" #password>
            </div>   
        </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-primary" (click)="login(nick.value, password.value)">Approve</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>`
})
export class LoginWindowComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private movieService: MoviesService) { }

  ngOnInit(): void {
  }

  login(nick: string, password: string){
    this.movieService.postLogin(nick, password)
  }
}
