import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { global } from 'src/app/services/global';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-reviews-producto',
  templateUrl: './reviews-producto.component.html',
  styleUrls: ['./reviews-producto.component.css']
})
export class ReviewsProductoComponent  implements OnInit{
  public id:any
  public token;
  public _iduser:any;
  public producto: any = {};
  public reviews: Array<any>=[];
  public load_btn = false;
  public page = 1;
  public pageSize = 10;
  public url:any
  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ){ 
    this.token = localStorage.getItem('token');
    this._iduser= localStorage.getItem('_id');
    this.url= global.url
    
  }
  ngOnInit(): void {
    this._route.params.subscribe(
    params=>{
      this.id = params['id'];
      this._productoService.obtener_producto_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data ==undefined){
             this.producto = undefined;
          }else{
            this.producto = response.data;
            this._productoService.obtener_reviews_producto_publico(this.producto._id).subscribe(
              response=>{
                this.reviews=response.data;
                
              }
            )
          }
          
        },
        error=>{
          console.log(error);
          
        }
      )
      
    }
  )  
  }
}
