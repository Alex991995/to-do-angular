import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('app/layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@pages/list-to-do/list-to-do.component').then(
            (m) => m.ListToDOComponent
          ),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('@pages/create-to-do/create-to-do.component').then(
            (m) => m.CreateTodoComponent
          ),
      },
    ],
  },
];
