import { Component, EventEmitter, OnInit, OnDestroy, Output } from "@angular/core";
import { Subscription } from "rxjs/Rx";

import { Category } from "../../models/category";
import { CategoryService } from "../../services/category.service";
import { ProductFilter } from "../../models/product-filter";

@Component({
    selector: "product-filter",
    templateUrl: "./app/components/product-filter/product-filter.component.html",
    styleUrls: ["./app/components/product-filter/product-filter.component.css"]
})
export class ProductFilterComponent implements OnInit, OnDestroy {

    @Output() onSearch: EventEmitter<ProductFilter> = new EventEmitter();
    @Output() onOrder: EventEmitter<string> = new EventEmitter<string>();
    @Output() onOrderPrice: EventEmitter<string> = new EventEmitter<string>();
    private _productFilter: ProductFilter = {};
    private _categories: Category[];
    private _categoriesSubscription: Subscription;
    minimumPriceRangeValue: number;
    maximumPriceRangeValue: number;
    sentidoOrdenacion: string = "";
    precioOrdenacion: string = "";

    constructor(private _categoryService: CategoryService) { }

    ngOnInit(): void {
        this._categoriesSubscription = this._categoryService
            .getCategories()
            .subscribe((data: Category[]) => this._categories = data);
    }

    ngOnDestroy(): void {
        this._categoriesSubscription.unsubscribe();
    }

    notifyHost(): void {
        this.onSearch.emit(this._productFilter);
    }

    minimumPriceRangeValueChanged(value: number): void {
        this.minimumPriceRangeValue = value;
    }

    maximumPriceRangeValueChanged(value: number): void {
        this.maximumPriceRangeValue = value;
    }

    cambiarOrden(): void {

        if (this.sentidoOrdenacion === "") {
            this.sentidoOrdenacion = "asc";
        } else if (this.sentidoOrdenacion === "asc") {
            this.sentidoOrdenacion = "desc";
        } else if (this.sentidoOrdenacion === "desc") {
            this.sentidoOrdenacion = "asc";
        }

        this.onOrder.emit(this.sentidoOrdenacion);

    }

    cambiarOrdenPrecio(): void {

        if (this.precioOrdenacion === "") {
            this.precioOrdenacion = "asc";
        } else if (this.precioOrdenacion === "asc") {
            this.precioOrdenacion = "desc";
        } else if (this.precioOrdenacion === "desc") {
            this.precioOrdenacion = "asc";
        }

        this.onOrderPrice.emit(this.precioOrdenacion);

    }

}
