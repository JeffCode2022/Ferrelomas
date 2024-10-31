import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';
import { v4 as uuidv4 } from 'uuid';

declare var iziToast:any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent implements OnInit {

  public producto : any={};
  public id:any;
  public token:any;
  public file: any= undefined;
  public load_btn=false;
  public load_btn_eliminar= false;
  public url:any;

constructor(
  private _route: ActivatedRoute,
  private _productoService: ProductoService
){ 

  this.token = localStorage.getItem('token');
    this.url= global.url;
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];

        this.init_data();
        
      }
    )
} 

init_data(){
  this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
    response=>{
      if(response.data ==undefined){
         this.producto = undefined;
      }else{
        this.producto = response.data;
      }            
    },
    error=>{
      console.log(error);
      
    }
  )
}
ngOnInit(): void {
    
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
   
  }
  if(file.size <= 4000000){
    if(file.type == 'image/png' || file.type== 'image/webp' || file.type== 'image/jpg'  || file.type== 'image/jpeg'){

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
      $('#input-img').val('');
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
    $('#input-img').val('');
    this.file = undefined;
  }
  console.log(this.file);
  
}
subir_imagen(){
  if(this.file !=undefined){
    let data = {
      imagen: this.file,
      _id: uuidv4()
    }
    console.log(data);
    this._productoService.agregar_imagen_galeria_admin(this.id,data,this.token).subscribe(
      response=>{
        this.init_data();
        $('#input-img').val('');
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
      message: 'Debe seleccionar una imágen para subir',
    });
  }
}
eliminar(id:any){
  this.load_btn_eliminar=true;
  this._productoService.eliminar_imagen_galeria_admin(this.id,{_id:id},this.token).subscribe(
    response=>{
      iziToast.show({
        title: 'COMPLETADO',
        titleColor: '#1FCB0D',
        color: '#FFF',
        iconUrl: 'assets/img/check_success.png',
        class: 'text-success',
        position: 'topRight',
        message: 'Se eliminó correctamente la imágens.',
      });
      $('#delete-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.load_btn_eliminar=false;
      this.init_data();
    },
    error=>{
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        iconUrl: 'assets/img/error-icon.png',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ocurrió un error en el servidor.',
      });
      console.log(error);
      this.load_btn = false;
      
    }
  )
}

}
