import { applyDecorators, SetMetadata } from '@nestjs/common';

export const Policy = (resource: 'product' | 'order', action: 'read' | 'update' | 'delete' | 'create') => {
  return applyDecorators(
    SetMetadata('resource', resource),
    SetMetadata('action', action),
  );
};
