import { ILabelMultiselectConfig } from '../interfaces/label-multiselect-config.interface';

export class LabelMultiselectConfig implements ILabelMultiselectConfig {
    public disabledEmptyPlaceholder: string;
    public noOptionsPlaceholder: string;

    constructor() {
        this.disabledEmptyPlaceholder = '';
        this.noOptionsPlaceholder = 'No options available.';
    }
}
