import { ILabelMultiselectConfig } from '../interfaces/label-multiselect-config.interface';

export class LabelMultiselectConfig implements ILabelMultiselectConfig {
    public minHeight: number;
    public disabledEmptyPlaceholder: string;
    public noOptionsPlaceholder: string;
    public inputClasses: any[];
    public disabledEmptyClasses: string[];
    public dropdownItemClasses: string[];
    public noOptionsClasses: string[];
    public labelClasses: string[];

    constructor() {
        this.disabledEmptyPlaceholder = '';
        this.noOptionsPlaceholder = 'No options available.';
        this.inputClasses = [];
        this.disabledEmptyClasses = [];
        this.dropdownItemClasses = [];
        this.noOptionsClasses = [];
        this.minHeight = 34;
        this.labelClasses = [];
    }
}
