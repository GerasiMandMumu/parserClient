import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
 
// компоненты, которые сопоставляются с маршрутами
// import {HomeComponent} from "./home.component";
// import {AboutComponent} from "./about.component";
// import {NotFoundComponent} from "./not-found.component";
// import { provideHttpClient, withFetch } from "@angular/common/http";
// import { ItemComponent } from "./item.component";
// import { ItemDetailsComponent } from "./item.details.component";
// import { ItemStatComponent } from "./item.stat.component";
// import { aboutGuard } from "./about.guard";
// import { exitAboutGuard } from "./exit.about.guard";
 
// // определение дочерних маршрутов
// const itemRoutes: Routes = [
//   { path: "details", component: ItemDetailsComponent},
//   { path: "stat", component: ItemStatComponent},
// ];

// // определение маршрутов
// const appRoutes: Routes =[
//   { path: "", component: HomeComponent},
//   { path: "about", component: AboutComponent, canDeactivate: [exitAboutGuard]}
// ];
 
// export const appConfig: ApplicationConfig = {
//   providers: [provideHttpClient(withFetch()), provideRouter(appRoutes)]
// };