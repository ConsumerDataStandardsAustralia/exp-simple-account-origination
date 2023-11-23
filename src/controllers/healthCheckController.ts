import { Request, Response } from 'express';
import { Controller, Get } from '@overnightjs/core';

@Controller('/')
export class HealthCheckController {

    @Get()
    private getHealthCheck(req: Request, res: Response) {
        console.log(`PUBLIC REQUEST: Health check`);

        res.status(200).json({active: true});
    }
}
