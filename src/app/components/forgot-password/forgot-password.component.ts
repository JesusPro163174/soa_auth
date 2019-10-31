import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    public user = {
        email:'',
        token:''
    }
    constructor(private userS:UserService, private router:Router) { }

    ngOnInit() {
    }

    onRecover(){
        this.userS.getuserByEmail(this.user).subscribe(res=>{
            this.router.navigate(['login']);
            return res.map(items => {
                const user = items.payload.doc.data();
                this.userS.addRecover(this.user,user.token);
            })
        })
    }

}
