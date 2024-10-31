import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast:any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

  public cupones : Array<any>=[];
  public load_data=true;
  public page = 1;
  public pageSize = 10;
  public filtro = '';
  public token;
  constructor(
    private _cuponService: CuponService
  ){ 
    this.token= localStorage.getItem('token');
  }
  init_data(){
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response=>{
        this.cupones = response.data;
        this.load_data = false;
        
      },
      error=>{
        console.log(error);
        
      }
    )
  }
  ngOnInit(): void {
    this.init_data();
  }
  



  filtrar(){
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response=>{
        this.cupones = response.data;
        this.load_data = false;
        
      }
    )
  }
  resetear(){
    this.filtro = '';
    this.init_data();
  }

  eliminar(id:any){
    this._cuponService.eliminar_cupon_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'COMPLETADO',
          titleColor: '#1FCB0D',
          color: '#FFF',
          iconUrl: 'assets/img/check_success.png',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente el cupón.',
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_data();
      },
      error=>{
        console.log(error);
        
      }
    )
  }
}
