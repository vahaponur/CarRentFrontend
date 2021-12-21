import { Component, OnInit } from '@angular/core';
import { CarInfo } from 'src/app/models/carInfo/carInfo';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css'],
})
export class CarInfoComponent implements OnInit {
  carInfos: CarInfo[] = [];

  constructor(
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}
  ngOnInit(): void {
    this.setCarInfo();
  }
  setCarInfo() {
    this.carService.getCars().subscribe((r) => {
      for (let i = 0; i < r.data.length; i++) {
        let object: CarInfo;

        object = {
          brand: 'dfds',
          color: 'dfsd',
          dailyPrice: r.data[i].dailyPrice,
          id: r.data[i].id,
          modelYear: r.data[i].modelYear,
          description: r.data[i].description,
          name: r.data[i].name,
        };

        this.brandService.getBrandById(r.data[i].brandId).subscribe((res) => {
          object.brand = res.data.name;
          
          this.colorService.getColorById(r.data[i].colorId).subscribe((re) => {
            object.color = re.data.name;
            this.carInfos.push(object);
          });
        });
      }
    });
  }
}
