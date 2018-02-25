// -----------------------------------------------------------------------------
// (c) balarabe@protonmail.com                                      License: MIT
// :v: 2018-02-25 15:10:49 D80551                           [zr/js/functions.js]
// -----------------------------------------------------------------------------

// # Caret Functions
// # Date Functions
// # DOM Element Functions
// # DOM Positioning Functions
// # Event Functions
// # Functional Programming Functions
// # General-Purpose Functions
// # Numeric Functions
// # String Functions
// # UI Effects Functions
//
// # Caret Functions
//   caretPos(input)
//   caretSet(input, pos)
//   caretToEnd(input)
//   disableSelect(el)
//
// # Date Functions
//   formatDate(format, args)
//   isDate(val)
//   monthNameEN(num)
//   monthNumEN(s)
//   year(num)
//
// # DOM Element Functions
//   append(container, children)
//   body()
//   children(el, cssSelector)
//   elID(el)
//   getElementsByTagName(container, tagName)
//   getInnerText(el)
//   hasClass(el, nameList)
//   head(doc)
//   makeCSSLink(path, doc)
//   makeDiv(config)
//   makeEl(elementType, classes)
//   makeFullscreenDiv()
//   nodeName(node)
//   sel(elemOrSelector, parent)
//   selID(id, parent)
//   setClass(state, item, classes)
//   setInnerText(el, text)
//
// # DOM Positioning Functions
//   absoluteX(el)
//   absoluteY(el)
//   centerInWindow(el)
//   offsetHeight(el)
//   offsetWidth(el)
//   windowHeight()
//   windowWidth()
//   x(el)
//   y(el)
//   zIndexMax()
//
// # Event Functions
//   cancelEvent(ev)
//   eventSrc(ob)
//   listen(eventName, callback, elements)
//   unlisten(eventName, callback, elements)
//
// # Functional Programming Functions
//   combine(objects)
//   every(ar, predicateFn)
//   filter(ar, predicateFn, selectTrue)
//   find(ar, predicateFn)
//   forEach(ar, applyFn)
//   hasProperty(propName, ob)
//   isFound(ar, predicateFn)
//   isFn(val)
//   isOneOf(val, ar)
//   keyValue(key, val)
//   map(ar, applyFn)
//   properties(ob)
//   range(ar, first, last)
//   reduce(ar, applyFn, initialVal)
//   until(ar, predicateFn)
//   use(ob, applyFn)
//
// # General-Purpose Functions
//   backToPage(optPageName)
//   browserType()
//   def(typeStr)
//   err(errorNum, values)
//   getOn(ob, name, defaultVal)
//   getVal(ob)
//   httpDelete(url, callback)
//   httpGet(url, callback)
//   httpPost(url, data, callback)
//   httpPut(url, data, callback)
//   httpRequest(method, url, data, callback)
//   isArray(ob)
//   isIE6()
//   isObject(val)
//   isTrue(val)
//   max(a, b)
//   min(a, b)
//   nodeTypeName(nodeTypeNum)
//   setBackPage(optPageName, optHref)
//   setOn(ob, name, val)
//   setVal(ob, value)
//   showNotification(msg, color)
//   undef(typeStr)
//   url(parts)
//   urlArg(argName, url)
//   versionIE()
//
// # Numeric Functions
//   N(val)
//   formatNumber(num, decimalPlaces)
//   isNumber(val)
//
// # String Functions
//   S(values)
//   begins(s, find)
//   contains(s, find)
//   diff(a, b)
//   ends(s, find)
//   extractStrings(args)
//   isString(val)
//   json(ob, optLineBreaks)
//   lineCount(s)
//   parseJSON(s)
//   prefix(s, count)
//   repeat(s, count)
//   replace(s, find, repl)
//   suffix(s, count)
//   trim(s)
//
// # Style Functions
//   height(el, val, unit)
//   left(el, val, unit)
//   opacity(el, val)
//   position(el, val)
//   mTop(el, val, unit)
//   visibility(el, val)
//   width(el, val, unit)
//
// # UI Effects Functions
//   fadeScreen(show)
//   transitionStyle(el, property, endValue, durationMs, whenDone)

// -----------------------------------------------------------------------------

/*
    Note: This file should not be included in HTML pages directly.
    It is part of an assembly of files making up the Zirconium framework.
    If you want to use just this file, enclose it in a mudule:
    Place it between the contents of module_begin.js and module_end.js.

    module_begin.js also specifies 'use_strict';
*/

// -----------------------------------------------------------------------------
// # Caret Functions

/** caretPos: Returns the caret's position within an <input> element.
 *  If 'input' is null, returns 0.
 *
 *  @param {HTMLInputElement} input
 *
 *  @return {!number}
 */
function caretPos(input) {
    if (input === null) {
        return 0;
    }
    if (input.setSelectionRange) {
        return input.selectionEnd;
    }
    if (input.createTextRange) {
        var range = /**@type{!zr.ITextRange}*/
                    (   /**@type{!zr.ITextRange}*/
                        (document.selection.createRange()).duplicate()  );
        range.moveStart("textedit", -1);
        return range.text.length;
    }
    return 0;
}                                                                     //caretPos

/** caretSet: Sets the caret's position within an <input> element.
 *
 *  @param {HTMLInputElement} input
 *  @param {!number} pos
 */
function caretSet(input, pos) {
    if (undef(typeof input) || input === null) {
        return;
    }
    if (input.setSelectionRange) {
        input.selectionStart = input.selectionEnd = pos;
    } else if (input.createTextRange) {
        var range = /**@type{!zr.ITextRange}*/ (input.createTextRange());
        if (input && range) {
            range.move("character", pos);
            range.select();
        }
    }
}                                                                     //caretSet

/** caretToEnd: Moves the caret to the end of an <input> element.
 *
 *  @param {HTMLInputElement} input
 */
function caretToEnd(input) {
    if (undef(typeof input) || input === null) {
        return;
    }
    var pos = S(getVal(input)).length;
    if (input.setSelectionRange) {
        input.selectionStart = pos;
        input.selectionEnd   = pos;
    } else if (input.createTextRange) {
        var range = /**@type{!zr.ITextRange}*/ (input.createTextRange());
        if (input && range) {
            range.move("character", pos);
            range.select();
        }
    }
}                                                                   //caretToEnd

/** disableSelect: Disables text selection within the element 'el'.
 *
 *  @param {HTMLElement} el
 */
function disableSelect(el) {
    if (undef(typeof el) || el === null) {
        err(0xEA1EC5);                          // disableSelect(): 'el' is null
        return;
    }
    el.onselectstart = function() {
        return false;
    };
    el.unselectable = "on";
    el.style.MozUserSelect = "none";
    el.style.cursor = "default";
}                                                                //disableSelect

// -----------------------------------------------------------------------------
// # Date Functions

/** formatDate: Returns a formatted date string from the specified date,
 *  or year, month and date. args is either a single Date object,
 *  or an array of three integers following 'format',
 *  for year, month and day number.
 *
 *  @param {string} format
 *  @param {(!Date|!Array<!number>)} args
 *
 *  @return {string}
 */
function formatDate(format, args) {
    if (!isString(format)) {
        err(0xE67C67);             // formatDate(): arg 'format' is not a string
        return "";
    }
    var isD = isDate(args);
    var isN = isArray(args) && args.length == 3;
    if (!isD && !isN) {
        err(0xEA76F5,               // formatDate(): 'args' not a date or number
            typeof args);
        return "";
    }
    var yr  = isD ? args.getFullYear()  : N(args[0]);
    var mn  = isD ? args.getMonth() + 1 : N(args[1]);
    var dy  = isD ? args.getDate()      : N(args[2]);
    yr = isNumber(yr) && yr >= 1900 && yr <= 9999 ? yr : NaN;
    mn = isNumber(mn) && mn >= 1    && mn <= 12   ? mn : NaN;
    dy = isNumber(dy) && dy >= 1    && dy <= 31   ? dy : NaN;
    var formats = [
            ["yyyy", function() {
                        return S(yr);
                    }],
            ["yy",   function() {
                        return suffix(S(yr), 2);
                    }],
            ["mmmm", function() {
                        return monthNameEN(mn);
                    }],
            ["mmm",  function() {
                        return monthNameEN(mn).substr(0, 3);
                    }],
            ["mm",   function() {
                        return mn < 10 ? "0" + S(mn) : S(mn);
                    }],
            ["m",    function() {
                        return S(mn);
                    }],
            ["dd",   function() {
                        return dy < 10 ? "0" + S(dy) : S(dy);
                    }],
            ["d",    function() {
                        return S(dy);
                    }]];
    var ret = format;
    forEach (formats, formatItem);
            /** @param {Array} ar */
            function formatItem(ar) {
                var fmt = S(ar[0]);
                var fn  = /**@type{!function():string}*/ (ar[1]);
                var val = "";
                if (contains(ret, fmt)) {
                    var repl = trim(S(fn()));
                    if (repl.length == 0) {
                        repl = repeat("?", fmt.length);
                    }
                    ret = replace(ret, fmt, repl);
                }
            }
    return ret;
}                                                                   //formatDate

/** isDate: Returns true if the specified value is a valid date object.
 *
 *  @param {*} val
 *
 *  @return {boolean}
 */
function isDate(val) {
    return isObject(val) &&
           isFn(val["getFullYear"]) &&
           isFn(val["getMonth"]) &&
           isFn(val["getDate"]);
}                                                                       //isDate

/** monthNameEN: Returns an English month name,
 *  given a month number from 1 to 12,
 *  or a zero-length string if the number
 *  is less than 1 or greater than 12.
 *
 *  @param {number} num
 *
 *  @return {string}
 */
function monthNameEN(num) {
    switch (num) {
    case 1:  return "January";
    case 2:  return "February";
    case 3:  return "March";
    case 4:  return "April";
    case 5:  return "May";
    case 6:  return "June";
    case 7:  return "July";
    case 8:  return "August";
    case 9:  return "September";
    case 10: return "October";
    case 11: return "November";
    case 12: return "December";
    }
    return "";
}                                                                  //monthNameEN

/** monthNumEN: Returns a month number from an English month name,
 *              or zero if the month name is not valid.
 *
 *  @param {string} s
 *
 *  @return {number}
 */
function monthNumEN(s) {
    switch (String(s).substr(0, 3).toLowerCase()) {
    case "jan": return 1;
    case "feb": return 2;
    case "mar": return 3;
    case "apr": return 4;
    case "may": return 5;
    case "jun": return 6;
    case "jul": return 7;
    case "aug": return 8;
    case "sep": return 9;
    case "oct": return 10;
    case "nov": return 11;
    case "dec": return 12;
    }
    return 0;
}                                                                   //monthNumEN

/** year: Returns a 4-digit year number from a number.
 *        e.g. given 9, returns 2009.
 *
 *  @param {number} num
 *
 *  @return {number}
 */
function year(num) {
    num = Number(num);
    if (isNaN(num)) {
        return 0;
    }
    if (num > 50 && num < 100) {
        return 1900 + num;
    }
    if (num < 50) {
        return 2000 + num;
    }
    return num;
}                                                                         //year

// -----------------------------------------------------------------------------
// # DOM Element Functions

/** append: Appends one or more child elements to a container element.
 *
 *  @param {!HTMLElement} container
 *  @param {...(Element|Text)} children
 *
 *  @return {HTMLElement}
 */
function append(container, children) {
    if (!isObject(container)) {
        err(0xE9C294,              // append(): arg 'container' is not an object
            container);
        return null;
    }
    if (children === null || typeof children == "undefined") {
        err(0xE84748);          // append(): arg 'children' is null or undefined
        return null;
    }
    for (var i = 1, count = arguments.length; i < count; i++) {
        container.appendChild(arguments[i]);
    }
    return container;
}                                                                       //append

/** body: Returns the body element of the document 'doc'
 *        (or main document if null).
 *
 *  @param {HTMLDocument=} doc
 *
 *  @return {!HTMLBodyElement}
 */
function body(doc) {
    if (arguments.length == 0 || doc === null) {
        doc = /**@type{!HTMLDocument}*/ (document);
    }
    var list = doc.getElementsByTagName("body");
    if (list.length < 1) {
        return /**@type{!HTMLBodyElement}*/ (document.body);
    }
    return /**@type{!HTMLBodyElement}*/ (list[0]);
}                                                                         //body

/** children: Returns all child elements of the given element 'el'.
 *  Text elements are ignored. You can optionally
 *  specify the tag name, class name and/or ID, or leave them
 *  out or specify null to avoid checking them.
 *
 *  If 'el' is null or can not be matched, returns null.
 *
 *  @param {(Node|HTMLElement)} el
 *  @param {string=} cssSelector
 *
 *  @return {!Array<!HTMLElement>}
 */
function children(el, cssSelector) {
    if (arguments.length < 2 || undef(typeof cssSelector)) {
        cssSelector = "";
    }
    var /**@type{!Array<!HTMLElement>}*/ ret = [];
    if (el === null || (typeof el != "object") || el.childNodes.length == 0) {
        return ret;
    }
    var ar    = cssSelector.split();
    var tag   = getPart(ar, "");  // tag
    var cls   = getPart(ar, ".");    // .class
    var id    = getPart(ar, "#");   // #id
    var stack = [];
    var child = /**@type{!HTMLElement}*/ (el.firstChild);
    var level = 0;
    do {
        if (child.nodeType != 3) {  // not a text node
            if ((tag == "" || tag == nodeName(child)) &&
                (id  == "" || id == elID(child)) &&
                (cls == "" || hasClass(child, cls))) {
                    ret.push(child);
            }
            if (child.childNodes.length > 0) {
                stack[level] = child;
                level++;
                child = /**@type{!HTMLElement}*/ (child.firstChild);
                continue;
            }
        }
        while (child.nextSibling === null && level >= 0) {
            if (--level < 0) {
                break;
            }
            child = /**@type{!HTMLElement}*/ (stack[level]);
        }
        child = /**@type{!HTMLElement}*/ (child.nextSibling);
    } while (level >= 0 && child !== null);
    return ret;
    /** getPart: __
     *  @param {!Array<string>} ar
     *  @param {string} suffix
     *  @return {string}
     */
    function getPart(ar, suffix) {
        /** state: __
         *  @param {string} ch
         *  @return {boolean}
         */
        var state = function(ch) {
            if (ch == suffix || suffix == "") {
                /** @param {string} ch */
                state = function(ch) {
                    if (!isIdentifier(ch)) {
                        /** @param {string} ch */
                        state = function(ch) {
                                    return false;
                                 };
                        return false;
                    }
                    return true;
                };
            }
            return suffix == "";
        };
        return filter(  ar,
                        /** @param {string} ch */
                        function(ch) {
                            return state(ch);
                        }
                     ).join().toLowerCase();
    }
    /** isIdentifier: returns true if character 'ch' is valid in an identifier
     *  @param {string} ch
     *  @return {boolean}
     */
    function isIdentifier(ch) {
        return ch == "_" ||
              (ch >= "0" && ch <= "9") ||
              (ch >= "A" && ch <= "Z") ||
              (ch >= "a" && ch <= "z");
    }
}                                                                     //children

/** elID: Returns the ID of an element, in lower case characters.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {string}
 */
function elID(el) {
    if (typeof el != "object" || undef(typeof el.id)) {
        return "";
    }
    return S(el.id).toLowerCase();
}                                                                         //elID

/** getElementsByTagName: Identical to the DOM method of the same name,
 *  but returns an array of elements instead of a NodeList
 *
 *  @param {(HTMLDocument|HTMLElement)} container
 *  @param {string} tagName
 *
 *  @return {Array<HTMLElement>}
 */
function getElementsByTagName(container, tagName) {
    var list = /**@type{NodeList<HTMLElement>}*/
               (container.getElementsByTagName(tagName));
    var ret  = [];
    for (var i = 0, end = list.length; i < end; i++) {
        ret.push(list[i]);
    }
    return ret;
}                                                         //getElementsByTagName

/** getInnerText: Gets the text within an element.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!string}
 */
function getInnerText(el) {
    // Chrome (2016)   has innerText
    // Edge (Win10)    has innerText
    // IE11            has innerText
    // Safari          has innerText
    // Firefox (2016)  no innerText
    // Firefox 1       no innerText
    if (el === null) {
        return "";
    }
    if (typeof (el["innerText"]) == "string") {
        return el["innerText"];
    }
    if (el.childNodes.length != 0 &&
        el.childNodes[el.childNodes.length - 1].nodeType == 3) {
        return el.childNodes[0].textContent;
    }
    err(0xE578FF);                        // getInnerText(): failed reading text
    return "";
}                                                                 //getInnerText

/** hasClass: Returns true if the given element contains
 *  the given class name, *  or any of a number of
 *  class names specified in nameList.
 *  (Note: Firefox trims leading spaces from class names)
 *
 *  @param {(HTMLElement|string)} el
 *  @param {(string|!Array<string>)} nameList
 *
 *  @return {boolean}
 */
function hasClass(el, nameList) {
    var type = typeof el;                           // ensure 'el' is an element
    if (type == "string") {
        el = /**@type{HTMLElement}*/ (sel(el));
    }
    if (type != "object" || el === null) {
        return false;
    }
    if (typeof nameList == "string") {          // ensure 'nameList' is an array
        nameList = [nameList];
    } else if (!isArray(nameList)) {
        if (nameList !== null) {
            err(0xE726AB,  // hasClass(): arg 'nameList' is not null or an array
                nameList);
        }
        return false;
    }
    /**@type{string}*/
    var classes = "";  // get element's full class name
    if (el.className) {
        classes = trim(S(el.className).toLowerCase());
    }
    if (classes.length == 0) {
        return false;
    }
    classes += " ";
    return isFound( /**@type{Array<string>}*/ (nameList),
                    /** @param {string} name */
                    function(name) {
                        name = trim(name.toLowerCase());
                        var part = "";
                        for (var i = 0, end = classes.length; i < end; i++) {
                            if (classes.charAt(i) == " ") {
                                part = "";
                            } else {
                                part += classes.charAt(i);
                            }
                            if (part == name) {
                                return true;
                            }
                        }
                        return false;
                    });
}                                                                     //hasClass

/** head: Returns the head element of the document 'doc'
 *  (or the main document if it is null).
 *
 *  @param {HTMLDocument=} doc
 *
 *  @return {HTMLBodyElement}
 */
function head(doc) {
    if (arguments.length == 0 || doc === null) {
        doc = /**@type{!HTMLDocument}*/ (document);
    }
    var list = doc.getElementsByTagName("head");
    if (list.length < 1) {
        return null;
    }
    return /**@type{HTMLBodyElement}*/ (list[0]);
}                                                                         //head

/** makeDiv: Creates a new Div element.
 *
 *  @param  {{
 *              classes: (Array<string>|null|undefined),
 *              onclick: (Function|null|undefined),
 *              text:    (string|undefined)
 *          }}
 *          config
 *
 *  @return {!HTMLDivElement}
 */
function makeDiv(config) {
    var div = /**@type{!HTMLDivElement}*/ (makeEl("div"));
    if (def(typeof config.classes)) {
        setClass(true, div, config.classes);
    }
    if (config.onclick !== null && typeof config.onclick !== "undefined") {
        div.onclick = config.onclick;
    }
    if (typeof config.text == "string") {
        setInnerText(div, S(config.text));
    }
    return div;
}                                                                      //makeDiv

/** makeCSSLink: creates a link HTML element to link a CSS file
 *
 *  @param {string} path
 *  @param {HTMLDocument=} doc
 *
 *  @return {!HTMLLinkElement}
 */
function makeCSSLink(path, doc) {
    if (arguments.length > 1) {
        var ret = /**@type{!HTMLLinkElement}*/ (doc.createElement("link"));
    } else {
        ret = /**@type{!HTMLLinkElement}*/ (document.createElement("link"));
    }
    ret.rel  = "stylesheet";
    ret.type = "text/css";
    ret.href = path;
    return ret;
}                                                                  //makeCSSLink

/** makeEl: Creates a new HTML element.
 *
 *  @param {!string} elementType
 *  @param {Array<string>=} classes
 *
 *  @return {!HTMLElement}
 */
function makeEl(elementType, classes) {
    var ret = /**@type{!HTMLElement}*/ (document.createElement(elementType));
    if (isArray(classes)) {
        setClass(true, ret, classes);
    }
    return ret;
}                                                                       //makeEl

/** makeFullscreenDiv: Creates a full-screen Div element.
 *
 *  @return {!HTMLElement}
 */
function makeFullscreenDiv() {
    var div = makeDiv({});
    position(div, "fixed");
    left(div, 0);
    mTop(div, 0);
    width(div, 100, "%");
    height(div, 100, "%");
    div.style.zIndex = 200;  // must equal @dialog_z_index
    return div;
}                                                            //makeFullscreenDiv

/** nodeName: Returns the tag name of an element (node),
 *  in lower case characters.
 *
 *  @param {Node} node
 *
 *  @return {!string}
 */
function nodeName(node) {
    if (node === null || typeof node == "undefined") {
        err(0xE4CB46);            // nodeName(): arg 'node' is null or undefined
        return "";
    }
    var name = /**@type{(string|undefined)}*/ (node.nodeName);
    if (name === null || typeof name == "undefined") {
        err(0xE5D105);             // nodeName(): node name is null or undefined
        return "";
    }
    return S(name).toLowerCase();
}                                                                     //nodeName

/** sel: Returns an element object, given an element or a
 *  selector string. *  If the selector is in [brackets],
 *  returns an array of all matching elements.
 *
 *  If selector does not contain '#' or '.',
 *  it is treated as an element's ID.
 *
 *  TODO: The above creates a problem:
 *  tags can not be selected by element type.
 *
 *  The selector can contain only one tag name,
 *  one ID and/or one class name.
 *
 *  sel("#item_id");  // select by ID
 *  sel(".class");    // select by Class Name
 *
 *  @param {(HTMLElement|string)} elemOrSelector
 *  @param {(HTMLDocument|HTMLElement|null)=}  parent}
 *
 *  @return {(HTMLElement|Array<HTMLElement>)}
 */
function sel(elemOrSelector, parent) {
    if (arguments.length < 2 || undef(typeof parent)) {
        parent = /**@type{(HTMLDocument)}*/ (document);
    }
    var ret = run();
    /* debugging code (keep commented):
    if (true == false) {
        var parentD = "-", retD = "-";
        if (parent === document) {
            parentD = "<document>";
        } else {
            parentD = parent.tagName + "#" + parent.id;
        }
        if (ret === null) {
            retD = "<null>";
        } else if (isArray(ret)) {
            retD = "<array[" + ret.length + "]>";
        } else {
            retD = ret.tagName + "#" + ret.id;
        }
        var msgD = S("sel(", elemOrSelector, ", ", parentD, ") -> ", retD);
        if (contains(msgD, "<search>")) {
            console.log("BREAK");
        }
        console.log(msgD);
    }
    */
    return ret;
    /** @return {(HTMLElement|Array<HTMLElement>)} */
    function run() {
        if (parent === null) {
            err(0xE376D4);                        // sel(): arg 'parent' is null
            return null;
        }
        // if already given an object, return the same object
        if (typeof elemOrSelector != "string") {
            return /**@type{HTMLElement}*/ (
                   typeof elemOrSelector == "object" ? elemOrSelector : null);
        }
        var s = trim(S(elemOrSelector));
        // if only an ID was given, select and return a single element
        if (parent === document   &&  s[0] == "#" &&
            !contains(s, ".")  &&  !contains(s, "[")){
            s = s.substr(1);
            return /**@type{HTMLElement}*/ (parent.getElementById(s));
        }
        // more complex selection based on tag, class and ID:
        // need to return a single element or an array?
        var returnArray = s.charAt(0) == "[" &&
                          s.charAt(s.length - 1) == "]";
        if (returnArray) {
            s = s.substr(1, s.length - 2);
        }
        // extract tag, id, and class from the selector
        var part = /**@type{zr.ListRows}*/ ([[],[],[]]);
        var i    = 0;
        forEach (s.split(""), forFn);
                /** @param {string} ch */
                function forFn(ch) {
                    if (ch == "#") {
                        i = 1;
                    } else if (ch == ".") {
                        i = 2;
                    } else {
                        part[i].push(ch);
                    }
                }
        var tag = trim(part[0].join("")).toLowerCase();
        var id  = trim(part[1].join("")).toLowerCase();
        var cls = trim(part[2].join("")).toLowerCase();
        if (parent.childNodes.length == 0) {
            return returnArray ? [] : null;
        }
        if (returnArray) {
            var /**@type{!Array<!HTMLElement>}*/ ar = [];
        }
        // iterate through all child nodes of parent to select element(s)
        var stack = /**@type{Array<HTMLElement>}*/ ([]);
        var child = /**@type{!HTMLElement}*/ (parent.firstChild);
        var level = 0;
        do {
            if (child.nodeType != 3) {  // not a text node
                if ((tag == "" || tag == nodeName(child)) &&
                    (id  == "" || id == elID(child)) &&
                    (cls == "" || hasClass(child, cls))) {
                        if (!returnArray) {
                            return child;
                        }
                        ar.push(child);
                }
                if (child.childNodes.length > 0) {
                    stack.push(child);
                    child = /**@type{!HTMLElement}*/ (child.firstChild);
                    level++;
                    continue;
                }
            }
            while (level >= 0 && child.nextSibling === null) {
                level--;
                if (level >= 0) {
                    child = /**@type{!HTMLElement}*/ (stack.pop());
                } else {
                    break;
                }
            }
            child = /**@type{!HTMLElement}*/ (child.nextSibling);
        } while (level >= 0 && child !== null);
        if (returnArray) {
            return ar;
        }
        return null;
    }
}                                                                          //sel

/** selID: selects an element by its ID
 *
 *  @param {string} id
 *  @param {(HTMLDocument|HTMLElement|null)=} parent
 *
 *  @return {HTMLElement}
 */
function selID(id, parent) {
    if (typeof id != "string") {
        err(0xEC4C42);                      // selID(): arg 'id' is not a string
        return null;
    }
    if (id.length == 0) {
        err(0xEDE83D);          // selID(): arg 'id' must not be an empty string
        return null;
    }
    if (id[0] != "#") {
        id = "#" + id;
    }
    var el = /**@type{HTMLElement}*/ (sel(id, parent));
    if (isArray(el)) {
        err(0xEAD2E8);                      // selID(): specified 'id' not found
        return null;
    }
    return el;
}                                                                        //selID

/** setClass: Appends (or removes) the specified
 *  class (or class names) to the given 'item'.
 *  'item' can either be an element object or a string.
 *
 *  @param {boolean} state
 *  @param {(Object|string)} item
 *  @param {...(string|Array<string>)} classes
 *
 *  @return {(Object|string)}
 */
function setClass(state, item, classes) {
    var ob   = /**@type{Object}*/ (item);
    var type = typeof item;
    // if 'item' is an object, use its className, if string, use it directly
    if (type == "object") {
        /**@type{!string}*/
        var list = /**@type{!string}*/ (ob[("className")]);
    } else if (type == "string") {
        list = /**@type{!string}*/ (item);
    } else {
        err(0xE8E2F2);        // setClass(): arg 'item' not an element or string
        return null;
    }
    for (var i = 2, count = arguments.length; i < count; i++) {
        var arg = /**@type{(string|Array<string>)}*/ (arguments[i]);
        if (typeof arg == "string") {
            alterList(state, S(arg));
        } else if (isArray(arg)) {
            var ar = extractStrings(arg);
            for (var j = 0, jlen = ar.length; j < jlen; j++) {
                alterList(state, S(ar[j]));
            }
        } else if (arg !== null) {
            err(0xEC3C03,                     // setClass(): wrong argument type
                typeof arg);
        }
    }
    list = trim(list);
    if (type == "string") {
        return list;
    }
    if (type != "object") {
        err(0xE7A8D4);      // setClass(): arg 'item' is not a string or element
        return null;
    }
    ob.className = list;
    return ob;
    /** alterList: __
     *  captures 'list'
     *  @param {!boolean} state
     *  @param {!string} className
     */
    function alterList(state, className) {
        // for debugging:
        // var oldList = list;
        var lowName = " " + className.toLowerCase() + " ";
        if (state) {
            if (!contains((" " + list.toLowerCase() + " "), lowName)) {
                if (list.length > 0) {
                    list += " ";
                }
                list += className;
            }
        } else {
            do {
                var i = (" " + list.toLowerCase() + " ").indexOf(lowName);
                if (i > -1) {
                    list = list.substr(0, i) +
                           list.substr(i + 1 + className.length);
                }
            } while (i > -1);
        }
        /*
        console.log("alterList(", state, className, ")" +
                    " before:", "'"+oldList+"'", " after:", "'"+list+"'");
        */
    }
}                                                                     //setClass

/** setInnerText: Sets the text within an element.
 *
 *  @param {HTMLElement} el
 *  @param {string} text
 */
function setInnerText(el, text) {
    // Chrome (2016)   innerText
    // Edge (Win10)    innerText
    // IE11            innerText
    // Safari          innerText
    // Firefox (2016)  no innerText
    // Firefox 1       no innerText
    //
    if (typeof (el["innerText"]) == "string") {
        el["innerText"] = text;
    } else if (el.childNodes.length != 0 &&
        el.childNodes[el.childNodes.length - 1].nodeType == 3) {
        el.childNodes[0].textContent = text;
    } else {
        var doc = /**@type{HTMLDocument}*/ (document);
        append(el, doc.createTextNode(text));
    }
}                                                                 //setInnerText

// -----------------------------------------------------------------------------
// # DOM Positioning Functions

/** absoluteX: Returns the absolute left (x-axis) position of an element,
 *  or zero if the element is not valid or can not be located.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!number}
 */
function absoluteX(el) {
    if (el === null) {
        return 0;
    }
    if (el.getBoundingClientRect) {  // not supported in Firefox 1
        return el.getBoundingClientRect().left;
    }
    var offsetPrev = N(el.offsetLeft);
    var x = 0;
    do {
        var offset = N(el.offsetLeft);
        if (offset != 0 && offset != offsetPrev) {
            offset = N(el.offsetLeft);
            x += offset;
            offsetPrev = offset;
        }
        el = /**@type{!HTMLElement}*/ (el.parentNode);
    } while (el.tagName.toLowerCase() != "html");
    return x;
}                                                                    //absoluteX

/** absoluteY: Returns the absolute top (y-axis) position of an element,
 *  or zero if the element is not valid or can not be located.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!number}
 */
function absoluteY(el) {
    if (el === null) {
        return 0;
    }
    if (el.getBoundingClientRect) {  // not supported in Firefox 1
        return el.getBoundingClientRect().top;
    }
    var offsetPrev = N(el.offsetTop);
    var y          = 0;
    do {
        var offset = N(el.offsetTop);
        if (offset != 0 && offset != offsetPrev) {
            offset = N(el.offsetTop);
            y += offset;
            offsetPrev = offset;
        }
        el = /**@type{!HTMLElement}*/ (el.parentNode);
    } while (el.tagName.toLowerCase() != "html");
    return y;
}                                                                    //absoluteY

/** centerInWindow: Centers the specified element (usually a 'div')
 *  in the window and changes the element's positioning to 'absolute'.
 *
 *  Note: the top position is never less than 50 pixels.
 *
 *  @param {HTMLElement} el
 */
function centerInWindow(el) {
    if (el === null) {
        return;
    }
    var x = Math.round((windowWidth()  - el.offsetWidth)  / 2);
    var y = Math.round((windowHeight() - el.offsetHeight) / 2);
    if (y < 50) {
        y = 50;
    }
    if (position(el) != "absolute") {
        position(el, "absolute");
    }
    if (left(el) != x + "px") {
        left(el, x);
    }
    if (mTop(el) != y + "px") {
        mTop(el, y);
    }
}                                                               //centerInWindow

/** offsetHeight: Returns the height of element (el), including
 *  margins and padding. If 'el' is null, returns 0.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!number}
 */
function offsetHeight(el) {
    if (el === null) {
        return 0;
    }
    return el.offsetHeight;
}                                                                 //offsetHeight

/** offsetWidth: Returns the width of element 'el'.
 *  If 'el' is null, returns 0.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!number}
 */
function offsetWidth(el) {
    if (el === null) {
        return 0;
    }
    return el.offsetWidth;
}                                                                  //offsetWidth

/** windowHeight: Returns the height of the browser window.
 *
 *  @return {!number}
 */
function windowHeight() {
    if (window.innerHeight) {
        return N(window.innerHeight);
    }
    if (document.documentElement.clientHeight) {
        return N(document.documentElement.clientHeight);
    }
    return -1;
}                                                                 //windowHeight

/** windowWidth: Returns the width of the browser window.
 *
 *  @return {!number}
 */
function windowWidth() {
    if (window.innerWidth) {
        return window.innerWidth;
    }
    if (document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    }
    return -1;
}                                                                  //windowWidth

/** x: Returns the left (x-axis) position of an element 'el'.
 *  If 'el' is null, returns 0.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!number}
 */
function x(el) {
    if (el === null) {
        return 0;
    }
    if (el.getBoundingClientRect) {  // not supported in Firefox 1
        return el.getBoundingClientRect().left;
    }
    return el.offsetLeft;
}                                                                            //x

/** y: Returns the top (y-axis) position of an element 'el'.
 *  If 'el' is null, returns 0.
 *
 *  @param {!HTMLElement} el
 *
 *  @return {!number}
 */
function y(el) {
    if (el === null) {
        return 0;
    }
    if (el.getBoundingClientRect) {  // not supported in Firefox 1
        return el.getBoundingClientRect().top;
    }
    return el.offsetTop;
}                                                                            //y

/** zIndexMax: Returns the maximum z-index of
 *  all DIV elements in the current document.
 *
 *  @return {!number}
 */
function zIndexMax() {
    var max  = -1000000;
    var divs = body().getElementsByTagName("div");
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].style.zIndex > max) {
            max = N(divs[i].style.zIndex);
        }
    }
    if (max < 0) {
        max = 0;
    }
    return N(max);
}                                                                    //zIndexMax

// -----------------------------------------------------------------------------
// # Event Functions

/** cancelEvent: Cancels the event 'ev'.
 *
 *  @param {Event} ev
 */
function cancelEvent(ev) {
    if (undef(typeof ev)) {  //IE
        //TODO: Firefox doesn't have Window.event
        ev = /**@type{!zr.IWindow}*/ (window).event;
    } else if (def(typeof ev.preventDefault)) {  // Firefox
        ev.preventDefault();
    } else {
        ev.returnValue = false;
    }
}                                                                  //cancelEvent

/** eventSrc: Returns the element that triggered the given event 'ob'.
 *  Note that this element may be a child of the
 *  element that has the event handler.
 *
 *  @param {(Element|Event)} ob
 *
 *  @return {HTMLElement}
 */
function eventSrc(ob) {
    if (typeof ob == "boolean") {
        return null;
    }
    // Mozilla/Firefox passes the event object as an argument
    if (typeof ob == "object") {
        if (ob.currentTarget) {
            return /**@type{HTMLElement}*/ (ob.currentTarget);
        }
        if (ob.srcElement) {
            return /**@type{HTMLElement}*/ (ob.srcElement);
        }
        if (ob.nodeName) {
            return /**@type{HTMLElement}*/ (ob);
        }
        err(0xE3FC92);                // eventSrc(): failed getting event source
        return null;
    }
    // IE does not, so use the 'window' object to get the event,
    // but do not return yet, check frames
    if (/**@type{!zr.IWindow}*/ (window).event) {
        var wnd = /**@type{!zr.IWindow}*/ (window);
        if (wnd.event.srcElement) {
            return /**@type{HTMLElement}*/ (wnd.event.srcElement);
        }
        err(0xE3C502);                // eventSrc(): failed getting event source
    }
    wnd = /**@type{!zr.IWindow}*/ (window);
    if (wnd.frames[0]) {
        wnd = /**@type{!zr.IWindow}*/ (wnd.frames[0]);
        if (wnd.event && wnd.event.srcElement) {
            return /**@type{HTMLElement}*/ (wnd.event.srcElement);
        }
        err(0xEF4D1E);                // eventSrc(): failed getting event source
        return null;
    }
    //TODO: add a loop to iterate through all frames
    //TODO: check IE compatibility with [0] !!!
    err(0xE0B3D9);         // eventSrc(): event source not found, returning null
    return null;
}                                                                     //eventSrc

/** listen: Adds an event listener to the specified element(s).
 *  e.g. listen('change', function() { alert('changed'); }, 'id_box')
 *
 *  @param {string} eventName
 *  @param {!function(Event)} callback
 *  @param {Array<(HTMLDocument|HTMLElement|string)>} elements
 */
function listen(eventName, callback, elements) {
    for (var i = 0, count = elements.length; i < count; i++) {
        var el = /**@type{HTMLElement}*/
                 (sel(/**@type{(HTMLElement|string)}*/ (elements[i])));
        if (el !== null) {
            if (el.addEventListener) {
                if (eventName.substring(0, 2) == "on") {
                    eventName = eventName.substring(2);
                }
                el.addEventListener(eventName, callback, true);
            } else if (el.attachEvent) {
                if (eventName.substring(0, 2) != "on") {
                    eventName = "on" + eventName;
                }
                el.attachEvent(eventName, callback);
            }
        }
    }
}                                                                       //listen

/** unlisten: Removes an event listener from the specified element(s).
 *
 *  @param {string} eventName
 *  @param {!function(Event)} callback
 *  @param {Array<(HTMLDocument|HTMLElement|string)>} elements
 */
function unlisten(eventName, callback, elements) {
    for (var i = 0, count = elements.length; i < count; i++) {
        var el = /**@type{HTMLElement}*/
                 (sel(/**@type{(HTMLElement|string)}*/ (elements[i])));
        if (el.removeEventListener) {
            el.removeEventListener(eventName, callback, false);
        } else if (el.detachEvent) {
            el.detachEvent("on" + eventName, callback);
        }
    }
}                                                                     //unlisten

// -----------------------------------------------------------------------------
// # Functional Programming Functions

/** combine: Creates an object combining all the properties
 *  (keys and values) of the specified objects.
 *
 *  If an object next in the series has a property defined in
 *  the previuos object, the previous value is overwritten.
 *
 *  You can pass arrays of objects in each argument.
 *
 *  You can also pass arrays of arrays with two elements. In such
 *  cases each inner array should have exactly two elements: The
 *  first array element must be a string which becomes the key,
 *  while the second array element can be any type, which becomes
 *  the value.
 *
 *  Example:
 *      combine([ ["name",     "Smeagol"], ["nickname", "Gollum"] ],
 *              { "address": "Moria } )
 *
 *      returns:
 *          {
 *              name:     "Smeagol",
 *              nickname: "Gollum",
 *              address:  "Moria"
 *          }
 *
 *  Note: The function does not carry out a deep-nested merge!
 *
 *  @param {...(Object|Array)} objects
 *
 *  @return {Object}
 */
function combine(objects) {
    if (objects === null) {
        return {};
    }
    var ar       = [];
    var arg      = null;
    var argCount = arguments.length;
    var argNo    = 0;
    var count    = 0;
    var i        = 0;
    var itm      = null;
    var ob       = null;
    var propName = "";
    var ret      = {};
    //
    // create a uniform array of objects
    while (argNo < argCount) {
        arg = /**@type{(Object|Array)}*/ (arguments[argNo++]);
        //
        // first check if 'arg' is an array (as arrays are also objects);
        if (isArray(arg)) {
            arg = /**@type{Array}*/ (arg);
            for (i = 0, count = arg.length; i < count; i++) {
                itm = /**@type{(Object|Array)}*/ (arg[i]);
                if (isArray(itm)) {
                    if (/**@type{Array}*/ (itm).length == 2 &&
                        typeof itm[0] == "string") {
                            ob = {};
                            ob[itm[0]] = itm[1];
                            ar.push(ob);
                    } else {
                        err(0xEB62DC);     // combine(): length of item is not 2
                    }
                } else if (isObject(itm)) {
                    ar.push(itm);
                }
            }
        } else if (isObject(arg)) {
            ar.push(arg);
        }
    }
    // read and set all properties on the returned object
    for (i = 0, count = ar.length; i < count; i++) {
        itm = /**@type{Object}*/ (ar[i]);
        for (propName in itm) {
            ret[propName] = itm[propName];
        }
    }
    return ret;
}                                                                      //combine

/** every: Returns true if predicateFn() returns true for every
 *  item in array 'ar', or false if array is null or empty.
 *
 *  The predicate function has 3 arguments:
 *  predicateFn(item, index, ar)
 *
 *  @param {Array} ar
 *  @param {!function(?,number=,Array=):boolean} predicateFn
 *
 *  @return {boolean}
 */
function every(ar, predicateFn) {
    if (typeof predicateFn != "function") {
        err(0xE1C2E8);           // every(): arg 'predicateFn' is not a function
        return false;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE68718);          // every(): arg 'ar' is not an array or null
        }
        return false;
    }
    var count = ar.length;
    if (count < 1) {
        return false;
    }
    for (var i = 0; i < count; i++) {
        if (!(predicateFn)(ar[i], i, ar)) {
            return false;
        }
    }
    return true;
}                                                                        //every

/** filter: Similar to Array.filter().
 *  Returns null if array 'ar' is null,
 *  or a new empty array if it is empty.
 *
 *  The predicate function has 3 arguments:
 *  predicateFn(item, index, ar)
 *
 *  @param {Array} ar
 *  @param {!function(?,number=,Array=):boolean} predicateFn
 *  @param {boolean=} selectTrue
 *
 *  @return {Array}
 */
function filter(ar, predicateFn, selectTrue) {
    if (typeof predicateFn != "function") {
        err(0xE8E4A3);          // filter(): arg 'predicateFn' is not a function
        return ar;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE5EF84);         // filter(): arg 'ar' is not an array or null
        }
        return null;
    }
    var count = ar.length;
    if (count < 1) {
        return [];
    }
    if (typeof selectTrue == "undefined") {
        selectTrue = true;
    }
    var ret = [];
    for (var i = 0; i < count; i++) {
        var res = predicateFn(ar[i], i, ar);
        if ((res && selectTrue) || (!res && !selectTrue)) {
            ret.push(ar[i]);
        }
    }
    return ret;
}                                                                       //filter

/** find: Similar to ES5 Array.find(), but returns null if item can
 *  not be matched. Returns the first item for which 'predicateFn'
 *  returned true, or null if array 'ar' is null or empty.
 *
 *  The predicate function has 3 arguments:
 *  predicateFn(item, index, ar)
 *
 *  @param {Array} ar
 *  @param {!function(?,number=,Array=):boolean} predicateFn
 *
 *  @return {*}
 */
function find(ar, predicateFn) {
    if (typeof predicateFn != "function") {
        err(0xE1EC5C);            // find(): arg 'predicateFn' is not a function
        return ar;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE6C9C4);           // find(): arg 'ar' is not an array or null
        }
        return null;
    }
    var count = ar.length;
    if (count < 1) {
        return null;
    }
    for (var i = 0; i < count; i++) {
        var itm = /**@type{*}*/ (ar[i]);
        if (predicateFn(itm)) {
            return itm;
        }
    }
    return null;
}                                                                         //find

/** forEach: Applies function 'applyFn' on every item in array 'ar'.
 *  Returns the same array it is passed.
 *
 *  @param {Array} ar
 *  @param {Function} applyFn(item, index, ar)
 *
 *  @return {Array}
 */
function forEach(ar, applyFn) {
    if (typeof applyFn != "function") {
        err(0xE416BC);             // forEach(): arg 'applyFn' is not a function
        return ar;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE8AF1D,         // forEach(): arg 'ar' is not an array or null
                ar);
        }
        return ar;
    }
    var count = ar.length;
    if (count < 1) {
        return ar;
    }
    if ("forEach" in ar) {
        ar.forEach (applyFn);
        return ar;
    }
    for (var i = 0; i < count; i++) {
        applyFn(ar[i], i, ar);
    }
    return ar;
}                                                                      //forEach

/** hasProperty: Returns true if an object has a given property.
 *  Returns false if 'ob' undefined, null, or not an object.
 *
 *  @param {string} propName
 *  @param {Object} ob
 *
 *  @return {!boolean}
 */
function hasProperty(propName, ob) {
    if (!isObject(ob)) {
        return false;
    }
    for (var name in ob) {
        if (name == propName) {
            return true;
        }
    }
    return false;
}                                                                  //hasProperty

/** isFound: Returns true if 'predicateFn'
 *  returns true applied to any item in 'ar'.
 *
 *  The predicate function has 3 arguments:
 *  predicateFn(item, index, ar)
 *
 *  @param {Array} ar
 *  @param {!function(?,number=,Array=):boolean} predicateFn
 *
 *  @return {!boolean}
 */
function isFound(ar, predicateFn) {
    if (typeof predicateFn != "function") {
        err(0xE4C1E5);         // isFound(): arg 'predicateFn' is not a function
        return false;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE67A21);        // isFound(): arg 'ar' is not an array or null
        }
        return false;
    }
    for (var i = 0, end = ar.length; i < end; i++) {
        if (predicateFn(ar[i], i, ar)) {
            return true;
        }
    }
    return false;
}                                                                      //isFound

/** isFn: Returns true if the specified value is a function.
 *
 *  @param {*} val
 *
 *  @return {!boolean}
 */
function isFn(val) {
    //
    // this check is needed because typeof null is 'object'
    var type = typeof val;
    if (type == "undefined" || val === null) {
        return false;
    }
    return type == "function";
}                                                                         //isFn

/** isOneOf: Returns true if 'val' is within array 'ar'.
 *  Returns null if array 'ar' is null or empty.
 *
 *  @param {*} val
 *  @param {Array} ar
 *
 *  @return {!boolean}
 */
function isOneOf(val, ar) {
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE2C727);        // isOneOf(): arg 'ar' is not an array or null
        }
        return false;
    }
    var count = ar.length;
    if (count < 1) {
        return false;
    }
    for (var i = 0; i < count; i++) {
        if (val == ar[i]) {
            return true;
        }
    }
    return false;
}                                                                      //isOneOf

/** keyValue: Given a key and a value,
 *  returns an object with one property and value.
 *
 *  @param {string} key
 *  @param {*} val
 *
 *  @return {!Object}
 */
function keyValue(key, val) {
    var ret = {};
    ret[key] = val;
    return ret;
}                                                                     //keyValue

/** map: Applies function 'applyFn' on every item in array 'ar' and
 *  returns a new array with the results. The returned array has
 *  the same length as 'ar'. The original array is not modified.
 *
 *  Returns null if array 'ar' is null,
 *  or a new empty array if it is empty.
 *
 *  @param {Array} ar
 *  @param {!function(?, number=, Array=):*} applyFn(item, index, ar)
 *
 *  @return {Array}
 */
function map(ar, applyFn) {
    if (typeof applyFn != "function") {
        err(0xEB880F);                 // map(): arg 'applyFn' is not a function
        return ar;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE52F65);            // map(): arg 'ar' is not an array or null
        }
        return null;
    }
    var count = ar.length;
    if (count < 1) {
        return [];
    }
    if ("map" in ar) {
        return ar.map(applyFn);
    }
    var ret = [];
    for (var i = 0; i < count; i++) {
        ret[i] = applyFn(ar[i], i, ar);
    }
    return ret;
}                                                                          //map

/** properties: Returns an array of Property objects given an object.
 *  Each property object is of the format:
 *  {'name':'pname', 'value':'pvalue'}
 *  where 'pname' and 'pvalue' is the property name and value.
 *
 *  @param {Object} ob
 *
 *  @return {Array<zr.Property>}
 */
function properties(ob) {
    var ret = [];
    for (var propName in ob) {
        ret.push({name: propName, value: ob[propName]});
    }
    return ret;
}                                                                   //properties

/** range: Returns a subrange of an array as a new array, starting
 *  from the item at the 'first' index, and ending with 'last', or
 *  the last index of the array. Returns null if array 'ar' is null,
 *  or a new empty array if it is empty.
 *
 *  @param {Array} ar
 *  @param {number} first
 *  @param {number} last
 *
 *  @return {Array}
 */
function range(ar, first, last) {
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE98A87);          // range(): arg 'ar' is not an array or null
        }
        return null;
    }
    var count = ar.length;
    if (count < 1) {
        return [];
    }
    var ret = [];
    for (var i = first; i < count && i <= last; i++) {
        ret.push(ar[i]);
    }
    return ret;
}                                                                        //range

/** reduce: Accumulates (folds) all the values of array 'ar'
 *  into one return value. Returns null if array 'ar' is null,
 *  or initialVal if it is empty.
 *
 *  The applied function has 4 arguments:
 *  applyFn(prev, curr, index, ar)
 *
 *  @param {Array} ar
 *  @param {!function(?,?,number=,Array=):*} applyFn
 *  @param {*=} initialVal
 *
 *  @return {*}
 */
function reduce(ar, applyFn, initialVal) {
    if (typeof applyFn != "function") {
        err(0xE3CB6D);              // reduce(): arg 'applyFn' is not a function
        return ar;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE52DCD);         // reduce(): arg 'ar' is not an array or null
        }
        return null;
    }
    var hasInitialVal = arguments.length == 3 && def(typeof initialVal);
    var count = ar.length;
    if (count < 1) {
        return hasInitialVal ? initialVal : null;
    }
    if ("reduce" in ar) {
        if (hasInitialVal) {
            return ar.reduce(applyFn, initialVal);
        }
        return ar.reduce(applyFn);
    }
    var i    = hasInitialVal ? 0          : 1;
    var prev = hasInitialVal ? initialVal : ar[0];
    var curr = /**@type{*}*/ (ar[i]);
    do {
        prev = applyFn(prev, curr, i, ar);
        i++;
        curr = /**@type{*}*/ (ar[i]);
    } while (i < count);
    return prev;
}                                                                       //reduce

/** until: Returns every element in array 'ar' before predicateFn()
 *  returns true. Returns null if array 'ar' is null,
 *  or a new empty array if it is empty.
 *
 *  The predicate function has 3 arguments:
 *  predicateFn(item, index, ar)
 *
 *  @param {Array} ar
 *  @param {!function(?,number=,Array=):boolean} predicateFn
 *
 *  @return {Array}
 */
function until(ar, predicateFn) {
    if (typeof predicateFn != "function") {
        err(0xE8D39F);           // until(): arg 'predicateFn' is not a function
        return ar;
    }
    if (!isArray(ar)) {
        if (ar !== null) {
            err(0xE91B1A);          // until(): arg 'ar' is not an array or null
        }
        return null;
    }
    var count = ar.length;
    if (count < 1) {
        return [];
    }
    var ret = [];
    for (var i = 0; i < count; i++) {
        if (predicateFn(ar[i], i, ar)) {
            break;
        }
        ret.push(ar[i]);
    }
    return ret;
}                                                                        //until

/** use: Applies function 'applyFn' on object 'ob' and returns the result.
 *  However, if 'ob' is undefined, returns undefined, and if ob
 *  is null or an empty array, returns null without calling 'applyFn'.
 *
 *  @param {Object} ob
 *  @param {!function(?, number=, Array=):*} applyFn(item, index, ar)
 *
 *  @return {*}
 */
function use(ob, applyFn) {
    if (typeof applyFn != "function") {
        err(0xE22152);                 // use(): arg 'applyFn' is not a function
        return null;
    }
    if (!isObject(ob)) {
        if (ob !== null) {
            err(0xE88E4A);            // use(): arg 'ob' is not an array or null
        }
        return null;
    }
    if (/**@type{Object}*/ (ob) === null ||
        (isArray(ob) && /**@type{Array}*/ (ob).length < 1)) {
            return null;
    }
    return applyFn(ob);
}                                                                          //use

// -----------------------------------------------------------------------------
// # General-Purpose Functions

/** backToPage: Navigates to a page set with setBackPage().
 *
 *  @param {?string} optPageName
 */
function backToPage(optPageName) {
    var pageName = optPageName || "zr_rp";
    if (def(typeof sessionStorage)) {
        var /**@type{?string}*/ h = sessionStorage[pageName];
        if (typeof h == "string") {
            location.href = S(h);
            return;
        }
    }
    history.back();  // or window.history.go(-1);
}                                                                   //backToPage

/** browserType: Returns the browser type:
 *  'chrome', 'firefox', 'msie', 'safari', 'opera', 'seamonkey' or 'other'
 *
 *  @return {!string}
 */
function browserType() {
    var agent = navigator.userAgent.toLowerCase();
    if (/seamonkey/.test(agent)) {
        return "seamonkey";
    }
    if (/firefox/.test(agent)) {
        return "firefox";
    }
    if (/chrome/.test(agent)) {
        return "chrome";
    }
    if (/safari/.test(agent)) {
        return "safari";
    }
    if (/msie/.test(agent)) {
        return "msie";
    }
    if (/opera/.test(agent)) {
        return "opera";
    }
    return "other";
}                                                                  //browserType

/** def: Returns true if 'typeStr' is not 'undefined'.
 *  Always call def() like this: def(typeof varName).
 *
 *  @param {string} typeStr
 *
 *  @return {!boolean}
 */
function def(typeStr) {
    return typeStr != "undefined";
}                                                                          //def

/** err: Logs an error message. If 'console' is available, displays the
 *  message in the console, otherwise displays a popup message (alert).
 *
 *  @param {number} errorNum
 *  @param {...*} values
 */
function err(errorNum, values) {
    //
    // if error messages are available, lookup the error description
    // (to save resources, messages are not loaded in production deployment)
    var hex = errorNum.toString(16).toUpperCase();
    var msg = "Error 0x" + hex;
    if (window["zr_errors"]) {
        var errors = /**@type{Array<string>}*/ (window["zr_errors"]);
        var findNum = msg.substring(2);
        for (var i = 0, count = errors.length; i < count; i++) {
            var s = errors[i];
            if (s.substring(0, 6) == hex) {
                msg += s.substring(6);
                break;
            }
        }
    }
    if (def(typeof console)) {
        console.log(msg);
        for (i = 1, count = arguments.length; i < count; i++) {
            console.log(arguments[i]);
        }
    } else {
        for (i = 1, count = arguments.length; i < count; i++) {
            msg += ' ' + S(arguments[i]);
        }
        alert(msg);
    }
    debugger; // break in err() function
}                                                                          //err

/** getOn: Reads .zr.setting from an object.
 *
 *  @param {Object} ob
 *  @param {string} name
 *  @param {(boolean|number|string|null)=} defaultVal
 *
 *  @return {*}
 */
function getOn(ob, name, defaultVal) {
    if (typeof defaultVal == "undefined") {
        defaultVal = null;
    }
    if (ob            !== null && typeof ob            == "object" &&
        ob["zr"]       !== null && typeof ob["zr"]       == "object" &&
        ob["zr"][name] !== null && typeof ob["zr"][name] != "undefined") {
            return /**@type{*}*/ (ob["zr"][name]);
    }
    return defaultVal;
}                                                                        //getOn

/** getVal: Gets an element's or object's 'value' property.
 *
 *  @param {Object} ob
 *
 *  @return {*}
 */
function getVal(ob) {
    return ob[("value")];
}                                                                       //getVal

/** httpDelete: Sends a HTTP DELETE request via XMLHttpRequest.
 *
 *  @param {(string|Array)} url
 *  @param {!function(zr.Response)} callback
 */
function httpDelete(url, callback) {
    httpRequest("delete", url, "", callback);
}                                                                   //httpDelete

/** httpGet: Sends a HTTP GET request via XMLHttpRequest.
 *
 *  @param {(string|Array)} url
 *  @param {!function(zr.Response)} callback
 */
function httpGet(url, callback) {
    httpRequest("get", url, "", callback);
}                                                                      //httpGet

/** httpPost: Sends a HTTP POST request via XMLHttpRequest.
 *
 *  @param {(string|Array)} url
 *  @param {string} data
 *  @param {!function(zr.Response)} callback
 */
function httpPost(url, data, callback) {
    httpRequest("post", url, data, callback);
}                                                                     //httpPost

/** httpPut: Sends a HTTP PUT request via XMLHttpRequest.
 *
 *  @param {(string|Array)} url
 *  @param {string} data
 *  @param {!function(zr.Response)} callback
 */
function httpPut(url, data, callback) {
    httpRequest("put", url, data, callback);
}                                                                      //httpPut

/** httpRequest: Sends a HTTP request via XMLHttpRequest.
 *
 *  @param {string} method
 *  @param {(string|Array)} url
 *  @param {string} data
 *  @param {!function(zr.Response)} callback
 */
function httpRequest(method, url, data, callback) {
    method = method.toUpperCase();
    if (typeof url == "string") {
        /**@type{string}*/
        var urlStr = S(url);
    } else if (isArray(url)) {
        urlStr = "";
        for (var i = 0, count = url.length; i < count; i++) {
            urlStr += "/" + S(url[i]);
        }
    } else {
        err(0xE6E7B3);      // httpRequest(): arg 'url' is not a string or array
        return;
    }
    urlStr = urlStr.toLowerCase();
    var resp = /**@type{!zr.Response}*/
               ({ err: 0, status: 0, status_text: "", text: "" });
    if (window.ActiveXObject) {
        var /**@type{XMLHttpRequest}*/ xhr = /**@type{XMLHttpRequest}*/
            (   new /**@type{!function(new:Object,string)}*/
                (ActiveXObject)("Microsoft.XMLHTTP")                         );
    } else {
        xhr = new XMLHttpRequest();
    }
    // append a timestamp+random string, to guarantee caching is disabled
    var timestamp = "_" + "_" + (new Date()).getTime() + "_" +
        ("" + Math.random()).substr(2, 4);
    xhr.open(method, urlStr + "/" + timestamp, true);
    xhr.setRequestHeader("Content-Type",  "application/json");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.onreadystatechange =
        function() {
            switch (xhr.readyState) {
            case 0:  // uninitialized
            case 1:  // loading
            case 2:  // loaded
            case 3:  // interactive
                break;
            case 4:
                resp["err"]         = xhr.status == 200 ? 0 : 1;
                resp.status      = xhr.status;
                resp["status_text"] = xhr.statusText;
                resp.text        = xhr.responseText;
                /*
                console.log("httpReq()", resp["status_text"], ": ", resp.text);
                */
                callback(resp);
                break;
            default:
                resp["err"]         = 2;
                resp.status      = xhr.status;
                resp["status_text"] = xhr.statusText;
                resp.text        = "";
                xhr.abort();
                //console.log("httpRequest() -> failed");
                callback(resp);
                break;
            }
        };
    try {
        xhr.send(data);
    } catch(ex) {
        resp["err"]         = 3;
        resp.status      = 0;
        resp["status_text"] = "xhr.send() error";
        callback(resp);
    }
}                                                                  //httpRequest

/** isArray: Returns true if the specified object 'ob' is an array.
 *
 *  @param {*} ob
 *
 *  @return {!boolean}
 */
function isArray(ob) {
    if (typeof ob == "undefined" || ob === null) {
        return false;
    }
    if (Array.isArray) {
        return Array.isArray(ob);
    }
    return Object.prototype.toString.call(ob) == "[object Array]";
}                                                                      //isArray

/** isIE6: Returns true if the browser is Internet Exlorer 6.
 *
 *  @return {!boolean}
 */
function isIE6() {
    return undef(typeof document.body.style.maxHeight);
}                                                                        //isIE6

/** isObject: Returns true if the specified value is an object.
 *
 *  @param {*} val
 *
 *  @return {!boolean}
 */
function isObject(val) {
    // this check is needed because typeof null is 'object'
    var type = typeof val;
    if (type == "undefined" || val === null) {
        return false;
    }
    return type == "object";
}                                                                     //isObject

/** isTrue: Returns true if 'val' evaluates
 *  to true based on following condition:
 *  - already a boolean true
 *  - any nonzero number
 *  - a string that equals 'true' (trimmed, case-insensitive)
 *
 *  @param {*} val
 *
 *  @return {!boolean}
 */
function isTrue(val) {
    return (typeof val == "boolean" && val === true) ||
           (typeof val == "number"  && val != 0)     ||
           (typeof val == "string"  && trim(S(val)).toLowerCase() == "true");
}                                                                       //isTrue

/** max: Returns the greater of two numbers or strings.
 *
 *  @param {(number|string)} a
 *  @param {(number|string)} b
 *
 *  @return {(number|string)}
 */
function max(a, b) {
    return a > b ? a : b;
}                                                                          //max

/** min: Returns the lesser of two numbers or strings.
 *
 *  @param {(number|string)} a
 *  @param {(number|string)} b
 *
 *  @return {(number|string)}
 */
function min(a, b) {
    return a < b ? a : b;
}                                                                          //min

/** nodeTypeName: Returns the name of a node type,
 *                given a node type number.
 *
 *  To get the actual name of a node, e.g. 'DIV',
 *  use the element's 'nodeName' property instead.
 *
 *  @param {number} nodeTypeNum
 *
 *  @return {!string}
 */
function nodeTypeName(nodeTypeNum) {
    switch (nodeTypeNum) {
    case 1:  return "element";
    case 2:  return "attribute";
    case 3:  return "text";
    case 4:  return "cdata_section";
    case 5:  return "entity_reference";
    case 6:  return "entity";
    case 7:  return "processing_instruction";
    case 8:  return "comment";
    case 9:  return "document";
    case 10: return "document_type";
    case 11: return "document_fragment";
    case 12: return "notation";
    }
    return "";
}                                                                 //nodeTypeName

/** setBackPage: Sets a referer page. Used by backToPage().
 *
 *  @param {?string} optPageName
 *  @param {?string} optHref
 */
function setBackPage(optPageName, optHref) {
    if (undef(typeof sessionStorage)) {
        return;
    }
    var href = optHref || S(location.href);
    if (href.substr(href.length - 1, 1) == "#") {
        href = href.substr(0, href.length - 1);
    }
    sessionStorage.setItem(optPageName || "zr_rp", href);
}                                                                  //setBackPage

/** setOn: Attaches .zr.setting to an object.
 *
 *  @param {Object} ob
 *  @param {string} name
 *  @param {*} val
 */
function setOn(ob, name, val) {
    if (undef(typeof ob["zr"])) {
        ob["zr"] = {};
    }
    ob["zr"][name] = val;
}                                                                        //setOn

/** setVal: Sets an element's or object's 'value' property.
 *
 *  @param {Object} ob
 *  @param {*} value
 */
function setVal(ob, value) {
    ob.value = value;
}                                                                       //setVal

/** showNotification: Displays a 'traffic light'
 *  notification that fades after a few seconds.
 *
 *  @param {string} msg
 *  @param {string} color
 */
function showNotification(msg, color) {
    var div = selID("zr_nt");
    if (div === null) {
        div = /**@type{HTMLDivElement}*/ (makeEl("div", ["zr_nt"]));
        div.id = "zr_nt";
        append(body(), append(div, makeEl("label")));
    }
    div.style.backgroundColor = color;
    var label = /**@type{!HTMLLabelElement}*/ (children(div)[0]);
    setInnerText(label, msg);
    var opac  = 0.6;
    var timer = setInterval(updateTimer, 50);
    function updateTimer() {
        opac -= 0.01;
        opacity(div, opac);
        if (opac < 0) {
            clearInterval(timer);
        }
    }
}                                                             //showNotification

/** undef: Returns true if 'typeStr' is 'undefined'.
 *  Always call undef() like this: undef(typeof varName).
 *
 *  @param {string} typeStr
 *
 *  @return {!boolean}
 */
function undef(typeStr) {
    return typeStr == "undefined";
}                                                                        //undef

/** url: Builds a path from the specified part(s).
 *  The returned path never ends with a slash
 *
 *  @param {...(string|Array|Arguments)} parts
 *
 *  @return {!string}
 */
function url(parts) {
    var ret = "";
    for (var i = 0, end = arguments.length; i < end; i++) {
        var arg = /**@type{(string|Array|Arguments)}*/ (arguments[i]);
        var s = "";
        if (isArray(arg)) {
            for (var j = 0; j < arg.length; j++) {
                if (j > 0) {
                    s += "/";
                }
                s += trim(trim(trim(
                        /**@type{string}*/ (arg[j])), "#"), "/");
            }
        } else if (typeof arg == "object" && arg.length) {
            s = url(Array.prototype.slice.call(arg));
        } else if (typeof arg == "string") {
            s = trim(trim(trim(/**@type{string}*/ (arg)), "#"), "/");
        }
        if (s.length == 0) {
            continue;
        }
        if (i > 0 && s.charAt(0) != "/") {
            ret += "/" + s;
        } else {
            ret += s;
        }
    }
    // add leading slash
    if (ret.charAt(0) != "/" &&
        ret.substr(0, 5) != "http:" && ret.substr(0, 5) != "https:") {
            ret = "/" + ret;
    }
    // trim trailing slash
    if (ret.charAt(ret.length - 1) == "/") {
        ret = ret.substr(0, ret.length - 1);
    }
    return ret;
}                                                                          //url

/** urlArg: Returns an argument read from
 *          the address of the current page.
 *
 *  @param {string} argName
 *  @param {string} url
 *
 *  @return {!string}
 */
function urlArg(argName, url) {
    argName = trim(argName, "=") + "=";
    var parts = S(location.href).split("/");
    for (var i = parts.length - 1; i >= 0; i--) {
        var arg = parts[i];
        if (begins(arg, argName)) {
            return arg.substr(argName.length);
        }
    }
    return "";
}                                                                       //urlArg

/** versionIE: Returns the Internet Explorer version.
 *  Note that IE11 returns 'mozilla' in its user agent string,
 *  so this function returns 0 for IE11 or any non-IE browser.
 *
 *  @return {!number}
 */
function versionIE() {
    var agent = navigator.userAgent.toLowerCase();
    return !/msie/.test(agent) ? 0 : parseInt(agent.split("msie")[1], 10);
}                                                                    //versionIE

// -----------------------------------------------------------------------------
// # Numeric Functions

/** N: Converts the given value to a number,
 *     ignoring thousands delimiters.
 *
 *  -  If 'val' is already a number, returns it unchanged.
 *     This includes NaN, Infinity and -Infinity.
 *
 *  -  If it is a string, it is converted to a number using
 *     parseFloat(), or zero if the string is not numeric.
 *
 *  -  Given a string that ends with '%', returns 'val' / 100.
 *
 *  -  If 'val' is null, returns zero.
 *
 *  -  For any other type (such as object),
 *     logs an error message and returns zero.
 *
 *  @param {*} val
 *
 *  @return {!number}
 */
function N(val) {
    var type           = typeof val;
    var groupSeparator = ",";
    var defaultVal     = 0;
    if (type == "number") {
        return /**@type{number}*/ (val);
    }
    if (type == "string") {
        val = trim(S(val));
        var len = val.length;
        if (len == 0) {
            return defaultVal;
        }
        var isPercent = val.substr(len - 1, 1) == "%";
        if (isPercent) {
            val = trim(val.substr(0, len - 1));
            len = val.length;
        }
        var i  = 0;
        var ch = val.charAt(i);
        if (ch == "-" || ch == "+") {
            i++;
        }
        if (!isDigitOrDot(val.charAt(i)) ||
            !isDigitOrDot(val.charAt(len - 1))) {
                return defaultVal;
        }
        var prevDigit;
        while (i < len) {
            ch = val.charAt(i++);
            if (ch == ".") {
                var hasDot;
                if (hasDot) {
                    return defaultVal;
                }
                hasDot    = true;
                prevDigit = false;
            } else if (ch == groupSeparator) {
                if (!prevDigit) {
                    return defaultVal;
                }
                prevDigit = false;
            }
            else if (isDigit(ch)) {
                prevDigit = true;
            }
            else {
                return defaultVal;
            }
        }
        if (contains(val, groupSeparator)) {
            val = replace(val, groupSeparator, "");
        }
        val = parseFloat(val);
        if (isNaN(val)) {
            val = 0;
        }
        if (isPercent) {
            val /= 100;
        }
        return val;
    }
    return defaultVal;
    /** isDigit: returns true if character 'ch' is a decimal digit
     *  @param {string} ch
     *  @return {boolean}
     */
    function isDigit(ch) {
        return ch >= "0" && ch <= "9";
    }
    /** isDigitOrDot: returns true if 'ch' is a decimal digit or '.'
     *  @param {string} ch
     *  @return {boolean}
     */
    function isDigitOrDot(ch) {
        return isDigit(ch) || ch == ".";
    }
}                                                                            //N

/** formatNumber: Delimits a number with ','
 *  for thousands separators and with the
 *  specified number of decimal places.
 *
 *  @param {(number|string)} num
 *  @param {number=} decimalPlaces
 *
 *  @return {!string}
 */
function formatNumber(num, decimalPlaces) {
    if (arguments.length < 2 || undef(typeof decimalPlaces)) {
        decimalPlaces = -1;
    }
    /** sign: __
     *  @param {string} s
     *  @return {string}
     */
    function sign(s) {
        return contains(s, "-") ? "-" : "";
    }
    /** integerPart: __
     *  @param {Array<string>} ar
     *  @return {string}
     */
    function integerPart(ar) {
        return until(   ar,
                        /** @param {string} ch */
                        function(ch) {
                            return ch == ".";
                        }
                    ).join("");
    }
    /** decimalPart: __
     *  @param {string} s
     *  @param {number} dp
     *  @return {string}
     */
    function decimalPart(s, dp) {
        if (dp == 0) {
            return "";
        }
        var pos = s.indexOf(".");
        s = pos < 0  ? (dp > 0 ? "." : "") :
              dp == -1 ? s.substr(pos) :
                         s.substr(pos, dp + 1);
        while (s.length < dp + 1) {
            s += "0";
        }
        return s;
    }
    /** group: __
     *  @param {Array<string>} ar
     *  @return {Array<string>}
     */
    function group( ar) {
        var s = ar[0];
        var len = s.length;
        if (len > 3) {
            ar.splice(0, 0, s.substr(0, len - 3));
            ar[1] = s.substr(len - 3);
            ar    = group(ar);
        }
        return ar;
    }
    // extract numeric characters from argument
    num = S(num);
    var digits = filter(    num.split(""),
                            /** @param {string} ch */
                            function(ch) {
                                return (ch >= "0" && ch <= "9") || ch == ".";
                            });
    return sign(num) + group([integerPart(digits)]).join(",") +
           decimalPart(num, N(decimalPlaces));
}                                                                 //formatNumber

/** isNumber: Returns true if 'val' is numeric.
 *  Returns false if 'val' is NaN, Infinity,
 *  -Infinity, a non-numeric string or any
 *  type other than 'number' or 'string'.
 *
 *  @param {*} val
 *
 *  @return {!boolean}
 */
function isNumber(val) {
    var type = typeof val;
    if (type == "number") {
        return !isNaN(val) && val != Infinity && val != -Infinity;
    }
    if (type == "string") {
        val = trim(S(val));
        var groupSeparator  = groupSeparator || ",";
        var decimalPoint    = decimalPoint   || ".";
        var whiteSpaces     = whiteSpaces    || " ";
        var hasDecimalPoint = false;
        var hasDigit        = false;
        var i               = 0;
        var len             = val.length;
        var ch              = "";
        var prevSep         = "";
        if (len < 1) {
            return false;
        }
        // ignore prefixed sign
        ch = val.charAt(0);
        if (ch == "+" || ch == "-") {
            i++;
        }
        // get suffixed percent mark
        if (len > 1) {
            ch = val.charAt(len - 1);
            if (ch == "%") {
                len--;
            }
        }
        while (i < len) {
            ch = val.charAt(i++);
            if (ch >= "0" && ch <= "9") {
                hasDigit = true;
            } else if (ch == groupSeparator) {
                // two consecutive group separators make string non-numeric
                if (prevSep || !hasDigit) {
                    return false;
                }
                prevSep = true;
                continue;
            } else if (ch == decimalPoint) {
                if (hasDecimalPoint) {
                    return false;
                }
                hasDecimalPoint = true;
            } else {
                return false;
            }
            prevSep = false;
        }
        return hasDigit;
    }
    return false;
}                                                                     //isNumber

// -----------------------------------------------------------------------------
// # String Functions

/** S: Converts a simple value (or joins many values) into a string.
 *  Null and undefined values convert to zero-length strings.
 *
 *  @param {...*} values
 *
 *  @return {!string}
 */
function S(values) {
    // - - - - - - - use string literals - - - - - - -
    switch (arguments.length) {
    case 0:
        return "";
    case 1:
        if (typeof values == "string") {
            return values;
        }
        if (values === null || typeof values == "undefined") {
            return "";
        }
        return ("" + values).substr(0);
    default:
        var ret = "";
        for (var i = 0, end = arguments.length; i < end; i++) {
            var v = /**@type{string}*/ (arguments[i]);
            if (v === null || typeof v == "undefined") {
                continue;
            }
            if (typeof v == "string") {
                ret += v;
            } else {
                ret += ("" + v).substr(0);
            }
        }
        return ret;
    }
    // - - - - - - - use string literals - - - - - - -
}                                                                            //$

/** begins: Returns true if string 's' begins with 'find'.
 *  The comparison is case-sensitive.
 *
 *  @param {string} s
 *  @param {string} find
 *
 *  @return {!boolean}
 */
function begins(s, find) {
    var findLen = find.length;
    if (s.length < findLen) {
        return false;
    }
    return s.substring(0, findLen) == find;
}                                                                       //begins

/** contains: Returns true if string 's' contains string 'find'.
 *  The comparison is case-sensitive.
 *
 *  @param {string} s
 *  @param {string} find
 *
 *  @return {!boolean}
 */
function contains(s, find) {
    return s.indexOf(find) != -1;
}                                                                     //contains

/** diff: Levenstein string difference function.
 *
 *  @param {string} a
 *  @param {string} b
 *
 *  @return {!number}
 */
function diff(a, b) {
    var m = /**@type{Array<Array<number>>}*/ ([]);  // matrix
    if (!(a && b)) {
        return (b || a).length;
    }
    for (var i = 0; i <= b.length; i++) {
        m[i] = [i];
    }
    for (var j = 0; j <= a.length; j++) {
        m[0][j] = j;
    }
    var min = Math.min;
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) == a.charAt(j - 1)) {
                m[i][j] = m[i - 1][j - 1];
            } else {
                m[i][j] = min(m[i - 1][j - 1] + 1,
                          min(m[i    ][j - 1] + 1,
                              m[i - 1][j    ] + 1));
            }
        }
    }
    return m[b.length][a.length];
}                                                                         //diff

/** ends: Returns true if string 's' ends with 'find'.
 *  The comparison is case-sensitive.
 *
 *  @param {string} s
 *  @param {string} find
 *
 *  @return {!boolean}
 */
function ends(s, find) {
    var strLen = s.length;
    var findLen = find.length;
    if (strLen < findLen) {
        return false;
    }
    return s.substring(strLen - findLen) == find;
}                                                                         //ends

/** extractStrings: Returns an array of strings from
 *                  a variable number of arguments.
 *
 *  Flattens arrays to return a single-dimensional array.
 *
 *  Ignores null values.
 *
 *  @param {...*} args
 *
 *  @return {!Array<!string>}
 */
function extractStrings(args) {
    var ret = [];
    for (var i = 0, count = arguments.length; i < count; i++) {
        /**@type{*}*/
        var val = arguments[i];
        if (val === null) {
            continue;
        }
        var t = typeof val;
        if (t == "string") {
            ret.push(val);
        } else if (isArray(val)) {
            ret = ret.concat(extractStrings.apply(  //TODO: avoid apply();
                extractStrings, /**@type{Array}*/ (val)));
        } else {
            ret.push(S(val));
        }
    }
    return ret;
}                                                               //extractStrings

/** isString: Returns true if the specified value is a string.
 *
 *  @param {*} val
 *
 *  @return {!boolean}
 */
function isString(val) {
    var type = typeof val;
    // this check is needed because typeof null is 'object'
    if (type == "undefined" || val === null) {
        return false;
    }
    return type == "string";
}                                                                     //isString

/** json: Converts the given object 'ob' to its JSON representation.
 *
 *  @param {Object} ob
 *  @param {boolean=} optLineBreaks
 *
 *  @return {!string}
 */
function json(ob, optLineBreaks) {
    if (undef(typeof ob) || ob === null) {
        return "";
    }
    if (undef(typeof optLineBreaks)) {
        optLineBreaks = false;
    }
    var isArr = isArray(ob);
    var ret   = (isArr ? "[" : "{");
    var last  = -1;
    var i     = 0;
    var propName;
    if (optLineBreaks) {
        ret += "\n";
    }
    for (propName in ob) {
        last++;
    }
    for (propName in ob) {
        var /**@type{Object}*/ val = ob[propName];
        propName = "\"" + propName + "\"" + ":" + " ";
        if (val === null) {
            ret += propName + "null";
        } else {
            switch (typeof val) {
            case "string":
                if (!isArr) {
                    ret += propName;
                }
                ret += "\"" + escape(S(val)) + "\"";
                break;
            case "object":
                if (isArr) {
                    ret += json(val, optLineBreaks);  // array
                } else {
                    ret += propName + json(val, optLineBreaks);  // object
                }
                break;
            default:
                if (isArr) {
                    ret += val;
                } else {
                    ret += propName + val;
                }
            }
        }
        if (i < last) {
            ret += ",";
        }
        if (optLineBreaks) {
            ret += "\n";
        }
        i++;
    }
    ret += (isArr ? "]" : "}");
    if (optLineBreaks) {
        ret += "\n";
    }
    return ret;
}                                                                         //json

/** lineCount: Returns the number of lines in the given string 's'.
 *  If the string is blank, returns 0. If the string is not blank,
 *  but has no newlines ('\n'), returns 1.
 *
 *  @param {string} s
 *
 *  @return {!number}
 */
function lineCount(s) {
    if (typeof s != "string") {
        s = S(s);
    }
    if (s.length == 0) {
        return 0;
    }
    var lineCount = 1;
    var pos = s.indexOf("\n");
    while (pos > -1) {
        lineCount++;
        s = s.substr(pos + 1);
        pos = s.indexOf("\n");
    }
    return lineCount;
}                                                                    //lineCount

var internalParseJSON =
    /**@type{function():(function(string):Object)}*/ (function() {
    var /**@type{number}*/ at = -1,      // index of the current character
        /**@type{string}*/ ch = "",  // current character
        /**@type{string}*/ text = "",
        escape = {
            "\"": "\"",
            "\\": "\\",
            "/": "/",
            b: "\b",
            f: "\f",
            n: "\n",
            r: "\r",
            t: "\t",
        }
    /** raiseError: Raises an error.
     *  @param {string} msg
     */
    function raiseError(msg) {
        console.log("syntax" + " " + "error" + ":", msg, at, text);
        throw new Error("syntax" + " " + "error" + ":" + msg);
    }
    /** getNext: __
     *  @param {string=} matchCh
     *  @return {string}
     */
    function getNext(matchCh) {
        // If a matchCh parameter is provided,
        // verify that it matches the current character.
        if (matchCh && matchCh !== ch) {
            raiseError("Expected '" + matchCh + "' instead of '" + ch + "'");
            return "";
        }
        // Get the next character. When there are no more characters,
        // return the empty string.
        ch = text.charAt(at);
        at += 1;
        return ch;
    }
    /** readNumber: __
     *  @return {!number}
     */
    function readNumber() {
        var s = "";
        if (ch === "-") {
            s = "-";
            getNext("-");
        }
        while (ch >= "0" && ch <= "9") {
            s += ch;
            getNext();
        }
        if (ch === ".") {
            s += ".";
            while (getNext() && ch >= "0" && ch <= "9") {
                s += ch;
            }
        }
        if (ch === "e" || ch === "E") {
            s += ch;
            getNext();
            if (ch === "-" || ch === "+") {
                s += ch;
                getNext();
            }
            while (ch >= "0" && ch <= "9") {
                s += ch;
                getNext();
            }
        }
        var n = +s;
        if (!isFinite(n)) {
            raiseError("invalid" + " " + "number");
            return NaN;
        }
        return n;
    }
    /** readString: __
     *  @return {!string}
     */
    function readString() {
        /**@type{string}*/
        var ret = "";
        //
        // when parsing for string values, we must look for " and \ characters.
        if (ch === "\"") {
            while (getNext()) {
                if (ch === "\"") {
                    getNext();
                    return ret;
                }
                if (ch === "\\") {
                    getNext();
                    if (ch === "u") {
                        var uffff = 0;
                        for (var i = 0; i < 4; i++) {
                            var hex = parseInt(getNext(), 16);
                            if (!isFinite(hex)) {
                                break;
                            }
                            uffff = uffff * 16 + hex;
                        }
                        ret += String.fromCharCode(uffff);
                    } else if (typeof escape[ch] === "string") {
                        ret += /**@type{string}*/ (escape[ch]);
                    } else {
                        break;
                    }
                } else {
                    ret += ch;
                }
            }
        }
        raiseError("invalid" + " " + "string");
        return "";
    }
    function skipSpaces() {
        while (ch && ch <= " ") {
            getNext();
        }
    }
    /** readWord: __
     *  @return {(boolean|null)}
     */
    function readWord() {
        // true, false, or null.
        switch (ch) {
        case "t":
            getNext("t");
            getNext("r");
            getNext("u");
            getNext("e");
            return true;
        case "f":
            getNext("f");
            getNext("a");
            getNext("l");
            getNext("s");
            getNext("e");
            return false;
        case "n":
            getNext("n");
            getNext("u");
            getNext("l");
            getNext("l");
            return null;
        }
        raiseError("Unexpected '" + ch + "'");
        return null;
    }
    /** readArray: Parses an array.
     *  @return {Array}
     */
    function readArray() {
        var ar = [];
        if (ch === "[") {
            getNext("[");
            skipSpaces();
            if (ch === "]") {
                getNext("]");
                return ar;  // empty array
            }
            while (ch) {
                ar.push(getValue());
                skipSpaces();
                if (ch === "]") {
                    getNext("]");
                    return ar;
                }
                getNext(",");
                skipSpaces();
            }
        }
        raiseError("invalid" + " " + "array");
        return [];
    }
    /** readObject: Parses an object value.
     *  @return {Object}
     */
    function readObject() {
        var key;
        var ob = {};
        if (ch === "{") {
            getNext("{");
            skipSpaces();
            if (ch === "}") {
                getNext("}");
                return {};
            }
            while (ch) {
                key = readString();
                skipSpaces();
                getNext(":");
                if (/**@type{boolean}*/
                    (/**@type{Object}*/ (Object).hasOwnProperty.call(ob, key))) {
                    raiseError("duplicate key '" + key + "'");
                }
                ob[key] = getValue();
                skipSpaces();
                if (ch === "}") {
                    getNext("}");
                    return ob;
                }
                getNext(",");
                skipSpaces();
            }
        }
        raiseError("invalid" + " " + "object");
        return {};
    }
    /** getValue: Parses a JSON object, array, string or number.
     *  @return {(Object|Array|string|number|boolean)}
     */
    function getValue() {
        skipSpaces();
        switch (ch) {
        case "{":
            return readObject();
        case "[":
            return readArray();
        case "\"":
            return readString();
        case "-":
            return readNumber();
        default:
            return (ch >= "0" && ch <= "9") ? readNumber() : readWord();
        }
    }
    // Return the internalParseJSON function. It will have access
    // to all of the above functions and variables.
    return (
    /** parseJSON() signature:
     *  @param {string} s
     *  @return {Object}
     */
    function(s) {
        try {
            text = s;
            at   = 0;
            ch   = " ";
            var ret = getValue();
            skipSpaces();
            if (ch) {
                raiseError("syntax" + " " + "error");
            }
            return /**@type{Object}*/ (ret);
        } catch(ex) {
            return {};
        }
    });
})();

/** parseJSON: __
 *
 *  @param {string} s
 *
 *  @return {Object}
 */
function parseJSON(s) {
    if (s.length == 0) {
        err(0xE48BF4);      // parseJSON(): blank string, returning empty object
        return {};
    }
    /*
    console.log("parseJSON(): input", s);
    */
    var ret = {};
    try {
        // modern browsers have a built-in JSON parser
        if (typeof JSON != "undefined") {
            ret = /**@type{!Object}*/ (JSON.parse(s));
        // older browsers (including IE8 on Windows 7) don't have JSON
        } else {
            ret = /**@type{Object}*/ (internalParseJSON(s));
        }
    } catch(ex) {
        err(0xE186F1, s);                    // parseJSON(): failed parsing JSON
    }
    /*
    console.log("parseJSON(): output", ret);
    */
    return ret;
}                                                                    //parseJSON

/** prefix: Returns 'count' characters from
 *  the beginning of string 's'.
 *
 *  @param {string} s
 *  @param {number} count
 *
 *  @return {!string}
 */
function prefix(s, count) {
    var len = s.length;
    return count < 1   ? "" :
           count > len ? s    :
           s.substr(0, len);
}                                                                       //prefix

/** repeat: Returns the string 's' repeated 'count' times.
 *
 *  @param {string} s
 *  @param {number} count
 *
 *  @return {!string}
 */
function repeat(s, count) {
    var ret = s;
    while (count-- > 0) {
        ret += s;
    }
    return s;
}                                                                       //repeat

/** replace: Replaces all instances of 'find' in string 's' with 'repl'.
 *  If you pass a null in 's', it returns a blank string.
 *
 *  @param {(string|null)} s
 *  @param {string} find
 *  @param {string} repl
 *
 *  @return {!string}
 */
function replace(s, find, repl) {
    // return blank if 's' is blank
    if (s === null || s == "") {
        return "";
    }
    // cast all arguments to strings
    if (typeof s != "string") {
        s = S(s);
    }
    if (typeof find != "string") {
        find = S(find);
    }
    if (typeof repl != "string") {
        repl = S(repl);
    }
    // return 's' if 'repl' is blank
    var findLen = find.length;
    if (findLen == 0) {
        return s;
    }
    var ret     = "";
    var prevPos = 0;
    while (true) {
        var pos = s.indexOf(find, prevPos);
        if (pos == -1) {
            ret += s.substr(prevPos);
            break;
        }
        if ((pos - prevPos) > 0) {
            ret += s.substr(prevPos, pos - prevPos);
        }
        ret += repl;
        prevPos = pos + findLen;
    }
    return ret;
}                                                                      //replace

/** suffix: Returns 'count' characters from the ending of string 's'.
 *
 *  @param {string} s
 *  @param {number} count
 *
 *  @return {!string}
 */
function suffix(s, count) {
    var len = s.length;
    return count < 1   ? "" :
           count > len ? s    :
           s.slice(len - count);
}                                                                       //suffix

/** trim: Removes all white-space characters (spaces, tabs,
 *  carriage returns, newlnes and non-breakable spaces)
 *  from the beginning and end of a string.
 *
 *  @param {*} s
 *  @param {...string} trimStrings
 *
 *  @return {!string}
 */
function trim(s, trimStrings) {
    s = S(s);
    if (s.length == 0) {
        return s;
    }
    // if 'trimStrings' was specified, trim all leading/trailing strings:
    if (arguments.length > 1) {
        for (var i = 1, end = arguments.length; i < end; i++) {
            var arg = S(arguments[i]);
            if (arg.length == 0 || s.length == 0) {
                break;
            }
            while (s.substr(0, arg.length) == arg) {
                s = s.substr(arg.length);
            }
            while (s.substr(s.length - arg.length) == arg) {
                s = s.substr(0, s.length - arg.length);
            }
        }
        return s;
    }
    // trim all leading/trailing white-spaces:
    // 000 = null character
    // 009 = tab (\t)
    // 010 = newline (\n)
    // 013 = carriage return (\r)
    // 032 = space
    // 160 = (A0h) is non-breaking space (&nbsp;)
    var code  = 0,  // character code
        begin = 0;  // # of characters to skip from beginning
    do {
        code = s.charCodeAt(begin);
        if (code <= 32 || code == 160) {
            begin++;
        } else {
            break;
        }
    } while (begin < s.length);
    var nend = s.length - 1;  // # of chars to skip from end
    do {
        code = s.charCodeAt(nend);
        if (code <= 32 || code == 160) {
            nend--;
        } else {
            break;
        }
    } while (nend > 0);
    nend++;
    if (begin > nend) {
        return "";
    }
    return s.slice(begin, nend);
}                                                                         //trim

// -----------------------------------------------------------------------------
// # Style Functions

/** height: Sets/returns the 'height'
 *  style property of the specified element.
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {(string|number)=} val
 *  @param {string=} unit
 *
 *  @return {!string}
 */
function height(el, val, unit) {
    return unitProp("height", el, val, unit);
}                                                                       //height

/** left: Sets/returns the 'left'
 *  style property of the specified element.
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {(string|number)=} val
 *  @param {string=} unit
 *
 *  @return {!string}
 */
function left(el, val, unit) {
    return unitProp("left", el, val, unit);
}                                                                         //left

/** opacity: Sets/returns the 'opacity'
 *  style property of the specified element.
 *  (1 is fully opaque, 0 is transparent)
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {number=} val
 *
 *  @return {(!number|!string)}
 */
function opacity(el, val) {
    if (!contains(S(navigator.userAgent).toLowerCase(), "msie")) {
        if (def(typeof val)) {
            el.style.opacity = N(val);
        }
        return el.style.opacity;
    }
    // for Internet Explorer:
    if (def(typeof val)) {
        el.style.filter = "alpha(opacity=" + Math.round(val * 100) + ")";
    }
    var s = S(el[("style")][("filter")]);
    if (contains(s, "alpha(opacity=")) {
        s = s.substr(s.indexOf("alpha(opacity="));
        s = s.substr(0, s.length - 1);
    }
    return N(s);
}                                                                      //opacity

/** position: Sets/returns the 'position'
 *  style property of the specified element.
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {string=} val
 *
 *  @return {!string}
 */
function position(el, val) {
    if (def(typeof val)) {
        el.style.position = S(val);
    }
    return S(el.style.position);
}                                                                     //position

/** mTop: Sets/returns the 'top'
 *  style property of the specified element.
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {(string|number)=} val
 *  @param {string=} unit
 *
 *  @return {!string}
 */
function mTop(el, val, unit) {
    return unitProp("top", el, val, unit);
}                                                                         //mTop

/** visibility: Sets/returns the 'visibility'
 *  style property of the specified element.
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {(string|boolean)=} val
 *
 *  @return {!string}
 */
function visibility(el, val) {
    if (el === null) {
        return "";
    }
    if (typeof val == "boolean") {
        el.style.visibility = val ? "visible" : "hidden";
    } else if (typeof val == "string") {
        if (val == "visible") {
            el.style.visibility = "visible";
        } else if (val == "hidden") {
            el.style.visibility = "hidden";
        } else {
            err(0xE55EA7);   // visibility(): 'val' is not 'visible' or 'hidden'
        }
    } else {
        err(0xE6B2A9);         // visibility(): 'val' is not a boolean or string
    }
    return el.style.visibility;
}                                                                   //visibility

/** width: Sets/returns the 'width'
 *  style property of the specified element.
 *
 *  @param {(Element|HTMLElement)} el
 *  @param {(string|number)=} val
 *  @param {string=} unit
 *
 *  @return {!string}
 */
function width(el, val, unit) {
    return unitProp("width", el, val, unit);
}                                                                        //width

/** unitProp: Sets/returns a unit
 *  style property of the specified element.
 *
 *  This function is private.
 *
 *  @param {string} prop
 *  @param {(Element|HTMLElement)} el
 *  @param {(string|number)=} val
 *  @param {string=} unit
 *
 *  @return {string}
 */
function unitProp(prop, el, val, unit) {
    unit = undef(typeof unit) ? "px" : S(unit);
    if (typeof val == "number") {
        el.style[prop] = S(val, unit);
    } else if (typeof val == "string") {
        if (unit.length > 0) {
            el.style[prop] = S(val, unit);
        }
    }
    return S(el.style[prop]);
}                                                                     //unitProp

// -----------------------------------------------------------------------------
// # UI Effects Functions

/** fadeScreen: fades the entire screen. __
 *
 *  @param {boolean} show
 */
var fadeScreen = /**@type{function():function(boolean)}*/ (function() {
    return (
    /** @param {boolean} show */
    function(show) {
        var div   = selID("zr_fa");
        var isNew = div === null;
        if (show && isNew) {
            div = makeFullscreenDiv();
            div.id = "zr_fa";
        }
        if (show) {
            div.style.background = "Black";
            opacity(div, 0);
            visibility(div, true);
            if (isNew) {
                body().appendChild(div);
            }
            transitionStyle(div, "opacity", 0.3, 1000);
        }
        if (!show) {
            transitionStyle(div, "opacity", 0, 1000, removeDiv);
        }
    });
    /** @param {HTMLElement} el */
    function removeDiv(el) {
        body().removeChild(el);
    }
})();                                                               //fadeScreen

/** transitionStyle: __
 *
 *  @param {HTMLElement} el
 *  @param {!string} property
 *  @param {!number} endValue
 *  @param {!number} durationMs
 *  @param {function(HTMLElement)=} whenDone
 */
function transitionStyle(el, property, endValue, durationMs, whenDone) {
    if (el === null) {
        err(0xE926F8);                    // transitionStyle(): arg 'el' is null
        return;
    }
    /**@type{!number}*/
    var value   = N((el).style[property]);
    var step    = (endValue - value) / (durationMs / 50);
    var elapsed = 0;
    var timer   = setInterval(updateTimer, 50);
    //
    function updateTimer() {
        value += step;
        var isDone = (step > 0 && value >= endValue) ||
                     (step < 0 && value <= endValue);
        if (isDone) {
            value = endValue;
            clearInterval(timer);
        }
        el.style[property] = S(value);
        if (isDone && isFn(whenDone)) {
            whenDone(el);
        }
    }
}                                                              //transitionStyle

//end
