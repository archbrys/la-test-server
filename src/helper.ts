import { UnprocessableEntityException } from '@nestjs/common/exceptions';

export const getId = (obj: any): string => {
    if (!obj || !obj?.id)
        throw new UnprocessableEntityException({ message: 'Id not found' });
    return obj.id;
};
