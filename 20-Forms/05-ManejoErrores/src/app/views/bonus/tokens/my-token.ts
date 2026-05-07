import { InjectionToken } from "@angular/core";
import { FirstService } from "../../../services/first.service";

export const MY_TOKEN = new InjectionToken<FirstService>('My_TOKENN');

export const CHILDREN_COMPONENT = new InjectionToken<ChildrenInterface>('Children_Component_Token');

export const MY_VALIDATOR = new InjectionToken<MyValidatorInterface[]>('MY_VALIDATOR_TOKEN');

export const CAR_BRAND = new InjectionToken('CAR_BRAND',{
    providedIn: 'root', // injectar un token en el root de la app
    factory: () => ([
        'Toyota', 'Mazda', 'Subaru', 'Hyunday', 'Lexus'
    ])
});

export interface ChildrenInterface {
    childrenName: string
}

export interface MyValidatorInterface {
    validate: () => void;
}