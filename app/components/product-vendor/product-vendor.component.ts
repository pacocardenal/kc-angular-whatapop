import { Component, OnInit, Input } from '@angular/core';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/switchMap";
import { ActivatedRoute, Router } from "@angular/router";

import { ProductFilter } from "../../models/product-filter";
import { ProductService } from "../../services/product.service";
import { Product } from "../../models/product";

@Component({
    templateUrl: "./app/components/product-vendor/product-vendor.component.html",
    styleUrls: ["./app/components/product-vendor/product-vendor.component.css"]
})

export class ProductVendorComponent implements OnInit {

    sellerId: number;
    private _filtroProductosVendedor: ProductFilter = {};
    private _products: Product[];
    private _filterStream$: Subject<ProductFilter> = new Subject;

    constructor(private _route: ActivatedRoute, private _productService: ProductService, private _router: Router) { }

    ngOnInit() {

        this._route.params.forEach((param: { vendorId: string }) => {
            this._filtroProductosVendedor.sellerId = parseInt(param.vendorId);
        this._filterStream$
            .switchMap((filter: ProductFilter) => this._productService.getProducts(this._filtroProductosVendedor))
            .subscribe((products: Product[]) => this._products = products);
        this.filterCollection(null);
        });

    }

    filterCollection(filter: ProductFilter): void {
        this._filterStream$.next(filter);
    }

    navegarProductoSeleccionado(producto: Product): void {
        this._router.navigate([`/products/${producto.id}`]);
    }

}