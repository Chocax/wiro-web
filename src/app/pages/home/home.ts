import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { LangService } from '../../i18n/lang.service';
import { SITE } from '../../config';
import { Phone } from '../../ui/phone';
import { Icon } from '../../ui/icon';
import { Reveal } from '../../ui/reveal';

@Component({
  selector: 'app-home',
  imports: [Phone, Icon, Reveal, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
})
export class Home {
  protected readonly l = inject(LangService);
  private readonly sanitizer = inject(DomSanitizer);
  protected readonly site = SITE;
  protected readonly tones = ['blue', 'purple', 'pink', 'orange', 'blue', 'purple'];

  protected readonly videoUrl = computed(() =>
    SITE.videoEmbedUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(SITE.videoEmbedUrl) : null,
  );

  protected toVideo() {
    document.getElementById('video')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
