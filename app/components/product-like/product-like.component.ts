import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "product-like",
    templateUrl: "./app/components/product-like/product-like.component.html",
    styleUrls: ["./app/components/product-like/product-like.component.css"]
})

export class ProductLikeComponent implements OnInit {

    @Input() productId: number;

    webStorageLikes: string;
    productLikeIds: number[];
    kLikeItemWebStorageName: string = "likeId";
    productLiked: boolean;
    positionInArray: number;

    ngOnInit(): void {

        if (this.webStorageLikes = localStorage.getItem(this.kLikeItemWebStorageName)) {
            this.productLikeIds = this.webStorageLikes.split(',').map(Number);
            this.positionInArray = this.productLikeIds.indexOf(this.productId);
            if (this.positionInArray < 0) {
                this.productLiked 
                = false;
            } else {
                this.productLiked = true;
            }
        }
    }

    likeUnlikeProduct(): void {

        this.webStorageLikes = localStorage.getItem(this.kLikeItemWebStorageName);

        if (this.productLiked) {
            // Unlike
            this.productLiked = false;
            // Update likes array
            this.productLikeIds = this.webStorageLikes.split(',').map(Number);
            this.positionInArray = this.productLikeIds.indexOf(this.productId);
            this.productLikeIds.splice(this.positionInArray, 1);
            // Update likes web storage
            if (this.productLikeIds.length === 0) {
                localStorage.removeItem(this.kLikeItemWebStorageName);
            } else {
                localStorage.setItem(this.kLikeItemWebStorageName, `${this.productLikeIds}`);
            }
        } else {
            // Like
            this.productLiked = true;
            // Update likes web storage
            if (this.webStorageLikes === null) {
                localStorage.setItem(this.kLikeItemWebStorageName, `${this.productId}`);
            } else {
                localStorage.setItem(this.kLikeItemWebStorageName, `${this.webStorageLikes},${this.productId}`);
            }
        }
    }

}