import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { LangService } from '../../i18n/lang.service';
import { SITE } from '../../config';
import { Icon } from '../../ui/icon';
import { Reveal } from '../../ui/reveal';
import { PageHead } from '../../ui/page-head';
import { NextLink } from '../../ui/next-link';

@Component({
  selector: 'app-campaign',
  imports: [Icon, Reveal, PageHead, NextLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = l.c();
    <app-page-head [eyebrow]="c.campaign.eyebrow" [title]="c.campaign.title" [sub]="c.campaign.body" tone="orange" [side]="true">
      <div class="fund" reveal>
        <div class="fund-top">
          <span class="fund-v">{{ l.money(site.pledgedUsd, 'USD') }}</span>
          <span class="fund-l">{{ c.campaign.pledged }} {{ l.money(site.goalUsd, 'USD') }} {{ c.campaign.goal }}</span>
        </div>
        <div class="fund-bar"><i [style.width.%]="funded()"></i></div>
        <div class="fund-meta">
          <span>{{ funded() }}% {{ c.campaign.funded }}</span>
          <span class="status"><span class="dot-live"></span>{{ c.campaign.status }}</span>
        </div>
        <p class="fund-note"><app-icon name="shield" size="15" />{{ c.campaign.note }}</p>
      </div>
    </app-page-head>

    <!-- Recompensas -->
    <section class="section light">
      <div class="wrap">
        <div class="sec-head" reveal>
          <h2 class="h-lg">{{ c.campaign.rewardsTitle }}</h2>
        </div>
        <div class="rewards">
          @for (r of c.campaign.rewards; track r.name; let i = $index) {
            <article class="reward" [class.featured]="r.featured" [attr.data-tone]="tones[i]" reveal>
              @if (r.featured) { <span class="new-badge">{{ c.campaign.featured }}</span> }
              <span class="tone-tile"><app-icon [name]="icons[i]" size="22" /></span>
              <span class="reward-p">{{ l.money(r.price, 'USD') }}</span>
              <h3 class="reward-n">{{ r.name }}</h3>
              <p class="reward-b">{{ r.body }}</p>
              <span class="reward-inc">{{ c.campaign.includes }}</span>
              <ul>
                @for (x of r.items; track x) {
                  <li><app-icon name="check" size="16" [stroke]="2" />{{ x }}</li>
                }
              </ul>
              <button type="button" class="btn" [class.btn-buy]="r.featured" [class.btn-dark]="!r.featured" (click)="reward.set(i)">{{ c.campaign.select }}</button>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Riesgos -->
    <section class="section">
      <div class="wrap">
        <div class="sec-head" reveal>
          <span class="eyebrow">{{ c.risks.eyebrow }}</span>
          <h2 class="h-lg">{{ c.risks.title }}</h2>
        </div>
        <div class="grid-2">
          @for (r of c.risks.items; track r.title; let i = $index) {
            <article class="card-dark risk" [attr.data-tone]="tones[i]" reveal>
              <span class="tone-tile"><app-icon [name]="riskIcons[i]" size="20" /></span>
              <h3 class="card-t">{{ r.title }}</h3>
              <p class="card-b">{{ r.body }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <!-- Preguntas -->
    <section class="section tight">
      <div class="wrap faq-grid">
        <div reveal>
          <span class="eyebrow">{{ c.faq.eyebrow }}</span>
          <h2 class="h-lg">{{ c.faq.title }}</h2>
        </div>
        <div class="faq" reveal>
          @for (f of c.faq.items; track f.q; let i = $index) {
            <div class="faq-item" [class.open]="openFaq() === i">
              <button type="button" class="faq-q" (click)="openFaq.set(openFaq() === i ? null : i)" [attr.aria-expanded]="openFaq() === i">
                <span>{{ f.q }}</span><app-icon name="plus" size="20" />
              </button>
              <div class="faq-a"><p>{{ f.a }}</p></div>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section tight"><app-next-link to="/screens" [label]="c.nav.screens" /></section>

    @if (reward() !== null) {
      <div class="modal-bg" (click)="reward.set(null)">
        <div class="modal" role="dialog" aria-modal="true" (click)="$event.stopPropagation()">
          <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
          <span class="brand-mark lg">W</span>
          <span class="eyebrow">{{ c.campaign.rewards[reward()!].name }} · {{ l.money(c.campaign.rewards[reward()!].price, 'USD') }}</span>
          <h3 class="h-sub">{{ c.campaign.modalTitle }}</h3>
          <p class="muted-2">{{ c.campaign.modalBody }}</p>
          <button type="button" class="btn btn-buy" (click)="reward.set(null)">{{ c.campaign.modalClose }}</button>
        </div>
      </div>
    }
  `,
})
export class Campaign {
  protected readonly l = inject(LangService);
  protected readonly site = SITE;
  protected readonly reward = signal<number | null>(null);
  protected readonly openFaq = signal<number | null>(0);
  protected readonly funded = computed(() => Math.round((SITE.pledgedUsd / SITE.goalUsd) * 100));
  protected readonly tones = ['blue', 'purple', 'pink', 'orange'];
  protected readonly icons = ['bolt', 'sparkle', 'house', 'store'];
  protected readonly riskIcons = ['globe', 'shield', 'lock', 'user'];

  @HostListener('document:keydown.escape')
  onEsc() {
    this.reward.set(null);
  }
}
