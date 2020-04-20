import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'coronavirus', loadChildren: './coronavirus/coronavirus.module#CoronavirusPageModule' },
  { path: 'government', loadChildren: './government/government.module#GovernmentPageModule' },
  { path: 'economy', loadChildren: './economy/economy.module#EconomyPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
