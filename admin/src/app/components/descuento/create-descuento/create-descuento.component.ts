import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { io } from  'socket.io-client';

declare var iziToast:any
declare var $:any

@Component({
  selector: 'app-create-descuento',
  templateUrl: './create-descuento.component.html',
  styleUrls: ['./create-descuento.component.css']
})
export class CreateDescuentoComponent implements OnInit {
  public descuento: any = {};
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public token:any;
  public load_btn = false;
  public socket = io('http://localhost:4201') 

  constructor(
    private _adminService: AdminService,
    private _descuentoService : DescuentoService,
    private _router: Router
  ){
    this.token = this._adminService.getToken();
  }
ngOnInit(): void {
  console.log(this.descuento.decuento);
}

registro(registroForm:any){
  if(registroForm.valid){
    if(this.file == undefined){
      iziToast.error({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        iconUrl: 'assets/img/error-icon.png',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe subir un banner para registrar un descuento',
      }); 
    }else{
        if(this.descuento.descuento >=1 && this.descuento.descuento <= 100){
          this.load_btn = true;
          this._descuentoService.registro_descuento_admin(this.descuento,this.file,this.token).subscribe(
            response =>{
              iziToast.show({
                title: 'COMPLETADO',
                titleColor: '#1FCB0D',
                color: '#FFF',
                iconUrl: 'assets/img/check_success.png',
                class: 'text-success',
                position: 'topRight',
                message: 'Se registro correctamente el nuevo descuento.',
              });
              this.load_btn = false;     
              this.socket.emit('create-descuento-admin',{data:response.data})        
              this._router.navigate(['/panel/descuentos'])                     
            },
            error =>{
              console.log(error);
              this.load_btn = false;
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
            message: 'El descuento debe ser entre 0% a 100%',
          });
        }    
      
      }
  }else{
    iziToast.error({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      iconUrl: 'assets/img/error-icon.png',
      class: 'text-danger',
      position: 'topRight',
      message: 'Los datos del Formulario no son válidos',
    });
    this.load_btn = false;
  }
}

fileChangeEvent(event:any):void{
  var file:any;
  if(event.target.files && event.target.files[0]){
    file = <File>event.target.files[0];      
  }else{
    iziToast.error({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      iconUrl: 'assets/img/error-icon.png',
      class: 'text-danger',
      position: 'topRight',
      message: 'No hay una imagen de envío',
    });
    $('#input-portada').text('Seleccionar imagen')
    this.imgSelect = 'assets/img/01.jpg';
    this.file = undefined;
  }
  if(file.size <= 4000000){
    if(file.type == 'image/png' || file.type== 'image/webp' || file.type== 'image/jpg'  || file.type== 'image/jpeg'){
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      reader.readAsDataURL(file);
      this.file = file;
      $('#input-portada').text(file.name);
    }else{
      iziToast.error({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        iconUrl: 'assets/img/error-icon.png',
        class: 'text-danger',
        position: 'topRight',
        message: 'El archivo debe ser una imagen',
      }); 
      $('#input-portada').text('Seleccionar imagen')
      this.imgSelect = 'assets/img/01.jpg';
      this.file = undefined;
    }
  }else{
    iziToast.error({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      iconUrl: 'assets/img/error-icon.png',
      class: 'text-danger',
      position: 'topRight',
      message: 'La imagen no puede  superar los 4MB',
    });
    $('#input-portada').text('Seleccionar imagen')
    this.imgSelect = 'assets/img/01.jpg';
    this.file = undefined;
  }
  
}
}
