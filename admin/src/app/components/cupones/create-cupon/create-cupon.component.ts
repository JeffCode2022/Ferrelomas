import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/services/cupon.service';
declare var iziToast:any;
@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit{

  public token:any;

  public cupon: any ={
    tipo:''
  };
  public load_btn = false;
  
  constructor(
    private _cuponService : CuponService,
    private _router: Router
  ){
    this.token = localStorage.getItem('token');
   }

 ngOnInit(): void {
     
 } 
 registro(registroForm:any){
  if(registroForm.valid){
    this.load_btn = true;
    this._cuponService.registro_cupon_admin(this.cupon,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'COMPLETADO',
          titleColor: '#1FCB0D',
          color: '#FFF',
          iconUrl: 'assets/img/check_success.png',
          class: 'text-success',
          position: 'topRight',
          message: 'Se registro correctamente el nuevo cupón.',
        });
        this.load_btn = true;
        this._router.navigate(['/panel/cupones']);
      },
        error=>{
          this.load_btn = true;
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
      message: 'Los datos del Formulario no son válidos',
    });
  }
 }
}
