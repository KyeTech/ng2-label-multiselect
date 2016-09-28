import { ILabelMultiselectConfig } from '../interfaces/label-multiselect-config.interface';

export class LabelMultiselectConfig implements ILabelMultiselectConfig {
    public allSelected: boolean;

    constructor() {
        this.allSelected = false;
    }
}
