import ApiServer from './apiServer';

const apiServer = new ApiServer();
apiServer.start(parseInt(process.env.PORT as string, 10) || 3000);
