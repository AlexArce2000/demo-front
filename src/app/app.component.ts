import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductoListComponent } from "./producto/listar-producto/listar-producto.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo-front';
}
