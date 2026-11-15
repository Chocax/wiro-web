import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LangService } from './i18n/lang.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  template: '<router-outlet />',
})
export class App {
  // Se inyecta aquí para que el idioma y el título se apliquen desde el arranque.
  private readonly lang = inject(LangService);
}
