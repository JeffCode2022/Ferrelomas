import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {Router} from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HostListener } from '@angular/core';

declare var jQuery: any;
declare var $:any;
declare var iziToast:any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

public user : any = {};
public usuario : any= {};
public token: any = "";
public passwordFieldType: string = 'password';
public isChecked= true;


 constructor(
  private _adminService: AdminService,
  private _router:Router
 ){ 
  this.token= this._adminService.getToken();
 }


 ngOnInit(): void {


     if(this.token){
      this._router.navigate(['/']);
     }else{
      // MANTENER EN EL COMPONENTE
     }
 }
 login(loginForm: any){
  if(loginForm.valid){
    console.log(this.user);
    
    let data= {
      email:this.user.email,
      password: this.user.password
    }
    this._adminService.login_admin(data).subscribe(
      (response)=>{
        if(response.data== undefined){
          iziToast.error({
            title: 'ERROR',
            titleColor: '#FF0000',
            color: '#FFF',
            iconUrl: 'assets/img/error-icon.png',
            class: 'text-danger',
            position: 'topRight',
            message: response.message
          });
        }else{
          this.usuario = response.data;
          localStorage.setItem('token',response.token);
          localStorage.setItem('_id',response.data._id);
          this._router.navigate(['/']);

        }
        console.log(response);
      },
      (error)=>{
        console.log(error);
      }
    );
  }else{
    iziToast.error({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      iconUrl: 'assets/img/error-icon.png',
      class: 'text-danger',
      position: 'topRight',
      message: 'Los datos del Formulario no son válidos',
    })
  }
 }

 mostrar_password(){
  const passwordInput = document.getElementById('txtPassword') as HTMLInputElement;
  if (this.passwordFieldType === 'password') {
    passwordInput.type = 'text';
    $('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
  } else {
    passwordInput.type = 'password';
    $('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
  }
  this.passwordFieldType = passwordInput.type;
}

onCheckboxChange() {
  if(this.isChecked==true){
    this._router.navigate(['/']);
    console.log("marcado"); 
  }else{
    localStorage.clear();
    
  }
}
 }

