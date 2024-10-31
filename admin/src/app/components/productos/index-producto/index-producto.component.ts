import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { global } from 'src/app/services/global';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { io } from  'socket.io-client';

declare var iziToast: any;
declare var jQuery: any;
declare var $:any;

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;
  public filtro = '';
  public token: any;
  public productos: Array<any> = [];
  public arr_productos : Array <any> =[];
  public url: any;
  public page = 1;
  public pageSize = 10;
  public load_btn = false;
  public socket = io('http://localhost:4201') 

  constructor(
    private _productoService: ProductoService
  ) {
    this.token = localStorage.getItem('token');
    this.url = global.url;
  }
  init_data() {
  this._productoService.listar_productos_admin(this.filtro,this.token).subscribe(
    response=>{
      //console.log(response)
      this.productos =response.data;
      this.productos.forEach(element =>{
        this.arr_productos.push({
          titulo: element.titulo,
          stock: element.stock,
          precio: element.precio,
          categoria: element.categoria,
          nventas: element.nventas
        });
      });      
      this.load_data = false;
    },
    error=>{
      console.log(error)
    }
  )
  }

  ngOnInit(): void {
    this.init_data();
  }

  filtrar() {
    if (this.filtro) {
      this.init_data();
    } else {
      iziToast.error({
        title: 'ERROR',
        titleColor: '#FF0000',
        color: '#FFF',
        iconUrl: 'assets/img/error-icon.png',
        class: 'text-danger',
        position: 'topRight',
        message: 'Ingrese el nombre de un producto para buscar',
      });
      this.load_data = false;
    }
  }
  resetear() {
    this.filtro = '';
    this.init_data();
  }
  eliminar(id:any){
    this.load_btn = true;
    this._productoService.eliminar_producto_admin(id,this.token).subscribe(
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
        this.socket.emit('delete-producto-admin',{data:response.data})
        this.load_btn = false;
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
  donwload_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de productos");
  
    worksheet.addRow(undefined);
    for (let x1 of this.arr_productos){
      let x2=Object.keys(x1);
  
      let temp=[]
      for(let y of x2){
        temp.push(x1[y])
      }
      worksheet.addRow(temp)
    }
  
    let fname='PRODUCTOS- ';
  
    worksheet.columns = [
      { header: 'Producto', key: 'col1', width: 30},
      { header: 'Stock', key: 'col2', width: 15},
      { header: 'Precio', key: 'col3', width: 15},
      { header: 'Categoria', key: 'col4', width: 25},
      { header: 'N° ventas', key: 'col5', width: 15},
    ]as any;
  
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
  
  }

