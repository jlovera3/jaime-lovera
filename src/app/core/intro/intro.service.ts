import { DOCUMENT } from '@angular/common';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { MotionService } from '../motion/motion.service';
import { cvLang } from '../print/cv-mode';

const SEEN_KEY = 'intro-seen';

/**
 * playing   → splash screen is covering the page
 * revealing → curtain is opening; page content starts animating in
 * done      → splash removed
 */
export type IntroStage = 'playing' | 'revealing' | 'done';

@Injectable({ providedIn: 'root' })
export class IntroService {
  private readonly doc = inject(DOCUMENT);

  readonly stage = signal<IntroStage>(this.shouldPlay() ? 'playing' : 'done');
  /** Page content should run its entrance animations */
  readonly ready = computed(() => this.stage() !== 'playing');

  constructor() {
    effect(() => {
      this.doc.documentElement.classList.toggle('is-locked', this.stage() === 'playing');
    });
  }

  reveal() {
    if (this.stage() === 'playing') this.stage.set('revealing');
  }

  finish() {
    this.stage.set('done');
    try {
      sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // ignore
    }
  }

  /** Plays once per session; `?intro` in the URL forces it (handy while iterating on the animation). */
  private shouldPlay(): boolean {
    if (cvLang() || inject(MotionService).reduced()) return false;
    if (location.search.includes('intro')) return true;
    try {
      return !sessionStorage.getItem(SEEN_KEY);
    } catch {
      return true;
    }
  }
}
