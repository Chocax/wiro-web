import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '../../i18n/lang.service';
import { SCREEN_ORDER, ScreenId } from '../../i18n/copy';
import { Phone } from '../../ui/phone';
import { Icon } from '../../ui/icon';

/**
 * Modo grabación: el celular solo, centrado sobre negro.
 * Parámetros: ?s=send (pantalla) · ?lang=es · ?clean=1 (sin controles) · ?bg=transparent
 */
@Component({
  selector: 'app-record',
  imports: [Phone, Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'stage', '[class.clean]': 'clean', '[class.transparent]': 'transparent' },
  template: `
    @let c = l.c();
    <app-phone class="stage-phone" [(screen)]="screen" />
    @if (!clean) {
      <div class="stage-ui">
        <a class="link" routerLink="/screens" [queryParams]="{ lang: l.lang() }"><app-icon name="back" size="14" />{{ c.recorder.back }}</a>
        <div class="stage-ctrl">
          <button type="button" class="round" (click)="move(-1)" [attr.aria-label]="c.recorder.prev"><app-icon name="back" size="18" /></button>
          <span class="stage-name">{{ index() + 1 }} / {{ order.length }} · {{ c.screens[screen()] }}</span>
          <button type="button" class="round" (click)="move(1)" [attr.aria-label]="c.recorder.next"><app-icon name="chevron" size="18" /></button>
          <button type="button" class="lang" (click)="l.toggle()">{{ c.nav.langShort }}</button>
        </div>
        <p class="stage-hint">{{ c.recorder.hint }}</p>
      </div>
    }
  `,
})
export class Record {
  protected readonly l = inject(LangService);
  protected readonly order = SCREEN_ORDER;
  private readonly params = new URLSearchParams(window.location.search);
  protected readonly clean = this.params.get('clean') === '1';
  protected readonly transparent = this.params.get('bg') === 'transparent';
  protected readonly screen = signal<ScreenId>(
    (SCREEN_ORDER as string[]).includes(this.params.get('s') ?? '') ? (this.params.get('s') as ScreenId) : 'home',
  );
  protected readonly index = computed(() => this.order.indexOf(this.screen()));

  protected move(d: number) {
    const n = this.order.length;
    this.screen.set(this.order[(this.index() + d + n) % n]);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') this.move(1);
    if (e.key === 'ArrowLeft') this.move(-1);
  }
}
