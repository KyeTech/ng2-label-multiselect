import { Component, Input, Output, OnInit, EventEmitter, Self, ElementRef, ViewChildren } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

import { ILabelItem, ILabelMultiselectConfig } from '../interfaces';
import { LabelMultiselectConfig } from '../models';

@Component({
    selector: 'label-multiselect[ngModel]',
    template: ` <div class="label-multiselect-outer-container">
                    <div class="label-multiselect-container" (click)="containerClick($event)">
                        <ul class="label-multiselect-selection">
                            <li *ngFor="let opt of selectedOptions; let i = index;" (click)="remove(i)">
                                {{opt.label}}
                            </li>
                            <li class="label-multiselect-search">
                                <input #searchField class="label-multiselect-search-field" type="text">
                            </li>
                        </ul>
                    </div>
                    <div class="label-multiselect-dropdown" [ngClass]="{ 'visible' : showDropdown }">
                        Here I am!
                    </div>
                </div>`,
    styles: [
        `.label-multiselect-outer-container {
            position: relative; }`,

        `.label-multiselect-container {
            border: 1px solid #ccc;
            min-height: 30px;
            cursor: text; }`,

        `.label-multiselect-selection {
            list-style: none;
            box-sizing: border-box;
            margin: 0;
            padding: 0 5px;
            width: 100%; }`,

        `.label-multiselect-search-field {
            background: transparent;
            border: none;
            outline: 0;
            box-shadow: none;
            -webkit-appearance: textfield; }`,

        `.label-multiselect-selection > li {
            display: inline-block; }`,

        `.label-multiselect-dropdown {
            display: none;
            position: absolute;
            min-width: 100%;
            overflow: auto;
            z-index: 1;
            box-sizing: border-box; }`,

        `.label-multiselect-dropdown.visible {
            display: block; }`,
    ]
})
export class LabelMultiselectComponent implements ControlValueAccessor, OnInit {
    @Input() multiselectConfig: ILabelMultiselectConfig;

    @ViewChildren('searchField') searchField;

    public cd: NgModel;

    public showDropdown: boolean;

    get selectedOptions() {
        return this.cd.viewModel.filter(x => x.selected);
    }

    public onChange: any = Function.prototype;

    public onTouched: any = Function.prototype;

    private labelItems: ILabelItem[];

    public config: LabelMultiselectConfig;

    constructor(@Self() cd: NgModel) {
        this.cd = cd;
        cd.valueAccessor = this;

        this.cd.viewModel = [];
        this.config = new LabelMultiselectConfig();

        this.showDropdown = false;
    }

    ngOnInit() {
        console.log(this.cd.viewModel);
    }

    writeValue(value: any) {  }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (_: any) => {}): void {
        this.onTouched = fn;
    }

    public containerClick(event) {
        if (event.srcElement.className === 'label-multiselect-container') {
            this.searchField.first.nativeElement.focus();
        }
        this.showDropdown = !this.showDropdown;
    }

    public remove(index: number) {
        this.cd.viewModel[index].selected = false;

        this.cd.viewToModelUpdate(this.cd.viewModel);
    }
}