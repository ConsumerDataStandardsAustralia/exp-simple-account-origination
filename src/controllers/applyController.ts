import { Request, Response } from 'express';
import { ClassOptions, Controller, Post } from '@overnightjs/core';

@Controller(':dhId/DSB/banking/accounts')
@ClassOptions({ mergeParams: true })
export class ApplyController {

    @Post()
    private apply(req: Request, res: Response) {
        console.log(`ADR REQUEST: Application for data holder: ${req.params.dhId}`);

        res.status(200).json({active: true});
    }
}
