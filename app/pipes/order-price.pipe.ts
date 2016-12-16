import { Pipe, PipeTransform } from "@angular/core";

import { Product } from "../models/product";

@Pipe({
    name: "OrdenPrecio"
})

export class OrderPricePipe implements PipeTransform {

    transform(productos: Product[], orden: string): Product[] {

        let productosOrdenados: Product[];
        if (orden === "asc") {
            productosOrdenados = productos.sort((productoA: Product, productoB: Product): number => {
                let precioProductoA: number = productoA.price
                let precioProductoB: number = productoB.price;
                
                return precioProductoA > precioProductoB
                    ? 1
                    : precioProductoA < precioProductoB
                        ? -1
                        : 0;
            });
        } else if (orden === "desc") {
            productosOrdenados = productos.sort((productoA: Product, productoB: Product): number => {
                let precioProductoA: number = productoA.price;
                let precioProductoB: number = productoB.price;

                return precioProductoB > precioProductoA
                    ? 1
                    : precioProductoB < precioProductoA
                        ? -1
                        : 0;
            });
        } else {
            return productos;
        }

        return productosOrdenados;
    }

}