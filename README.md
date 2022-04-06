# What is this?

A react module toggles view between mobile and desktop states


# Installation

`yarn add lx-view-toggler`


Then....

```
import ViewToggler, { getConfig } from 'lx-view-toggler'

//Console log the config model structure.
console.log(getConfig())

const viewTogglerConfig = {
    //add options 
}

//
<ViewToggler config={viewTogglerConfig}>Pass content here...</ViewToggler>
```