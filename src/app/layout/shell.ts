import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LangService } from '../i18n/lang.service';
import { Icon } from '../ui/icon';

/** Navegación, contenido de cada página y pie de página. */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <header class="nav" [class.scrolled]="scrolled()" [class.menu-open]="menu()">
      <div class="nav-in">
        <a class="brand" routerLink="/" aria-label="Wiro"><span class="brand-mark">W</span><span class="brand-word">wiro</span></a>
        <nav class="nav-links" [class.open]="menu()">
          @for (n of links; track n.path) {
            <a [routerLink]="n.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: n.path === '/' }">{{ c.nav[n.key] }}</a>
          }
        </nav>
        <div class="nav-right">
          <button type="button" class="lang" (click)="l.toggle()" [attr.aria-label]="c.nav.langLabel">
            <app-icon name="globe" size="15" />{{ c.nav.langShort }}
          </button>
          <a class="btn btn-buy btn-sm" routerLink="/campaign">{{ c.nav.back }}</a>
          <button type="button" class="burger" (click)="menu.set(!menu())" aria-label="Menu"><app-icon [name]="menu() ? 'x' : 'menu'" size="20" /></button>
        </div>
      </div>
    </header>

    <main>
      <router-outlet />
    </main>

    <footer class="footer">
      <div class="wrap foot">
        <div class="foot-top">
          <a class="brand" routerLink="/"><span class="brand-mark">W</span><span class="brand-word">wiro</span></a>
          <nav class="foot-links">
            @for (n of links; track n.path) {
              <a [routerLink]="n.path">{{ c.nav[n.key] }}</a>
            }
          </nav>
        </div>
        <p>{{ c.footer.text }}</p>
        <span class="muted">{{ c.footer.rights }}</span>
      </div>
    </footer>
  `,
})
export class Shell {
  protected readonly l = inject(LangService);
  protected readonly menu = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly links = [
    { path: '/', key: 'home' },
    { path: '/how-it-works', key: 'how' },
    { path: '/technology', key: 'tech' },
    { path: '/business', key: 'business' },
    { path: '/campaign', key: 'campaign' },
    { path: '/screens', key: 'screens' },
    { path: '/team', key: 'team' },
  ] as const;

  constructor() {
    inject(Router).events.subscribe((e) => {
      if (e instanceof NavigationEnd) this.menu.set(false);
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 8);
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.menu.set(false);
  }
}
