import { Component, Input, Output, OnInit, EventEmitter, Self, ElementRef, ViewChildren } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

import { ILabelItem, IDropdownItem, ILabelMultiselectConfig } from '../interfaces';
import { LabelMultiselectConfig } from '../models';

@Component({
    selector: 'label-multiselect[ngModel]',
    template: ` <div class="label-multiselect-outer-container">
                    <div class="label-multiselect-container" (click)="containerClick($event)" [ngClass]="{ 'label-multiselect-disabled' : disabled }">
                        <ul class="label-multiselect-selection">
                            <li *ngFor="let opt of selectedItems" class="label-multiselect-label">
                                <span class="label-multiselect-label-cross" (click)="remove(opt)">×</span>
                                {{opt.label}}
                            </li>
                            <li class="label-multiselect-search">
                                <span #searchField contenteditable="true" class="label-multiselect-search-field" type="text" (keyup)="searchFieldChange()"></span>
                            </li>
                        </ul>
                    </div>
                    <ul class="label-multiselect-dropdown" [ngClass]="{ 'visible' : showDropdown }">
                        <li *ngFor="let opt of filteredMultiselectItems" (click)="add(opt)" class="label-multiselect-dropdown-option">
                            {{opt.label}}
                        </li>
                        <li *ngIf="multiselectItems.length === 0" class="label-multiselect-no-options">No options available.</li>
                    </ul>
                </div>`,
    styles: [
        `.label-multiselect-outer-container {
            position: relative;
            font-family: sans-serif; }`,

        `.label-multiselect-container {
            border: 1px solid #ccc;
            min-height: 28px;
            cursor: text; }`,

        `.label-multiselect-selection {
            list-style: none;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            width: 100%; }`,

        `.label-multiselect-label {
            padding: 1px;
            padding-right: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-top: 4px;
            font-size: 10pt;
            margin-bottom: 2px;
            margin-left: 5px;
            cursor: pointer; }`,

        `.label-multiselect-label-cross {
            padding-left: 2px;
            padding-top: 1px;
            padding-right: 1px;
            padding-bottom: 1px; }`,

        `.label-multiselect-search-field {
            background: transparent;
            border: none;
            outline: 0;
            box-shadow: none;
            min-width: 8px;
            -webkit-appearance: textfield; }`,

        `.label-multiselect-selection > li {
            display: inline-block; }`,

        `.label-multiselect-dropdown {
            display: none;
            position: absolute;
            min-width: 100%;
            overflow: auto;
            z-index: 1;
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            list-style: none;
            border-left: 1px solid #ccc;
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            background-color: #fff; }`,

        `.label-multiselect-dropdown.visible {
            display: block; }`,

        `.label-multiselect-dropdown-option {
            padding-left: 5px;
            padding-top: 5px;
            font-size: 10pt;
            padding-bottom: 5px;
            cursor: pointer; }`,

        `.label-multiselect-no-options {
            padding-left: 5px;
            padding-top: 2px;
            padding-bottom: 2px; }`,

        `.label-multiselect-dropdown-option:hover {
            background-color: #5bc0de; }`,

        `.label-multiselect-disabled {
            background-color: #eee; }`
    ]
})
export class LabelMultiselectComponent implements ControlValueAccessor, OnInit {

    public cd: NgModel;

    public showDropdown: boolean;

    public selectedItems: ILabelItem[];

    public filterText: string;

    @Input() multiselectConfig: ILabelMultiselectConfig;

    @Input() disabled: boolean;

    @Input() multiselectItems: IDropdownItem[];

    @ViewChildren('searchField') searchField;

    get filteredMultiselectItems() {
        if (this.filterText.length === 0) {
            return this.multiselectItems;
        }

        let filtered = this.multiselectItems.filter(item => item.label.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1);
        return filtered;
    }

    public onChange: any = Function.prototype;

    public onTouched: any = Function.prototype;

    private labelItems: ILabelItem[];

    private toggleClasses: string[];

    public config: LabelMultiselectConfig;

    constructor(@Self() cd: NgModel) {
        this.cd = cd;
        cd.valueAccessor = this;

        this.cd.viewModel = [];
        this.config = new LabelMultiselectConfig();

        this.showDropdown = false;

        this.selectedItems = [];

        this.filterText = '';

        this.toggleClasses = ['label-multiselect-container', 'label-multiselect-selection'];
    }

    ngOnInit() {
        this.selectedItems = this.cd.viewModel;
    }

    writeValue(value: any) {  }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (_: any) => {}): void {
        this.onTouched = fn;
    }

    public containerClick(event) {
        if (this.toggleClasses.indexOf(event.srcElement.className) !== -1 && !this.disabled) {
            this.searchField.first.nativeElement.focus();
            this.showDropdown = !this.showDropdown;
        }
    }

    public remove(item: ILabelItem) {
        if (this.disabled) return;

        let filtered = this._filterSelectedById(item.id, true);

        this.selectedItems = filtered;
        this.cd.viewToModelUpdate(this.selectedItems);
    }

    public add(item: IDropdownItem) {
        if (this._filterSelectedById(item.id).length > 0 || this.disabled) return;

        this.selectedItems.push({
            id: item.id,
            label: item.label
        });

        this.cd.viewToModelUpdate(this.selectedItems);
    }

    public searchFieldChange() {
        if (this.disabled) return;

        this.filterText = this.searchField.first.nativeElement.textContent;
    }

    private _filterSelectedById(id: any, not = false) {
        return (not) ? this.selectedItems.filter(item => item.id !== id) :
                       this.selectedItems.filter(item => item.id === id);
    }
}