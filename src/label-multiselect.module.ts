import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LabelMultiselectComponent } from './components';

@NgModule({
    imports: [ CommonModule, FormsModule ],
    declarations: [ LabelMultiselectComponent ],
    exports: [ LabelMultiselectComponent ]
})
export class LabelMultiselectModule { }