import { Injectable } from '@nestjs/common';

@Injectable()
export class PolicyService {
  async canAccess(params: {
    user: any;
    resource: string;
    action: string;
  }): Promise<boolean> {
    const { user, resource, action } = params;


    if (!user) return false;

    if (user.role === 'admin') return true;

    const permissions = {
      seller: {
        product: ['create', 'update', 'delete'],
        order: ['read'],
      },
      buyer: {
        product: ['read'],
        order: ['create', 'read'],
      },
    };

    const rolePermissions = permissions[user.role] || {};
    const allowedActions = rolePermissions[resource] || [];

    return allowedActions.includes(action);
  }
}

