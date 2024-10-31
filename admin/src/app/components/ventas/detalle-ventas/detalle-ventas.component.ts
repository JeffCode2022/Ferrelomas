import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.css']
})
export class DetalleVentasComponent  implements OnInit{
  public url:any;
  public token:any;
  public orden : any = {};
  public detalles: Array<any> = [];
  public load_data = true;
  public id:any
  public direcciones: Array<any>= [];
  public descuento_activo : any = undefined
  public review: any ={}
 
  constructor(
    private _adminService : AdminService,
    private _route:ActivatedRoute,

  ){ 
    this.token=localStorage.getItem('token')
    this.url = global.url;
    
    this._route.params.subscribe(
      params=>{
        this.id = params['id'];
        this.init_data();

      }
    )
  }
ngOnInit(): void {
  this._adminService.obtener_descuento_activo().subscribe(
    response=>{
      if(response.data != undefined){
         this.descuento_activo = response.data[0];
      }else{
        this.descuento_activo = undefined;
      }
    }
  )
}
init_data(){
  this._adminService.obtener_detalles_ordenes_cliente(this.id,this.token).subscribe(
    response=>{
      if(response.data !=undefined){
        this.orden = response.data;

        this.detalles = response.detalles;
        this.load_data=false;
      }else{
        this.orden= undefined;
      }
      
    }
  )
}
}
