import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
// import {
//     cdrHeaderValidator,
//     CdrConfig,
//     EndpointConfig
// }  from '@cds-au/holder-sdk';
import cors from 'cors';

// const endpoints = [
//     {
//         "requestType": "GET",
//         "requestPath": "/banking/products",
//         "minSupportedVersion": 3,
//         "maxSupportedVersion": 3
//     },
//     {
//         "requestType": "GET",
//         "requestPath": "/banking/products/{productId}",
//         "minSupportedVersion": 4,
//         "maxSupportedVersion": 4
//     }
// ] as EndpointConfig[];

// const dsbOptions: CdrConfig = {
//     endpoints: endpoints

// }

class ApiServer extends Server {

    private readonly SERVER_STARTED = 'API server started on port: ';

    constructor() {
        super(true);
        this.app.options('*', cors());
//        this.app.use(cdrHeaderValidator(dsbOptions));
        this.setupControllers();
    }

    private setupControllers(): void {
        const ctrlInstances: string[] = [];

        for (const name in controllers) {
            if (controllers.hasOwnProperty(name)) {
                const controller = (controllers as any)[name];
                ctrlInstances.push(new controller());
            }
        }

        super.addControllers(ctrlInstances);
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.status(404).send();
        });

        this.app.listen(port, () => {
            console.log(this.SERVER_STARTED + port);
        });
    }
}

export default ApiServer;
