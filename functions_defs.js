// -----------------------------------------------------------------------------
// (c) balarabe@protonmail.com                                      License: MIT
// :v: 2018-02-25 15:10:49 CC34B0                    suya-js/[functions_defs.js]
// -----------------------------------------------------------------------------

/*
    This file just specifies some definitions to help
    Google Closure Compiler to type-check functions.js

    They are not defined directly in functions.js
    because they are not needed for functionality.
*/

var zr  = {};

var sessionStorage  = {
    setItem:  function(a, b) {}
};

/** ITextRange: __
 *  @typedef
 *  {{
 *      duplicate: function():Object,
 *      move:      function(string, number),
 *      moveStart: function(string, number),
 *      select:    function(),
 *      text:      string,
 *  }}
 */
zr.ITextRange;

/** IWindow: __
 *  @typedef
 *  {{
 *      event: Event,
 *      frames: Array<Object>
 *  }}
 */
zr.IWindow;

/** ListRows: __
 *  @typedef !Array<!Array<!string>>
 */
zr.ListRows;

/** Property: Single property name and value.
 *  Returned by properties() function.
 *  @typedef
 *  {{
 *      name:  string,
 *      value: *,
 *  }}
 */
zr.Property;

/** Response: response to a HTTP request.
 *  @typedef
 *  {{
 *      err:         number,
 *      status:      number,
 *      status_text: string,
 *      text:        string
 *  }}
 */
zr.Response;

//end
