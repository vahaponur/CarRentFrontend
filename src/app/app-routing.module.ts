import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarComponent } from './components/car/car.component';

const routes: Routes = [{path:"",pathMatch:"full",component:CarInfoComponent},
{path:"cars",component:CarInfoComponent},
{path:"brand/:brandId",component:CarInfoComponent},
{path:"color/:colorId",component:CarInfoComponent},
{path:"car/:carId", pathMatch:"full",component:CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
