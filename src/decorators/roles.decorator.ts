import { ROLE } from '@/common/constants/enum';
import { Reflector } from '@nestjs/core';

// Custom decorator to define required roles for route handlers.
// Usage: @Roles('admin', 'editor') — stores metadata that can be retrieved by Guards via Reflector.
export const Roles = Reflector.createDecorator<ROLE[]>();
