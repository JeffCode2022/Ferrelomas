import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';

declare var iziToast:any;

@Component({
  selector: 'app-update-cupon',
  templateUrl: './update-cupon.component.html',
  styleUrls: ['./update-cupon.component.css']
})
export class UpdateCuponComponent  implements OnInit{

  public token:any;

  public cupon: any ={
    tipo:''
  };
  public load_btn = false;
  public id:any;
  public load_data = true;

    constructor(
    private _cuponService : CuponService,
    private _router: Router,
    private _route : ActivatedRoute
  ){
    this.token = localStorage.getItem('token');
   }

ngOnInit(): void {
  this._route.params.subscribe(
    params=>{
      this.id = params['id'];
      this._cuponService.obtener_cupon_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data == undefined){
            this.cupon = undefined;
            this.load_data = false;
          }else{
            this.cupon = response.data;
            this.load_data = false;
          }      
        }
      )
    }
  )
}
actualizar(actualizarForm:any){
  if(actualizarForm.valid){
    this.load_btn = true;
    this._cuponService.actualizar_cupon_admin(this.id,this.cupon,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'COMPLETADO',
          titleColor: '#1FCB0D',
          color: '#FFF',
          iconUrl: 'assets/img/check_success.png',
          class: 'text-success',
          position: 'topRight',
          message: 'Se actualizó correctamente el cupón.',
        });
        this.load_btn = false;
        this._router.navigate(['/panel/cupones'])
      }
    )
    
  }else{
    iziToast.show({
      title: 'ERROR',
      titleColor: '#FF0000',
      color: '#FFF',
      iconUrl: 'assets/img/error-icon.png',
      class: 'text-danger',
      position: 'topRight',
      message: 'Los datos del Formulario no son válidos',
    });
  }
}
}
