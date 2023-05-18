import { Products } from './../model/product.model';
import { ProductServiceService } from './../service/product-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../service/product-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { CreateProductComponent } from '../create-product/create-product.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  popoverTitle = 'Please Confirm!!';
  popoverMessage = 'Are You sure?';
  confirmClicked = false;
  cancelClicked = false;
  updateForm: FormGroup = new FormGroup({});

  productToUpdate = {
    id:'',
    name: '',
    description: '',
    price: '',
  };


  constructor(private dialog: MatDialog,private productService:ProductServiceService ,private router: Router,
    private fb: FormBuilder,
    private toastr:ToastrService) {

      this.updateForm = fb.group({
        name: ['',[Validators.required]],
        description: ['',[Validators.required]],
        price: ['',[Validators.required]],
      
      });
     }


  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;
  products!: Products[];
  finalProductdata:any;


  ngOnInit(): void {
    this.LoadProduct();
  }

  displayColums: string[] = ["id","name", "description", "price","action"]

 

  LoadProduct() {
    this.productService.findAllProducts().subscribe(response => {
      this.products = response;
      this.finalProductdata=new MatTableDataSource<Products>(this.products);
      this.finalProductdata.paginator=this.paginator;
      this.finalProductdata.sort=this.sort;
    });
  }

  edit(products: any) {
    this.productToUpdate = products;
  }

  updateProduct() {
    this.productService.updateProduct(this.productToUpdate.id,this.productToUpdate).subscribe({
      next: (res) => {
        console.log(res);
        this.updateForm.reset({});
        this.toastr.success("Updated Succesfully");
        this.LoadProduct();
      },
      error: (e: any) => this.toastr.error("This record is already present")

    });
  }

  
  deleteProduct(id: any) {
      this.productService.deletedProduct(id).subscribe((res) => {
        console.log(res);
        this.LoadProduct();
      });
    }

    get f(){return this.updateForm.controls;}
}





