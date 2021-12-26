import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [{path:"",pathMatch:"full",component:CarInfoComponent},
{path:"cars",component:CarInfoComponent},
{path:"cars/brand/:brandId",component:CarInfoComponent},
{path:"cars/color/:colorId",component:CarInfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
