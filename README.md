[![npm version](https://badge.fury.io/js/ng2-label-multiselect.svg)](https://badge.fury.io/js/ng2-label-multiselect) [![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![Dependency Status](https://www.versioneye.com/nodejs/ng2-label-multiselect/0.1.12/badge?style=flat-square)](https://www.versioneye.com/nodejs/ng2-label-multiselect/0.1.12) [![Build Status](https://travis-ci.org/AndyMeps/ng2-label-multiselect.svg?branch=master)](https://travis-ci.org/AndyMeps/ng2-label-multiselect)

[![NPM](https://nodei.co/npm/ng2-label-multiselect.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ng2-label-multiselect/)


# ng2-label-multiselect

Label multiselect library for Angular 2

![Screenshot open with Bootstrap]()

## Dependencies

The module relies only on core angular components.
The control has been designed to allow you to add in custom classes to style as you wish.

## Installation

To include in your project install via NPM with:

```
npm i --save ng2-label-multiselect
```

You will then need to include the module in your app.module.ts:

```typescript
import { LabelMultiselectModule } from 'ng2-label-multiselect';

// ...

@NgModule({
    imports: [
        LabelMultiselectModule
    ]
})
//...
```

Finally, include the component in your component HTML as per the next section.

## HTML Component Markup

Once the module is installed, you will need to add HTML markup to include the multiselect in a component.
The minimum requirement is an `[(ngModel)]` attribute.

```html
<label-multiselect
    [(ngModel)]="labelModel">
</label-multiselect>
```

The `[(ngModel)]` attribute represents the selected labels in the multiselect, this should be an array of objects with the following properties:

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| id | `any` | **Yes** | A unique key for this label. |
| label | `string` | **Yes** | The value displayed for this label. |

To aid in development, `ng2-label-multiselect` exposes a TypeScript interface for the object properties, this can be referenced as a type in your component by importing it:

```typescript
import { ILabelItem } from 'ng2-label-multiselect';
```

Which can then be used as the type of the model object:
```typescript
public labelModel: ILabelItem[];

ngOnInit() {
    this.labelModel = [
        {
            id: 1,
            label: 'Purple'
        }
        // ...
    ];
}
```

It is possibe to configure 'ng2-label-multiselect' by providing a configuration object to the `[labelConfig]` attribute (see the next section for more details on this object):

```html
<label-multiselect
    [(ngModel)]="labelModel"
    [labelConfig]="labelMultiselectOptions">
</label>
```

## Configuration

`ng2-label-multiselect` exposes an interface to provide an indication of valid configuration properties, 
this can be referenced as a type for your configuration object by importing it:

```typescript
import { ILabelMultiselectConfig } from 'ng2-label-multiselect';
```

Which can then be used as the configuration object type in your component:

```typescript
public labelMultiselectConfiguration: ILabelMultiselectConfig;
```

Current list of configuration options, types and default values:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| minHeight | `number` | `34` | Sets the minimum height of the control. |
| disabledEmptyPlaceholder | `string` | `''` | Message displayed when the control is empty and disabled. |
| noOptionsPlaceholder | `string` | `'No options available.'` | Message displayed when no options provided to the control. |
| inputClasses | `any[]` | `[]` | Array of classes to be added to the html representing the input. |
| disabledEmptyClasses | `string[]` | `[]` | Array of classes added to the element wrapping the `disabledEmptyPlaceholder`. |
| dropdownItemClasses | `string[]` | `[]` |  Array of classes added to each item in the dropdown list of available options. |
| noOptionsClasses | `string[]` | `[]` |  Array of classes added to the element wrapping the `noOptionsPlaceholder`. |
| labelClasses | `string[]` | `[]` |  Array of classes added to each of the labels. |
| autoTag | `boolean` | `false` | Provides the ability for the user to type in text to be converted to tags whenever a `tagSeperators` item occurs. |
| tagSeperators | `string[]` | `[',']` | Each string in the array will trigger the creation of a new tag when used with `autoTag = true`. |

## Dropdown options

// TODO

## AutoTag

// TODO
