import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '../../i18n/lang.service';
import { SITE } from '../../config';
import { Icon } from '../../ui/icon';
import { Reveal } from '../../ui/reveal';
import { PageHead } from '../../ui/page-head';

@Component({
  selector: 'app-team',
  imports: [Icon, Reveal, PageHead, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <app-page-head [eyebrow]="c.pages.team.eyebrow" [title]="c.pages.team.title" [sub]="c.pages.team.sub" tone="spectrum" />

    <section class="section">
      <div class="wrap">
        <div class="team">
          @for (n of site.team; track n; let i = $index) {
            <div class="member" [attr.data-tone]="tones[i]" reveal>
              <span class="member-av">{{ initials(n) }}</span>
              <span class="member-n">{{ n }}</span>
            </div>
          }
        </div>
        <p class="team-note" reveal><app-icon name="sparkle" size="16" />{{ c.team.note }}</p>
      </div>
    </section>

    <section class="section tight">
      <div class="wrap">
        <div class="files" reveal>
          <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
          <span class="files-ic"><app-icon name="folder" size="28" /></span>
          <div class="files-txt">
            <span class="eyebrow">{{ c.files.eyebrow }}</span>
            <h2 class="h-sm">{{ c.files.title }}</h2>
            <p class="muted-2">{{ c.files.body }}</p>
          </div>
          @if (site.filesUrl) {
            <a class="btn btn-buy" [href]="site.filesUrl" target="_blank" rel="noopener">{{ c.files.open }}</a>
          } @else {
            <span class="btn btn-dark is-disabled">{{ c.files.pending }}</span>
          }
        </div>
      </div>
    </section>

    <section class="section tight">
      <div class="wrap">
        <div class="cta-band" reveal>
          <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="cta-in">
            <h2 class="h-sm">{{ c.explore.ctaTitle }}</h2>
            <p>{{ c.explore.ctaBody }}</p>
          </div>
          <a class="btn btn-buy" routerLink="/campaign">{{ c.nav.back }}</a>
        </div>
      </div>
    </section>
  `,
})
export class Team {
  protected readonly l = inject(LangService);
  protected readonly site = SITE;
  protected readonly tones = ['blue', 'purple', 'pink', 'orange'];

  protected initials(name: string) {
    const w = name.split(' ');
    return (w[0][0] + w[w.length - 2][0]).toUpperCase();
  }
}
