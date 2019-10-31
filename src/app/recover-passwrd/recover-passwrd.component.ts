import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-recover-passwrd',
    templateUrl: './recover-passwrd.component.html',
    styleUrls: ['./recover-passwrd.component.scss']
})
export class RecoverPasswrdComponent implements OnInit {
    private token: string;
    public user: any = [];
    public update = {
        password:'',
        repit:''
    }
    constructor(private route: ActivatedRoute, private userS: UserService, private router:Router) { }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get("token");
        this.getUserByToken();
    }

    public getUserByToken(){
        this.userS.getUserCollectionByToken(this.token).subscribe(res => {
            res.map(item => {
                this.user = item.payload.doc.data();
                this.user['id'] = item.payload.doc.id;
            })
        });
    }

    onUpdate(){
        if(this.update.password == this.update.repit){
            this.user['password'] = this.update.password;
            this.userS.activateAccount(this.user,this.user.id);
            alert("contraseña actualizada");
            this.router.navigate(['/login']);
        }else
            alert("las contraseñas no son iguales");
    }

}
