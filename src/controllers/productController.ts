import { Request, Response } from 'express';
import { ClassOptions, Controller, Get } from '@overnightjs/core';
import { products } from '../data';

@Controller(':dhId/cds-au/v1/banking/products')
@ClassOptions({ mergeParams: true })
export class ProductController {

    @Get()
    private getProducts(req: Request, res: Response) {
        console.log(`PUBLIC REQUEST: Get products for data holder: ${req.params.dhId}`);

        if (products[req.params.dhId]) {
            const productSummaries: any = [];
            for (const product of Object.values(products[req.params.dhId])) {
                const productSummary = JSON.parse(JSON.stringify(product));
                delete productSummary.bundles;
                delete productSummary.features;
                delete productSummary.constraints;
                delete productSummary.eligibility;
                delete productSummary.fees;
                delete productSummary.depositRates;
                delete productSummary.lendingRates;
                productSummaries.push(productSummary);
            }

            res.status(200)
            res.header('x-v', '3')
            res.json({
                data: {
                    products: productSummaries
                },
                links: {
                    self: req.originalUrl
                },
                meta: {}
            });
            return;
        }

        res.status(404).json({
            "errors": [
                {
                    "code": "urn:au-cds:error:cds-all:Resource/NotFound",
                    "title": "Resource Not Found",
                    "detail": "Resource Not Found"
                }
            ]
        });
    }

    @Get(':productId')
    private getProduct(req: Request, res: Response) {
        console.log(`PUBLIC REQUEST: Get product: ${req.params.productId} for data holder: ${req.params.dhId}`);

        if (products[req.params.dhId] && products[req.params.dhId][req.params.productId]) {
            res.status(200)
            res.header('x-v', '4')
            res.json({
                data: products[req.params.dhId][req.params.productId],
                links: {
                    self: req.originalUrl
                },
                meta: {}
            });
            return;
        }

        res.status(404).json({
            "errors": [
                {
                    "code": "urn:au-cds:error:cds-all:Resource/NotFound",
                    "title": "Resource Not Found",
                    "detail": "Resource Not Found"
                }
            ]
        });
    }
}
