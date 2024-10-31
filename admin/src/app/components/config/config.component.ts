import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { global } from '../../services/global';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast:any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  public token:any;
  public config: any = {};
  public url;
  public titulo_cat = '';
  public icono_cat = '';
  public file:any= undefined;
  public imgSelect: any|ArrayBuffer;

  constructor(
   private _adminService: AdminService
  ){ 
    this.token = localStorage.getItem('token')
    this.url = global.url;
    this._adminService.obtener_config_admin(this.token).subscribe(
      response=>{
        this.config = response.data;
        this.imgSelect = this.url+'obtener_logo/'+ this.config.logo;
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }
ngOnInit(): void {
    
}

agregar_cat(){
  if(this.titulo_cat && this.icono_cat){
    console.log(uuidv4());

    this.config.categorias.push({
      titulo: this.titulo_cat,
      icono: this.icono_cat,
      _id: uuidv4()
    });

    this.titulo_cat = '';
    this.icono_cat = '';
  }else{
    iziToast.error({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      iconUrl: 'assets/img/error-icon.png',
      class: 'text-danger',
      position: 'topRight',
      message: 'Debe ingresar un titulo e icono para la categoría',
    })
  }
}

actualizar(confForm:any){
  if(confForm.valid){
    let data = {
      titulo:  confForm.value.titulo,
      serie:  confForm.value.serie,
      correlativo:  confForm.value.correlativo,
      categorias: this.config.categorias,
      logo: this.file
    }
    console.log(data);
    this._adminService.actualizar_config_admin("6613247b7d189acda832a4d1",data,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'COMPLETADO',
          titleColor: '#1FCB0D',
          color: '#FFF',
          iconUrl: 'assets/img/check_success.png',
          class: 'text-success',
          position: 'topRight',
          message: 'Se actualizó correctamente la configuración.',
        });     
      },
      error=>{
        console.log(error);
        
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
      message: 'Complete correctamente el formulario',
    })
  }
}

fileChangeEvent(event:any){
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
  }
  if(file.size <= 4000000){

    if(file.type == 'image/png' || file.type== 'image/webp' || file.type== 'image/jpg'  || file.type== 'image/jpeg'){
      const reader = new FileReader();
      reader.onload = e => this.imgSelect = reader.result;
      $('.cs-file-drop-icon').addClass('cs-file-drop-preview img-thumbnail rounded');
      $('.cs-file-drop-icon').removeClass('cs-file-drop-icon cxi-upload');
      reader.readAsDataURL(file);
      this.file = file;
      
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
ngDoCheck(): void{
  $('.cs-file-drop-preview').html("<img src="+this.imgSelect+">");
}

eliminar_categoria(idx:any){
  this.config.categorias.splice(idx,1);
}
}



