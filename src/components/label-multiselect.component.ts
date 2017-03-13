import { Component, Input, Output, OnInit, EventEmitter, Self, ElementRef, ViewChildren, HostListener } from '@angular/core';
import { NgModel, ControlValueAccessor } from '@angular/forms';

import { ILabelItem, IDropdownItem, ILabelMultiselectConfig } from '../interfaces';
import { LabelMultiselectConfig } from '../models';

@Component({
    selector: 'label-multiselect[ngModel]',
    template: ` <div class="label-multiselect-outer-container" [ngClass]="{ 'label-multiselect-disabled' : disabled }">
                    <div class="label-multiselect-container" [style.min-height]="config.minHeight + 'px'" (click)="containerClick($event)" [ngClass]="config.inputClasses">
                        <ul class="label-multiselect-selection">
                            <li *ngIf="disabled && selectedItems.length === 0" class="label-multiselect-disabled-placeholder" [ngClass]="config.disabledEmptyClasses">
                                {{config.disabledEmptyPlaceholder}}
                            </li>
                            <li *ngFor="let label of selectedItems" class="label-multiselect-label {{label.class}}" [ngClass]="config.labelClasses">
                                <span class="label-multiselect-label-cross" (click)="remove(label)">×</span>
                                {{label.label}}
                            </li>
                            <li class="label-multiselect-search">
                                <span #searchField contenteditable="true"
                                    class="label-multiselect-search-field"
                                    type="text"
                                    *ngIf="!disabled"
                                    (keyup)="searchFieldChange($event)"
                                    (keydown)="searchFieldKeydown($event)"
                                    (blur)="onTouched()">
                                </span>
                            </li>
                        </ul>
                    </div>
                    <ul class="label-multiselect-dropdown" [ngClass]="{ 'visible' : showDropdown && !disabled && !config.autoTag }">
                        <li *ngFor="let item of filteredMultiselectItems" (click)="add(item)" class="label-multiselect-dropdown-option" [ngClass]="config.dropdownItemClasses">
                            {{item.label}}
                        </li>
                        <li *ngIf="multiselectItems.length === 0" class="label-multiselect-no-options" [ngClass]="config.noOptionsClasses">{{config.noOptionsPlaceholder}}</li>
                    </ul>
                </div>`,
    styles: [
        `.label-multiselect-outer-container {
            position: relative; }`,

        `.label-multiselect-container {
            border: 1px solid #ccc;
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
            padding-bottom: 5px;
            cursor: pointer; }`,

        `.label-multiselect-no-options {
            padding-left: 5px;
            padding-top: 2px;
            padding-bottom: 2px; }`,

        `.label-multiselect-dropdown-option:hover {
            background-color: #5bc0de; }`,

        `.label-multiselect-disabled {
            background-color: #eee; }`,

        `.label-multiselect-disabled-placeholder {
            margin-top: 6px;
            margin-left: 6px; }`
    ],
    host: {
        '(document:click)': 'documentClick($event)'
    }
})
export class LabelMultiselectComponent implements ControlValueAccessor, OnInit {

    public cd: NgModel;

    public config: LabelMultiselectConfig;

    public filterText: string;

    public selectedItems: ILabelItem[];

    public showDropdown: boolean;

    public onChange: any = Function.prototype;

    public onTouched: any = Function.prototype;

    // ---------------------------------------------------------------------------------------------------------------------------------

    private labelItems: ILabelItem[];

    private toggleClasses: string[];

    private autoTagNumber: number;

    // ---------------------------------------------------------------------------------------------------------------------------------

    @Input() disabled: boolean;

    @Input() multiselectConfig: ILabelMultiselectConfig;

    @Input() multiselectItems: IDropdownItem[];

    // ---------------------------------------------------------------------------------------------------------------------------------

    @ViewChildren('searchField') searchField;

    // ---------------------------------------------------------------------------------------------------------------------------------

    constructor(@Self() cd: NgModel, private _elemRef: ElementRef) {
        this.cd = cd;
        cd.valueAccessor = this;
        this.cd.viewModel = [];

        this.config = new LabelMultiselectConfig();

        this.showDropdown = false;

        this.selectedItems = [];

        this.multiselectItems = [];

        this.filterText = '';

        this.autoTagNumber = -1;

        this.toggleClasses = ['label-multiselect-container', 'label-multiselect-selection'];
    }

    // ---------------------------------------------------------------------------------------------------------------------------------

    get filteredMultiselectItems() {
        if (this.filterText.length === 0) {
            return this.multiselectItems;
        }

        let filtered = this.multiselectItems.filter(item => item.label.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1);
        return filtered;
    }

    get searchFieldValue(): string {
        if (this.searchField.first == null) return '';
        return this.searchField.first.nativeElement.textContent;
    }

    set searchFieldValue(val) {
        this.searchField.first.nativeElement.textContent = val;
    }

    // ---------------------------------------------------------------------------------------------------------------------------------

    ngOnInit() {
        this.selectedItems = this.cd.viewModel;
        this._processConfig();
    }

    writeValue(value: any) {  }

    registerOnChange(fn: (_: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: (_: any) => {}): void {
        this.onTouched = fn;
    }

    // ---------------------------------------------------------------------------------------------------------------------------------

    public add(item: IDropdownItem) {
        if (this._filterSelectedById(item.id).length > 0 || this.disabled) return;

        this.selectedItems.push({
            id: item.id,
            label: item.label,
            class: item.class
        });

        this._updateModel();
    }

    public createAutoTag() {
        let val = this.filterText.trim();
        let seps = this.config.tagSeparators;

        seps.forEach((sep) => {
            if (val.indexOf(sep) !== -1) {
                let valArr = val.split(sep);
                if (valArr.length > 0) {
                    valArr.forEach((v) => {
                        if (v.length > 0) {
                            this.selectedItems.push({
                                id: this.autoTagNumber--,
                                label: v.trim(),
                                class: ''
                            });

                            this._updateModel();
                        }
                    });

                    this.filterText = '';
                    this.searchFieldValue = '';
                }
            }
        });
    }

    public containerClick(event) {
        if (this.disabled) return;

        let trigger = false;
        event.srcElement.className.split(' ').forEach((cls) => {
            if (this.toggleClasses.indexOf(cls) !== -1) {
                trigger = true;
            }
        });

        if (trigger) {
            this.searchField.first.nativeElement.focus();
            this.showDropdown = true;
        }
    }

    public documentClick(event: MouseEvent) {
        if (!this._elemRef.nativeElement.contains(event.target)) {
            this.showDropdown = false;

            if (this.config.autoTag && this.searchFieldValue.trim() !== '') {
                let firstSep = this.config.tagSeparators[0];
                this.searchFieldValue += firstSep;
                this.searchFieldChange(null);
            }
        }
    }

    public remove(item: ILabelItem) {
        if (this.disabled) return;

        let filtered = this._filterSelectedById(item.id, true);

        this.selectedItems = filtered;
        this._updateModel();
    }

    public searchFieldChange(evt) {
        if (this.disabled) return;

        this.filterText = this.searchFieldValue;

        if (this.config.autoTag) { this.createAutoTag(); }
    }

    public searchFieldKeydown(evt) {
        // Backspace
        if (evt.keyCode === 8 && this.filterText.length === 0) { this._removeLastItem(); }

        // Return
        if (evt.keyCode === 13) {
            this.showDropdown = false;
            return false;
        }
    }

    // ---------------------------------------------------------------------------------------------------------------------------------

    private _filterSelectedById(id: any, not = false) {
        return (not) ? this.selectedItems.filter(item => item.id !== id) :
                       this.selectedItems.filter(item => item.id === id);
    }

    private _processConfig() {
        let opts = this.multiselectConfig;
        if (opts != null) {

            // minHeight
            if (opts.minHeight != null) {
                this.config.minHeight = opts.minHeight;
            }

            // disabledEmptyPlaceholder
            if (opts.disabledEmptyPlaceholder != null) {
                this.config.disabledEmptyPlaceholder = opts.disabledEmptyPlaceholder;
            }

            // noOptionsPlaceholder
            if (opts.noOptionsPlaceholder != null) {
                this.config.noOptionsPlaceholder = opts.noOptionsPlaceholder;
            }

            // inputClasses
            if (opts.inputClasses != null) {
                this.config.inputClasses = opts.inputClasses;
            }

            // disabledEmptyClasses
            if (opts.disabledEmptyClasses != null) {
                this.config.disabledEmptyClasses = opts.disabledEmptyClasses;
            }

            // dropdownItemClasses
            if (opts.dropdownItemClasses != null) {
                this.config.dropdownItemClasses = opts.dropdownItemClasses;
            }

            // noOptionsClasses
            if (opts.noOptionsClasses != null) {
                this.config.noOptionsClasses = opts.noOptionsClasses;
            }

            // labelClasses
            if (opts.labelClasses != null) {
                this.config.labelClasses = opts.labelClasses;
            }

            // autoTag
            if (opts.autoTag != null) {
                this.config.autoTag = opts.autoTag;
            }

            // tagSeparators
            if (opts.tagSeparators != null) {
                this.config.tagSeparators = opts.tagSeparators;
            }
        }
    }

    private _removeLastItem() {
        this.selectedItems.pop();

        this._updateModel();
    }

    private _updateModel() {
        this.cd.viewModel = this.selectedItems;
        this.onChange(this.selectedItems);
    }
}
