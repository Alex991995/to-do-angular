import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LayoutComponent } from '@common-ui/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      }
    ]
  }

];
