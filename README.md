# Infinity Row
A jQuery slider plugin for infinite length rows. The plugin uses CSS flexbox to align items inside a row horizontally allowing the row to bleed off the screen.

Inspired by the featured sessions component on the [Google I/O 2015 website](https://events.google.com/io2015/).

## How to
```js
$('#row > .infinity-row').infinityRow({
  items: '.items',
  row_forward: '#row > .forward',
  row_backward: '#row > .backward'
});
```

#### Flexbox CSS styles
This plugin relies on the correct CSS settings being applied to work correctly. To provide the most flexibility for inserting into your project, these CSS styles aren't added via jQuery, you'll need to either  copy these directly from the core.css file or add them to your stylesheet.

## Config options
Option | Type | Default | Notes
-------|------|---------|------
items | `string` | `div` |The items inside your row you'd like to move.
row_backward | `string` | `null` | The element you want to apply the row backward action.
row_forward | `string` | `null` | The element you want to apply the row forward action.
resize | `boolean` | `true` | Set to true if you'd like to refresh the slider's layout on resize.
fallback | `boolean` | `false`  | Set to true if you'd like to support browsers without Flexbox support.*

* If `fallback` is set to true, you must include either the `js/modernizr.custom.js` file or your own modernizr compile for Flexbox feature detection. 

