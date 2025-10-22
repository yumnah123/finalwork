import 'dotenv/config';

import { createAuth } from '@keystone-6/auth';
import { statelessSessions } from '@keystone-6/core/session';
const sessionSecret = process.env.SESSION_SECRET || 'super-secret-string-1234567890-abcdefghijklmnopqrstuvwxyz';
const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

export const { withAuth } = createAuth({
  listKey: 'Admin',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: sessionSecret,
});
