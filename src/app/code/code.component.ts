import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  public code:string;
  public user:any = [];
  public user_id:string;
  constructor(private userS:UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('auth'));
    this.user_id = localStorage.getItem('auth_id');
  }

  verify(){
    this.userS.verify(this.code,this.user_id).subscribe(res => {
      res.map(item => {
        console.log(item.payload.doc.data());
      })
    },(error)=>console.log)
  }

}
