import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '../../i18n/lang.service';
import { SCREEN_ORDER, ScreenId } from '../../i18n/copy';
import { Icon } from '../../ui/icon';
import { PageHead } from '../../ui/page-head';
import { NextLink } from '../../ui/next-link';

type Filter = 'all' | 'family' | 'personal';

const FAMILY: ScreenId[] = ['rule', 'send', 'received', 'declined'];

@Component({
  selector: 'app-gallery',
  imports: [Icon, PageHead, NextLink, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <app-page-head [eyebrow]="c.gallery.eyebrow" [title]="c.gallery.title" [sub]="c.gallery.sub" tone="blue" />

    <section class="section gallery-sec">
      <div class="wrap">
        <div class="gallery-bar">
          <div class="seg" role="tablist">
            @for (f of filters; track f) {
              <button type="button" role="tab" [class.on]="filter() === f" [attr.aria-selected]="filter() === f" (click)="filter.set(f)">{{ c.gallery[f] }}</button>
            }
          </div>
          <a class="link" routerLink="/record" [queryParams]="{ lang: l.lang() }"><app-icon name="play" size="12" />{{ c.gallery.record }}</a>
        </div>
        <div class="gallery">
          @for (s of shown(); track s; let i = $index) {
            <figure class="shot" [attr.data-tone]="tones[i % 4]">
              <button type="button" class="shot-img" (click)="open.set(s)" [attr.aria-label]="c.screens[s]">
                <img [src]="src(s)" [alt]="c.screens[s]" loading="lazy" width="1050" height="2213" />
              </button>
              <figcaption>
                <span>{{ c.screens[s] }}</span>
                <a class="dl" [href]="src(s)" [attr.download]="'wiro-' + l.lang() + '-' + s + '.png'" [attr.aria-label]="c.gallery.download + ' ' + c.screens[s]">
                  <app-icon name="download" size="16" />
                </a>
              </figcaption>
            </figure>
          }
        </div>
      </div>
    </section>

    <section class="section tight"><app-next-link to="/team" [label]="c.nav.team" /></section>

    @if (open(); as s) {
      <div class="modal-bg lightbox" (click)="open.set(null)">
        <div class="lb" (click)="$event.stopPropagation()">
          <button type="button" class="round lb-nav" (click)="step(-1)" aria-label="prev"><app-icon name="back" size="18" /></button>
          <img [src]="src(s)" [alt]="c.screens[s]" />
          <button type="button" class="round lb-nav" (click)="step(1)" aria-label="next"><app-icon name="chevron" size="18" /></button>
        </div>
        <div class="lb-bar" (click)="$event.stopPropagation()">
          <span>{{ c.screens[s] }}</span>
          <a class="btn btn-buy btn-sm" [href]="src(s)" [attr.download]="'wiro-' + l.lang() + '-' + s + '.png'"><app-icon name="download" size="14" />{{ c.gallery.download }}</a>
          <button type="button" class="btn btn-dark btn-sm" (click)="open.set(null)">{{ c.gallery.close }}</button>
        </div>
      </div>
    }
  `,
})
export class Gallery {
  protected readonly l = inject(LangService);
  protected readonly filters: Filter[] = ['all', 'family', 'personal'];
  protected readonly filter = signal<Filter>('all');
  protected readonly open = signal<ScreenId | null>(null);
  protected readonly tones = ['blue', 'purple', 'pink', 'orange'];

  protected readonly shown = computed(() => {
    const f = this.filter();
    if (f === 'family') return FAMILY;
    if (f === 'personal') return SCREEN_ORDER.filter((s) => !FAMILY.includes(s));
    return SCREEN_ORDER;
  });

  protected src(s: ScreenId) {
    return `mockups/${this.l.lang()}/${s}.png`;
  }

  protected step(d: number) {
    const list = this.shown();
    const cur = this.open();
    if (!cur) return;
    const i = list.indexOf(cur);
    this.open.set(list[(i + d + list.length) % list.length]);
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.open()) return;
    if (e.key === 'Escape') this.open.set(null);
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  }
}
