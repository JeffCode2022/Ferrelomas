import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import '@angular/localize/init';
import { AdminService } from 'src/app/services/admin.service';

declare var iziToast:any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes: Array<any> = [];
  public filtro_apellidos = '';
  public filtro_correo = '';
 
  public page = 1;
  public pageSize = 10;
  public token;
  public load_data = true;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
  ) { 
    this.token = this._adminService.getToken();
    
  }

  ngOnInit(): void {
    this.init_Data();
  }

  init_Data() {
    this._clienteService.listar_clientes_filtro_admin(null, null,this.token).subscribe(
      response => {
        this.clientes = response.data;
        this.load_data = false;
        /*setTimeout(()=>{
          
        },3000)*/
      },
      error => {
        console.log(error);

      }
    );
  }

  filtro(tipo: any) {
    if (tipo == 'apellidos') {
      if (this.filtro_apellidos) {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos,this.token).subscribe(
          response => {
            this.clientes = response.data;
            this.load_data = false;
          },
          error => {
            console.log(error);

          }
        );
      } else {
        this.init_Data();
      }
    } else if (tipo == 'correo') {
      if (this.filtro_correo) {
        this.load_data = true;
        this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo,this.token).subscribe(
          response => {
            this.clientes = response.data;
            this.load_data = false;
          },
          error => {
            console.log(error);

          }
        );
      }else {
        this.init_Data();
    } 
    }

  }

  eliminar(id:any){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'COMPLETADO',
          titleColor: '#1FCB0D',
          color: '#FFF',
          iconUrl: 'assets/img/check_success.png',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente el cliente.',
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_Data();
      },
      error=>{
        console.log(error);
        
      }
    )
  }
}
