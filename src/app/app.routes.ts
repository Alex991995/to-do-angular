import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LayoutComponent } from '@common-ui/layout/layout.component';
import { CreateTodoComponent } from '@pages/create-to-do/create-to-do.component';


export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: "create",
        component: CreateTodoComponent
      }
    ]
  }

];
