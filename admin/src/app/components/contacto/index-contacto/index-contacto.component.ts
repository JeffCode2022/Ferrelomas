import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { io } from  'socket.io-client';
declare var iziToast: any;
declare var $:any;
@Component({
  selector: 'app-index-contacto',
  templateUrl: './index-contacto.component.html',
  styleUrls: ['./index-contacto.component.css']
})
export class IndexContactoComponent  implements OnInit{

  public mensajes : Array<any>=[];
  public load_data=true;
  public page = 1;
  public pageSize = 10;
  public filtro = '';
  public token;
  public load_btn = false;
  public socket = io('http://localhost:4201')

  constructor(
    private _adminService: AdminService
  ){ 
    this.token= localStorage.getItem('token');
  }
ngOnInit(): void {
 this.init_data()

 this.socket.on('new-contacto-admin', (data: any) => {
  this.init_data()
});
}
 init_data(){
  this._adminService.obtener_mensajes_admin(this.token).subscribe(
    response=>{
      this.mensajes= response.data;
      this.load_data = false;
    }
  )
 }
cerrar(id:any){
  this.load_btn = true;
  this._adminService.cerrar_mensaje_admin(id,{data:undefined},this.token).subscribe(
    response=>{
      iziToast.show({
        title: 'COMPLETADO',
        titleColor: '#1FCB0D',
        color: '#FFF',
        iconUrl: 'assets/img/check_success.png',
        class: 'text-success',
        position: 'topRight',
        message: 'Se cerró correctamente el mensaje.',
      });
      $('#estadoModal-'+id).modal('hide');
      $('.modal-backdrop').removeClass('show');

      this.init_data();
      this.load_btn= false;
    },
    error=>{
      console.log(error);
      
    }
  )
}
}
