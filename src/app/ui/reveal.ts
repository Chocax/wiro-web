import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/** Aparición suave al entrar en pantalla. Sin IntersectionObserver o con movimiento reducido, se muestra directo. */
@Directive({ selector: '[reveal]', host: { class: 'reveal' } })
export class Reveal implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  ngOnInit() {
    const node = this.el.nativeElement as HTMLElement;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      node.classList.add('in');
      return;
    }
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            node.classList.add('in');
            this.io?.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    this.io.observe(node);
  }

  ngOnDestroy() {
    this.io?.disconnect();
  }
}
