import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {
  colorForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBrandForm();
  }
  createBrandForm() {
    this.colorForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.colorForm.valid) {
      let colorModel = Object.assign({}, this.colorForm.value);
      this.colorService.addColor(colorModel).subscribe(
        (response) => {
          if (response.success) {
            this.toastrService.success('Başarıyla Eklendi');
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              let item = responseError.error.Errors[i].ErrorMessage;
              this.toastrService.error(item);
            }
          }
        }
      );
    }
  }
}
