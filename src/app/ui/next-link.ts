import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '../i18n/lang.service';
import { Icon } from './icon';

/** Banda al final de cada página que lleva a la siguiente. */
@Component({
  selector: 'app-next-link',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrap">
      <a class="next-link" [routerLink]="to()">
        <span class="next-label">{{ l.c().nav.next }}</span>
        <span class="next-title">{{ label() }}</span>
        <span class="next-arrow"><app-icon name="chevron" size="22" [stroke]="2" /></span>
      </a>
    </div>
  `,
})
export class NextLink {
  protected readonly l = inject(LangService);
  readonly to = input.required<string>();
  readonly label = input.required<string>();
}
