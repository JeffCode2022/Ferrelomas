import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

declare var iziToast:any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent  implements OnInit{

  public id:any
  public token;
  public _iduser:any;
  public producto: any = {};
  public inventarios: Array<any>=[];
  public inventario : any = {};
  public arr_inventarios : Array <any> =[];
  public load_btn = false;
  public page = 1;
  public pageSize = 10;
  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ){ 
    this.token = localStorage.getItem('token');
    this._iduser= localStorage.getItem('_id');
    console.log(this._iduser);
    
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
            this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
              response=>{
                this.inventarios=response.data;
                this.inventarios.forEach(element=>{
                  this.arr_inventarios.push({
                    admin: element.admin.nombres + ' '+ element.admin.apellidos,
                    cantidad: element.cantidad,
                    proveedor: element.proveedor,
                  })
                })
              },
              error=>{
                console.log(error);
                
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
  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'COMPLETADO',
          titleColor: '#1FCB0D',
          color: '#FFF',
          iconUrl: 'assets/img/check_success.png',
          class: 'text-success',
          position: 'topRight',
          message: 'Se eliminó correctamente el producto.',
        });
        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.load_btn = false;
        this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
          response=>{
            this.inventarios=response.data;
            console.log(this.inventarios);
          },
          error=>{
            console.log(error);
            
          }
        )
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
  registro_inventario(inventarioForm:any){
    if(inventarioForm.valid){
      let data= {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._iduser,
        proveedor: inventarioForm.value.proveedor
      }
      this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'COMPLETADO',
            titleColor: '#1FCB0D',
            color: '#FFF',
            iconUrl: 'assets/img/check_success.png',
            class: 'text-success',
            position: 'topRight',
            message: 'Se agregó el nuevo Stock al producto.',
          });

          this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
            response=>{
              this.inventarios=response.data;
            },
            error=>{
              console.log(error);
              
            }
          )
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
        message: 'Los datos del formulario no son válidos',
      }); 
    }
  }

  donwload_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");
  
    worksheet.addRow(undefined);
    for (let x1 of this.arr_inventarios){
      let x2=Object.keys(x1);
  
      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
  
    let fname='INVENTARIO- ';
  
    worksheet.columns = [
      { header: 'Trabajador', key: 'col1', width: 30},
      { header: 'Cantidad', key: 'col2', width: 15},
      { header: 'Proveedor', key: 'col3', width: 25},
      ,
    ]as any;
  
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
