import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export function withAuth(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const supabase = createMiddlewareClient({ req, res });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    return handler(req, res);
  };
} 