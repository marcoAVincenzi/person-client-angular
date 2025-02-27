import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Importa o AppModule

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
