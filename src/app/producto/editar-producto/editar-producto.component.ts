import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormioModule } from '@formio/angular';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormioModule],
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  productForm: any;
  productId!: number;
  loading = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.productId = Number(params.get('id'));
        return this.apiService.get(`${this.productId}`);
      })
    ).subscribe({
      next: (product) => {
        this.initializeForm(product);
      },
      error: (err) => {
        console.error('Error cargando producto:', err);
        this.router.navigate(['/producto/listar']);
      }
    });
  }

  initializeForm(product: any): void {
    this.productForm = {
      components: [
        {
          type: 'textfield',
          key: 'nombre',
          label: 'Nombre',
          defaultValue: product.nombre, 
          validate: { required: true }
        },
        {
          type: 'textfield',
          key: 'descripcion',
          width: 200,
          label: 'Descripción',
          defaultValue: product.descripcion,
          validate:{ required: true }
        },
        {
          type: 'number',
          key: 'precio',
          label: 'Precio',
          defaultValue: product.precio,
          validate: { required: true, min: 0 }
        },
        {
          type: 'number',
          key: 'cantidad',
          label: 'Cantidad',
          defaultValue: product.cantidad,
          validate: { required: true, min: 0 }
        },
        {
          type: 'checkbox',
          key: 'activo',
          label: 'Activo',
          defaultValue: product.activo
        },
        {
          type: 'datetime',
          key: 'fechaCreacion',
          label: 'Fecha de Creación',
          defaultValue: new Date(product.fechaCreacion).toISOString(),
          format: 'yyyy-MM-ddTHH:mm:ss.SSSZ', // Formato ISO 8601 TODO: implementar formato más legible en el form.io
          enableTime: true,
          time_24hr: true,
          widget: {
            type: 'calendar',
            displayInTimezone: 'utc', 
            useLocaleSettings: false
          },
         
          validate: {
            required: true
          },
          disabled: true // Deshabilitar el campo de fecha de creación
        },
        {
          type: 'datetime',
          key: 'fechaModificacion',
          label: 'Fecha de Modificación',
          format: 'yyyy-MM-ddTHH:mm:ss.SSSZ', // Formato ISO 8601 TODO: implementar formato más legible en el form.io
          enableTime: true,
          time_24hr: true,
          widget: {
            type: 'calendar',
            displayInTimezone: 'utc', 
            useLocaleSettings: false
          },
          defaultValue: new Date().toISOString(), 
          validate: {
            required: true
          }
        },
        {
          type: 'select',
          key: 'moneda',
          label: 'Moneda',
          dataSrc: 'values',
          //seleccionar el valor por defecto
          defaultValue: product.moneda,
          data: {
            values: [
              { value: 'PYG', label: 'Guaraní' },
              { value: 'USD', label: 'Dólar' },
              { value: 'EUR', label: 'Euro' }
            ],
          },
          input: true,
          validate: {
            required: true
          },
          
          
        },
        {
          type: 'button',
          key: 'submit',
          label: 'Actualizar Producto',
          action: 'submit',
          theme: 'primary'
        }
      ]
    };
  }

  onSubmit(event: any): void {
    if (event.data) {
      delete event.data.submit;
      this.loading = true;
      const updatedProduct = {
        ...event.data,
        id: this.productId
      };
      console.log('Datos del producto a actualizar:', updatedProduct);
      this.apiService.put(this.productId, updatedProduct).subscribe({
        
        next: () => {
          this.router.navigate(['/listar']);
          alert('Producto actualizado correctamente');
        },
        error: (err) => {
          console.error('Error actualizando:', err);
          this.loading = false;
        }
      });
    }
  }
}