import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ProductState, selectProducts } from '../../store';
import { Store, select } from '@ngrx/store';
import * as fromActions from '../../store/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Array<any>;
  products$: Observable<Product[]>;
  page = 1;
  totalRecords: number;

  constructor(
    private productService: ProductService,
    public router: Router,
    private store: Store<ProductState>
  ) { }

  ngOnInit() {
    this.store.dispatch(fromActions.loadProducts());
    this.loadProducts();
  }
  onAddClick() {
    if (localStorage.getItem('role') === 'admin') {
      this.router.navigate(['/product/add']);
    } else {alert('You have no rights!'); }
  }
  loadProducts() {
    this.products$ = this.store.pipe(select(selectProducts));
    this.products$.subscribe(
      (data) => {
        this.products = data;
        this.totalRecords = data.length;
      });
  }

  deleteProduct(id: number) {
    const productsObserver = {
      next: () => {
        console.log('Product Deleted');
        this.ngOnInit();
      },
      error: err => console.error(err)
    };
    this.productService.deleteProduct(id).subscribe(productsObserver);
  }
}
