import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-to-activate',
    templateUrl: './to-activate.component.html',
    styleUrls: ['./to-activate.component.scss']
})
export class ToActivateComponent implements OnInit {
    private token: string;
    public user:any = [];
    constructor(private route: ActivatedRoute, private userS:UserService) { }

    ngOnInit() {
        this.token = this.route.snapshot.paramMap.get("token");
        this.getUserByToken();
    }

    public getUserByToken(){
        this.userS.getUserCollectionByToken(this.token).subscribe(res => {
            res.map(item => {
                this.user = item.payload.doc.data();
                this.user['status'] = 0;
                this.userS.activateAccount(this.user,item.payload.doc.id);
            })
        });
    }

}
