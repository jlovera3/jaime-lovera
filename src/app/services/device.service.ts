import { Injectable, signal } from '@angular/core';
import { Device } from '@capacitor/device';

@Injectable({ providedIn: 'root' })
export class DeviceService {
  /** iOS devices get the taller banner that covers the notch. */
  readonly hasNotch = signal(false);

  constructor() {
    Device.getInfo().then((info) => this.hasNotch.set(info.platform === 'ios'));
  }
}
