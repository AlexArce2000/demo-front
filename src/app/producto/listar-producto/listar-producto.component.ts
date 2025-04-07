import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tabulator } from 'tabulator-tables';


@Component({
  selector: 'app-producto-listar',
  standalone: true,
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.css']
})
export class ProductoListComponent implements OnInit, AfterViewInit{
  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadProductos();
  }
    ngAfterViewInit(): void {
    // Asegura que el DOM esté completamente cargado antes de inicializar Tabulator
  }


  loadProductos(): void {
    this.apiService.get("listar").subscribe((data) => {
      console.log(data)
      console.log('Ejemplo de fecha:', data[0].fechaCreacion);
      console.log('Tipo de dato:', typeof data[0].fechaCreacion);
      data.forEach((item) => {
        item.fechaCreacion = this.formatter(item.fechaCreacion);
        item.fechaModificacion = this.formatter(item.fechaModificacion);
      });
      console.log('Datos formateados:', data);
      this.initTabulator(data);
      
    });
  }

  formatter(cell:any) {
    const timestamp = cell;
    
    // 1. Verificar si el valor existe
    if (timestamp === null || timestamp === undefined) return 'N/A';
    
    // 2. Crear objeto Date (el timestamp ya está en milisegundos)
    const date = new Date(timestamp);
    
    // 3. Validar la fecha
    if (isNaN(date.getTime())) {
      console.warn('Timestamp inválido:', timestamp);
      return 'Fecha inválida';
    }
    
    // 4. Formatear a DD/MM/AAAA HH:MM:SS
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }


  initTabulator(data: any[]): void {
    
    var table = new Tabulator('#producto-table', {
      data: data,
      layout: 'fitColumns',
      paginationSize: 10,
      height: "311px",
      movableColumns: true,
      headerSort: true,
      columns: [
        { 
          title: 'ID', field: 'id', width: 80, sorter: 'number' 
        },
        { 
          title: 'Nombre', 
          field: 'nombre',
          headerFilter: 'input',
          headerFilterPlaceholder: 'Filtrar Nombre'
        },
        { 
          title: 'Descripción', 
          field: 'descripcion',
          width: 200,
          headerFilter: 'input',
          headerFilterPlaceholder: 'Filtrar Descripción'
        },
        { 
          title: 'Precio', 
          field: 'precio',
          formatter: 'money',
          formatterParams: {
            symbol: 'PYG',
            precision: 2,
            thousand: ',',
            decimal: '.'
          },
          headerFilter: 'number',
          headerFilterPlaceholder: 'Filtrar Precio'
        },
        { 
          title: 'Cantidad', 
          field: 'cantidad',
          headerFilter: 'number',
          headerFilterPlaceholder: 'Filtrar Cantidad'
        },
        { 
          title: 'Activo', 
          field: 'activo',
          formatter: 'tickCross',
          headerFilter: 'tickCross',
          headerFilterParams: {
            tristate: true
          }
        },
        {
          title: 'Fecha creación',
          field: 'fechaCreacion',
          formatter: (cell) => {
            const val = cell.getValue();
            debugger;
            console.log('Valor de fechaCreacion:', val);
            return val ? new Date(val).toLocaleString('es-ES') : 'N/A';
          }
        },
        { 
          title: 'Fecha modificación', 
          field: 'fechaModificacion',
          hozAlign: 'center',
          sorter: 'date',
        },
        {
          title: 'moneda',
          field: 'moneda',
          hozAlign: 'center',
          sorter: 'string',
        },
        {
          title: 'Acciones',
          width: 120,
          headerSort: false,
        }
      ],
      locale: 'es-es',
      langs: {
        'es-es': {
          pagination: {
            page_size: 'Elementos por página',
            first: 'Primera',
            last: 'Última',
            prev: 'Anterior',
            next: 'Siguiente'
          }
        }
      }
    });
  }
  


  confirmarEliminacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.apiService.delete(id).subscribe({
        next: () => {
          this.loadProductos();
        },
        error: (err) => {
          console.error('Error al eliminar producto:', err);
          alert('Error al eliminar el producto');
        }
      });
    }
  }
}
