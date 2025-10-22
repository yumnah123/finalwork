import 'dotenv/config';
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { withAuth, session } from './auth';
import { insertDefaultData } from './seed-data'
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

export default withAuth(
  config({
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL! || "postgresql://postgres:hello123@localhost:5432/GoldStar",
     async onConnect(context) {
      
        await insertDefaultData(context);
      },
    
    },
    lists,
    session,
    storage: {
      my_local_files: {
        kind: 'local',
        type: 'file',
        generateUrl: path => `${BASE_URL}/files${path}`,
        serverRoute: {
          path: '/files',
        },
        storagePath: 'public/files',
      },
    },
    server: {
      port: 5000,
      cors: {
        origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
        credentials: true,
      },
    },
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
  })
);



