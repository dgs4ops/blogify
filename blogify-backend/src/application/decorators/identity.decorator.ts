import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const IDENTITY_HEADER_NAME: string = 'Identity';

export type Identity = { mappedIamId: string; authorId: string };

export const Identity = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().body[
      IDENTITY_HEADER_NAME
    ] as Identity;
  },
);
