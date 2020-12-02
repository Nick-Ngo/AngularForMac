import { OrderComponent } from "./order/order.component";
import { CategoryComponent } from "./category/category.component";
import { ProductComponent } from "./product/product.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "product",
        component: ProductComponent,
        data: {
            functionCode: "CONTENT_PRODUCT",
        },
        // canActivate: [AuthGuard],
    },
    {
        path: "category",
        component: CategoryComponent,
        data: {
            functionCode: "CONTENT_CATEGORY",
        },
        // canActivate: [AuthGuard],
    },
    {
        path: "order",
        component: OrderComponent,
        data: {
            functionCode: "CONTENT_ORDER",
        },
        // canActivate: [AuthGuard],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContentRouting { }
