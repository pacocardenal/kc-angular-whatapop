import { Pipe, PipeTransform } from "@angular/core";

import { Product } from "../models/product";

@Pipe({
    name: "OrdenAlfabetico"
})

export class OrderProductsPipe implements PipeTransform {

    transform(productos: Product[], orden: string): Product[] {

        let productosOrdenados: Product[];
        if (orden === "asc") {
            productosOrdenados = productos.sort((productoA: Product, productoB: Product): number => {
                let nombreProductoA: string = `${productoA.name}`.toLowerCase();
                let nombreProductoB: string = `${productoB.name}`.toLowerCase();
                
                return nombreProductoA > nombreProductoB
                    ? 1
                    : nombreProductoA < nombreProductoB
                        ? -1
                        : 0;
            });
        } else if (orden === "desc") {
            productosOrdenados = productos.sort((productoA: Product, productoB: Product): number => {
                let nombreProductoA: string = `${productoA.name}`.toLowerCase();
                let nombreProductoB: string = `${productoB.name}`.toLowerCase();

                return nombreProductoB > nombreProductoA
                    ? 1
                    : nombreProductoB < nombreProductoA
                        ? -1
                        : 0;
            });
        } else {
            return productos;
        }

        return productosOrdenados;
    }

}