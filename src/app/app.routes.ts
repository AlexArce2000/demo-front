import { Routes, provideRouter } from '@angular/router';
import { ProductoListComponent } from './producto/listar-producto/listar-producto.component';
import { AgregarProductoComponent } from './producto/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './producto/editar-producto/editar-producto.component';
import { ApplicationConfig } from '@angular/core';

export const routes: Routes = [
    {path: 'listar', component: ProductoListComponent},
    {path: 'agregar', component: AgregarProductoComponent},
    {path: 'editar/:id', component: EditarProductoComponent},
    {path: '', redirectTo: 'listar', pathMatch: 'full'},
];
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
  ]
}