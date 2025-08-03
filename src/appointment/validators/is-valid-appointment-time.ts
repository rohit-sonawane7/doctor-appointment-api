import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsEndTimeAfterStartTime(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isEndTimeAfterStartTime',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: ['startTime'],
            validator: {
                validate(endTime: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const startTime = (args.object as any)[relatedPropertyName];
                    return (
                        typeof endTime === 'string' &&
                        typeof startTime === 'string' &&
                        new Date(endTime) > new Date(startTime)
                    );
                },
                defaultMessage(args: ValidationArguments) {
                    return `endTime must be after startTime`;
                },
            },
        });
    };
}
