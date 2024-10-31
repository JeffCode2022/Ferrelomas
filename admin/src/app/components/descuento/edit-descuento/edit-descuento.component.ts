import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { DescuentoService } from 'src/app/services/descuento.service';
import { global } from 'src/app/services/global';
import { io } from  'socket.io-client';
declare var iziToast:any
declare var $:any


@Component({
  selector: 'app-edit-descuento',
  templateUrl: './edit-descuento.component.html',
  styleUrls: ['./edit-descuento.component.css']
})
export class EditDescuentoComponent implements OnInit {

  public descuento: any = {};
  public file : any = undefined;
  public imgSelect : any | ArrayBuffer = 'assets/img/01.jpg';
  public token:any;
  public load_btn = false;
  public id:any;
  public url:any;
  public socket = io('http://localhost:4201') 

  constructor(
    private _route: ActivatedRoute,
    private _descuentoService: DescuentoService,
    private _adminService: AdminService,
    private _router : Router
  ) { 
    this.token= localStorage.getItem('token');
    this.url = global.url;
  }

ngOnInit(): void {
  this._route.params.subscribe(
    params=>{
      this.id = params['id'];

      this._descuentoService.obtener_descuento_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data ==undefined){
             this.descuento = undefined;
          }else{
            this.descuento = response.data;
            this.imgSelect = this.url + 'obtener_banner_descuento/'+this.descuento.banner;
          }
          
        },
        error=>{
          console.log(error);
          
        }
      )
      
    }
  )
}

actualizar(actualizarForm:any){
  if(actualizarForm.valid){

    if(this.descuento.descuento >=1 && this.descuento.descuento <= 100){
      var data:any={};

      if(this.file !=undefined){
        data.banner = this.file;
      }
      data.titulo= this.descuento.titulo;
      data.fecha_inicio= this.descuento.fecha_inicio;
      data.fecha_fin= this.descuento.fecha_fin;
      data.descuento= this.descuento.descuento;
  
      this.load_btn = true;
      this._descuentoService.actualizar_descuento_admin(data,this.id,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'COMPLETADO',
            titleColor: '#1FCB0D',
            color: '#FFF',
            iconUrl: 'assets/img/check_success.png',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizó correctamente el descuento.',
          });
          this.socket.emit('edit-descuento-admin',{data:response.data})
          this.load_btn = false;
          this._router.navigate(['/panel/descuentos']) 
        },
        error =>{
          console.log(error);
          this.load_btn = false;
        }
      )
      
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
  console.log(this.file);
  
}
}
