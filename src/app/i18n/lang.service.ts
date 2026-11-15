import { Injectable, computed, effect, signal } from '@angular/core';
import { COPY, Lang } from './copy';

const KEY = 'wiro-lang';

function initialLang(): Lang {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'es' || q === 'en') return q;
    const saved = localStorage.getItem(KEY);
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* sin almacenamiento: se usa el idioma por defecto */
  }
  return 'en';
}

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>(initialLang());
  readonly c = computed(() => COPY[this.lang()]);

  constructor() {
    effect(() => {
      const l = this.lang();
      document.documentElement.lang = l;
      document.title = COPY[l].meta.title;
      try {
        localStorage.setItem(KEY, l);
      } catch {
        /* nada */
      }
    });
  }

  toggle() {
    this.lang.update((l) => (l === 'en' ? 'es' : 'en'));
  }

  /** Dinero con el formato del idioma activo. */
  money(n: number, cur: 'USD' | 'COP'): string {
    const es = this.lang() === 'es';
    const num = new Intl.NumberFormat(es ? 'es-CO' : 'en-US', {
      maximumFractionDigits: cur === 'USD' && n % 1 !== 0 ? 2 : 0,
      minimumFractionDigits: cur === 'USD' && n % 1 !== 0 ? 2 : 0,
    }).format(n);
    if (cur === 'USD') return `US$${num}`;
    return es ? `$${num}` : `COP ${num}`;
  }
}
