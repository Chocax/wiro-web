import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type Tone = 'blue' | 'purple' | 'pink' | 'orange' | 'spectrum';

/** Encabezado de cada página, con un brillo de color suave detrás. */
@Component({
  selector: 'app-page-head',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head" [attr.data-tone]="tone()">
      <div class="aurora" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="wrap ph-in" [class.has-side]="side()">
        <div class="ph-copy">
          <span class="eyebrow tone-text">{{ eyebrow() }}</span>
          <h1 class="h-xl">{{ title() }}</h1>
          @if (sub()) { <p class="lead">{{ sub() }}</p> }
        </div>
        <ng-content />
      </div>
    </section>
  `,
})
export class PageHead {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly sub = input<string>('');
  readonly tone = input<Tone>('spectrum');
  /** true cuando la página pone contenido a la derecha del título. */
  readonly side = input(false);
}
