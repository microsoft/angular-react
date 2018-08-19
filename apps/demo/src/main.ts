import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));

const map = new Map<string, number>();

window['counter'] = {
  list() {
    map.forEach((count, key) => {
      console.log(`[${key}]: ${count}`);
    });
  },

  get(c) {
    return map.get(c);
  },

  increase(c) {
    if (!map.has(c)) {
      map.set(c, 0);
    }

    const prev = map.get(c);
    map.set(c, prev + 1);
    console.log(`counter: [${c}]`, 'previous:', prev, 'next:', prev + 1);
  },
};
