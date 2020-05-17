import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SketchInfoResolver } from './core/resolver/sketch-info.resolver';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'my-sketch-list',
    loadChildren: () =>
      import('./my-sketch-list/my-sketch-list.module').then(
        (m) => m.MySketchListPageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'create-sketch',
    loadChildren: () =>
      import('./create-sketch-page/create-sketch-page.module').then(
        (m) => m.CreateSketchPagePageModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-sketch/:id',
    loadChildren: () =>
      import('./edit-sketch/edit-sketch.module').then(
        (m) => m.EditSketchPageModule
      ),
    canActivate: [AuthGuard],
    resolve: {
      sketch: SketchInfoResolver,
    },
  },
  {
    path: 'sketches/:id',
    loadChildren: () =>
      import('./view-sketch/view-sketch.module').then(
        (m) => m.ViewSketchPageModule
      ),
    canActivate: [AuthGuard],
    resolve: {
      sketch: SketchInfoResolver,
    },
  },
  {
    path: 'view-profile',
    loadChildren: () =>
      import('./view-profile/view-profile.module').then(
        (m) => m.ViewProfilePageModule
      ),
  },
  {
    path: 'sketches',
    loadChildren: () =>
      import('./sketch-lists/sketch-lists.module').then(
        (m) => m.SketchListsPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
