# BG: Icon Picker
Data Type that enables you to use your own website icon set in the backoffice.

V7 Version will no longer be maintained.


### `V8`
Umbraco versions: 8.x.x
```
PM> Install Package BG.Icon.Picker.v8
```
[Our.Umbraco.org Download](https://our.umbraco.com/packages/backoffice-extensions/bg-icon-picker-v8/)


### `V7` - Is no longer maintained
Umbraco versions: 7.4.0-7.15.x
```
PM> Install Package BG.Icon.Picker
```
[Our.Umbraco.org Download](https://our.umbraco.com/packages/backoffice-extensions/bg-icon-picker/)
***


## Installation

### `NuGet`
1. Install package through NuGet Package Manager
2. Create the data type

   **Location V8:** Settings > Data Types > BG: Icon Picker

   **Location V7:** Developer > Data Types > BG: Icon Picker
3. Configure the newly created data type.
4. Use and enjoy.

### `Umbraco Package Section`
1. Install the package
2. Configure the data type

   **Location V8:** Settings > Data Types > BG: Icon Picker

   **Location V7:** Developer > Data Types > BG: Icon Picker


## Configuring the Data Type:

**Path to stylesheet:**
Stand-alone stylesheet for the icons is required.
```
/css/icons.min.css
```

**Class name regex:**
It's recommended to _not use_ "icon" as class identifier so it won't interfere with the umbraco icons.
```
(icn-[^:]*?):before
```

***

## Retrieving data from the icon picker:
The icon picker returns a string with the icon name so it's really simple to work with.

### `V8`
```
<i class="@(Model.Value<string>("icon"))"></i>
```

### `V7`
```
<i class="@(Model.Content.GetPropertyValue<string>("icon"))"></i>
```

***

## Using ModelsBuilder? (V7)
[Matthew-wise](https://github.com/Matthew-Wise) wrote up a converter for ModelsBuilder.
```
    [PropertyValueType(typeof(string))]
    public class BgIconPickerValueConverter : PropertyValueConverterBase
    {
        public override bool IsConverter(PublishedPropertyType propertyType)
        {
            return propertyType.PropertyEditorAlias.Equals("bgIconPicker");
        }
    }
```