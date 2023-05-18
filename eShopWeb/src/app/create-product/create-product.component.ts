import { ApiResponse } from './../model/api.response';
import { ProductServiceService } from './../service/product-service.service';
import { Products } from './../model/product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  numberRegEx = /\-?\d*\.?\d{1,2}/;

  creationGroup= new FormGroup ({
    name : new FormControl('',Validators.minLength(4)),
    description : new FormControl('',Validators.minLength(8)),
    price : new FormControl('',Validators.pattern(this.numberRegEx))
  })
  get name(){
    return this.creationGroup.get('name')
  }
  get description(){
    return this.creationGroup.get('description')
  }
  get price(){
    return this.creationGroup.get('price')
  }
  products: Products = new Products();
  submitted = false;

  constructor(private productService:ProductServiceService,private toastr:ToastrService,
    private router: Router) { }

  ngOnInit() {
  }


  // onSubmit() {
  //   this.submitted = true;
  //   this. productService.createProduct(this.products)
  //   .subscribe(data => console.log(data), error => console.log(error));
  //   this.products = new Products();
  //   this.router.navigate(['/addProduct']);
  // }

  onSubmit(): void {
    const data = {
      name: this.products.name,
      description: this.products.description,
      price: this.products.price,
    };
    this.productService.createProduct(data)
    .subscribe({
      next: (res: any) => {
       this.toastr.success("Succesfully Submitted")
       this.creationGroup.reset({});
      },
      
      error: (e: any) => this.toastr.error("error")
      
    });
  }


  // products: Products = {
  //   name: '',
  //   description: '',
  //   price:'',
  // };

    
  // form: FormGroup = new FormGroup({});

  // constructor(private productService:ProductServiceService,private fb: FormBuilder,private toastr:ToastrService ){
  //   const reg = /\-?\d*\.?\d{1,2}/;
  //     this.form = fb.group({
  //     name:['',[Validators.required]],
  //     price: ['', [Validators.required, Validators.pattern(reg)]],
  //     description:['',[Validators.required]]
  //   })
  // }

  // ngOnInit(): void {}
  // saveProjects(): void {
  //   const data = {
  //     name: this.products.name,
  //     description: this.products.description,
  //     price:this.products.price,
    
  //   };
  //   this.productService.createProduct(data)
  //   .subscribe({
  //     next: (res: any) => {
  //       this.toastr.success("Succesfully Submitted")
  //       console.log(this.form.value);
  //       this.form.reset({});
  //     },
  //     error: (e: any) => this.toastr.error("This record is already present")
  //   });
  // }

  // get f(){return this.form.controls;}

  // refresh(){
  //   window.location.reload();
  // }

}
