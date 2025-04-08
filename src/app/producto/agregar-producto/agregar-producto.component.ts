import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule } from '@formio/angular';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router'; 
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormioModule],
  template: `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css">
    <div class="card p-4">
      <h2 class="mb-4">Agregar Nuevo Producto</h2>
      <formio [form]="productForm" (submit)="onSubmit($event)"></formio>
    </div>
  `,
  styles: [`
    .card {
      max-width: 800px;
      margin: 2rem auto;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class AgregarProductoComponent {
  productForm: any;

  constructor(
    private apiService: ApiService,
    private router: Router, private http: HttpClient
  ) {

    // Definición del formulario
    this.productForm = {
      components: [
        {
          type: 'textfield',
          key: 'nombre',
          label: 'Nombre del Producto',
          placeholder: 'Ingrese el nombre del producto',
          input: true,
          validate: {
            required: true
          }
        },
        {
          type: 'textfield',
          key: 'descripcion',
          label: 'Descripción del Producto',
          placeholder: 'Ingrese la descripción del producto',
          input: true,
          validate: {
            required: true
          }
        },
        {
          type: 'number',
          key: 'precio',
          label: 'Precio del Producto',
          placeholder: 'Ingrese el precio del producto',
          input: true,
          validate: {
            required: true
          }
        },
        {
          type: 'number',
          key: 'cantidad',
          label: 'Cantidad del Producto',
          placeholder: 'Ingrese la cantidad del producto',
          input: true,
          validate: {
            required: true
          }
        },
        {
          type: 'checkbox',
          key: 'activo',
          label: '¿Producto Activo?',
          input: true,
          defaultValue: false
        },
        {
          type: 'datetime',
          key: 'fechaCreacion',
          label: 'Fecha de Creación',
          format: 'yyyy-MM-ddTHH:mm:ss.SSSZ', // Formato ISO 8601
          enableTime: true,
          time_24hr: true,
          widget: {
            type: 'calendar',
            displayInTimezone: 'utc', // Para que coincida con el formato de tu API
            useLocaleSettings: false
          },
          defaultValue: new Date().toISOString(), // Fecha actual en formato ISO
          validate: {
            required: true
          }
        },
        {
          type: 'datetime',
          key: 'fechaModificacion',
          label: 'Fecha de Modificación',
          format: 'yyyy-MM-ddTHH:mm:ss.SSSZ', // Formato ISO 8601
          enableTime: true,
          time_24hr: true,
          widget: {
            type: 'calendar',
            displayInTimezone: 'utc', // Para que coincida con el formato de tu API
            useLocaleSettings: false
          },
          defaultValue: new Date().toISOString(), // Fecha actual en formato ISO
          validate: {
            required: true
          }
        },
        {
          type: 'select',
          key: 'moneda',
          label: 'Moneda',
          dataSrc: 'values',
          data: {
            values: [
              { value: 'PYG', label: 'Guaraní' },
              { value: 'USD', label: 'Dólar' },
              { value: 'EUR', label: 'Euro' }
            ]
          },
          input: true,
          validate: {
            required: true
          }
        },
        {
          type: 'button',
          key: 'submit',
          label: 'Guardar Producto',
          action: 'submit',
          theme: 'primary',
        }
      ]
    };
  }

  onSubmit(event: any) {
    if (event.data) {
      delete event.data.submit;
      console.log('Datos del formulario:', JSON.stringify(event.data, null, 2));
      this.apiService.post(event.data).subscribe(
        response => {
          //imprimir la respuesta en consola
          console.log('Respuesta del servidor:', response);
          console.log('Producto agregado exitosamente:', response);
          alert('Producto agregado exitosamente!');
          this.router.navigate(['/listar']);
          // Redirigir o mostrar un mensaje de éxito
        },
        error => {
          console.error('Error al agregar el producto:', error);
          alert('Error al guardar el producto');
        }
      );
    }
  }
}