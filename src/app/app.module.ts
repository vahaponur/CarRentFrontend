import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatCommonModule} from '@angular/material/core';
import{MatIconModule} from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input';
import { CarComponent } from './components/car/car.component';
import { UserComponent } from './components/user/user.component';
import { NavComponent } from './components/nav/nav.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { RentalComponent } from './components/rental/rental.component';
import { CarInfoComponent } from './components/car-info/car-info.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { SafePipePipe } from './pipes/safe-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { FilePathPipePipe } from './pipes/file-path-pipe.pipe';
import { FilterTextPipe } from './pipes/filter-text.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RentComponent } from './components/rent/rent.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';

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
     FilterTextPipe,
     CartSummaryComponent,
     RentComponent,
     PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatCommonModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
   
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
