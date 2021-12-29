import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarComponent } from './components/car/car.component';
import { UserComponent } from './components/user/user.component';
import { NavComponent } from './components/nav/nav.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';

import { RentalComponent } from './components/rental/rental.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SafePipePipe } from './pipes/safe-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { FilePathPipePipe } from './pipes/file-path-pipe.pipe';
import { FilterTextPipe } from './pipes/filter-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    UserComponent,
    NavComponent,
    BrandComponent,
    ColorComponent,

    RentalComponent,
     CarInfoComponent,
     CustomerComponent,
     CarImageComponent,
     CarDetailComponent,
     SafePipePipe,
     FilePathPipePipe,
     FilterTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
