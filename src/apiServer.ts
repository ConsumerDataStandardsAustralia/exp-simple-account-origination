import * as controllers from './controllers';
import { Server } from '@overnightjs/core';
import cors from 'cors';

class ApiServer extends Server {

    private readonly SERVER_STARTED = 'API server started on port: ';

    constructor() {
        super(true);
        this.app.options('*', cors());
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
