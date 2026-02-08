import 'server-only';
import * as argon2 from 'argon2';
import { env } from './env';

export async function hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: env.ARGON2_MEMORY,
        timeCost: env.ARGON2_TIME,
        parallelism: env.ARGON2_PARALLELISM,
    });
}

export async function verifyPassword(
    hash: string,
    password: string
): Promise<boolean> {
    return argon2.verify(hash, password);
}
