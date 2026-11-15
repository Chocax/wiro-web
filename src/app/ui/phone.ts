import { ChangeDetectionStrategy, Component, effect, inject, input, model, signal } from '@angular/core';
import { LangService } from '../i18n/lang.service';
import { ScreenId } from '../i18n/copy';
import { Icon } from './icon';

/**
 * Celular con las pantallas de la app de Wiro.
 * `screen` es bidireccional: los botones de la app cambian de pantalla y el padre se entera.
 */
@Component({
  selector: 'app-phone',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'phone',
    '[class.is-static]': 'static()',
    '[attr.data-screen]': 'screen()',
    role: 'img',
    '[attr.aria-label]': '"Wiro app · " + l.c().screens[screen()]',
  },
  templateUrl: './phone.html',
})
export class Phone {
  protected readonly l = inject(LangService);
  readonly screen = model<ScreenId>('home');
  /** Sin interacción (por ejemplo en el hero). */
  readonly static = input(false);

  protected readonly released = signal(false);

  constructor() {
    effect(() => {
      this.screen();
      this.released.set(false);
    });
  }

  protected go(s: ScreenId) {
    if (!this.static()) this.screen.set(s);
  }

  protected m(n: number, cur: 'USD' | 'COP') {
    return this.l.money(n, cur);
  }
}
