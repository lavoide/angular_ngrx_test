import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from './products/components/product-list/product-list.component';


const routes: Routes = [
  { path: "", component: ProductListComponent },
  {
    path: "product",
    loadChildren: "../app/products/products.module#ProductsModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
