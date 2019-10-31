import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    
    public formGroup: FormGroup;
    public adding:boolean = false;
    constructor(
        private userS: UserService,
        private formBuilder: FormBuilder,
        private toast:ToastrService,
        private router:Router
    ) { }

    ngOnInit() {
        this.validatorForm();
    }

    validatorForm(){
        this.formGroup = this.formBuilder.group({
            name: [Validators.required],
            phone: [Validators.required, Validators.maxLength(12)],
            email: [Validators.required, Validators.email],
            password: [Validators.required]
        });
    }

    save(){
        this.adding = true;
        const user = this.formGroup.value;
        const md5 = new Md5();
        user['token'] = md5.appendStr(user.email).end();
        user['two_step'] = false;
        user['status_two_step'] = 'inactive';
        this.userS.add(user).then(res => this.registerSuccess(), error => this.registerBad());
    }

    registerSuccess(){
        this.adding = false;
        this.toast.info("you were registered correctly","Register");
        this.clearForm();
        this.navigateSuccess();
        
    }
    registerBad(){
        this.adding = false;
        this.toast.error("oops an error has occurred","Register")
    }

    clearForm(){
        this.formGroup = this.formBuilder.group({
            name: '',
            phone:'',
            email: '',
            password: ''
        });
    }
    navigateSuccess(){
        setInterval(()=>{
            this.router.navigate(['/register-success'])
        },1000);
        
    }

}
