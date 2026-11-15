import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LangService } from '../../i18n/lang.service';
import { Reveal } from '../../ui/reveal';
import { PageHead } from '../../ui/page-head';
import { NextLink } from '../../ui/next-link';

@Component({
  selector: 'app-technology',
  imports: [Reveal, PageHead, NextLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <app-page-head [eyebrow]="c.tech.eyebrow" [title]="c.tech.title" [sub]="c.tech.body" tone="purple" />

    <section class="section">
      <div class="wrap">
        <div class="tech-grid">
          <div reveal>
            <span class="small-title">{{ c.tech.layersTitle }}</span>
            <div class="layers">
              @for (ly of c.tech.layers; track ly.name; let i = $index) {
                <div class="layer" [attr.data-tone]="layerTones[i]">
                  <span class="layer-bar"></span>
                  <span class="layer-txt">
                    <span class="layer-n">{{ ly.name }}</span>
                    <span class="layer-d">{{ ly.note }}</span>
                  </span>
                </div>
              }
            </div>
          </div>
          <div class="hype-card" reveal>
            <span class="chip-badge">2025</span>
            <span class="small-title">Gartner Hype Cycle</span>
            <p class="hype-txt">{{ c.tech.hype }}</p>
            <div class="mini-curve" aria-hidden="true">
              <svg viewBox="0 0 320 130">
                <defs>
                  <linearGradient id="hc" x1="0" x2="1">
                    <stop offset="0" stop-color="#0090f7" /><stop offset=".33" stop-color="#ba62fc" />
                    <stop offset=".66" stop-color="#f2416b" /><stop offset="1" stop-color="#f55600" />
                  </linearGradient>
                </defs>
                <path d="M4 122 C 40 120, 52 8, 78 8 S 110 104, 140 106 S 210 64, 316 58" fill="none" stroke="url(#hc)" stroke-width="3" stroke-linecap="round" />
                <circle cx="46" cy="70" r="6" fill="#f5f5f7" />
                <circle cx="46" cy="70" r="11" fill="none" stroke="#f5f5f7" stroke-opacity=".35" />
              </svg>
            </div>
          </div>
        </div>

        <div class="questions" reveal>
          <span class="small-title">{{ c.tech.questionsTitle }}</span>
          <div class="q-grid">
            @for (q of c.tech.questions; track q.q; let i = $index) {
              <div class="q" [attr.data-tone]="layerTones[i]">
                <span class="q-t grad-text">{{ q.q }}</span>
                <span class="q-e">{{ q.ex }}</span>
              </div>
            }
          </div>
        </div>
      </div>
    </section>

    <section class="section tight"><app-next-link to="/business" [label]="c.nav.business" /></section>
  `,
})
export class Technology {
  protected readonly l = inject(LangService);
  protected readonly layerTones = ['blue', 'purple', 'pink', 'orange'];
}
