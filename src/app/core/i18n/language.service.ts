import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { EN } from '../../content/en';
import { ES } from '../../content/es';
import { Content, Lang } from './content.model';

const STORAGE_KEY = 'lang';
const CONTENT: Record<Lang, Content> = { en: EN, es: ES };
const LOCALES: Record<Lang, string> = { en: 'en-GB', es: 'es-ES' };

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly doc = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly lang = signal<Lang>(this.detect());
  readonly content = computed(() => CONTENT[this.lang()]);
  /** BCP 47 locale for Intl formatting */
  readonly locale = computed(() => LOCALES[this.lang()]);
  readonly available: readonly Lang[] = ['en', 'es'];

  constructor() {
    effect(() => {
      const lang = this.lang();
      const { meta } = this.content();
      this.doc.documentElement.lang = lang;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({ property: 'og:title', content: meta.title });
      this.meta.updateTag({ property: 'og:description', content: meta.description });
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // Storage can be blocked (private mode); the preference just won't persist.
      }
    });
  }

  set(lang: Lang) {
    this.lang.set(lang);
  }

  private detect(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch {
      // ignore
    }
    return navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en';
  }
}
