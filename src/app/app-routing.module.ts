import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedsComponent } from './feeds/feeds.component';  // Import your components

const routes: Routes = [
  { path: 'feeds', component: FeedsComponent },  // Route for the feeds component
  { path: '', redirectTo: '/feeds', pathMatch: 'full' },  // Default route
  { path: '**', redirectTo: '/feeds' }  // Wildcard route for handling invalid URLs
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
