import { sign, Secret, SignOptions } from 'jsonwebtoken';

export const signToken = (payload: string | object | Buffer): string => {
  return sign(payload, process.env.JWT_SECRET as Secret, {
    expiresIn: (process.env.JWT_EXPIRES_IN as string) || "7d",
  } as SignOptions);
};