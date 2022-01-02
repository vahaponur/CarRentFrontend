import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentComponent } from './components/rent/rent.component';

const routes: Routes = [{path:"",pathMatch:"full",component:CarInfoComponent},
{path:"cars",component:CarInfoComponent},
{path:"brand/:brandId",component:CarInfoComponent},
{path:"color/:colorId",component:CarInfoComponent},
{path:"car/:carId", pathMatch:"full",component:CarDetailComponent},
{path:"rent/:carId", pathMatch:"full",component:RentComponent},
{path:"pay/:carId",pathMatch:"full",component:PaymentComponent},
{path:"add/brand",pathMatch:"full",component:BrandAddComponent},
{path:"add/car",pathMatch:"full",component:CarAddComponent},
{path:"add/color",pathMatch:"full",component:ColorAddComponent},
{path:"update/car/:carId",pathMatch:"full",component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
