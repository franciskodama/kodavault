import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { NextApiRequest, NextApiResponse } from 'next';

const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],
  //   pages: {
  //     signIn: '/signin',
  //   },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};

export const GET = handler;
export const POST = handler;
