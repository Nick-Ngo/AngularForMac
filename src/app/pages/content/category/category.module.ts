import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';



@NgModule({
  declarations: [CategoryComponent, CategoryDetailComponent],
  imports: [
    CommonModule
  ]
})
export class CategoryModule { }
