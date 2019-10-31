import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterSuccessComponent } from './components/register-success/register-success.component';
import { ToActivateComponent } from './to-activate/to-activate.component';
import { RecoverPasswrdComponent } from './recover-passwrd/recover-passwrd.component';

const routes: Routes = [
    { 
        path: '', 
        pathMatch: 'full', 
        redirectTo: 'login' 
    },
    {
        path:'login',
        component:LogInComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'register-success',
        component:RegisterSuccessComponent
    },
    {
        path:'forgot-password',
        component:ForgotPasswordComponent
    },
    {
        path:'activate-count/:token',
        component:ToActivateComponent
    },
    {
        path:'recover-password/:token',
        component:RecoverPasswrdComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
