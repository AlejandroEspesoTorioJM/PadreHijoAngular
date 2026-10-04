import { Component, inject, signal } from '@angular/core';
import { TareasService } from './servicios/tareas.service';

import { TareaItemComponent } from './componentes/tarea-item/tarea-
item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TareaItemComponent], // <-- IMPORTANTE: Importamos el componente hijo aquí
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Inyección moderna de dependencias
  private tareasService = inject(TareasService);
  // Exponemos las tareas del servicio a la vista
  listaTareas = this.tareasService.tareas;
  // Signal local para el formulario de nueva tarea
  nuevaTareaInput = signal('');
  actualizarTexto(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.nuevaTareaInput.set(valor);
  }
  agregar() {
    this.tareasService.agregarTarea(this.nuevaTareaInput());
    this.nuevaTareaInput.set(''); // Limpiamos el input
  }
  borrar(index: number) {
    this.tareasService.eliminarTarea(index);
  }
}
