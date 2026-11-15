import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Íconos de línea monocromos, dibujados a mano para no depender de librerías. */
@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'icon', 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 24 24" [attr.width]="size()" [attr.height]="size()" fill="none"
      stroke="currentColor" [attr.stroke-width]="stroke()" stroke-linecap="round" stroke-linejoin="round">
      @switch (name()) {
        @case ('check') { <path d="M5 12.5l4.5 4.5L19 7.5"/> }
        @case ('x') { <path d="M6 6l12 12M18 6L6 18"/> }
        @case ('plus') { <path d="M12 5v14M5 12h14"/> }
        @case ('chevron') { <path d="M9 6l6 6-6 6"/> }
        @case ('back') { <path d="M15 6l-6 6 6 6"/> }
        @case ('down') { <path d="M6 9l6 6 6-6"/> }
        @case ('send') { <path d="M7 17L17 7M9 7h8v8"/> }
        @case ('lock') { <rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 018 0v3"/> }
        @case ('unlock') { <rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 017.6-1.7"/> }
        @case ('calendar') { <rect x="4" y="5" width="16" height="16" rx="2.5"/><path d="M4 10h16M9 3v4M15 3v4"/> }
        @case ('cart') { <path d="M3 4h2.2l2.3 10.5h10.7L20.5 7H6.4"/><circle cx="9" cy="19.5" r="1.4"/><circle cx="17.5" cy="19.5" r="1.4"/> }
        @case ('house') { <path d="M4 11l8-7 8 7v8.5a1.5 1.5 0 01-1.5 1.5H15v-6H9v6H5.5A1.5 1.5 0 014 19.5z"/> }
        @case ('school') { <path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.5v4.5c3 2.2 8 2.2 11 0v-4.5M21.5 9.5v5"/> }
        @case ('target') { <circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.8" fill="currentColor"/> }
        @case ('truck') { <path d="M3 6.5h11v9.5H3zM14 9.5h4l3 3.2V16h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/> }
        @case ('package') { <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/> }
        @case ('shield') { <path d="M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/> }
        @case ('globe') { <circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17"/> }
        @case ('clock') { <circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/> }
        @case ('store') { <path d="M4.5 9.5L6 4.5h12l1.5 5"/><path d="M4.5 9.5h15a2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0 2.5 2.5 0 01-5 0zM5.5 12.5V20h13v-7.5M10 20v-4h4v4"/> }
        @case ('wallet') { <rect x="3" y="6" width="18" height="14" rx="3"/><path d="M3 10.5h18M16 15h1.5"/> }
        @case ('user') { <circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c1.5-4 4.4-5.8 7.5-5.8s6 1.8 7.5 5.8"/> }
        @case ('play') { <path d="M8 5.5l11 6.5-11 6.5z" fill="currentColor" stroke="none"/> }
        @case ('bolt') { <path d="M13 2.5L4.5 14h7L10.5 21.5 19.5 10h-7z"/> }
        @case ('layers') { <path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5M3 17l9 5 9-5"/> }
        @case ('bag') { <path d="M5.5 8h13l-1 12.5h-11z"/><path d="M9 8V6.5a3 3 0 016 0V8"/> }
        @case ('ban') { <circle cx="12" cy="12" r="8.5"/><path d="M6 6l12 12"/> }
        @case ('repeat') { <path d="M17 3l3.5 3.5L17 10"/><path d="M3.5 11.5v-1a4 4 0 014-4h13M7 21l-3.5-3.5L7 14"/><path d="M20.5 12.5v1a4 4 0 01-4 4h-13"/> }
        @case ('bus') { <rect x="5" y="3.5" width="14" height="14" rx="3"/><path d="M5 11h14M8 21v-3.5M16 21v-3.5"/><circle cx="8.5" cy="14.3" r=".6" fill="currentColor"/><circle cx="15.5" cy="14.3" r=".6" fill="currentColor"/> }
        @case ('phone') { <rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/> }
        @case ('wifi') { <path d="M2.5 9a14 14 0 0119 0M5.5 12.5a9.5 9.5 0 0113 0M8.5 16a5 5 0 017 0"/><circle cx="12" cy="19" r=".8" fill="currentColor"/> }
        @case ('bike') { <circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-7h5l3 7M10 9l-1.5-3H6M15 9l1-3h2.5"/> }
        @case ('arrowdown') { <path d="M12 5v14M6 13l6 6 6-6"/> }
        @case ('menu') { <path d="M4 7h16M4 12h16M4 17h16"/> }
        @case ('download') { <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/> }
        @case ('folder') { <path d="M3.5 6.5A1.5 1.5 0 015 5h4.5l2 2.5H19a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0119 19.5H5A1.5 1.5 0 013.5 18z"/> }
        @case ('sparkle') { <path d="M12 3.5l1.8 5.2 5.2 1.8-5.2 1.8L12 17.5l-1.8-5.2L5 10.5l5.2-1.8z"/> }
        @case ('bell') { <path d="M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2.2 2.2 0 004 0"/> }
      }
    </svg>
  `,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input<number | string>(20);
  readonly stroke = input<number>(1.6);
}
