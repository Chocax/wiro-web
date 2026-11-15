import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { LangService } from '../../i18n/lang.service';
import { ScreenId } from '../../i18n/copy';
import { Phone } from '../../ui/phone';
import { Icon } from '../../ui/icon';
import { Reveal } from '../../ui/reveal';
import { PageHead } from '../../ui/page-head';
import { NextLink } from '../../ui/next-link';

@Component({
  selector: 'app-how',
  imports: [Phone, Icon, Reveal, PageHead, NextLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <app-page-head [eyebrow]="c.pages.how.eyebrow" [title]="c.pages.how.title" [sub]="c.pages.how.sub" tone="blue" />

    <!-- Para tu familia -->
    <section class="section">
      <div class="wrap">
        <div class="sec-head" reveal>
          <span class="eyebrow tone-text" data-tone="blue">{{ c.family.eyebrow }}</span>
          <h2 class="h-lg">{{ c.family.title }}</h2>
          <p class="body-lg muted-2 mw">{{ c.family.sub }}</p>
        </div>
        <div class="demo">
          <ol class="steps" reveal>
            @for (s of c.family.steps; track s.screen; let i = $index) {
              <li>
                <button type="button" class="step" [attr.data-tone]="stepTones[i]" [class.on]="familyScreen() === s.screen" (click)="familyScreen.set(s.screen)">
                  <span class="step-n">{{ i + 1 }}</span>
                  <span class="step-txt">
                    <span class="step-t">{{ s.title }}</span>
                    <span class="step-b">{{ s.body }}</span>
                  </span>
                </button>
              </li>
            }
            <li class="tap-hint"><app-icon name="sparkle" size="14" />{{ c.family.tap }}</li>
          </ol>
          <div class="demo-phone glow-stage" data-tone="blue" reveal>
            <app-phone [(screen)]="familyScreen" />
          </div>
        </div>
      </div>
    </section>

    <!-- Para ti -->
    <section class="section light">
      <div class="wrap">
        <div class="sec-head" reveal>
          <span class="eyebrow">{{ c.personal.eyebrow }}</span>
          <h2 class="h-lg">{{ c.personal.title }}</h2>
          <p class="body-lg mw">{{ c.personal.sub }}</p>
        </div>
        <div class="demo reverse">
          <div class="demo-phone dark-stage" reveal>
            <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
            <app-phone [(screen)]="personalScreen" />
          </div>
          <div class="features" reveal>
            @for (f of c.personal.features; track f.screen; let i = $index) {
              <button type="button" class="feature" [attr.data-tone]="featTones[i]" [class.on]="personalScreen() === f.screen" (click)="personalScreen.set(f.screen)">
                <span class="tone-tile"><app-icon [name]="f.icon" size="22" /></span>
                <span class="feature-t">{{ f.title }}</span>
                <span class="feature-b">{{ f.body }}</span>
              </button>
            }
          </div>
        </div>
        <p class="closing" reveal>{{ c.personal.closing }}</p>
      </div>
    </section>

    <section class="section tight"><app-next-link to="/technology" [label]="c.nav.tech" /></section>
  `,
})
export class How {
  protected readonly l = inject(LangService);
  protected readonly familyScreen = signal<ScreenId>('rule');
  protected readonly personalScreen = signal<ScreenId>('scheduled');
  protected readonly stepTones = ['blue', 'purple', 'pink', 'orange'];
  protected readonly featTones = ['blue', 'orange', 'pink', 'purple'];
}
