import { IActionPayloadWithLocale } from './action-payload-with-locale.interface';
import { IDictionary } from './dictionary.interface';

export interface IMutationSetMessages extends IActionPayloadWithLocale {
    data: IDictionary<string>;
}
