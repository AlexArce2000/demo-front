import { Routes, provideRouter } from '@angular/router';
import { ProductoListComponent } from './producto/listar-producto/listar-producto.component';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
    {path: 'listar', component: ProductoListComponent}
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ]
}