import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../i18n/lang.service';
import { Icon } from '../../ui/icon';
import { Reveal } from '../../ui/reveal';
import { PageHead } from '../../ui/page-head';
import { NextLink } from '../../ui/next-link';

@Component({
  selector: 'app-business',
  imports: [Icon, Reveal, PageHead, NextLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <app-page-head [eyebrow]="c.pages.business.eyebrow" [title]="c.pages.business.title" [sub]="c.pages.business.sub" tone="pink" />

    <!-- Para quién -->
    <section class="section light">
      <div class="wrap">
        <div class="sec-head" reveal>
          <span class="eyebrow">{{ c.who.eyebrow }}</span>
          <h2 class="h-lg mw-l">{{ c.who.title }}</h2>
        </div>
        <div class="grid-3">
          @for (g of c.who.groups; track g.title; let i = $index) {
            <article class="card-light tone-top" [attr.data-tone]="tones[i]" reveal>
              <span class="tone-tile"><app-icon [name]="g.icon" size="22" /></span>
              <h3 class="card-t">{{ g.title }}</h3>
              <p class="card-b">{{ g.body }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Modelo -->
    <section class="section">
      <div class="wrap">
        <div class="sec-head" reveal>
          <span class="eyebrow">{{ c.model.eyebrow }}</span>
          <h2 class="h-lg">{{ c.model.title }}</h2>
        </div>
        <div class="grid-4">
          @for (it of c.model.items; track it.title; let i = $index) {
            <article class="card-dark" [attr.data-tone]="tones[i]" reveal>
              <span class="card-n grad-text">0{{ i + 1 }}</span>
              <h3 class="card-t">{{ it.title }}</h3>
              <p class="card-b">{{ it.body }}</p>
            </article>
          }
        </div>
        <div class="corridors" reveal>
          <span class="small-title">{{ c.model.corridorsTitle }}</span>
          <div class="corr-row">
            @for (k of c.model.corridors; track k; let i = $index) {
              <span class="corr" [attr.data-tone]="tones[i]"><span class="tone-dot"><app-icon name="globe" size="14" /></span>{{ k }}</span>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- Hoja de ruta -->
    <section class="section road-sec">
      <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="wrap">
        <div class="sec-head" reveal>
          <span class="eyebrow">{{ c.roadmap.eyebrow }}</span>
          <h2 class="h-lg">{{ c.roadmap.title }}</h2>
        </div>
        <ol class="road" reveal>
          @for (p of c.roadmap.phases; track p.tag; let i = $index) {
            <li [attr.data-tone]="tones[i]">
              <span class="road-dot"></span>
              <span class="road-tag tone-text">{{ p.tag }}</span>
              <span class="road-t">{{ p.title }}</span>
              <span class="road-b">{{ p.body }}</span>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="section tight"><app-next-link to="/campaign" [label]="c.nav.campaign" /></section>
  `,
})
export class Business {
  protected readonly l = inject(LangService);
  protected readonly tones = ['blue', 'purple', 'pink', 'orange'];
}
