# Infinity Row
A jQuery slider plugin for infinite length rows. The plugin uses CSS flexbox to display items inside a row horizontally allowing the for to bleed off the screen.

Inspired by the featured sessions component on the Google I/O 2015 website.

## Config options
option | type | notes
-------|------|------
items | string | The items inside your row you'd like to move.
row_backward | string | The element you want to apply the row backward action.
row_forward | string | The element you want to apply the row forward action.
resize | boolean | Set to true if you'd like to refresh the slider's layout on resize.
fallback | boolean | Set to true if you'd like to support browsers without Flexbox support.*

* If fallback is set to true, you must include either the modernizr.custom.js file or your own modernizr compile for Flexbo feature detection. 

