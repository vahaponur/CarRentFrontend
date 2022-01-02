import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand/brand.service';
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {
  brandForm : FormGroup;
  constructor(private brandService:BrandService
    ,private formBuilder:FormBuilder,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandForm();
  }
  createBrandForm(){
    this.brandForm = this.formBuilder.group({
      name:['',Validators.required]
    });
  }

 add(){
   if (this.brandForm.valid) {
    let productModel = Object.assign({}, this.brandForm.value);
    this.brandService.addBrand(productModel).subscribe(response=>{
      if (response.success) {
        this.toastrService.success('Başarıyla Eklendi');
      }
    },responseError=>{
   
      if (responseError.error.Errors.length>0) {
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          let item = responseError.error.Errors[i].ErrorMessage;
          this.toastrService.error(item);
          
        }
      }
    })
   }
   else 
   console.log("dfsdfsd");
 }
}
