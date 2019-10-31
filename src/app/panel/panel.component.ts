import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  public user:any = [];
  public id_user:string;
  constructor(private router:Router, private userS:UserService) { }

  ngOnInit() {
   this.user = JSON.parse(localStorage.getItem('auth'));
   this.id_user = localStorage.getItem('auth_id');
   if(this.user.two_step == true && this.user.status_two_step == 'inactive'){
     this.router.navigate(['/code']);
   }
  }

  logout(){
    localStorage.removeItem('auth');
    localStorage.removeItem('auth_id');
    this.router.navigate(['/login']);
  }

  OnTwoStep(){
    let code = Math.floor(Math.random() * 10000) + 100000;
    const twoStep = {
      code:code,
      user_id:this.id_user,
      phone:this.user.phone
    }

    this.userS.activateTwoStep(twoStep,this.user,this.id_user);
    
  }


}
