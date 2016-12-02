<a name="0.1.9"></a>
# [0.1.9](https://github.com/andymeps/ng2-label-multiselect/compare/v0.1.8...v0.1.9)

### Bugfixes
* Fixed [#3](https://github.com/AndyMeps/ng2-label-multiselect/issues/3), Added keydown keyCode for return to collapse dropdown.

### Notes
* Minor refactoring to enumeration objects.

<a name="0.1.8"></a>
# [0.1.8](https://github.com/andymeps/ng2-label-multiselect/compare/v0.1.7...v0.1.8) (2016-10-25)

### Bugfixes
* Fixed error with getter null reference.

<a name="0.1.7"></a>
# [0.1.7](https://github.com/andymeps/ng2-label-multiselect/compare/v0.1.6...v0.1.7) (2016-10-25)

### Bugfixes
* Removed search field when control is disabled to prevent text entry.

<a name="0.1.6"></a>
# [0.1.6](https://github.com/andymeps/ng2-label-multiselect/compare/v0.1.5...v0.1.6) (2016-10-25)

### New

* Added getter and setter for searchFieldValue
* In autotag mode if a string has been entered in to the text field, clicking away from the control will create a tag with the string value left in the text field, as a trailing comma to create the tag may not be added.

# [0.1.5](https://github.com/andymeps/ng2-label-multiselect/compare/v0.1.4...v0.1.5) (2016-10-05)

### New

* Added handlers for onChange and onTouched, control will now correctly render ng-dirty and ng-touched classes.
* Reordered properties and functions in to alphabetical order.

<a name="0.1.4"></a>
# [0.1.4](https://github.com/andymeps/ng2-label-multiselect/compare/v0.1.3...v0.1.4) (2016-10-03)

### New

* Autotagging
* Backspace to remove last tag
* Dropdown now closes when clicking away from the component
* Added CHANGELOG.md

### Bugfixes

* Fixed issue with dropdown when using custom classes

### Notes

* Two new config items: `autoTag: boolean` and `tagSeparators: string[]`, the latter needs testing as I need to allow for RegExp.
