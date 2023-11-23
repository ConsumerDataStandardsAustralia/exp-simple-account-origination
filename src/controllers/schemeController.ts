import { Request, Response } from 'express';
import { ClassOptions, Controller, Get } from '@overnightjs/core';
import { schemes } from '../data';

@Controller(':dhId/DSB/banking/origination/schemes/')
@ClassOptions({ mergeParams: true })
export class SchemeController {

    @Get(':schemeId')
    private getProduct(req: Request, res: Response) {
        console.log(`PUBLIC REQUEST: Get origination scheme: ${req.params.schemeId} for data holder: ${req.params.dhId}`);

        if (schemes[req.params.dhId] && schemes[req.params.dhId][req.params.schemeId]) {
            res.status(200)
            res.header('x-DSB-v', '1')
            res.json({
                data: schemes[req.params.dhId][req.params.schemeId],
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
