import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
    public user = {
        email:'',
        password:''
    }
    constructor(private userS: UserService, private router:Router, private toast:ToastrService) {

    }

    ngOnInit() {
       
    }

    onLogin(){
        this.userS.login(this.user).subscribe(res=>{
            if(Object.keys(res).length != 0){
                this.toast.success("correct access");
                //this.router.navigate(['/panel']);
            }else{
                this.toast.error('oops an error has occurre, try again');
            }
        },error=>console.log)
    }

}
