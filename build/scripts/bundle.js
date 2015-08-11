/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.3",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!

 handlebars v2.0.0

Copyright (C) 2011-2014 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Handlebars = root.Handlebars || factory();
  }
}(this, function () {
// handlebars/safe-string.js
var __module4__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module3__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr];
  }

  function extend(obj /* , ...source */) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
          obj[key] = arguments[i][key];
        }
      }
    }

    return obj;
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  /* istanbul ignore next */
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  /* istanbul ignore next */
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (string == null) {
      return "";
    } else if (!string) {
      return string + '';
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
    return (contextPath ? contextPath + '.' : '') + id;
  }

  __exports__.appendContextPath = appendContextPath;
  return __exports__;
})(__module4__);

// handlebars/exception.js
var __module5__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module2__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "2.0.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 6;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '== 1.x.x',
    5: '== 2.0.0-alpha.x',
    6: '>= 2.0.0-beta.1'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn) {
      if (toString.call(name) === objectType) {
        if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        this.helpers[name] = fn;
      }
    },
    unregisterHelper: function(name) {
      delete this.helpers[name];
    },

    registerPartial: function(name, partial) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = partial;
      }
    },
    unregisterPartial: function(name) {
      delete this.partials[name];
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(/* [args, ]options */) {
      if(arguments.length === 1) {
        // A missing field in a {{foo}} constuct.
        return undefined;
      } else {
        // Someone is actually trying to call something, blow up.
        throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse,
          fn = options.fn;

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          if (options.ids) {
            options.ids = [options.name];
          }

          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        if (options.data && options.ids) {
          var data = createFrame(options.data);
          data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
          options = {data: data};
        }

        return fn(context, options);
      }
    });

    instance.registerHelper('each', function(context, options) {
      if (!options) {
        throw new Exception('Must pass iterator to #each');
      }

      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      var contextPath;
      if (options.data && options.ids) {
        contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
      }

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));

              if (contextPath) {
                data.contextPath = contextPath + i;
              }
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) {
                data.key = key;
                data.index = i;
                data.first = (i === 0);

                if (contextPath) {
                  data.contextPath = contextPath + key;
                }
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      var fn = options.fn;

      if (!Utils.isEmpty(context)) {
        if (options.data && options.ids) {
          var data = createFrame(options.data);
          data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
          options = {data:data};
        }

        return fn(context, options);
      } else {
        return options.inverse(this);
      }
    });

    instance.registerHelper('log', function(message, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, message);
    });

    instance.registerHelper('lookup', function(obj, field) {
      return obj && obj[field];
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, message) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, message);
        }
      }
    }
  };
  __exports__.logger = logger;
  var log = logger.log;
  __exports__.log = log;
  var createFrame = function(object) {
    var frame = Utils.extend({}, object);
    frame._parent = object;
    return frame;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module3__, __module5__);

// handlebars/runtime.js
var __module6__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;
  var createFrame = __dependency3__.createFrame;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    /* istanbul ignore next */
    if (!env) {
      throw new Exception("No environment passed to template");
    }
    if (!templateSpec || !templateSpec.main) {
      throw new Exception('Unknown template object: ' + typeof templateSpec);
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    env.VM.checkRevision(templateSpec.compiler);

    var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
      if (hash) {
        context = Utils.extend({}, context, hash);
      }

      var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

      if (result == null && env.compile) {
        var options = { helpers: helpers, partials: partials, data: data, depths: depths };
        partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
        result = partials[name](context, options);
      }
      if (result != null) {
        if (indent) {
          var lines = result.split('\n');
          for (var i = 0, l = lines.length; i < l; i++) {
            if (!lines[i] && i + 1 === l) {
              break;
            }

            lines[i] = indent + lines[i];
          }
          result = lines.join('\n');
        }
        return result;
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      lookup: function(depths, name) {
        var len = depths.length;
        for (var i = 0; i < len; i++) {
          if (depths[i] && depths[i][name] != null) {
            return depths[i][name];
          }
        }
      },
      lambda: function(current, context) {
        return typeof current === 'function' ? current.call(context) : current;
      },

      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,

      fn: function(i) {
        return templateSpec[i];
      },

      programs: [],
      program: function(i, data, depths) {
        var programWrapper = this.programs[i],
            fn = this.fn(i);
        if (data || depths) {
          programWrapper = program(this, i, fn, data, depths);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(this, i, fn);
        }
        return programWrapper;
      },

      data: function(data, depth) {
        while (data && depth--) {
          data = data._parent;
        }
        return data;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = Utils.extend({}, common, param);
        }

        return ret;
      },

      noop: env.VM.noop,
      compilerInfo: templateSpec.compiler
    };

    var ret = function(context, options) {
      options = options || {};
      var data = options.data;

      ret._setup(options);
      if (!options.partial && templateSpec.useData) {
        data = initData(context, data);
      }
      var depths;
      if (templateSpec.useDepths) {
        depths = options.depths ? [context].concat(options.depths) : [context];
      }

      return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
    };
    ret.isTop = true;

    ret._setup = function(options) {
      if (!options.partial) {
        container.helpers = container.merge(options.helpers, env.helpers);

        if (templateSpec.usePartial) {
          container.partials = container.merge(options.partials, env.partials);
        }
      } else {
        container.helpers = options.helpers;
        container.partials = options.partials;
      }
    };

    ret._child = function(i, data, depths) {
      if (templateSpec.useDepths && !depths) {
        throw new Exception('must pass parent depths');
      }

      return program(container, i, templateSpec[i], data, depths);
    };
    return ret;
  }

  __exports__.template = template;function program(container, i, fn, data, depths) {
    var prog = function(context, options) {
      options = options || {};

      return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
    };
    prog.program = i;
    prog.depth = depths ? depths.length : 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;function initData(context, data) {
    if (!data || !('root' in data)) {
      data = data ? createFrame(data) : {};
      data.root = context;
    }
    return data;
  }
  return __exports__;
})(__module3__, __module5__, __module2__);

// handlebars.runtime.js
var __module1__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;
    hb.escapeExpression = Utils.escapeExpression;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  Handlebars['default'] = Handlebars;

  __exports__ = Handlebars;
  return __exports__;
})(__module2__, __module4__, __module5__, __module3__, __module6__);

// handlebars/compiler/ast.js
var __module7__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var Exception = __dependency1__;

  function LocationInfo(locInfo) {
    locInfo = locInfo || {};
    this.firstLine   = locInfo.first_line;
    this.firstColumn = locInfo.first_column;
    this.lastColumn  = locInfo.last_column;
    this.lastLine    = locInfo.last_line;
  }

  var AST = {
    ProgramNode: function(statements, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "program";
      this.statements = statements;
      this.strip = strip;
    },

    MustacheNode: function(rawParams, hash, open, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "mustache";
      this.strip = strip;

      // Open may be a string parsed from the parser or a passed boolean flag
      if (open != null && open.charAt) {
        // Must use charAt to support IE pre-10
        var escapeFlag = open.charAt(3) || open.charAt(2);
        this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
      } else {
        this.escaped = !!open;
      }

      if (rawParams instanceof AST.SexprNode) {
        this.sexpr = rawParams;
      } else {
        // Support old AST API
        this.sexpr = new AST.SexprNode(rawParams, hash);
      }

      // Support old AST API that stored this info in MustacheNode
      this.id = this.sexpr.id;
      this.params = this.sexpr.params;
      this.hash = this.sexpr.hash;
      this.eligibleHelper = this.sexpr.eligibleHelper;
      this.isHelper = this.sexpr.isHelper;
    },

    SexprNode: function(rawParams, hash, locInfo) {
      LocationInfo.call(this, locInfo);

      this.type = "sexpr";
      this.hash = hash;

      var id = this.id = rawParams[0];
      var params = this.params = rawParams.slice(1);

      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      this.isHelper = !!(params.length || hash);

      // a mustache is an eligible helper if:
      // * its id is simple (a single part, not `this` or `..`)
      this.eligibleHelper = this.isHelper || id.isSimple;

      // if a mustache is an eligible helper but not a definite
      // helper, it is ambiguous, and will be resolved in a later
      // pass or at runtime.
    },

    PartialNode: function(partialName, context, hash, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type         = "partial";
      this.partialName  = partialName;
      this.context      = context;
      this.hash = hash;
      this.strip = strip;

      this.strip.inlineStandalone = true;
    },

    BlockNode: function(mustache, program, inverse, strip, locInfo) {
      LocationInfo.call(this, locInfo);

      this.type = 'block';
      this.mustache = mustache;
      this.program  = program;
      this.inverse  = inverse;
      this.strip = strip;

      if (inverse && !program) {
        this.isInverse = true;
      }
    },

    RawBlockNode: function(mustache, content, close, locInfo) {
      LocationInfo.call(this, locInfo);

      if (mustache.sexpr.id.original !== close) {
        throw new Exception(mustache.sexpr.id.original + " doesn't match " + close, this);
      }

      content = new AST.ContentNode(content, locInfo);

      this.type = 'block';
      this.mustache = mustache;
      this.program = new AST.ProgramNode([content], {}, locInfo);
    },

    ContentNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "content";
      this.original = this.string = string;
    },

    HashNode: function(pairs, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "hash";
      this.pairs = pairs;
    },

    IdNode: function(parts, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "ID";

      var original = "",
          dig = [],
          depth = 0,
          depthString = '';

      for(var i=0,l=parts.length; i<l; i++) {
        var part = parts[i].part;
        original += (parts[i].separator || '') + part;

        if (part === ".." || part === "." || part === "this") {
          if (dig.length > 0) {
            throw new Exception("Invalid path: " + original, this);
          } else if (part === "..") {
            depth++;
            depthString += '../';
          } else {
            this.isScoped = true;
          }
        } else {
          dig.push(part);
        }
      }

      this.original = original;
      this.parts    = dig;
      this.string   = dig.join('.');
      this.depth    = depth;
      this.idName   = depthString + this.string;

      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

      this.stringModeValue = this.string;
    },

    PartialNameNode: function(name, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "PARTIAL_NAME";
      this.name = name.original;
    },

    DataNode: function(id, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "DATA";
      this.id = id;
      this.stringModeValue = id.stringModeValue;
      this.idName = '@' + id.stringModeValue;
    },

    StringNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "STRING";
      this.original =
        this.string =
        this.stringModeValue = string;
    },

    NumberNode: function(number, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "NUMBER";
      this.original =
        this.number = number;
      this.stringModeValue = Number(number);
    },

    BooleanNode: function(bool, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "BOOLEAN";
      this.bool = bool;
      this.stringModeValue = bool === "true";
    },

    CommentNode: function(comment, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "comment";
      this.comment = comment;

      this.strip = {
        inlineStandalone: true
      };
    }
  };


  // Must be exported as an object rather than the root of the module as the jison lexer
  // most modify the object to operate properly.
  __exports__ = AST;
  return __exports__;
})(__module5__);

// handlebars/compiler/parser.js
var __module9__ = (function() {
  "use strict";
  var __exports__;
  /* jshint ignore:start */
  /* istanbul ignore next */
  /* Jison generated parser */
  var handlebars = (function(){
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"root":3,"program":4,"EOF":5,"program_repetition0":6,"statement":7,"mustache":8,"block":9,"rawBlock":10,"partial":11,"CONTENT":12,"COMMENT":13,"openRawBlock":14,"END_RAW_BLOCK":15,"OPEN_RAW_BLOCK":16,"sexpr":17,"CLOSE_RAW_BLOCK":18,"openBlock":19,"block_option0":20,"closeBlock":21,"openInverse":22,"block_option1":23,"OPEN_BLOCK":24,"CLOSE":25,"OPEN_INVERSE":26,"inverseAndProgram":27,"INVERSE":28,"OPEN_ENDBLOCK":29,"path":30,"OPEN":31,"OPEN_UNESCAPED":32,"CLOSE_UNESCAPED":33,"OPEN_PARTIAL":34,"partialName":35,"param":36,"partial_option0":37,"partial_option1":38,"sexpr_repetition0":39,"sexpr_option0":40,"dataName":41,"STRING":42,"NUMBER":43,"BOOLEAN":44,"OPEN_SEXPR":45,"CLOSE_SEXPR":46,"hash":47,"hash_repetition_plus0":48,"hashSegment":49,"ID":50,"EQUALS":51,"DATA":52,"pathSegments":53,"SEP":54,"$accept":0,"$end":1},
  terminals_: {2:"error",5:"EOF",12:"CONTENT",13:"COMMENT",15:"END_RAW_BLOCK",16:"OPEN_RAW_BLOCK",18:"CLOSE_RAW_BLOCK",24:"OPEN_BLOCK",25:"CLOSE",26:"OPEN_INVERSE",28:"INVERSE",29:"OPEN_ENDBLOCK",31:"OPEN",32:"OPEN_UNESCAPED",33:"CLOSE_UNESCAPED",34:"OPEN_PARTIAL",42:"STRING",43:"NUMBER",44:"BOOLEAN",45:"OPEN_SEXPR",46:"CLOSE_SEXPR",50:"ID",51:"EQUALS",52:"DATA",54:"SEP"},
  productions_: [0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[10,3],[14,3],[9,4],[9,4],[19,3],[22,3],[27,2],[21,3],[8,3],[8,3],[11,5],[11,4],[17,3],[17,1],[36,1],[36,1],[36,1],[36,1],[36,1],[36,3],[47,1],[49,3],[35,1],[35,1],[35,1],[41,2],[30,1],[53,3],[53,1],[6,0],[6,2],[20,0],[20,1],[23,0],[23,1],[37,0],[37,1],[38,0],[38,1],[39,0],[39,2],[40,0],[40,1],[48,1],[48,2]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1: yy.prepareProgram($$[$0-1].statements, true); return $$[$0-1]; 
  break;
  case 2:this.$ = new yy.ProgramNode(yy.prepareProgram($$[$0]), {}, this._$);
  break;
  case 3:this.$ = $$[$0];
  break;
  case 4:this.$ = $$[$0];
  break;
  case 5:this.$ = $$[$0];
  break;
  case 6:this.$ = $$[$0];
  break;
  case 7:this.$ = new yy.ContentNode($$[$0], this._$);
  break;
  case 8:this.$ = new yy.CommentNode($$[$0], this._$);
  break;
  case 9:this.$ = new yy.RawBlockNode($$[$0-2], $$[$0-1], $$[$0], this._$);
  break;
  case 10:this.$ = new yy.MustacheNode($$[$0-1], null, '', '', this._$);
  break;
  case 11:this.$ = yy.prepareBlock($$[$0-3], $$[$0-2], $$[$0-1], $$[$0], false, this._$);
  break;
  case 12:this.$ = yy.prepareBlock($$[$0-3], $$[$0-2], $$[$0-1], $$[$0], true, this._$);
  break;
  case 13:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 14:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 15:this.$ = { strip: yy.stripFlags($$[$0-1], $$[$0-1]), program: $$[$0] };
  break;
  case 16:this.$ = {path: $$[$0-1], strip: yy.stripFlags($$[$0-2], $$[$0])};
  break;
  case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], yy.stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 19:this.$ = new yy.PartialNode($$[$0-3], $$[$0-2], $$[$0-1], yy.stripFlags($$[$0-4], $$[$0]), this._$);
  break;
  case 20:this.$ = new yy.PartialNode($$[$0-2], undefined, $$[$0-1], yy.stripFlags($$[$0-3], $$[$0]), this._$);
  break;
  case 21:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
  break;
  case 22:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
  break;
  case 23:this.$ = $$[$0];
  break;
  case 24:this.$ = new yy.StringNode($$[$0], this._$);
  break;
  case 25:this.$ = new yy.NumberNode($$[$0], this._$);
  break;
  case 26:this.$ = new yy.BooleanNode($$[$0], this._$);
  break;
  case 27:this.$ = $$[$0];
  break;
  case 28:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
  break;
  case 29:this.$ = new yy.HashNode($$[$0], this._$);
  break;
  case 30:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 31:this.$ = new yy.PartialNameNode($$[$0], this._$);
  break;
  case 32:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
  break;
  case 33:this.$ = new yy.PartialNameNode(new yy.NumberNode($$[$0], this._$));
  break;
  case 34:this.$ = new yy.DataNode($$[$0], this._$);
  break;
  case 35:this.$ = new yy.IdNode($$[$0], this._$);
  break;
  case 36: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
  break;
  case 37:this.$ = [{part: $$[$0]}];
  break;
  case 38:this.$ = [];
  break;
  case 39:$$[$0-1].push($$[$0]);
  break;
  case 48:this.$ = [];
  break;
  case 49:$$[$0-1].push($$[$0]);
  break;
  case 52:this.$ = [$$[$0]];
  break;
  case 53:$$[$0-1].push($$[$0]);
  break;
  }
  },
  table: [{3:1,4:2,5:[2,38],6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],31:[2,38],32:[2,38],34:[2,38]},{1:[3]},{5:[1,4]},{5:[2,2],7:5,8:6,9:7,10:8,11:9,12:[1,10],13:[1,11],14:16,16:[1,20],19:14,22:15,24:[1,18],26:[1,19],28:[2,2],29:[2,2],31:[1,12],32:[1,13],34:[1,17]},{1:[2,1]},{5:[2,39],12:[2,39],13:[2,39],16:[2,39],24:[2,39],26:[2,39],28:[2,39],29:[2,39],31:[2,39],32:[2,39],34:[2,39]},{5:[2,3],12:[2,3],13:[2,3],16:[2,3],24:[2,3],26:[2,3],28:[2,3],29:[2,3],31:[2,3],32:[2,3],34:[2,3]},{5:[2,4],12:[2,4],13:[2,4],16:[2,4],24:[2,4],26:[2,4],28:[2,4],29:[2,4],31:[2,4],32:[2,4],34:[2,4]},{5:[2,5],12:[2,5],13:[2,5],16:[2,5],24:[2,5],26:[2,5],28:[2,5],29:[2,5],31:[2,5],32:[2,5],34:[2,5]},{5:[2,6],12:[2,6],13:[2,6],16:[2,6],24:[2,6],26:[2,6],28:[2,6],29:[2,6],31:[2,6],32:[2,6],34:[2,6]},{5:[2,7],12:[2,7],13:[2,7],16:[2,7],24:[2,7],26:[2,7],28:[2,7],29:[2,7],31:[2,7],32:[2,7],34:[2,7]},{5:[2,8],12:[2,8],13:[2,8],16:[2,8],24:[2,8],26:[2,8],28:[2,8],29:[2,8],31:[2,8],32:[2,8],34:[2,8]},{17:21,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:27,30:22,41:23,50:[1,26],52:[1,25],53:24},{4:28,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{4:29,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],28:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{12:[1,30]},{30:32,35:31,42:[1,33],43:[1,34],50:[1,26],53:24},{17:35,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:36,30:22,41:23,50:[1,26],52:[1,25],53:24},{17:37,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[1,38]},{18:[2,48],25:[2,48],33:[2,48],39:39,42:[2,48],43:[2,48],44:[2,48],45:[2,48],46:[2,48],50:[2,48],52:[2,48]},{18:[2,22],25:[2,22],33:[2,22],46:[2,22]},{18:[2,35],25:[2,35],33:[2,35],42:[2,35],43:[2,35],44:[2,35],45:[2,35],46:[2,35],50:[2,35],52:[2,35],54:[1,40]},{30:41,50:[1,26],53:24},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],52:[2,37],54:[2,37]},{33:[1,42]},{20:43,27:44,28:[1,45],29:[2,40]},{23:46,27:47,28:[1,45],29:[2,42]},{15:[1,48]},{25:[2,46],30:51,36:49,38:50,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],47:57,48:58,49:60,50:[1,59],52:[1,25],53:24},{25:[2,31],42:[2,31],43:[2,31],44:[2,31],45:[2,31],50:[2,31],52:[2,31]},{25:[2,32],42:[2,32],43:[2,32],44:[2,32],45:[2,32],50:[2,32],52:[2,32]},{25:[2,33],42:[2,33],43:[2,33],44:[2,33],45:[2,33],50:[2,33],52:[2,33]},{25:[1,61]},{25:[1,62]},{18:[1,63]},{5:[2,17],12:[2,17],13:[2,17],16:[2,17],24:[2,17],26:[2,17],28:[2,17],29:[2,17],31:[2,17],32:[2,17],34:[2,17]},{18:[2,50],25:[2,50],30:51,33:[2,50],36:65,40:64,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],46:[2,50],47:66,48:58,49:60,50:[1,59],52:[1,25],53:24},{50:[1,67]},{18:[2,34],25:[2,34],33:[2,34],42:[2,34],43:[2,34],44:[2,34],45:[2,34],46:[2,34],50:[2,34],52:[2,34]},{5:[2,18],12:[2,18],13:[2,18],16:[2,18],24:[2,18],26:[2,18],28:[2,18],29:[2,18],31:[2,18],32:[2,18],34:[2,18]},{21:68,29:[1,69]},{29:[2,41]},{4:70,6:3,12:[2,38],13:[2,38],16:[2,38],24:[2,38],26:[2,38],29:[2,38],31:[2,38],32:[2,38],34:[2,38]},{21:71,29:[1,69]},{29:[2,43]},{5:[2,9],12:[2,9],13:[2,9],16:[2,9],24:[2,9],26:[2,9],28:[2,9],29:[2,9],31:[2,9],32:[2,9],34:[2,9]},{25:[2,44],37:72,47:73,48:58,49:60,50:[1,74]},{25:[1,75]},{18:[2,23],25:[2,23],33:[2,23],42:[2,23],43:[2,23],44:[2,23],45:[2,23],46:[2,23],50:[2,23],52:[2,23]},{18:[2,24],25:[2,24],33:[2,24],42:[2,24],43:[2,24],44:[2,24],45:[2,24],46:[2,24],50:[2,24],52:[2,24]},{18:[2,25],25:[2,25],33:[2,25],42:[2,25],43:[2,25],44:[2,25],45:[2,25],46:[2,25],50:[2,25],52:[2,25]},{18:[2,26],25:[2,26],33:[2,26],42:[2,26],43:[2,26],44:[2,26],45:[2,26],46:[2,26],50:[2,26],52:[2,26]},{18:[2,27],25:[2,27],33:[2,27],42:[2,27],43:[2,27],44:[2,27],45:[2,27],46:[2,27],50:[2,27],52:[2,27]},{17:76,30:22,41:23,50:[1,26],52:[1,25],53:24},{25:[2,47]},{18:[2,29],25:[2,29],33:[2,29],46:[2,29],49:77,50:[1,74]},{18:[2,37],25:[2,37],33:[2,37],42:[2,37],43:[2,37],44:[2,37],45:[2,37],46:[2,37],50:[2,37],51:[1,78],52:[2,37],54:[2,37]},{18:[2,52],25:[2,52],33:[2,52],46:[2,52],50:[2,52]},{12:[2,13],13:[2,13],16:[2,13],24:[2,13],26:[2,13],28:[2,13],29:[2,13],31:[2,13],32:[2,13],34:[2,13]},{12:[2,14],13:[2,14],16:[2,14],24:[2,14],26:[2,14],28:[2,14],29:[2,14],31:[2,14],32:[2,14],34:[2,14]},{12:[2,10]},{18:[2,21],25:[2,21],33:[2,21],46:[2,21]},{18:[2,49],25:[2,49],33:[2,49],42:[2,49],43:[2,49],44:[2,49],45:[2,49],46:[2,49],50:[2,49],52:[2,49]},{18:[2,51],25:[2,51],33:[2,51],46:[2,51]},{18:[2,36],25:[2,36],33:[2,36],42:[2,36],43:[2,36],44:[2,36],45:[2,36],46:[2,36],50:[2,36],52:[2,36],54:[2,36]},{5:[2,11],12:[2,11],13:[2,11],16:[2,11],24:[2,11],26:[2,11],28:[2,11],29:[2,11],31:[2,11],32:[2,11],34:[2,11]},{30:79,50:[1,26],53:24},{29:[2,15]},{5:[2,12],12:[2,12],13:[2,12],16:[2,12],24:[2,12],26:[2,12],28:[2,12],29:[2,12],31:[2,12],32:[2,12],34:[2,12]},{25:[1,80]},{25:[2,45]},{51:[1,78]},{5:[2,20],12:[2,20],13:[2,20],16:[2,20],24:[2,20],26:[2,20],28:[2,20],29:[2,20],31:[2,20],32:[2,20],34:[2,20]},{46:[1,81]},{18:[2,53],25:[2,53],33:[2,53],46:[2,53],50:[2,53]},{30:51,36:82,41:55,42:[1,52],43:[1,53],44:[1,54],45:[1,56],50:[1,26],52:[1,25],53:24},{25:[1,83]},{5:[2,19],12:[2,19],13:[2,19],16:[2,19],24:[2,19],26:[2,19],28:[2,19],29:[2,19],31:[2,19],32:[2,19],34:[2,19]},{18:[2,28],25:[2,28],33:[2,28],42:[2,28],43:[2,28],44:[2,28],45:[2,28],46:[2,28],50:[2,28],52:[2,28]},{18:[2,30],25:[2,30],33:[2,30],46:[2,30],50:[2,30]},{5:[2,16],12:[2,16],13:[2,16],16:[2,16],24:[2,16],26:[2,16],28:[2,16],29:[2,16],31:[2,16],32:[2,16],34:[2,16]}],
  defaultActions: {4:[2,1],44:[2,41],47:[2,43],57:[2,47],63:[2,10],70:[2,15],73:[2,45]},
  parseError: function parseError(str, hash) {
      throw new Error(str);
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      this.yy.parser = this;
      if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      var ranges = this.lexer.options && this.lexer.options.ranges;
      if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
      function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
      }
      function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
              token = self.symbols_[token] || token;
          }
          return token;
      }
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == "undefined") {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                  expected = [];
                  for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                      }
                  if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                  }
                  this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
              }
          }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                      recovering--;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
              if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }
  };
  /* Jison generated lexer */
  var lexer = (function(){
  var lexer = ({EOF:1,
  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },
  setInput:function (input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
          if (this.options.ranges) this.yylloc.range = [0,0];
          this.offset = 0;
          return this;
      },
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
      },
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length-1);
          this.matched = this.matched.substr(0, this.matched.length-1);

          if (lines.length-1) this.yylineno -= lines.length-1;
          var r = this.yylloc.range;

          this.yylloc = {first_line: this.yylloc.first_line,
            last_line: this.yylineno+1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                this.yylloc.first_column - len
            };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
      },
  more:function () {
          this._more = true;
          return this;
      },
  less:function (n) {
          this.unput(this.match.slice(n));
      },
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
      },
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
      },
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) this.done = true;

          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
              }
          }
          if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                      {text: "", token: null, line: this.yylineno});
          }
      },
  lex:function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
              return r;
          } else {
              return this.lex();
          }
      },
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },
  popState:function popState() {
          return this.conditionStack.pop();
      },
  _currentRules:function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
      },
  topState:function () {
          return this.conditionStack[this.conditionStack.length-2];
      },
  pushState:function begin(condition) {
          this.begin(condition);
      }});
  lexer.options = {};
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


  function strip(start, end) {
    return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
  }


  var YYSTATE=YY_START
  switch($avoiding_name_collisions) {
  case 0:
                                     if(yy_.yytext.slice(-2) === "\\\\") {
                                       strip(0,1);
                                       this.begin("mu");
                                     } else if(yy_.yytext.slice(-1) === "\\") {
                                       strip(0,1);
                                       this.begin("emu");
                                     } else {
                                       this.begin("mu");
                                     }
                                     if(yy_.yytext) return 12;
                                   
  break;
  case 1:return 12;
  break;
  case 2:
                                     this.popState();
                                     return 12;
                                   
  break;
  case 3:
                                    yy_.yytext = yy_.yytext.substr(5, yy_.yyleng-9);
                                    this.popState();
                                    return 15;
                                   
  break;
  case 4: return 12; 
  break;
  case 5:strip(0,4); this.popState(); return 13;
  break;
  case 6:return 45;
  break;
  case 7:return 46;
  break;
  case 8: return 16; 
  break;
  case 9:
                                    this.popState();
                                    this.begin('raw');
                                    return 18;
                                   
  break;
  case 10:return 34;
  break;
  case 11:return 24;
  break;
  case 12:return 29;
  break;
  case 13:this.popState(); return 28;
  break;
  case 14:this.popState(); return 28;
  break;
  case 15:return 26;
  break;
  case 16:return 26;
  break;
  case 17:return 32;
  break;
  case 18:return 31;
  break;
  case 19:this.popState(); this.begin('com');
  break;
  case 20:strip(3,5); this.popState(); return 13;
  break;
  case 21:return 31;
  break;
  case 22:return 51;
  break;
  case 23:return 50;
  break;
  case 24:return 50;
  break;
  case 25:return 54;
  break;
  case 26:// ignore whitespace
  break;
  case 27:this.popState(); return 33;
  break;
  case 28:this.popState(); return 25;
  break;
  case 29:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 42;
  break;
  case 30:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 42;
  break;
  case 31:return 52;
  break;
  case 32:return 44;
  break;
  case 33:return 44;
  break;
  case 34:return 43;
  break;
  case 35:return 50;
  break;
  case 36:yy_.yytext = strip(1,2); return 50;
  break;
  case 37:return 'INVALID';
  break;
  case 38:return 5;
  break;
  }
  };
  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]*?(?=(\{\{\{\{\/)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
  lexer.conditions = {"mu":{"rules":[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[5],"inclusive":false},"raw":{"rules":[3,4],"inclusive":false},"INITIAL":{"rules":[0,1,38],"inclusive":true}};
  return lexer;})()
  parser.lexer = lexer;
  function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();__exports__ = handlebars;
  /* jshint ignore:end */
  return __exports__;
})();

// handlebars/compiler/helpers.js
var __module10__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;

  function stripFlags(open, close) {
    return {
      left: open.charAt(2) === '~',
      right: close.charAt(close.length-3) === '~'
    };
  }

  __exports__.stripFlags = stripFlags;
  function prepareBlock(mustache, program, inverseAndProgram, close, inverted, locInfo) {
    /*jshint -W040 */
    if (mustache.sexpr.id.original !== close.path.original) {
      throw new Exception(mustache.sexpr.id.original + ' doesn\'t match ' + close.path.original, mustache);
    }

    var inverse = inverseAndProgram && inverseAndProgram.program;

    var strip = {
      left: mustache.strip.left,
      right: close.strip.right,

      // Determine the standalone candiacy. Basically flag our content as being possibly standalone
      // so our parent can determine if we actually are standalone
      openStandalone: isNextWhitespace(program.statements),
      closeStandalone: isPrevWhitespace((inverse || program).statements)
    };

    if (mustache.strip.right) {
      omitRight(program.statements, null, true);
    }

    if (inverse) {
      var inverseStrip = inverseAndProgram.strip;

      if (inverseStrip.left) {
        omitLeft(program.statements, null, true);
      }
      if (inverseStrip.right) {
        omitRight(inverse.statements, null, true);
      }
      if (close.strip.left) {
        omitLeft(inverse.statements, null, true);
      }

      // Find standalone else statments
      if (isPrevWhitespace(program.statements)
          && isNextWhitespace(inverse.statements)) {

        omitLeft(program.statements);
        omitRight(inverse.statements);
      }
    } else {
      if (close.strip.left) {
        omitLeft(program.statements, null, true);
      }
    }

    if (inverted) {
      return new this.BlockNode(mustache, inverse, program, strip, locInfo);
    } else {
      return new this.BlockNode(mustache, program, inverse, strip, locInfo);
    }
  }

  __exports__.prepareBlock = prepareBlock;
  function prepareProgram(statements, isRoot) {
    for (var i = 0, l = statements.length; i < l; i++) {
      var current = statements[i],
          strip = current.strip;

      if (!strip) {
        continue;
      }

      var _isPrevWhitespace = isPrevWhitespace(statements, i, isRoot, current.type === 'partial'),
          _isNextWhitespace = isNextWhitespace(statements, i, isRoot),

          openStandalone = strip.openStandalone && _isPrevWhitespace,
          closeStandalone = strip.closeStandalone && _isNextWhitespace,
          inlineStandalone = strip.inlineStandalone && _isPrevWhitespace && _isNextWhitespace;

      if (strip.right) {
        omitRight(statements, i, true);
      }
      if (strip.left) {
        omitLeft(statements, i, true);
      }

      if (inlineStandalone) {
        omitRight(statements, i);

        if (omitLeft(statements, i)) {
          // If we are on a standalone node, save the indent info for partials
          if (current.type === 'partial') {
            current.indent = (/([ \t]+$)/).exec(statements[i-1].original) ? RegExp.$1 : '';
          }
        }
      }
      if (openStandalone) {
        omitRight((current.program || current.inverse).statements);

        // Strip out the previous content node if it's whitespace only
        omitLeft(statements, i);
      }
      if (closeStandalone) {
        // Always strip the next node
        omitRight(statements, i);

        omitLeft((current.inverse || current.program).statements);
      }
    }

    return statements;
  }

  __exports__.prepareProgram = prepareProgram;function isPrevWhitespace(statements, i, isRoot) {
    if (i === undefined) {
      i = statements.length;
    }

    // Nodes that end with newlines are considered whitespace (but are special
    // cased for strip operations)
    var prev = statements[i-1],
        sibling = statements[i-2];
    if (!prev) {
      return isRoot;
    }

    if (prev.type === 'content') {
      return (sibling || !isRoot ? (/\r?\n\s*?$/) : (/(^|\r?\n)\s*?$/)).test(prev.original);
    }
  }
  function isNextWhitespace(statements, i, isRoot) {
    if (i === undefined) {
      i = -1;
    }

    var next = statements[i+1],
        sibling = statements[i+2];
    if (!next) {
      return isRoot;
    }

    if (next.type === 'content') {
      return (sibling || !isRoot ? (/^\s*?\r?\n/) : (/^\s*?(\r?\n|$)/)).test(next.original);
    }
  }

  // Marks the node to the right of the position as omitted.
  // I.e. {{foo}}' ' will mark the ' ' node as omitted.
  //
  // If i is undefined, then the first child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.
  function omitRight(statements, i, multiple) {
    var current = statements[i == null ? 0 : i + 1];
    if (!current || current.type !== 'content' || (!multiple && current.rightStripped)) {
      return;
    }

    var original = current.string;
    current.string = current.string.replace(multiple ? (/^\s+/) : (/^[ \t]*\r?\n?/), '');
    current.rightStripped = current.string !== original;
  }

  // Marks the node to the left of the position as omitted.
  // I.e. ' '{{foo}} will mark the ' ' node as omitted.
  //
  // If i is undefined then the last child will be marked as such.
  //
  // If mulitple is truthy then all whitespace will be stripped out until non-whitespace
  // content is met.
  function omitLeft(statements, i, multiple) {
    var current = statements[i == null ? statements.length - 1 : i - 1];
    if (!current || current.type !== 'content' || (!multiple && current.leftStripped)) {
      return;
    }

    // We omit the last node if it's whitespace only and not preceeded by a non-content node.
    var original = current.string;
    current.string = current.string.replace(multiple ? (/\s+$/) : (/[ \t]+$/), '');
    current.leftStripped = current.string !== original;
    return current.leftStripped;
  }
  return __exports__;
})(__module5__);

// handlebars/compiler/base.js
var __module8__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__) {
  "use strict";
  var __exports__ = {};
  var parser = __dependency1__;
  var AST = __dependency2__;
  var Helpers = __dependency3__;
  var extend = __dependency4__.extend;

  __exports__.parser = parser;

  var yy = {};
  extend(yy, Helpers, AST);

  function parse(input) {
    // Just return if an already-compile AST was passed in.
    if (input.constructor === AST.ProgramNode) { return input; }

    parser.yy = yy;

    return parser.parse(input);
  }

  __exports__.parse = parse;
  return __exports__;
})(__module9__, __module7__, __module10__, __module3__);

// handlebars/compiler/compiler.js
var __module11__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;
  var isArray = __dependency2__.isArray;

  var slice = [].slice;

  function Compiler() {}

  __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    equals: function(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || !argEquals(opcode.args, otherOpcode.args)) {
          return false;
        }
      }

      // We know that length is the same between the two arrays because they are directly tied
      // to the opcode behavior above.
      len = this.children.length;
      for (i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function(program, options) {
      this.opcodes = [];
      this.children = [];
      this.depths = {list: []};
      this.options = options;
      this.stringParams = options.stringParams;
      this.trackIds = options.trackIds;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true,
        'lookup': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.accept(program);
    },

    accept: function(node) {
      return this[node.type](node);
    },

    program: function(program) {
      var statements = program.statements;

      for(var i=0, l=statements.length; i<l; i++) {
        this.accept(statements[i]);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var sexpr = mustache.sexpr;
      var type = this.classifySexpr(sexpr);

      if (type === "helper") {
        this.helperSexpr(sexpr, program, inverse);
      } else if (type === "simple") {
        this.simpleSexpr(sexpr);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue', sexpr.id.original);
      } else {
        this.ambiguousSexpr(sexpr, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, i, l;

      this.opcode('pushHash');

      for(i=0, l=pairs.length; i<l; i++) {
        this.pushParam(pairs[i][1]);
      }
      while(i--) {
        this.opcode('assignToHash', pairs[i][0]);
      }
      this.opcode('popHash');
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if (partial.hash) {
        this.accept(partial.hash);
      } else {
        this.opcode('push', 'undefined');
      }

      if (partial.context) {
        this.accept(partial.context);
      } else {
        this.opcode('getContext', 0);
        this.opcode('pushContext');
      }

      this.opcode('invokePartial', partialName.name, partial.indent || '');
      this.opcode('append');
    },

    content: function(content) {
      if (content.string) {
        this.opcode('appendContent', content.string);
      }
    },

    mustache: function(mustache) {
      this.sexpr(mustache.sexpr);

      if(mustache.escaped && !this.options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousSexpr: function(sexpr, program, inverse) {
      var id = sexpr.id,
          name = id.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.ID(id);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleSexpr: function(sexpr) {
      var id = sexpr.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperSexpr: function(sexpr, program, inverse) {
      var params = this.setupFullMustacheParams(sexpr, program, inverse),
          id = sexpr.id,
          name = id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
      } else {
        id.falsy = true;

        this.ID(id);
        this.opcode('invokeHelper', params.length, id.original, id.isSimple);
      }
    },

    sexpr: function(sexpr) {
      var type = this.classifySexpr(sexpr);

      if (type === "simple") {
        this.simpleSexpr(sexpr);
      } else if (type === "helper") {
        this.helperSexpr(sexpr);
      } else {
        this.ambiguousSexpr(sexpr);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        // Context reference, i.e. `{{foo .}}` or `{{foo ..}}`
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts, id.falsy, id.isScoped);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      this.opcode('lookupData', data.id.depth, data.id.parts);
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    NUMBER: function(number) {
      this.opcode('pushLiteral', number.number);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: slice.call(arguments, 1) });
    },

    addDepth: function(depth) {
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifySexpr: function(sexpr) {
      var isHelper   = sexpr.isHelper;
      var isEligible = sexpr.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      // An eligible helper is one that does not have a complex path, i.e. `this.foo`, `../foo` etc.
      if (isEligible && !isHelper) {
        var name = sexpr.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      for(var i=0, l=params.length; i<l; i++) {
        this.pushParam(params[i]);
      }
    },

    pushParam: function(val) {
      if (this.stringParams) {
        if(val.depth) {
          this.addDepth(val.depth);
        }
        this.opcode('getContext', val.depth || 0);
        this.opcode('pushStringParam', val.stringModeValue, val.type);

        if (val.type === 'sexpr') {
          // Subexpressions get evaluated and passed in
          // in string params mode.
          this.sexpr(val);
        }
      } else {
        if (this.trackIds) {
          this.opcode('pushId', val.type, val.idName || val.stringModeValue);
        }
        this.accept(val);
      }
    },

    setupFullMustacheParams: function(sexpr, program, inverse) {
      var params = sexpr.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if (sexpr.hash) {
        this.hash(sexpr.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    }
  };

  function precompile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }
    if (options.compat) {
      options.useDepths = true;
    }

    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    return new env.JavaScriptCompiler().compile(environment, options);
  }

  __exports__.precompile = precompile;function compile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    }

    options = options || {};

    if (!('data' in options)) {
      options.data = true;
    }
    if (options.compat) {
      options.useDepths = true;
    }

    var compiled;

    function compileInput() {
      var ast = env.parse(input);
      var environment = new env.Compiler().compile(ast, options);
      var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    var ret = function(context, options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, options);
    };
    ret._setup = function(options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled._setup(options);
    };
    ret._child = function(i, data, depths) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled._child(i, data, depths);
    };
    return ret;
  }

  __exports__.compile = compile;function argEquals(a, b) {
    if (a === b) {
      return true;
    }

    if (isArray(a) && isArray(b) && a.length === b.length) {
      for (var i = 0; i < a.length; i++) {
        if (!argEquals(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
  }
  return __exports__;
})(__module5__, __module3__);

// handlebars/compiler/javascript-compiler.js
var __module12__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__;
  var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
  var Exception = __dependency2__;

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name /* , type*/) {
      if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        return parent + "." + name;
      } else {
        return parent + "['" + name + "']";
      }
    },
    depthedLookup: function(name) {
      this.aliases.lookup = 'this.lookup';

      return 'lookup(depths, "' + name + '")';
    },

    compilerInfo: function() {
      var revision = COMPILER_REVISION,
          versions = REVISION_CHANGES[revision];
      return [revision, versions];
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return {
          appendToBuffer: true,
          content: string,
          toString: function() { return "buffer += " + string + ";"; }
        };
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options;
      this.stringParams = this.options.stringParams;
      this.trackIds = this.options.trackIds;
      this.precompile = !asObject;

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        environments: []
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.aliases = {};
      this.registers = { list: [] };
      this.hashes = [];
      this.compileStack = [];
      this.inlineStack = [];

      this.compileChildren(environment, options);

      this.useDepths = this.useDepths || environment.depths.list.length || this.options.compat;

      var opcodes = environment.opcodes,
          opcode,
          i,
          l;

      for (i = 0, l = opcodes.length; i < l; i++) {
        opcode = opcodes[i];

        this[opcode.opcode].apply(this, opcode.args);
      }

      // Flush any trailing content that might be pending.
      this.pushSource('');

      /* istanbul ignore next */
      if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
        throw new Exception('Compile completed with content left on stack');
      }

      var fn = this.createFunctionContext(asObject);
      if (!this.isChild) {
        var ret = {
          compiler: this.compilerInfo(),
          main: fn
        };
        var programs = this.context.programs;
        for (i = 0, l = programs.length; i < l; i++) {
          if (programs[i]) {
            ret[i] = programs[i];
          }
        }

        if (this.environment.usePartial) {
          ret.usePartial = true;
        }
        if (this.options.data) {
          ret.useData = true;
        }
        if (this.useDepths) {
          ret.useDepths = true;
        }
        if (this.options.compat) {
          ret.compat = true;
        }

        if (!asObject) {
          ret.compiler = JSON.stringify(ret.compiler);
          ret = this.objectLiteral(ret);
        }

        return ret;
      } else {
        return fn;
      }
    },

    preamble: function() {
      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = [];
    },

    createFunctionContext: function(asObject) {
      var varDeclarations = '';

      var locals = this.stackVars.concat(this.registers.list);
      if(locals.length > 0) {
        varDeclarations += ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      for (var alias in this.aliases) {
        if (this.aliases.hasOwnProperty(alias)) {
          varDeclarations += ', ' + alias + '=' + this.aliases[alias];
        }
      }

      var params = ["depth0", "helpers", "partials", "data"];

      if (this.useDepths) {
        params.push('depths');
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource(varDeclarations);

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        return 'function(' + params.join(',') + ') {\n  ' + source + '}';
      }
    },
    mergeSource: function(varDeclarations) {
      var source = '',
          buffer,
          appendOnly = !this.forceBuffer,
          appendFirst;

      for (var i = 0, len = this.source.length; i < len; i++) {
        var line = this.source[i];
        if (line.appendToBuffer) {
          if (buffer) {
            buffer = buffer + '\n    + ' + line.content;
          } else {
            buffer = line.content;
          }
        } else {
          if (buffer) {
            if (!source) {
              appendFirst = true;
              source = buffer + ';\n  ';
            } else {
              source += 'buffer += ' + buffer + ';\n  ';
            }
            buffer = undefined;
          }
          source += line + '\n  ';

          if (!this.environment.isSimple) {
            appendOnly = false;
          }
        }
      }

      if (appendOnly) {
        if (buffer || !source) {
          source += 'return ' + (buffer || '""') + ';\n';
        }
      } else {
        varDeclarations += ", buffer = " + (appendFirst ? '' : this.initializeBuffer());
        if (buffer) {
          source += 'return buffer + ' + buffer + ';\n';
        } else {
          source += 'return buffer;\n';
        }
      }

      if (varDeclarations) {
        source = 'var ' + varDeclarations.substring(2) + (appendFirst ? '' : ';\n  ') + source;
      }

      return source;
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#this.foo}}...{{/this.foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function(name) {
      this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = [this.contextName(0)];
      this.setupParams(name, 0, params);

      var blockName = this.popStack();
      params.splice(1, 0, blockName);

      this.push('blockHelperMissing.call(' + params.join(', ') + ')');
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      // We're being a bit cheeky and reusing the options value from the prior exec
      var params = [this.contextName(0)];
      this.setupParams('', 0, params, true);

      this.flushInline();

      var current = this.topStack();
      params.splice(1, 0, current);

      this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      }

      this.pendingContent = content;
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      // Force anything that is inlined onto the stack so we don't have duplication
      // when we examine local
      this.flushInline();
      var local = this.popStack();
      this.pushSource('if (' + local + ' != null) { ' + this.appendToBuffer(local) + ' }');
      if (this.environment.isSimple) {
        this.pushSource("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.aliases.escapeExpression = 'this.escapeExpression';

      this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      this.lastContext = depth;
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral(this.contextName(this.lastContext));
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(parts, falsy, scoped) {
      /*jshint -W083 */
      var i = 0,
          len = parts.length;

      if (!scoped && this.options.compat && !this.lastContext) {
        // The depthed query is expected to handle the undefined logic for the root level that
        // is implemented below, so we evaluate that directly in compat mode
        this.push(this.depthedLookup(parts[i++]));
      } else {
        this.pushContext();
      }

      for (; i < len; i++) {
        this.replaceStack(function(current) {
          var lookup = this.nameLookup(current, parts[i], 'context');
          // We want to ensure that zero and false are handled properly if the context (falsy flag)
          // needs to have the special handling for these values.
          if (!falsy) {
            return ' != null ? ' + lookup + ' : ' + current;
          } else {
            // Otherwise we can use generic falsy handling
            return ' && ' + lookup;
          }
        });
      }
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function(depth, parts) {
      /*jshint -W083 */
      if (!depth) {
        this.pushStackLiteral('data');
      } else {
        this.pushStackLiteral('this.data(data, ' + depth + ')');
      }

      var len = parts.length;
      for (var i = 0; i < len; i++) {
        this.replaceStack(function(current) {
          return ' && ' + this.nameLookup(current, parts[i], 'data');
        });
      }
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.aliases.lambda = 'this.lambda';

      this.push('lambda(' + this.popStack() + ', ' + this.contextName(0) + ')');
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushContext();
      this.pushString(type);

      // If it's a subexpression, the string result
      // will be pushed after this opcode.
      if (type !== 'sexpr') {
        if (typeof string === 'string') {
          this.pushString(string);
        } else {
          this.pushStackLiteral(string);
        }
      }
    },

    emptyHash: function() {
      this.pushStackLiteral('{}');

      if (this.trackIds) {
        this.push('{}'); // hashIds
      }
      if (this.stringParams) {
        this.push('{}'); // hashContexts
        this.push('{}'); // hashTypes
      }
    },
    pushHash: function() {
      if (this.hash) {
        this.hashes.push(this.hash);
      }
      this.hash = {values: [], types: [], contexts: [], ids: []};
    },
    popHash: function() {
      var hash = this.hash;
      this.hash = this.hashes.pop();

      if (this.trackIds) {
        this.push('{' + hash.ids.join(',') + '}');
      }
      if (this.stringParams) {
        this.push('{' + hash.contexts.join(',') + '}');
        this.push('{' + hash.types.join(',') + '}');
      }

      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.inlineStack.push(expr);
      return expr;
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name, isSimple) {
      this.aliases.helperMissing = 'helpers.helperMissing';

      var nonHelper = this.popStack();
      var helper = this.setupHelper(paramSize, name);

      var lookup = (isSimple ? helper.name + ' || ' : '') + nonHelper + ' || helperMissing';
      this.push('((' + lookup + ').call(' + helper.callParams + '))');
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name, helperCall) {
      this.aliases.functionType = '"function"';
      this.aliases.helperMissing = 'helpers.helperMissing';
      this.useRegister('helper');

      var nonHelper = this.popStack();

      this.emptyHash();
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      this.push(
        '((helper = (helper = ' + helperName + ' || ' + nonHelper + ') != null ? helper : helperMissing'
          + (helper.paramsInit ? '),(' + helper.paramsInit : '') + '),'
        + '(typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper))');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name, indent) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + indent + "'", "'" + name + "'", this.popStack(), this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      } else if (this.options.compat) {
        params.push('undefined');
      }
      if (this.options.compat) {
        params.push('depths');
      }

      this.push("this.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, ..., hash, ...
    // On stack, after: ..., hash, ...
    //
    // Pops a value off the stack and assigns it to the current hash
    assignToHash: function(key) {
      var value = this.popStack(),
          context,
          type,
          id;

      if (this.trackIds) {
        id = this.popStack();
      }
      if (this.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts.push("'" + key + "': " + context);
      }
      if (type) {
        hash.types.push("'" + key + "': " + type);
      }
      if (id) {
        hash.ids.push("'" + key + "': " + id);
      }
      hash.values.push("'" + key + "': (" + value + ")");
    },

    pushId: function(type, name) {
      if (type === 'ID' || type === 'DATA') {
        this.pushString(name);
      } else if (type === 'sexpr') {
        this.pushStackLiteral('true');
      } else {
        this.pushStackLiteral('null');
      }
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        var index = this.matchExistingProgram(child);

        if (index == null) {
          this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
          index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context, !this.precompile);
          this.context.environments[index] = child;

          this.useDepths = this.useDepths || compiler.useDepths;
        } else {
          child.index = index;
          child.name = 'program' + index;
        }
      }
    },
    matchExistingProgram: function(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return i;
        }
      }
    },

    programExpression: function(guid) {
      var child = this.environment.children[guid],
          depths = child.depths.list,
          useDepths = this.useDepths,
          depth;

      var programParams = [child.index, 'data'];

      if (useDepths) {
        programParams.push('depths');
      }

      return 'this.program(' + programParams.join(', ') + ')';
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      return this.push(new Literal(item));
    },

    pushSource: function(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    pushStack: function(item) {
      this.flushInline();

      var stack = this.incrStack();
      this.pushSource(stack + " = " + item + ";");
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var prefix = '',
          inline = this.isInline(),
          stack,
          createdStack,
          usedLiteral;

      /* istanbul ignore next */
      if (!this.isInline()) {
        throw new Exception('replaceStack on non-inline');
      }

      // We want to merge the inline statement into the replacement statement via ','
      var top = this.popStack(true);

      if (top instanceof Literal) {
        // Literals do not need to be inlined
        prefix = stack = top.value;
        usedLiteral = true;
      } else {
        // Get or create the current stack name for use by the inline
        createdStack = !this.stackSlot;
        var name = !createdStack ? this.topStackName() : this.incrStack();

        prefix = '(' + this.push(name) + ' = ' + top + ')';
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (!usedLiteral) {
        this.popStack();
      }
      if (createdStack) {
        this.stackSlot--;
      }
      this.push('(' + prefix + item + ')');
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var inlineStack = this.inlineStack;
      if (inlineStack.length) {
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            this.pushStack(entry);
          }
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },

    popStack: function(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        if (!inline) {
          /* istanbul ignore next */
          if (!this.stackSlot) {
            throw new Exception('Invalid stack pop');
          }
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function() {
      var stack = (this.isInline() ? this.inlineStack : this.compileStack),
          item = stack[stack.length - 1];

      if (item instanceof Literal) {
        return item.value;
      } else {
        return item;
      }
    },

    contextName: function(context) {
      if (this.useDepths && context) {
        return 'depths[' + context + ']';
      } else {
        return 'depth' + context;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
    },

    objectLiteral: function(obj) {
      var pairs = [];

      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          pairs.push(this.quotedString(key) + ':' + obj[key]);
        }
      }

      return '{' + pairs.join(',') + '}';
    },

    setupHelper: function(paramSize, name, blockHelper) {
      var params = [],
          paramsInit = this.setupParams(name, paramSize, params, blockHelper);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        paramsInit: paramsInit,
        name: foundHelper,
        callParams: [this.contextName(0)].concat(params).join(", ")
      };
    },

    setupOptions: function(helper, paramSize, params) {
      var options = {}, contexts = [], types = [], ids = [], param, inverse, program;

      options.name = this.quotedString(helper);
      options.hash = this.popStack();

      if (this.trackIds) {
        options.hashIds = this.popStack();
      }
      if (this.stringParams) {
        options.hashTypes = this.popStack();
        options.hashContexts = this.popStack();
      }

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          program = 'this.noop';
        }

        if (!inverse) {
          inverse = 'this.noop';
        }

        options.fn = program;
        options.inverse = inverse;
      }

      // The parameters go on to the stack in order (making sure that they are evaluated in order)
      // so we need to pop them off the stack in reverse order
      var i = paramSize;
      while (i--) {
        param = this.popStack();
        params[i] = param;

        if (this.trackIds) {
          ids[i] = this.popStack();
        }
        if (this.stringParams) {
          types[i] = this.popStack();
          contexts[i] = this.popStack();
        }
      }

      if (this.trackIds) {
        options.ids = "[" + ids.join(",") + "]";
      }
      if (this.stringParams) {
        options.types = "[" + types.join(",") + "]";
        options.contexts = "[" + contexts.join(",") + "]";
      }

      if (this.options.data) {
        options.data = "data";
      }

      return options;
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(helperName, paramSize, params, useRegister) {
      var options = this.objectLiteral(this.setupOptions(helperName, paramSize, params));

      if (useRegister) {
        this.useRegister('options');
        params.push('options');
        return 'options=' + options;
      } else {
        params.push(options);
        return '';
      }
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    return !JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name);
  };

  __exports__ = JavaScriptCompiler;
  return __exports__;
})(__module2__, __module5__);

// handlebars.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var Handlebars = __dependency1__;

  // Compiler imports
  var AST = __dependency2__;
  var Parser = __dependency3__.parser;
  var parse = __dependency3__.parse;
  var Compiler = __dependency4__.Compiler;
  var compile = __dependency4__.compile;
  var precompile = __dependency4__.precompile;
  var JavaScriptCompiler = __dependency5__;

  var _create = Handlebars.create;
  var create = function() {
    var hb = _create();

    hb.compile = function(input, options) {
      return compile(input, options, hb);
    };
    hb.precompile = function (input, options) {
      return precompile(input, options, hb);
    };

    hb.AST = AST;
    hb.Compiler = Compiler;
    hb.JavaScriptCompiler = JavaScriptCompiler;
    hb.Parser = Parser;
    hb.parse = parse;

    return hb;
  };

  Handlebars = create();
  Handlebars.create = create;

  Handlebars['default'] = Handlebars;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module7__, __module8__, __module11__, __module12__);

  return __module0__;
}));

//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.7.0';

  // Internal function that returns an efficient (for current engines) version
  // of the passed-in callback, to be repeatedly applied in other Underscore
  // functions.
  var createCallback = function(func, context, argCount) {
    if (context === void 0) return func;
    switch (argCount == null ? 3 : argCount) {
      case 1: return function(value) {
        return func.call(context, value);
      };
      case 2: return function(value, other) {
        return func.call(context, value, other);
      };
      case 3: return function(value, index, collection) {
        return func.call(context, value, index, collection);
      };
      case 4: return function(accumulator, value, index, collection) {
        return func.call(context, accumulator, value, index, collection);
      };
    }
    return function() {
      return func.apply(context, arguments);
    };
  };

  // A mostly-internal function to generate callbacks that can be applied
  // to each element in a collection, returning the desired result — either
  // identity, an arbitrary callback, a property matcher, or a property accessor.
  _.iteratee = function(value, context, argCount) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return createCallback(value, context, argCount);
    if (_.isObject(value)) return _.matches(value);
    return _.property(value);
  };

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles raw objects in addition to array-likes. Treats all
  // sparse array-likes as if they were dense.
  _.each = _.forEach = function(obj, iteratee, context) {
    if (obj == null) return obj;
    iteratee = createCallback(iteratee, context);
    var i, length = obj.length;
    if (length === +length) {
      for (i = 0; i < length; i++) {
        iteratee(obj[i], i, obj);
      }
    } else {
      var keys = _.keys(obj);
      for (i = 0, length = keys.length; i < length; i++) {
        iteratee(obj[keys[i]], keys[i], obj);
      }
    }
    return obj;
  };

  // Return the results of applying the iteratee to each element.
  _.map = _.collect = function(obj, iteratee, context) {
    if (obj == null) return [];
    iteratee = _.iteratee(iteratee, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        results = Array(length),
        currentKey;
    for (var index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      results[index] = iteratee(obj[currentKey], currentKey, obj);
    }
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`.
  _.reduce = _.foldl = _.inject = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index = 0, currentKey;
    if (arguments.length < 3) {
      if (!length) throw new TypeError(reduceError);
      memo = obj[keys ? keys[index++] : index++];
    }
    for (; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  _.reduceRight = _.foldr = function(obj, iteratee, memo, context) {
    if (obj == null) obj = [];
    iteratee = createCallback(iteratee, context, 4);
    var keys = obj.length !== + obj.length && _.keys(obj),
        index = (keys || obj).length,
        currentKey;
    if (arguments.length < 3) {
      if (!index) throw new TypeError(reduceError);
      memo = obj[keys ? keys[--index] : --index];
    }
    while (index--) {
      currentKey = keys ? keys[index] : index;
      memo = iteratee(memo, obj[currentKey], currentKey, obj);
    }
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    predicate = _.iteratee(predicate, context);
    _.some(obj, function(value, index, list) {
      if (predicate(value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    predicate = _.iteratee(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(_.iteratee(predicate)), context);
  };

  // Determine whether all of the elements match a truth test.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    if (obj == null) return true;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false;
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    if (obj == null) return false;
    predicate = _.iteratee(predicate, context);
    var keys = obj.length !== +obj.length && _.keys(obj),
        length = (keys || obj).length,
        index, currentKey;
    for (index = 0; index < length; index++) {
      currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (obj.length !== +obj.length) obj = _.values(obj);
    return _.indexOf(obj, target) >= 0;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element (or element-based computation).
  _.max = function(obj, iteratee, context) {
    var result = -Infinity, lastComputed = -Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value > result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iteratee, context) {
    var result = Infinity, lastComputed = Infinity,
        value, computed;
    if (iteratee == null && obj != null) {
      obj = obj.length === +obj.length ? obj : _.values(obj);
      for (var i = 0, length = obj.length; i < length; i++) {
        value = obj[i];
        if (value < result) {
          result = value;
        }
      }
    } else {
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index, list) {
        computed = iteratee(value, index, list);
        if (computed < lastComputed || computed === Infinity && result === Infinity) {
          result = value;
          lastComputed = computed;
        }
      });
    }
    return result;
  };

  // Shuffle a collection, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var set = obj && obj.length === +obj.length ? obj : _.values(obj);
    var length = set.length;
    var shuffled = Array(length);
    for (var index = 0, rand; index < length; index++) {
      rand = _.random(0, index);
      if (rand !== index) shuffled[index] = shuffled[rand];
      shuffled[rand] = set[index];
    }
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // Sort the object's values by a criterion produced by an iteratee.
  _.sortBy = function(obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iteratee(value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iteratee, context) {
      var result = {};
      iteratee = _.iteratee(iteratee, context);
      _.each(obj, function(value, index) {
        var key = iteratee(value, index, obj);
        behavior(result, value, key);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, value, key) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, value, key) {
    if (_.has(result, key)) result[key]++; else result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iteratee, context) {
    iteratee = _.iteratee(iteratee, context, 1);
    var value = iteratee(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = low + high >>> 1;
      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return obj.length === +obj.length ? obj.length : _.keys(obj).length;
  };

  // Split a collection into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(obj, predicate, context) {
    predicate = _.iteratee(predicate, context);
    var pass = [], fail = [];
    _.each(obj, function(value, key, obj) {
      (predicate(value, key, obj) ? pass : fail).push(value);
    });
    return [pass, fail];
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if (n == null || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, n == null || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, strict, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    for (var i = 0, length = input.length; i < length; i++) {
      var value = input[i];
      if (!_.isArray(value) && !_.isArguments(value)) {
        if (!strict) output.push(value);
      } else if (shallow) {
        push.apply(output, value);
      } else {
        flatten(value, shallow, strict, output);
      }
    }
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, false, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
    if (array == null) return [];
    if (!_.isBoolean(isSorted)) {
      context = iteratee;
      iteratee = isSorted;
      isSorted = false;
    }
    if (iteratee != null) iteratee = _.iteratee(iteratee, context);
    var result = [];
    var seen = [];
    for (var i = 0, length = array.length; i < length; i++) {
      var value = array[i];
      if (isSorted) {
        if (!i || seen !== value) result.push(value);
        seen = value;
      } else if (iteratee) {
        var computed = iteratee(value, i, array);
        if (_.indexOf(seen, computed) < 0) {
          seen.push(computed);
          result.push(value);
        }
      } else if (_.indexOf(result, value) < 0) {
        result.push(value);
      }
    }
    return result;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    if (array == null) return [];
    var result = [];
    var argsLength = arguments.length;
    for (var i = 0, length = array.length; i < length; i++) {
      var item = array[i];
      if (_.contains(result, item)) continue;
      for (var j = 1; j < argsLength; j++) {
        if (!_.contains(arguments[j], item)) break;
      }
      if (j === argsLength) result.push(item);
    }
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, true, []);
    return _.filter(array, function(value){
      return !_.contains(rest, value);
    });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function(array) {
    if (array == null) return [];
    var length = _.max(arguments, 'length').length;
    var results = Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // Return the position of the first occurrence of an item in an array,
  // or -1 if the item is not included in the array.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = isSorted < 0 ? Math.max(0, length + isSorted) : isSorted;
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var idx = array.length;
    if (typeof from == 'number') {
      idx = from < 0 ? idx + from + 1 : Math.min(idx, from + 1);
    }
    while (--idx >= 0) if (array[idx] === item) return idx;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = step || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var range = Array(length);

    for (var idx = 0; idx < length; idx++, start += step) {
      range[idx] = start;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var Ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
    args = slice.call(arguments, 2);
    bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      Ctor.prototype = func.prototype;
      var self = new Ctor;
      Ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (_.isObject(result)) return result;
      return self;
    };
    return bound;
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var i, length = arguments.length, key;
    if (length <= 1) throw new Error('bindAll must be passed function names');
    for (i = 1; i < length; i++) {
      key = arguments[i];
      obj[key] = _.bind(obj[key], obj);
    }
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memoize = function(key) {
      var cache = memoize.cache;
      var address = hasher ? hasher.apply(this, arguments) : key;
      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
      return cache[address];
    };
    memoize.cache = {};
    return memoize;
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){
      return func.apply(null, args);
    }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a negated version of the passed-in predicate.
  _.negate = function(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var args = arguments;
    var start = args.length - 1;
    return function() {
      var i = start;
      var result = args[start].apply(this, arguments);
      while (i--) result = args[i].call(this, result);
      return result;
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Returns a function that will only be executed before being called N times.
  _.before = function(times, func) {
    var memo;
    return function() {
      if (--times > 0) {
        memo = func.apply(this, arguments);
      } else {
        func = null;
      }
      return memo;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = _.partial(_.before, 2);

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    if (!_.isObject(obj)) return obj;
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (hasOwnProperty.call(source, prop)) {
            obj[prop] = source[prop];
        }
      }
    }
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj, iteratee, context) {
    var result = {}, key;
    if (obj == null) return result;
    if (_.isFunction(iteratee)) {
      iteratee = createCallback(iteratee, context);
      for (key in obj) {
        var value = obj[key];
        if (iteratee(value, key, obj)) result[key] = value;
      }
    } else {
      var keys = concat.apply([], slice.call(arguments, 1));
      obj = new Object(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (key in obj) result[key] = obj[key];
      }
    }
    return result;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj, iteratee, context) {
    if (_.isFunction(iteratee)) {
      iteratee = _.negate(iteratee);
    } else {
      var keys = _.map(concat.apply([], slice.call(arguments, 1)), String);
      iteratee = function(value, key) {
        return !_.contains(keys, key);
      };
    }
    return _.pick(obj, iteratee, context);
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    if (!_.isObject(obj)) return obj;
    for (var i = 1, length = arguments.length; i < length; i++) {
      var source = arguments[i];
      for (var prop in source) {
        if (obj[prop] === void 0) obj[prop] = source[prop];
      }
    }
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a === 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a) return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] === a) return bStack[length] === b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (
      aCtor !== bCtor &&
      // Handle Object.create(x) cases
      'constructor' in a && 'constructor' in b &&
      !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
        _.isFunction(bCtor) && bCtor instanceof bCtor)
    ) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size, result;
    // Recursively compare objects and arrays.
    if (className === '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size === b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      var keys = _.keys(a), key;
      size = keys.length;
      // Ensure that both objects contain the same number of properties before comparing deep equality.
      result = _.keys(b).length === size;
      if (result) {
        while (size--) {
          // Deep compare each member
          key = keys[size];
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) === '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return _.has(obj, 'callee');
    };
  }

  // Optimize `isFunction` if appropriate. Work around an IE 11 bug.
  if (typeof /./ !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj == 'function' || false;
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj !== +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iteratees.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function() {
      return value;
    };
  };

  _.noop = function(){};

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    var pairs = _.pairs(attrs), length = pairs.length;
    return function(obj) {
      if (obj == null) return !length;
      obj = new Object(obj);
      for (var i = 0; i < length; i++) {
        var pair = pairs[i], key = pair[0];
        if (pair[1] !== obj[key] || !(key in obj)) return false;
      }
      return true;
    };
  };

  // Run a function **n** times.
  _.times = function(n, iteratee, context) {
    var accum = Array(Math.max(0, n));
    iteratee = createCallback(iteratee, context, 1);
    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() {
    return new Date().getTime();
  };

   // List of HTML entities for escaping.
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '`': '&#x60;'
  };
  var unescapeMap = _.invert(escapeMap);

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  var createEscaper = function(map) {
    var escaper = function(match) {
      return map[match];
    };
    // Regexes for identifying a key that needs to be escaped
    var source = '(?:' + _.keys(map).join('|') + ')';
    var testRegexp = RegExp(source);
    var replaceRegexp = RegExp(source, 'g');
    return function(string) {
      string = string == null ? '' : '' + string;
      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
    };
  };
  _.escape = createEscaper(escapeMap);
  _.unescape = createEscaper(unescapeMap);

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? object[property]() : value;
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

  var escapeChar = function(match) {
    return '\\' + escapes[match];
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  // NB: `oldSettings` only exists for backwards compatibility.
  _.template = function(text, settings, oldSettings) {
    if (!settings && oldSettings) settings = oldSettings;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset).replace(escaper, escapeChar);
      index = offset + match.length;

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      } else if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      } else if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }

      // Adobe VMs need the match returned to produce the correct offest.
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + 'return __p;\n';

    try {
      var render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled source as a convenience for precompilation.
    var argument = settings.variable || 'obj';
    template.source = 'function(' + argument + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function. Start chaining a wrapped Underscore object.
  _.chain = function(obj) {
    var instance = _(obj);
    instance._chain = true;
    return instance;
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    _.each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  _.each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  // Extracts the result from a wrapped and chained object.
  _.prototype.value = function() {
    return this._wrapped;
  };

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}.call(this));

//     Backbone.js 1.1.2

//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore');
    factory(root, exports, _);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base =
        _.result(this, 'urlRoot') ||
        _.result(this.collection, 'url') ||
        urlError();
      if (this.isNew()) return base;
      return base.replace(/([^\/])$/, '$1/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byId[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }

        // Do not add multiple models with the same `id`.
        model = existing || model;
        if (order && (model.isNew() || !modelMap[model.id])) order.push(model);
        modelMap[model.id] = true;
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        router.execute(callback, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Execute a route handler with the provided parameters.  This is an
    // excellent place to do pre-route setup or post-route cleanup.
    execute: function(callback, args) {
      if (callback) callback.apply(this, args);
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash.
  var pathStripper = /#.*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Are we at the app root?
    atRoot: function() {
      return this.location.pathname.replace(/[^\/]$/, '$&/') === this.root;
    },

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = decodeURI(this.location.pathname + this.location.search);
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !this.atRoot()) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && this.atRoot() && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

/*!
 * Chico Theme UI v1.2.0
 * http://chico-ui.com.ar/
 *
 * Copyright (c) 2015, MercadoLibre.com
 * Released under the MIT license.
 * http://chico-ui.com.ar/license
 */


(function (window, $) {
	'use strict';

var ch = {},

        /**
         * Reference to the window jQuery or Zepto Selector.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        $window = $(window),

        /**
         * Reference to the navigator object.
         * @private
         * @type {Object}
         */
        navigator = window.navigator,

        /**
         * Reference to the userAgent.
         * @private
         * @type {String}
         */
        userAgent = navigator.userAgent,

        /**
         * Reference to the HTMLDocument.
         * @private
         * @type {Object}
         */
        document = window.document,

        /**
         * Reference to the document jQuery or Zepto Selector.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        $document = $(document),

        /**
         * Reference to the HTMLBodyElement.
         * @private
         * @type {HTMLBodyElement}
         */
        body = document.body,

        /**
         * Reference to the body jQuery or Zepto Selector.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        $body = $(body),

        /**
         * Reference to the HTMLhtmlElement.
         * @private
         * @type {HTMLhtmlElement}
         */
        html = document.getElementsByTagName('html')[0],

        /**
         * Reference to the html jQuery or Zepto Selector.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        $html = $(html),

        /**
         * Reference to the Object Contructor.
         * @private
         * @constructor
         */
        Object = window.Object,

        /**
         * Reference to the Array Contructor.
         * @private
         * @constructor
         */
        Array = window.Array,

        /**
         * Reference to the vendor prefix of the current browser.
         * @constant
         * @private
         * @type {String}
         * @link http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser
         */
        VENDOR_PREFIX = (function () {

            var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/,
                styleDeclaration = document.getElementsByTagName('script')[0].style,
                prop;

            for (prop in styleDeclaration) {
                if (regex.test(prop)) {
                    return prop.match(regex)[0].toLowerCase();
                }
            }

            // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
            // However (prop in style) returns the correct value, so we'll have to test for
            // the precence of a specific property
            if ('WebkitOpacity' in styleDeclaration) { return 'webkit'; }
            if ('KhtmlOpacity' in styleDeclaration) { return 'khtml'; }

            return '';
        }());
ch.util = {

        /**
         * Returns true if an object is an array, false if it is not.
         * @param {Object} obj The object to be checked.
         * @returns {Boolean}
         * @example
         * ch.util.isArray([1, 2, 3]); // true
         */
        'isArray': (function () {
            if (typeof Array.isArray === 'function') {
                return Array.isArray;
            }

            return function (obj) {
                if (obj === undefined) {
                    throw new Error('"ch.util.isArray(obj)": It must receive a parameter.');
                }

                return (Object.prototype.toString.call(obj) === '[object Array]');
            };
        }()),

        /**
         * Checks if the url given is right to load content.
         * @param {String} url The url to be checked.
         * @returns {Boolean}
         * @example
         * ch.util.isUrl('www.chico-ui.com.ar'); // true
         */
        'isUrl': function (url) {
            if (url === undefined || typeof url !== 'string') {
                return false;
            }

            /*
            # RegExp

            https://github.com/mercadolibre/chico/issues/579#issuecomment-5206670

            ```javascript
            1   1.1                        1.2   1.3  1.4       1.5       1.6                   2                      3               4                    5
            /^(((https|http|ftp|file):\/\/)|www\.|\.\/|(\.\.\/)+|(\/{1,2})|(\d{1,3}\.){3}\d{1,3})(((\w+|-)(\.?)(\/?))+)(\:\d{1,5}){0,1}(((\w+|-)(\.?)(\/?))+)((\?)(\w+=(\w?)+(&?))+)?$/
            ```

            ## Description
            1. Checks for the start of the URL
                1. if starts with a protocols followed by :// Example: file://chico
                2. if start with www followed by . (dot) Example: www.chico
                3. if starts with ./
                4. if starts with ../ and can repeat one or more times
                5. if start with double slash // Example: //chico.server
                6. if start with an ip address
            2. Checks the domain
              letters, dash followed by a dot or by a slash. All this group can repeat one or more times
            3. Ports
             Zero or one time
            4. Idem to point two
            5. QueryString pairs

            ## Allowed URLs
            1. http://www.mercadolibre.com
            2. http://mercadolibre.com/
            3. http://mercadolibre.com:8080?hola=
            4. http://mercadolibre.com/pepe
            5. http://localhost:2020
            6. http://192.168.1.1
            7. http://192.168.1.1:9090
            8. www.mercadolibre.com
            9. /mercadolibre
            10. /mercadolibre/mercado
            11. /tooltip?siteId=MLA&categId=1744&buyingMode=buy_it_now&listingTypeId=bronze
            12. ./pepe
            13. ../../mercado/
            14. www.mercadolibre.com?siteId=MLA&categId=1744&buyingMode=buy_it_now&listingTypeId=bronze
            15. www.mercado-libre.com
            16. http://ui.ml.com:8080/ajax.html

            ## Forbiden URLs
            1. http://
            2. http://www&
            3. http://hola=
            4. /../../mercado/
            5. /mercado/../pepe
            6. mercadolibre.com
            7. mercado/mercado
            8. localhost:8080/mercadolibre
            9. pepe/../pepe.html
            10. /pepe/../pepe.html
            11. 192.168.1.1
            12. localhost:8080/pepe
            13. localhost:80-80
            14. www.mercadolibre.com?siteId=MLA&categId=1744&buyi ngMode=buy_it_now&listingTypeId=bronze
            15. `<asd src="www.mercadolibre.com">`
            16. Mercadolibre.................
            17. /laksjdlkasjd../
            18. /..pepe..
            19. /pepe..
            20. pepe:/
            21. /:pepe
            22. dadadas.pepe
            23. qdasdasda
            24. http://ui.ml.com:8080:8080/ajax.html
            */
            return ((/^(((https|http|ftp|file):\/\/)|www\.|\.\/|(\.\.\/)+|(\/{1,2})|(\d{1,3}\.){3}\d{1,3})(((\w+|-)(\.?)(\/?))+)(\:\d{1,5}){0,1}(((\w+|-)(\.?)(\/?)(#?))+)((\?)(\w+=(\w?)+(&?))+)?(\w+#\w+)?$/).test(url));
        },

        /**
         * Determines if a specified element is an instance of $.
         * @param {Object} $el The element to be checked as instance of $.
         * @returns {Boolean}
         * @example
         * ch.util.is$($('element')); // true
         */
        'is$': (function () {
            if ($.zepto === undefined) {
                return function ($el) {
                    return $el instanceof $;
                };
            } else {
                return function ($el) {
                    return $.zepto.isZ($el);
                };
            }
        }()),

        /**
         * Adds CSS rules to disable text selection highlighting.
         * @param {...jQuerySelector} jQuery or Zepto Selector to disable text selection highlighting.
         * @example
         * ch.util.avoidTextSelection($(selector));
         */
        'avoidTextSelection': function () {
            var args = arguments,
                len = arguments.length,
                i = 0;

            if (arguments.length < 1) {
                throw new Error('"ch.util.avoidTextSelection(selector);": The selector parameter is required.');
            }

            for (i; i < len; i += 1) {

                if (!(args[i] instanceof $ || $.zepto.isZ(args[i]))) {
                    throw new Error('"ch.util.avoidTextSelection(selector);": The parameter must be a jQuery or Zepto selector.');
                }

                if ($html.hasClass('lt-ie10')) {
                    args[i].attr('unselectable', 'on');

                } else {
                    args[i].addClass('ch-user-no-select');
                }

            }
        },

        /**
         * Gives the final used values of all the CSS properties of an element.
         * @param {HTMLElement} el The HTMLElement for which to get the computed style.
         * @param {string} prop The name of the CSS property to test.
         * @returns {CSSStyleDeclaration}
         * @link http://www.quirksmode.org/dom/getstyles.html
         * @example
         * ch.util.getStyles(HTMLElement, 'color'); // true
         */
        'getStyles': function (el, prop) {

            if (el === undefined || !(el.nodeType === 1)) {
                throw new Error('"ch.util.getStyles(el, prop)": The "el" parameter is required and must be a HTMLElement.');
            }

            if (prop === undefined || typeof prop !== 'string') {
                throw new Error('"ch.util.getStyles(el, prop)": The "prop" parameter is required and must be a string.');
            }

            if (window.getComputedStyle) {
                return window.getComputedStyle(el, "").getPropertyValue(prop);
            // IE
            } else {
                // Turn style name into camel notation
                prop = prop.replace(/\-(\w)/g, function (str, $1) { return $1.toUpperCase(); });
                return el.currentStyle[prop];
            }
        },

        /**
         * Returns a shallow-copied clone of the object.
         * @param {Object} obj The object to copy.
         * @returns {Object}
         * @example
         * ch.util.clone(object);
         */
        'clone': function (obj) {
            if (obj === undefined || typeof obj !== 'object') {
                throw new Error('"ch.util.clone(obj)": The "obj" parameter is required and must be a object.');
            }

            var copy = {},
                prop;

            for (prop in obj) {
                if (obj[prop] !== undefined) {
                    copy[prop] = obj[prop];
                }
            }

            return copy;
        },

        /**
         * Inherits the prototype methods from one constructor into another. The parent will be accessible through the obj.super property.
         * @param {Function} obj The object that have new members.
         * @param {Function} superConstructor The construsctor Class.
         * @returns {Object}
         * @exampleDescription
         * @example
         * ch.util.inherit(obj, parent);
         */
        'inherits': function (obj, superConstructor) {

            if (obj === undefined || typeof obj !== 'function') {
                throw new Error('"ch.util.inherits(obj, superConstructor)": The "obj" parameter is required and must be a constructor function.');
            }

            if (superConstructor === undefined || typeof superConstructor !== 'function') {
                throw new Error('"ch.util.inherits(obj, superConstructor)": The "superConstructor" parameter is required and must be a constructor function.');
            }

            var child = obj.prototype || {};
            obj.prototype = $.extend(child, superConstructor.prototype);

            return superConstructor.prototype;
        },

        /**
         * Prevent default actions of a given event.
         * @param {Event} event The event ot be prevented.
         * @returns {Object}
         * @example
         * ch.util.prevent(event);
         */
        prevent: function (event) {
            if (typeof event === 'object') {
                event.preventDefault();
            }
        },

        /**
         * Get the current vertical and horizontal positions of the scroll bar.
         * @returns {Object}
         * @example
         * ch.util.getScroll();
         */
        'getScroll': function () {
            return {
                'left': window.pageXOffset || document.documentElement.scrollLeft || 0,
                'top': window.pageYOffset || document.documentElement.scrollTop || 0
            };
        },

        /**
         * Get the current outer dimensions of an element.
         * @param {HTMLElement} el A given HTMLElement.
         * @returns {Object}
         * @example
         * ch.util.getOuterDimensions(el);
         */
        'getOuterDimensions': function (el) {
            var obj = el.getBoundingClientRect();

            return {
                'width': (obj.right - obj.left),
                'height': (obj.bottom - obj.top)
            };
        },

        /**
         * Get the current offset of an element.
         * @param {HTMLElement} el A given HTMLElement.
         * @returns {Object}
         * @example
         * ch.util.getOffset(el);
         */
        'getOffset': function (el) {

            var rect = el.getBoundingClientRect(),
                fixedParent = ch.util.getPositionedParent(el, 'fixed'),
                scroll = ch.util.getScroll(),
                offset = {
                    'left': rect.left,
                    'top': rect.top
                };

            if (ch.util.getStyles(el, 'position') !== 'fixed' && fixedParent === null) {
                offset.left += scroll.left;
                offset.top += scroll.top;
            }

            return offset;
        },

        /**
         * Get the current parentNode with the given position.
         * @param {HTMLElement} el A given HTMLElement.
         * @param {String} position A given position (static, relative, fixed or absolute).
         * @returns {HTMLElement}
         * @example
         * ch.util.getPositionedParent(el, 'fixed');
         */
        'getPositionedParent': function (el, position) {
            var currentParent = el.offsetParent,
                parent;

            while (parent === undefined) {

                if (currentParent === null) {
                    parent = null;
                    break;
                }

                if (ch.util.getStyles(currentParent, 'position') !== position) {
                    currentParent = currentParent.offsetParent;
                } else {
                    parent = currentParent;
                }

            };

            return parent;
        },

        /**
         * Reference to the vendor prefix of the current browser.
         * @constant
         * @memberof ch.util
         * @type {String}
         * @link http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser
         * @example
         * ch.util.VENDOR_PREFIX === 'webkit';
         */
        'VENDOR_PREFIX': (function () {

            var regex = /^(Webkit|Khtml|Moz|ms|O)(?=[A-Z])/,
                styleDeclaration = document.getElementsByTagName('script')[0].style,
                prop;

            for (prop in styleDeclaration) {
                if (regex.test(prop)) {
                    return prop.match(regex)[0].toLowerCase();
                }
            }

            // Nothing found so far? Webkit does not enumerate over the CSS properties of the style object.
            // However (prop in style) returns the correct value, so we'll have to test for
            // the precence of a specific property
            if ('WebkitOpacity' in styleDeclaration) { return 'webkit'; }
            if ('KhtmlOpacity' in styleDeclaration) { return 'khtml'; }

            return '';
        }()),

        /**
         * zIndex values.
         * @type {Number}
         * @example
         * ch.util.zIndex += 1;
         */
        'zIndex': 1000
    };
ch.support = {

        /**
         * Verify that CSS Transitions are supported (or any of its browser-specific implementations).
         * @type {Boolean}
         * @link http://gist.github.com/373874
         * @example
         * if (ch.support.transition) {
         *     // Some code here!
         * }
         */
        'transition': body.style.WebkitTransition !== undefined || body.style.MozTransition !== undefined || body.style.MSTransition !== undefined || body.style.OTransition !== undefined || body.style.transition !== undefined,

        /**
         * Checks if the $ library has fx methods.
         * @type {Boolean}
         * @example
         * if (ch.support.fx) {
         *     // Some code here!
         * }
         */
        'fx': !!$.fn.slideDown,

        /**
         * Checks if the User Agent support touch events.
         * @type {Boolean}
         * @example
         * if (ch.support.touch) {
         *     // Some code here!
         * }
         */
        'touch': 'createTouch' in document
    };
ch.onlayoutchange = 'layoutchange';

    /**
     * Equivalent to 'resize'.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onresize = 'resize';

    /**
     * Equivalent to 'scroll'.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onscroll = 'scroll';

    /**
     * Equivalent to 'touchstart' or 'mousedown', depending on device capabilities.
     * @constant
     * @memberof ch
     * @type {String}
     * @link http://www.w3.org/TR/2013/WD-pointerevents-20130115/#dfn-pointerdown | Pointer Events W3C Working Draft
     */
    ch.onpointerdown = (ch.support.touch) ? 'touchstart' : 'mousedown';

    /**
     * Equivalent to 'touchend' or 'mouseup', depending on device capabilities.
     * @constant
     * @memberof ch
     * @type {String}
     * @link http://www.w3.org/TR/2013/WD-pointerevents-20130115/#dfn-pointerup | Pointer Events W3C Working Draft
     */
    ch.onpointerup = (ch.support.touch) ? 'touchend' : 'mouseup';

    /**
     * Equivalent to 'touchmove' or 'mousemove', depending on device capabilities.
     * @constant
     * @memberof ch
     * @type {String}
     * @link http://www.w3.org/TR/2013/WD-pointerevents-20130115/#dfn-pointermove | Pointer Events W3C Working Draft
     */
    ch.onpointermove = (ch.support.touch) ? 'touchmove' : 'mousemove';

    /**
     * Equivalent to 'touchend' or 'click', depending on device capabilities.
     * @constant
     * @memberof ch
     * @type {String}
     * @link http://www.w3.org/TR/2013/WD-pointerevents-20130115/#list-of-pointer-events | Pointer Events W3C Working Draft
     */
    ch.onpointertap = (ch.support.touch) ? 'touchend' : 'click';

    /**
     * Equivalent to 'touchstart' or 'mouseenter', depending on device capabilities.
     * @constant
     * @memberof ch
     * @type {String}
     * @link http://www.w3.org/TR/2013/WD-pointerevents-20130115/#dfn-pointerenter | Pointer Events W3C Working Draft
     */
    ch.onpointerenter = (ch.support.touch) ? 'touchstart' : 'mouseenter';

    /**
     * Equivalent to 'touchend' or 'mouseleave', depending on device capabilities.
     * @constant
     * @memberof ch
     * @type {String}
     * @link http://www.w3.org/TR/2013/WD-pointerevents-20130115/#dfn-pointerleave | Pointer Events W3C Working Draft
     */
    ch.onpointerleave = (ch.support.touch) ? 'touchend' : 'mouseleave';

    /**
     * Alphanumeric keys event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeyinput = ('oninput' in document.createElement('input')) ? 'input' : 'keydown';
ch.onkeytab = 'tab';

    /**
     * Enter key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeyenter = 'enter';

    /**
     * Esc key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeyesc = 'esc';

    /**
     * Left arrow key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeyleftarrow = 'left_arrow';

    /**
     * Up arrow key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeyuparrow = 'up_arrow';

    /**
     * Rigth arrow key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeyrightarrow = 'right_arrow';

    /**
     * Down arrow key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeydownarrow = 'down_arrow';

    /**
     * Backspace key event.
     * @constant
     * @memberof ch
     * @type {String}
     */
    ch.onkeybackspace = 'backspace';
ch.factory = function (Klass, fn) {
        /**
         * Identification of the constructor, in lowercases.
         * @type {String}
         */
        var name = Klass.prototype.name,

            /**
             * Reference to the class name. When it's a preset, take its constructor name via the "preset" property.
             * @type {String}
             */
            constructorName = Klass.prototype._preset || name;

        /**
         * The class constructor exposed directly into the "ch" namespace.
         * @exampleDescription Creating a component instance by specifying a query selector and a configuration object.
         * @example
         * ch.Component($('#example'), {
         *     'key': 'value'
         * });
         */
        // Uses the function.name property (non-standard) on the newest browsers OR
        // uppercases the first letter from the identification name of the constructor
        ch[(name.charAt(0).toUpperCase() + name.substr(1))] = Klass;

        /**
         * The class constructor exposed into the "$" namespace.
         * @ignore
         * @exampleDescription Creating a component instance by specifying a query selector and a configuration object.
         * @example
         * $.component($('#example'), {
         *     'key': 'value'
         * });
         * @exampleDescription Creating a component instance by specifying only a query selector. The default options of each component will be used.
         * @example
         * $.component($('#example')});
         * @exampleDescription Creating a component instance by specifying only a cofiguration object. It only works on compatible components, when those doesn't depends on a element to be created.
         * @example
         * $.component({
         *     'key': 'value'
         * });
         * @exampleDescription Creating a component instance by no specifying parameters. It only works on compatible components, when those doesn't depends on a element to be created. The default options of each component will be used.
         * @example
         * $.component();
         */
        $[name] = function ($el, options) {
            // Create a new instance of the constructor and return it
            return new Klass($el, options);
        };

        /**
         * The class constructor exposed as a "$" plugin.
         */
        $.fn[name] = function (options) {

            // Collection with each instanced component
            var components = [];

            // Normalize options
            options = (fn !== undefined) ? fn.apply(this, arguments) : options;

            // Analize every match of the main query selector
            $.each(this, function () {
                // Get into the "$" scope
                var $el = $(this),
                    // Try to get the "data" reference to this component related to the element
                    data = $el.data(constructorName);

                // When this component isn't related to the element via data, create a new instance and save
                if (data === undefined) {

                    // Save the reference to this instance into the element data
                    data = new Klass($el, options);
                    $el.data(constructorName, data);

                } else {

                    if (data.emit !== undefined) {
                        data.emit('exist', options);
                    }
                }

                // Add the component reference to the final collection
                components.push(data);

            });

            // Return the instance/instances of components
            return (components.length > 1) ? components : components[0];
        };
    };
    // Remove the no-js classname from html tag
    $html.removeClass('no-js');

    // Exposse private $ (jQuery) into ch.$
    ch.$ = window.$;
	ch.version = '1.2.0';
	window.ch = ch;
}(this, this.$));
(function (ch) {
    'use strict';

    /**
     * Event Emitter Class for the browser.
     * @memberof ch
     * @constructor
     * @returns {Object} Returns a new instance of EventEmitter.
     * @example
     * // Create a new instance of EventEmitter.
     * var emitter = new ch.EventEmitter();
     * @example
     * // Inheriting from EventEmitter.
     * ch.util.inherits(Component, ch.EventEmitter);
     */
    function EventEmitter() {}

    /**
     * Adds a listener to the collection for a specified event.
     * @memberof! ch.EventEmitter.prototype
     * @function
     * @param {String} event The event name to subscribe.
     * @param {Function} listener Listener function.
     * @param {Boolean} once Indicate if a listener function will be called only one time.
     * @returns {component}
     * @example
     * // Will add an event listener to 'ready' event.
     * component.on('ready', listener);
     */
    EventEmitter.prototype.on = function (event, listener, once) {

        if (event === undefined) {
            throw new Error('ch.EventEmitter - "on(event, listener)": It should receive an event.');
        }

        if (listener === undefined) {
            throw new Error('ch.EventEmitter - "on(event, listener)": It should receive a listener function.');
        }

        this._eventsCollection = this._eventsCollection || {};

        listener.once = once || false;

        if (this._eventsCollection[event] === undefined) {
            this._eventsCollection[event] = [];
        }

        this._eventsCollection[event].push(listener);

        return this;
    };

    /**
     * Adds a listener to the collection for a specified event to will execute only once.
     * @memberof! ch.EventEmitter.prototype
     * @function
     * @param {String} event Event name.
     * @param {Function} listener Listener function.
     * @returns {component}
     * @example
     * // Will add an event handler to 'contentLoad' event once.
     * component.once('contentLoad', listener);
     */
    EventEmitter.prototype.once = function (event, listener) {

        this.on(event, listener, true);

        return this;
    };

    /**
     * Removes a listener from the collection for a specified event.
     * @memberof! ch.EventEmitter.prototype
     * @function
     * @param {String} event Event name.
     * @param {Function} listener Listener function.
     * @returns {component}
     * @example
     * // Will remove event listener to 'ready' event.
     * component.off('ready', listener);
     */
    EventEmitter.prototype.off = function (event, listener) {

        if (event === undefined) {
            throw new Error('EventEmitter - "off(event, listener)": It should receive an event.');
        }

        if (listener === undefined) {
            throw new Error('EventEmitter - "off(event, listener)": It should receive a listener function.');
        }

        var listeners = this._eventsCollection[event],
            i = 0,
            len;

        if (listeners !== undefined) {
            len = listeners.length;
            for (i; i < len; i += 1) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }

        return this;
    };

    /**
     * Returns all listeners from the collection for a specified event.
     * @memberof! ch.EventEmitter.prototype
     * @function
     * @param {String} event The event name.
     * @returns {Array}
     * @example
     * // Returns listeners from 'ready' event.
     * component.getListeners('ready');
     */
    EventEmitter.prototype.getListeners = function (event) {
        if (event === undefined) {
            throw new Error('ch.EventEmitter - "getListeners(event)": It should receive an event.');
        }

        return this._eventsCollection[event];
    };

    /**
     * Execute each item in the listener collection in order with the specified data.
     * @memberof! ch.EventEmitter.prototype
     * @function
     * @param {String} event The name of the event you want to emit.
     * @param {...Object} var_args Data to pass to the listeners.
     * @returns {component}
     * @example
     * // Will emit the 'ready' event with 'param1' and 'param2' as arguments.
     * component.emit('ready', 'param1', 'param2');
     */
    EventEmitter.prototype.emit = function () {

        var args = Array.prototype.slice.call(arguments, 0), // converted to array
            event = args.shift(), // Store and remove events from args
            listeners,
            i = 0,
            len;

        if (event === undefined) {
            throw new Error('ch.EventEmitter - "emit(event)": It should receive an event.');
        }

        if (typeof event === 'string') {
            event = {'type': event};
        }

        if (!event.target) {
            event.target = this;
        }

        if (this._eventsCollection !== undefined && this._eventsCollection[event.type] !== undefined) {
            listeners = this._eventsCollection[event.type];
            len = listeners.length;

            for (i; i < len; i += 1) {
                listeners[i].apply(this, args);

                if (listeners[i].once) {
                    this.off(event.type, listeners[i]);
                    len -= 1;
                    i -= 1;
                }
            }
        }

        return this;
    };

    // Expose EventEmitter
    ch.EventEmitter = EventEmitter;

}(this.ch));
(function ($, ch) {
    'use strict';

    /**
     * Add a function to manage components content.
     * @memberOf ch
     * @mixin
     * @returns {Function}
     */
    function Content() {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            defaults = {
                'method': this._options.method,
                'params': this._options.params,
                'cache': this._options.cache,
                'async': this._options.async,
                'waiting': this._options.waiting
            };

        /**
         * Set async content into component's container and emits the current event.
         * @private
         */
        function setAsyncContent(event) {

            that._$content.html(event.response);

            /**
             * Event emitted when the content change.
             * @event ch.Content#contentchange
             * @private
             */
            that.emit('_contentchange');

            /**
             * Event emitted if the content is loaded successfully.
             * @event ch.Content#contentdone
             * @ignore
             */

            /**
             * Event emitted when the content is loading.
             * @event ch.Content#contentwaiting
             * @example
             * // Subscribe to "contentwaiting" event.
             * component.on('contentwaiting', function (event) {
             *     // Some code here!
             * });
             */

            /**
             * Event emitted if the content isn't loaded successfully.
             * @event ch.Content#contenterror
             * @example
             * // Subscribe to "contenterror" event.
             * component.on('contenterror', function (event) {
             *     // Some code here!
             * });
             */

            that.emit('content' + event.status, event);
        }

        /**
         * Set content into component's container and emits the contentdone event.
         * @private
         */
        function setContent(content) {

            that._$content.html(content);

            that._options.cache = true;

            /**
             * Event emitted when the content change.
             * @event ch.Content#contentchange
             * @private
             */
            that.emit('_contentchange');

            /**
             * Event emitted if the content is loaded successfully.
             * @event ch.Content#contentdone
             * @example
             * // Subscribe to "contentdone" event.
             * component.on('contentdone', function (event) {
             *     // Some code here!
             * });
             */
            that.emit('contentdone');
        }

        /**
         * Get async content with given URL.
         * @private
         */
        function getAsyncContent(url, options) {
            // Initial options to be merged with the user's options
            options = $.extend({
                'method': 'GET',
                'params': '',
                'async': true,
                'waiting': '<div class="ch-loading-large"></div>'
            }, options || defaults);

            if (options.cache !== undefined) {
                that._options.cache = options.cache;
            }

            // Set loading
            setAsyncContent({
                'status': 'waiting',
                'response': options.waiting
            });

            // Make async request
            $.ajax({
                'url': url,
                'type': options.method,
                'data': 'x=x' + ((options.params !== '') ? '&' + options.params : ''),
                'cache': that._options.cache,
                'async': options.async,
                'beforeSend': function (jqXHR) {
                    // Set the AJAX default HTTP headers
                    jqXHR.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                },
                'success': function (data) {
                    // Send the result data to the client
                    setAsyncContent({
                        'status': 'done',
                        'response': data
                    });
                },
                'error': function (jqXHR, textStatus, errorThrown) {
                    // Send a defined error message
                    setAsyncContent({
                        'status': 'error',
                        'response': '<p>Error on ajax call.</p>',

                         // Grab all the parameters into a JSON to send to the client
                        'data': {
                            'jqXHR': jqXHR,
                            'textStatus': textStatus,
                            'errorThrown': errorThrown
                        }
                    });
                }
            });
        }

        /**
         * Allows to manage the components content.
         * @function
         * @memberof! ch.Content#
         * @param {(String | jQuerySelector | ZeptoSelector)} content The content that will be used by a component.
         * @param {Object} [options] A custom options to be used with content loaded by ajax.
         * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
         * @param {String} [options.params] Params like query string to be sent to the server.
         * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
         * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
         * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
         * @example
         * // Update content with some string.
         * component.content('Some new content here!');
         * @example
         * // Update content that will be loaded by ajax with custom options.
         * component.content('http://chico-ui.com.ar/ajax', {
         *     'cache': false,
         *     'params': 'x-request=true'
         * });
         */
        this.content = function (content, options) {

            // Returns the last updated content.
            if (content === undefined) {
                return that._$content.html();
            }

            that._options.content = content;

            if (that._options.cache === undefined) {
                that._options.cache = true;
            }

            if (typeof content === 'string') {
                // Case 1: AJAX call
                if (ch.util.isUrl(content)) {
                    getAsyncContent(content, options);
                // Case 2: Plain text
                } else {
                    setContent(content);
                }
            // Case 3: jQuery/Zepto/HTML Element
            } else if (ch.util.is$(content) || content.nodeType !== undefined) {
                setContent($(content).remove(null, true).removeClass('ch-hide'));
            }

            return that;
        };

        // Loads content once. If the cache is disabled the content loads in each show.
        this.once('_show', function () {

            that.content(that._options.content);

            that.on('show', function () {
                if (!that._options.cache) {
                    that.content(that._options.content);
                }
            });
        });
    }

    ch.Content = Content;

}(this.ch.$, this.ch));
(function (ch) {
    'use strict';

    var toggleEffects = {
        'slideDown': 'slideUp',
        'slideUp': 'slideDown',
        'fadeIn': 'fadeOut',
        'fadeOut': 'fadeIn'
    };

    /**
     * The Collapsible class gives to components the ability to shown or hidden its container.
     * @memberOf ch
     * @mixin
     * @returns {Function} Returns a private function.
     */
    function Collapsible() {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            triggerClass = 'ch-' + this.name + '-trigger-on',
            fx = this._options.fx,
            useEffects = (ch.support.fx && fx !== 'none' && fx !== false);

        function showCallback() {
            that.$container.removeClass('ch-hide').attr('aria-hidden', 'false');

            /**
             * Event emitted when the componentg is shown.
             * @event ch.Collapsible#show
             * @example
             * // Subscribe to "show" event.
             * collapsible.on('show', function () {
             *     // Some code here!
             * });
             */
            that.emit('show');
        }

        function hideCallback() {
            that.$container.addClass('ch-hide').attr('aria-hidden', 'true');

            /**
             * Event emitted when the component is hidden.
             * @event ch.Collapsible#hide
             * @example
             * // Subscribe to "hide" event.
             * collapsible.on('hide', function () {
             *     // Some code here!
             * });
             */
            that.emit('hide');
        }

        this._shown = false;

        /**
         * Shows the component container.
         * @function
         * @private
         */
        this._show = function () {

            that._shown = true;

            if (that.$trigger !== undefined) {
                that.$trigger.addClass(triggerClass);
            }

            /**
             * Event emitted before the component is shown.
             * @event ch.Collapsible#beforeshow
             * @example
             * // Subscribe to "beforeshow" event.
             * collapsible.on('beforeshow', function () {
             *     // Some code here!
             * });
             */
            that.emit('beforeshow');

            // Animate or not
            if (useEffects) {
                that.$container[fx]('fast', showCallback);
            } else {
                showCallback();
            }

            that.emit('_show');

            return that;
        };

        /**
         * Hides the component container.
         * @function
         * @private
         */
        this._hide = function () {

            that._shown = false;

            if (that.$trigger !== undefined) {
                that.$trigger.removeClass(triggerClass);
            }

            /**
             * Event emitted before the component is hidden.
             * @event ch.Collapsible#beforehide
             * @example
             * // Subscribe to "beforehide" event.
             * collapsible.on('beforehide', function () {
             *     // Some code here!
             * });
             */
            that.emit('beforehide');

            // Animate or not
            if (useEffects) {
                that.$container[toggleEffects[fx]]('fast', hideCallback);
            } else {
                hideCallback();
            }

            return that;
        };

        /**
         * Shows or hides the component.
         * @function
         * @private
         */
        this._toggle = function () {

            if (that._shown) {
                that.hide();
            } else {
                that.show();
            }

            return that;
        };

        this.on('disable', this.hide);
    }

    ch.Collapsible = Collapsible;

}(this.ch));
(function (window, $, ch) {
    'use strict';

    var $window = $(window),
        resized = false,
        scrolled = false,
        requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        }());

    function update() {

        var eve = (resized ? ch.onresize : ch.onscroll);

        // Refresh viewport
        this.refresh();

        // Change status
        resized = false;
        scrolled = false;

        /**
         * Event emitted when the dimensions of the viewport changes.
         * @event ch.viewport#resize
         * @example
         * ch.viewport.on('resize', function () {
         *     // Some code here!
         * });
         */

        /**
         * Event emitted when the viewport is scrolled.
         * @event ch.viewport#scroll
         * @example
         * ch.viewport.on('scroll', function () {
         *     // Some code here!
         * });
         */

        // Emits the current event
        this.emit(eve);
    }

    /**
     * The Viewport is a component to ease viewport management. You can get the dimensions of the viewport and beyond, which can be quite helpful to perform some checks with JavaScript.
     * @memberof ch
     * @constructor
     * @augments ch.EventEmitter
     * @requires ch.util
     * @returns {viewport} Returns a new instance of Viewport.
     */
    function Viewport() {
        this._init();
    }

    ch.util.inherits(Viewport, ch.EventEmitter);

    /**
     * Initialize a new instance of Viewport.
     * @memberof! ch.Viewport.prototype
     * @function
     * @private
     * @returns {viewport}
     */
    Viewport.prototype._init = function () {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * Element representing the visible area.
         * @memberof! ch.viewport#element
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$el = $window;

        this.refresh();

        $window
            .on(ch.onresize + '.viewport', function () {
                // No changing, exit
                if (!resized) {
                    resized = true;

                    /**
                     * requestAnimationFrame
                     */
                    requestAnimFrame(function updateResize() {
                        update.call(that);
                    });
                }
            })
            .on(ch.onscroll + '.viewport', function () {
                // No changing, exit
                if (!scrolled) {
                    scrolled = true;

                    /**
                     * requestAnimationFrame
                     */
                    requestAnimFrame(function updateScroll() {
                        update.call(that);
                    });
                }
            });
    };

    /**
     * Calculates/updates the client rects of viewport (in pixels).
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {viewport}
     * @example
     * // Update the client rects of the viewport.
     * ch.viewport.calculateClientRect();
     */
    Viewport.prototype.calculateClientRect = function () {
        /**
         * The current top client rect of the viewport (in pixels).
         * @public
         * @name ch.Viewport#top
         * @type {Number}
         * @example
         * // Checks if the top client rect of the viewport is equal to 0.
         * (ch.viewport.top === 0) ? 'Yes': 'No';
         */

         /**
         * The current left client rect of the viewport (in pixels).
         * @public
         * @name ch.Viewport#left
         * @type {Number}
         * @example
         * // Checks if the left client rect of the viewport is equal to 0.
         * (ch.viewport.left === 0) ? 'Yes': 'No';
         */
        this.top = this.left = 0;

        /**
         * The current bottom client rect of the viewport (in pixels).
         * @public
         * @name ch.Viewport#bottom
         * @type {Number}
         * @example
         * // Checks if the bottom client rect of the viewport is equal to a number.
         * (ch.viewport.bottom === 900) ? 'Yes': 'No';
         */
        this.bottom = this.$el.height();

        /**
         * The current right client rect of the viewport (in pixels).
         * @public
         * @name ch.Viewport#right
         * @type {Number}
         * @example
         * // Checks if the right client rect of the viewport is equal to a number.
         * (ch.viewport.bottom === 1200) ? 'Yes': 'No';
         */
        this.right = this.$el.width();

        return this;
    };

    /**
     * Calculates/updates the dimensions (width and height) of the viewport (in pixels).
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {viewport}
     * @example
     * // Update the dimensions values of the viewport.
     * ch.viewport.calculateDimensions();
     */
    Viewport.prototype.calculateDimensions = function () {
        this.calculateClientRect();

        /**
         * The current height of the viewport (in pixels).
         * @public
         * @name ch.Viewport#height
         * @type Number
         * @example
         * // Checks if the height of the viewport is equal to a number.
         * (ch.viewport.height === 700) ? 'Yes': 'No';
         */
        this.height = this.bottom;

        /**
         * The current width of the viewport (in pixels).
         * @public
         * @name ch.Viewport#width
         * @type Number
         * @example
         * // Checks if the height of the viewport is equal to a number.
         * (ch.viewport.width === 1200) ? 'Yes': 'No';
         */
        this.width = this.right;

        return this;
    };

    /**
     * Calculates/updates the viewport position.
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {viewport}
     * @example
     * // Update the offest values of the viewport.
     * ch.viewport.calculateOffset();
     */
    Viewport.prototype.calculateOffset = function () {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var scroll = ch.util.getScroll();

        /**
         * The offset top of the viewport.
         * @memberof! ch.Viewport#offsetTop
         * @type {Number}
         * @example
         * // Checks if the offset top of the viewport is equal to a number.
         * (ch.viewport.offsetTop === 200) ? 'Yes': 'No';
         */
        this.offsetTop = scroll.top;

        /**
         * The offset left of the viewport.
         * @memberof! ch.Viewport#offsetLeft
         * @type {Number}
         * @example
         * // Checks if the offset left of the viewport is equal to a number.
         * (ch.viewport.offsetLeft === 200) ? 'Yes': 'No';
         */
        this.offsetLeft = scroll.left;

        /**
         * The offset right of the viewport.
         * @memberof! ch.Viewport#offsetRight
         * @type {Number}
         * @example
         * // Checks if the offset right of the viewport is equal to a number.
         * (ch.viewport.offsetRight === 200) ? 'Yes': 'No';
         */
        this.offsetRight = this.left + this.width;

        /**
         * The offset bottom of the viewport.
         * @memberof! ch.Viewport#offsetBottom
         * @type {Number}
         * @example
         * // Checks if the offset bottom of the viewport is equal to a number.
         * (ch.viewport.offsetBottom === 200) ? 'Yes': 'No';
         */
        this.offsetBottom = this.offsetTop + this.height;

        return this;
    };

    /**
     * Rertuns/updates the viewport orientation: landscape or portrait.
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {viewport}
     * @example
     * // Update the dimensions values of the viewport.
     * ch.viewport.calculateDimensions();
     */
    Viewport.prototype.calculateOrientation = function () {
        /** The viewport orientation: landscape or portrait.
         * @memberof! ch.Viewport#orientation
         * @type {String}
         * @example
         * // Checks if the orientation is "landscape".
         * (ch.viewport.orientation === 'landscape') ? 'Yes': 'No';
         */
        this.orientation = (Math.abs(this.$el.orientation) === 90) ? 'landscape' : 'portrait';

        return this;
    };

    /**
     * Calculates if an element is completely located in the viewport.
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {Boolean}
     * @params {HTMLElement} el A given HMTLElement.
     * @example
     * // Checks if an element is in the viewport.
     * ch.viewport.inViewport(HTMLElement) ? 'Yes': 'No';
     */
    Viewport.prototype.inViewport = function (el) {
        var r = el.getBoundingClientRect();

        return (r.top > 0) && (r.right < this.width) && (r.bottom < this.height) && (r.left > 0);
    };

    /**
     * Calculates if an element is visible in the viewport.
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {Boolean}
     * @params {HTMLElement} el A given HTMLElement.
     * @example
     * // Checks if an element is visible.
     * ch.viewport.isVisisble(HTMLElement) ? 'Yes': 'No';
     */
    Viewport.prototype.isVisible = function (el) {
        var r = el.getBoundingClientRect();

        return (r.height >= this.offsetTop);
    };

    /**
     * Upadtes the viewport dimension, viewport positions and orietation.
     * @memberof! ch.Viewport.prototype
     * @function
     * @returns {viewport}
     * @example
     * // Refreshs the viewport.
     * ch.viewport.refresh();
     */
    Viewport.prototype.refresh = function () {
        this.calculateDimensions();
        this.calculateOffset();
        this.calculateOrientation();

        return this;
    };

    // Creates an instance of the Viewport into ch namespace.
    ch.viewport = new Viewport();

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * The Positioner lets you position elements on the screen and changes its positions.
     * @memberof ch
     * @constructor
     * @param {Object} options Configuration object.
     * @param {(jQuerySelector | ZeptoSelector)} options.target Reference to the element to be positioned.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. If it isn't defined through configuration, it will be the ch.viewport.
     * @param {String} [options.side] The side option where the target element will be positioned. You must use: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {String} [options.align] The align options where the target element will be positioned. You must use: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] Thethe type of positioning used. You must use: "absolute" or "fixed". Default: "fixed".
     * @requires ch.util
     * @requires ch.Viewport
     * @returns {positioner} Returns a new instance of Positioner.
     * @example
     * // Instance the Positioner It requires a little configuration.
     * // The default behavior place an element center into the Viewport.
     * var positioned = new ch.Positioner({
     *     'target': $(selector),
     *     'reference': $(selector),
     *     'side': 'top',
     *     'align': 'left',
     *     'offsetX': 20,
     *     'offsetY': 10
     * });
     * @example
     * // offsetX: The Positioner could be configurated with an offsetX.
     * // This example show an element displaced horizontally by 10px of defined position.
     * var positioned = new ch.Positioner({
     *     'target': $(selector),
     *     'reference': $(selector),
     *     'side': 'top',
     *     'align': 'left',
     *     'offsetX': 10
     * });
     * @example
     * // offsetY: The Positioner could be configurated with an offsetY.
     * // This example show an element displaced vertically by 10px of defined position.
     * var positioned = new ch.Positioner({
     *     'target': $(selector),
     *     'reference': $(selector),
     *     'side': 'top',
     *     'align': 'left',
     *     'offsetY': 10
     * });
     * @example
     * // positioned: The positioner could be configured to work with fixed or absolute position value.
     * var positioned = new ch.Positioner({
     *     'target': $(selector),
     *     'reference': $(selector),
     *     'position': 'fixed'
     * });
     */
    function Positioner(options) {

        if (options === undefined) {
            throw new window.Error('ch.Positioner: Expected options defined.');
        }

        // Creates its private options
        this._options = ch.util.clone(this._defaults);

        // Init
        this._configure(options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Positioner.prototype
     * @type {String}
     */
    Positioner.prototype.name = 'positioner';

    /**
     * Returns a reference to the Constructor function that created the instance's prototype.
     * @memberof! ch.Positioner.prototype
     * @function
     * @private
     */
    Positioner.prototype._constructor = Positioner;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Positioner.prototype._defaults = {
        'offsetX': 0,
        'offsetY': 0,
        'side': 'center',
        'align': 'center',
        'reference': ch.viewport,
        'position': 'fixed'
    };

    /**
     * Configures the positioner instance with a given options.
     * @memberof! ch.Positioner.prototype
     * @function
     * @private
     * @returns {positioner}
     * @params {Object} options A configuration object.
     */
    Positioner.prototype._configure = function (options) {

        // Merge user options with its options
        $.extend(this._options, options);

        this._options.offsetX = parseInt(this._options.offsetX, 10);
        this._options.offsetY = parseInt(this._options.offsetY, 10);

        /**
         * Reference to the element to be positioned.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$target = options.target || this.$target;


        /**
         * It's a reference to position and size of element that will be considered to carry out the position.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$reference = options.reference || this.$reference;
        this._reference = this._options.reference;

        this.$target.css('position', this._options.position);

        return this;
    };

    /**
     * Updates the current position with a given options
     * @memberof! ch.Positioner.prototype
     * @function
     * @returns {positioner}
     * @params {Object} options A configuration object.
     * @example
     * // Updates the current position.
     * positioned.refresh();
     * @example
     * // Updates the current position with new offsetX and offsetY.
     * positioned.refresh({
     *     'offestX': 100,
     *     'offestY': 10
     * });
     */
    Positioner.prototype.refresh = function (options) {

        if (options !== undefined) {
            this._configure(options);
        }

        if (this._reference !== ch.viewport) {
            this._calculateReference();
        }

        this._calculateTarget();

        // the object that stores the top, left reference to set to the target
        this._setPoint();

        return this;
    };

    /**
     * Calculates the reference (element or ch.viewport) of the position.
     * @memberof! ch.Positioner.prototype
     * @function
     * @private
     * @returns {positioner}
     */
    Positioner.prototype._calculateReference = function () {

        var reference = this.$reference[0],
            offset;

        reference.setAttribute('data-side', this._options.side);
        reference.setAttribute('data-align', this._options.align);

        this._reference = ch.util.getOuterDimensions(reference);

        if (reference.offsetParent === this.$target[0].offsetParent) {
            this._reference.left = reference.offsetLeft;
            this._reference.top = reference.offsetTop;

        } else {
            offset = ch.util.getOffset(reference);
            this._reference.left = offset.left;
            this._reference.top = offset.top;
        }

        return this;
    };

    /**
     * Calculates the positioned element.
     * @memberof! ch.Positioner.prototype
     * @function
     * @private
     * @returns {positioner}
     */
    Positioner.prototype._calculateTarget = function () {

        var target = this.$target[0];
        target.setAttribute('data-side', this._options.side);
        target.setAttribute('data-align', this._options.align);

        this._target = ch.util.getOuterDimensions(target);

        return this;
    };

    /**
     * Calculates the points.
     * @memberof! ch.Positioner.prototype
     * @function
     * @private
     * @returns {positioner}
     */
    Positioner.prototype._setPoint = function () {
        var side = this._options.side,
            oritentation = (side === 'top' || side === 'bottom') ? 'horizontal' : ((side === 'right' || side === 'left') ? 'vertical' : 'center'),
            coors,
            oritentationMap;

        // take the side and calculate the alignment and make the CSSpoint
        if (oritentation === 'center') {
            // calculates the coordinates related to the center side to locate the target
            coors = {
                'top': (this._reference.top + (this._reference.height / 2 - this._target.height / 2)),
                'left': (this._reference.left + (this._reference.width / 2 - this._target.width / 2))
            };

        } else if (oritentation === 'horizontal') {
            // calculates the coordinates related to the top or bottom side to locate the target
            oritentationMap = {
                'left': this._reference.left,
                'center': (this._reference.left + (this._reference.width / 2 - this._target.width / 2)),
                'right': (this._reference.left + this._reference.width - this._target.width),
                'top': this._reference.top - this._target.height,
                'bottom': (this._reference.top + this._reference.height)
            };

            coors = {
                'top': oritentationMap[side],
                'left': oritentationMap[this._options.align]
            };

        } else {
            // calculates the coordinates related to the right or left side to locate the target
            oritentationMap = {
                'top': this._reference.top,
                'center': (this._reference.top + (this._reference.height / 2 - this._target.height / 2)),
                'bottom': (this._reference.top + this._reference.height - this._target.height),
                'right': (this._reference.left + this._reference.width),
                'left': (this._reference.left - this._target.width)
            };

            coors = {
                'top': oritentationMap[this._options.align],
                'left': oritentationMap[side]
            };
        }

        coors.top += this._options.offsetY;
        coors.left += this._options.offsetX;

        this.$target.css(coors);

        return this;
    };

    ch.Positioner = Positioner;

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    var $document = $(window.document),
        codeMap = {
            '8': ch.onkeybackspace,
            '9': ch.onkeytab,
            '13': ch.onkeyenter,
            '27': ch.onkeyesc,
            '37': ch.onkeyleftarrow,
            '38': ch.onkeyuparrow,
            '39': ch.onkeyrightarrow,
            '40': ch.onkeydownarrow
        },

        /**
         * Shortcuts
         * @memberof ch
         * @namespace
         */
        shortcuts = {

            '_active': null,

            '_queue': [],

            '_collection': {},

            /**
             * Add a callback to a shortcut with given name.
             * @param {(ch.onkeybackspace | ch.onkeytab | ch.onkeyenter | ch.onkeyesc | ch.onkeyleftarrow | ch.onkeyuparrow | ch.onkeyrightarrow | ch.onkeydownarrow)} shortcut Shortcut to subscribe.
             * @param {String} name A name to add in the collection.
             * @param {Function} callback A given function.
             * @returns {Object} Retuns the ch.shortcuts.
             * @example
             * // Add a callback to ESC key with "component" name.
             * ch.shortcuts.add(ch.onkeyesc, 'component', component.hide);
             */
            'add': function (shortcut, name, callback) {

                if (this._collection[name] === undefined) {
                    this._collection[name] = {};
                }

                if (this._collection[name][shortcut] === undefined) {
                    this._collection[name][shortcut] = [];
                }

                this._collection[name][shortcut].push(callback);

                return this;

            },

            /**
             * Removes a callback from a shortcut with given name.
             * @param {String} name A name to remove from the collection.
             * @param {(ch.onkeybackspace | ch.onkeytab | ch.onkeyenter | ch.onkeyesc | ch.onkeyleftarrow | ch.onkeyuparrow | ch.onkeyrightarrow | ch.onkeydownarrow)} [shortcut] Shortcut to unsubscribe.
             * @param {Function} callback A given function.
             * @returns {Object} Retuns the ch.shortcuts.
             * @example
             * // Remove a callback from ESC key with "component" name.
             * ch.shortcuts.remove(ch.onkeyesc, 'component', component.hide);
             */
            'remove': function (name, shortcut, callback) {
                var evt,
                    evtCollection,
                    evtCollectionLenght;

                if (name === undefined) {
                    throw new Error('Shortcuts - "remove(name, shortcut, callback)": "name" parameter must be defined.');
                }

                if (shortcut === undefined) {
                    delete this._collection[name];
                    return this;
                }

                if (callback === undefined) {
                    delete this._collection[name][shortcut];
                    return this;
                }

                evtCollection = this._collection[name][shortcut];

                evtCollectionLenght = evtCollection.length;

                for (evt = 0; evt < evtCollectionLenght; evt += 1) {

                    if (evtCollection[evt] === callback) {
                        evtCollection.splice(evt, 1);
                    }
                }

                return this;

            },

            /**
             * Turn on shortcuts associated to a given name.
             * @param {String} name A given name from the collection.
             * @returns {Object} Retuns the ch.shortcuts.
             * @example
             * // Turn on shortcuts associated to "component" name.
             * ch.shortcuts.on('component');
             */
            'on': function (name) {
                var queueLength = this._queue.length,
                    item = queueLength - 1;

                // check if the instance exist and move the order, adds it at the las position and removes the current
                for (item; item >= 0; item -= 1) {
                    if (this._queue[item] === name) {
                        this._queue.splice(item, 1);
                    }
                }

                this._queue.push(name);
                this._active = name;

                return this;
            },

            /**
             * Turn off shortcuts associated to a given name.
             * @param {String} name A given name from the collection.
             * @returns {Object} Retuns the ch.shortcuts.
             * @example
             * // Turn off shortcuts associated to "component" name.
             * ch.shortcuts.off('component');
             */
            'off': function (name) {
                var queueLength = this._queue.length,
                    item = queueLength - 1;

                for (item; item >= 0; item -= 1) {
                    if (this._queue[item] === name) {
                        // removes the instance that I'm setting off
                        this._queue.splice(item, 1);

                        // the queue is full
                        if (this._queue.length > 0) {
                            this._active = this._queue[this._queue.length - 1];
                        } else {
                        // the queue no has elements
                            this._active = null;
                        }
                    }
                }

                return this;
            }
        };

    $document.on('keydown.shortcuts', function (event) {
        var keyCode = event.keyCode.toString(),
            shortcut = codeMap[keyCode],
            callbacks,
            callbacksLenght,
            i = 0;

        if (shortcut !== undefined && shortcuts._active !== null) {
            callbacks = shortcuts._collection[shortcuts._active][shortcut];

            event.type = shortcut;


            if (callbacks !== undefined) {

                callbacksLenght = callbacks.length;

                for (i = 0; i < callbacksLenght; i += 1) {
                    callbacks[i](event);
                }

            }

        }
    });

    ch.shortcuts = shortcuts;

}(this, this.ch.$, this.ch));

(function (window, ch) {
    'use strict';

    /**
     * Executes a callback function when the images of a query selection loads.
     * @memberof! ch
     * @param $el An image or a collection of images.
     * @param callback The handler the component will fire after the images loads.
     * @example
     * $('selector').onImagesLoads(function () {
     *     console.log('The size of the loaded image is ' + this.width);
     * });
     */
    function onImagesLoads($el, callback) {

        $el
            .one('load', function () {
                var len = $el.length;

                window.setTimeout(function () {
                    if (--len <= 0) { callback.call($el); }
                }, 200);
            })
            .each(function () {
                // Cached images don't fire load sometimes, so we reset src.
                if (this.complete || this.complete === undefined) {
                    var src = this.src;
                    // Data uri fix bug in web-kit browsers
                    this.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
                    this.src = src;
                }
            });
    }

    ch.onImagesLoads = onImagesLoads;

}(this, this.ch));
(function (window, $, ch) {
    'use strict';

    var util = ch.util,
        uid = 0;

    /**
     * Base class for all components.
     * @memberof ch
     * @constructor
     * @augments ch.EventEmitter
     * @param {(jQuerySelector | ZeptoSelector)} $el jQuery or Zepto Selector.
     * @param {Object} [options] Configuration options.
     * @returns {component} Returns a new instance of Component.
     */
    function Component($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Expandable is created.
             * @memberof! ch.Expandable.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Component#ready
         * @example
         * // Subscribe to "ready" event.
         * component.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    ch.util.inherits(Component, ch.EventEmitter);

    /**
     * The name of a component.
     * @memberof! ch.Component.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var component = $(selector).data(name);
     */
    Component.prototype.name = 'component';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Component.prototype
     * @function
     */
    Component.prototype.constructor = Component;

    /**
     * Initialize a new instance of Component and merge custom options with defaults options.
     * @memberof! ch.Component.prototype
     * @function
     * @private
     * @returns {component}
     */
    Component.prototype._init = function ($el, options) {

        // Clones defaults or creates a defaults object
        var defaults = (this._defaults) ? util.clone(this._defaults) : {};

        // Clones the defaults options or creates a new object
        if (options === undefined) {
            if ($el === undefined) {
                this._options = defaults;

            } else if (util.is$($el)) {
                this._$el = $el;
                this._el = $el[0];
                this._options = defaults;

            } else if (typeof $el === 'object') {
                options = $el;
                $el = undefined;
                this._options = $.extend(defaults, options);
            }

        } else if (typeof options === 'object') {
            if ($el === undefined) {
                this._options = $.extend(defaults, options);

            } else if (util.is$($el)) {
                this._$el = $el;
                this._el = $el[0];
                this._options = $.extend(defaults, options);
            }

        } else {
            throw new window.Error('Unexpected parameters were found in the \'' + this.name + '\' instantiation.');
        }

        /**
         * A unique id to identify the instance of a component.
         * @type {Number}
         */
        this.uid = (uid += 1);

        /**
         * Indicates if a component is enabled.
         * @type {Boolean}
         * @private
         */
        this._enabled = true;
    };


    /**
     * Adds functionality or abilities from other classes.
     * @memberof! ch.Component.prototype
     * @function
     * @returns {component}
     * @params {...String} var_args The name of the abilities to will be used.
     * @example
     * // You can require some abilitiest to use in your component.
     * // For example you should require the collpasible abitliy.
     * var component = new Component(element, options);
     * component.require('Collapsible');
     */
    Component.prototype.require = function () {

        var arg,
            i = 0,
            len = arguments.length;

        for (i; i < len; i += 1) {
            arg = arguments[i];

            if (this[arg.toLowerCase()] === undefined) {
                ch[arg].call(this);
            }
        }

        return this;
    };

    /**
     * Enables an instance of Component.
     * @memberof! ch.Component.prototype
     * @function
     * @returns {component}
     * @example
     * // Enabling an instance of Component.
     * component.enable();
     */
    Component.prototype.enable = function () {
        this._enabled = true;

        /**
         * Emits when a component is enabled.
         * @event ch.Component#enable
         * @example
         * // Subscribe to "enable" event.
         * component.on('enable', function () {
         *     // Some code here!
         * });
         */
        this.emit('enable');

        return this;
    };

    /**
     * Disables an instance of Component.
     * @memberof! ch.Component.prototype
     * @function
     * @returns {component}
     * @example
     * // Disabling an instance of Component.
     * component.disable();
     */
    Component.prototype.disable = function () {
        this._enabled = false;

        /**
         * Emits when a component is disable.
         * @event ch.Component#disable
         * @example
         * // Subscribe to "disable" event.
         * component.on('disable', function () {
         *     // Some code here!
         * });
         */
        this.emit('disable');

        return this;
    };

    /**
     * Destroys an instance of Component and remove its data from asociated element.
     * @memberof! ch.Component.prototype
     * @function
     * @example
     * // Destroy a component
     * component.destroy();
     * // Empty the component reference
     * component = undefined;
     */
    Component.prototype.destroy = function () {

        this.disable();

        if (this._el !== undefined) {
            this._$el.removeData(this.name);
        }

        /**
         * Emits when a component is destroyed.
         * @event ch.Component#destroy
         * @exampleDescription
         * @example
         * // Subscribe to "destroy" event.
         * component.on('destroy', function () {
         *     // Some code here!
         * });
         */
        this.emit('destroy');

        return;
    };

    ch.Component = Component;

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Form is a controller of DOM's HTMLFormElement.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Validations
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Form.
     * @param {Object} [options] Options to customize an instance.
     * @param {Object} [options.messages] A collections of validations messages.
     * @param {String} [options.messages.required] A validation message.
     * @param {String} [options.messages.string] A validation message.
     * @param {String} [options.messages.url] A validation message.
     * @param {String} [options.messages.email] A validation message.
     * @param {String} [options.messages.maxLength] A validation message.
     * @param {String} [options.messages.minLength] A validation message.
     * @param {String} [options.messages.custom] A validation message.
     * @param {String} [options.messages.number] A validation message.
     * @param {String} [options.messages.min] A validation message.
     * @param {String} [options.messages.max] A validation message.
     * @returns {form} Returns a new instance of Form.
     * @example
     * // Create a new Form.
     * var form = new ch.Form($el, [options]);
     * @example
     * // Create a new Form with jQuery or Zepto.
     * var form = $(selector).form();
     * @example
     * // Create a new Form with custom messages.
     * var form = $(selector).form({
     *     'messages': {
     *          'required': 'Some message!',
     *          'email': 'Another message!'
     *     }
     * });
     */
    function Form($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        that._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Form is created.
             * @memberof! ch.Form.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * It emits an event when the form is ready to use.
         * @event ch.Form#ready
         * @example
         * // Subscribe to "ready" event.
         * form.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Form, ch.Component);

    /**
     * The name of the component.
     * @memberof! ch.Form.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var form = $(selector).data('form');
     */
    Form.prototype.name = 'form';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Form.prototype
     * @function
     */
    Form.prototype.constructor = Form;

    /**
     * Initialize a new instance of Form and merge custom options with defaults options.
     * @memberof! ch.Form.prototype
     * @function
     * @private
     * @returns {form}
     */
    Form.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * A collection of active errors.
         * @type {Array}
         */
        this.errors = [];

        /**
         * Collection of defined messages.
         * @type {Object}
         * @private
         */
        this._messages = this._options.messages || {};

        /**
         * A collection of validations instances.
         * @type {Array}
         */
        this.validations = [];

        /**
         * The form container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$container = this._$el
            // Add classname
            .addClass('ch-form')
            // Disable HTML5 browser-native validations
            .attr('novalidate', 'novalidate')
            // Bind the submit
            .on('submit.form', function (event) {
                // Runs validations
                that.validate(event);
            });

        this.$container
            // Bind the reset
            .find('input[type="reset"]').on(ch.onpointertap + '.form', function (event) {
                ch.util.prevent(event);
                that.reset();
            });

        // Clean validations
        this.on('disable', this.clear);

        return this;
    };

    /**
     * Executes all validations.
     * @memberof! ch.Form.prototype
     * @function
     * @returns {form}
     */
    Form.prototype.validate = function (event) {

        if (!this._enabled) {
            return this;
        }

        /**
         * It emits an event when the form will be validated.
         * @event ch.Form#beforevalidate
         * @example
         * // Subscribe to "beforevalidate" event.
         * component.on('beforevalidate', function () {
         *     // Some code here!
         * });
         */
        this.emit('beforevalidate');

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            i = 0,
            j = that.validations.length,
            validation,
            firstError,
            firstErrorVisible,
            triggerError;

        this.errors.length = 0;

        // Run validations
        for (i; i < j; i += 1) {
            validation = that.validations[i];

            // Validate
            validation.validate();

            // Store validations with errors
            if (validation.isShown()) {
                that.errors.push(validation);
            }
        }

        // Is there's an error
        if (that.errors.length > 0) {
            firstError = that.errors[0];
            firstErrorVisible = firstError.$trigger[0];

            // Find the closest visible parent if current element is hidden
            while(ch.util.getStyles(firstErrorVisible, 'display') === 'none' && firstErrorVisible !== document.documentElement) {
                firstErrorVisible = firstErrorVisible.parentElement;
            }

            firstErrorVisible.scrollIntoView();

            // Issue UI-332: On validation must focus the first field with errors.
            // Doc: http://wiki.ml.com/display/ux/Mensajes+de+error
            triggerError = firstError.$trigger[0];

            if (triggerError.tagName === 'DIV') {
                firstError.$trigger.find('input:first').focus();
            }

            if (triggerError.type !== 'hidden' || triggerError.tagName === 'SELECT') {
                triggerError.focus();
            }

            ch.util.prevent(event);

            /**
             * It emits an event when a form has got errors.
             * @event ch.Form#error
             * @example
             * // Subscribe to "error" event.
             * form.on('error', function (errors) {
             *     console.log(errors.length);
             * });
             */
            this.emit('error', this.errors);

        } else {

            /**
             * It emits an event when a form hasn't got errors.
             * @event ch.Form#success
             * @example
             * // Subscribe to "success" event.
             * form.on("submit",function () {
             *     // Some code here!
             * });
             * @example
             * // Subscribe to "success" event and prevent the submit event.
             * form.on("submit",function (event) {
             *     event.preventDefault();
             *     // Some code here!
             * });
             */
            this.emit('success', event);
        }

        return this;
    };

    /**
     * Checks if the form has got errors but it doesn't show bubbles.
     * @memberof! ch.Form.prototype
     * @function
     * @returns {Boolean}
     * @example
     * // Checks if a form has errors and do something.
     * if (form.hasError()) {
     *     // Some code here!
     * };
     */
    Form.prototype.hasError = function () {

        if (!this._enabled) {
            return false;
        }

        this.errors.length = 0;

        var i = 0,
            j = this.validations.length,
            validation;

        // Run hasError
        for (i; i < j; i += 1) {

            validation = this.validations[i];

            if (validation.hasError()) {
                this.errors.push(validation);
            }

        }

        if (this.errors.length > 0) {
            return true;
        }

        return false;
    };

    /**
     * Clear all active errors.
     * @memberof! ch.Form.prototype
     * @function
     * @returns {form}
     * @example
     * // Clear active errors.
     * form.clear();
     */
    Form.prototype.clear = function () {
        var i = 0,
            j = this.validations.length;

        for (i; i < j; i += 1) {
            this.validations[i].clear();
        }

        /**
         * It emits an event when the form is cleaned.
         * @event ch.Form#clear
         * @example
         * // Subscribe to "clear" event.
         * form.on('clear', function () {
         *     // Some code here!
         * });
         */
        this.emit('clear');

        return this;
    };

    /**
     * Clear all active errors and executes the reset() native mehtod.
     * @memberof! ch.Form.prototype
     * @function
     * @returns {form}
     * @example
     * // Resets form fields and clears active errors.
     * form.reset();
     */
    Form.prototype.reset = function () {

        // Clears all shown validations
        this.clear();

        // Executes the native reset() method
        this._el.reset();

        /**
         * It emits an event when a form resets its fields.
         * @event ch.Form#reset
         * @example
         * // Subscribe to "reset" event.
         * form.on('reset', function () {
         *     // Some code here!
         * });
         */
        this.emit('reset');

        return this;
    };

    /**
     * Destroys a Form instance.
     * @memberof! ch.Form.prototype
     * @function
     * @example
     * // Destroy a form
     * form.destroy();
     * // Empty the form reference
     * form = undefined;
     */
    Form.prototype.destroy = function () {

        this.$container
            .off('.form')
            .removeAttr('novalidate');

        $.each(this.validations, function (i, e) {
            e.destroy();
        });

        parent.destroy.call(this);

        return;
    };

    // Factorize
    ch.factory(Form);

}(this, this.ch.$, this.ch));
(function ($, ch) {
    'use strict';

    // Private Members
    var conditions = {
        'string': {
            'fn': function (value) {
                // the following regular expression has the utf code for the lating characters
                // the ranges are A,EI,O,U,a,ei,o,u,ç,Ç please for reference see http://www.fileformat.info/info/charset/UTF-8/list.htm
                return (/^([a-zA-Z\u00C0-\u00C4\u00C8-\u00CF\u00D2-\u00D6\u00D9-\u00DC\u00E0-\u00E4\u00E8-\u00EF\u00F2-\u00F6\u00E9-\u00FC\u00C7\u00E7\s]*)$/i).test(value);
            },
            'message': 'Use only letters.'
        },
        'email': {
            'fn': function (value) {
                return (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i).test(value);
            },
            'message': 'Use a valid e-mail such as name@example.com.'
        },
        'url': {
            'fn': function (value) {
                return (/^((https?|ftp|file):\/\/|((www|ftp)\.)|(\/|.*\/)*)[a-z0-9-]+((\.|\/)[a-z0-9-]+)+([/?].*)?$/i).test(value);
            },
            'message': 'It must be a valid URL.'
        },
        'minLength': {
            'fn': function (a, b) { return a.length >= b; },
            'message': 'Enter at least {#num#} characters.'
        },
        'maxLength': {
            'fn': function (a, b) { return a.length <= b; },
            'message': 'The maximum amount of characters is {#num#}.'
        },
        'number': {
            'fn': function (value) {
                return (/^(-?[0-9]+)$/i).test(value);
            },
            'message': 'Use only numbers.'
        },
        'max': {
            'fn': function (a, b) { return a <= b; },
            'message': 'The amount must be smaller than {#num#}.'
        },
        'min': {
            'fn': function (a, b) { return a >= b; },
            'message': 'The amount must be higher than {#num#}.'
        },
        'required': {
            'fn': function (value) {

                var tag = this.$trigger.hasClass('ch-form-options') ? 'OPTIONS' : this._el.tagName,
                    validated;

                switch (tag) {
                case 'OPTIONS':
                    validated = this.$trigger.find('input:checked').length !== 0;
                    break;

                case 'SELECT':
                    validated = (value !== '-1' && value !== '');
                    break;

                // INPUTS and TEXTAREAS
                default:
                    validated = $.trim(value).length !== 0;
                    break;
                }

                return validated;
            },
            'message': 'Fill in this information.'
        },
        'custom': {
            // I don't have pre-conditions, comes within conf.fn argument
            'message': 'Error'
        }
    };

    /**
     * Condition utility.
     * @memberof ch
     * @constructor
     * @requires ch.Validation
     * @param {Array} [condition] A conditions to validate.
     * @param {String} [condition.name] The name of the condition.
     * @param {String} [condition.message] The given error message to the condition.
     * @param {String} [condition.fn] The method to validate a given condition.
     * @returns {condition} Returns a new instance of Condition.
     * @example
     * // Create a new condition object with patt.
     * var condition = ch.Condition({
     *     'name': 'string',
     *     'patt': /^([a-zA-Z\u00C0-\u00C4\u00C8-\u00CF\u00D2-\u00D6\u00D9-\u00DC\u00E0-\u00E4\u00E8-\u00EF\u00F2-\u00F6\u00E9-\u00FC\u00C7\u00E7\s]*)$/,
     *     'message': 'Some message here!'
     * });
     * @example
     * //Create a new condition object with expr.
     * var condition = ch.Condition({
     *     'name': 'maxLength',
     *     'patt': function(a,b) { return a.length <= b },
     *     'message': 'Some message here!',
     *     'value': 4
     * });
     * @example
     * // Create a new condition object with func.
     * var condition = ch.Condition({
     *     'name': 'custom',
     *     'patt': function (value) {
     *         if (value === 'ChicoUI') {
     *
     *             // Some code here!
     *
     *             return true;
     *         };
     *
     *         return false;
     *     },
     *     'message': 'Your message here!'
     * });
     */
    function Condition(condition) {

        $.extend(this, conditions[condition.name], condition);

        // replaces the condition default message in the following conditions max, min, minLenght, maxLenght
        if (this.name === 'min' || this.name === 'max' || this.name === 'minLength' || this.name === 'maxLength') {
            this.message = this.message.replace('{#num#}', this.num);
        }

        this._enabled = true;

        return this;
    }

    /**
     * The name of the component.
     * @memberof! ch.Condition.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var condition = $(selector).data('condition');
     */
    Condition.prototype.name = 'condition';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Condition.prototype
     * @function
     */
    Condition.prototype.constructor = Condition;

    /**
     * Enables an instance of condition.
     * @memberof! ch.Condition.prototype
     * @function
     * @returns {condition}
     * @example
     * // Enabling an instance of Condition.
     * condition.enable();
     * @example
     * // Enabling a condition.
     * condition.enable();
     */
    Condition.prototype.enable = function () {
        this._enabled = true;

        return this;
    };

    /**
     * Disables an instance of a condition.
     * @memberof! ch.Condition.prototype
     * @function
     * @returns {condition}
     * @example
     * // Disabling an instance of Condition.
     * condition.disable();
     * @example
     * // Disabling a condition.
     * condition.disable();
     */
    Condition.prototype.disable = function () {
        this._enabled = false;

        return this;
    };

    /**
     * Enables an instance of condition.
     * @memberof! ch.Condition.prototype
     * @function
     * @param {(String | Number)} value A given value.
     * @param {condition} validation A given validation to execute.
     * @returns {Boolean} Returns a boolean indicating whether the condition fails or not.
     * @example
     * // Testing a condition.
     * condition.test('foobar', validationA);
     */
    Condition.prototype.test = function (value, validation) {

        if (!this._enabled) {
            return true;
        }

        return this.fn.call(validation, value, this.num);
    };

    ch.Condition = Condition;

}(this.ch.$, this.ch));
(function (window, ch) {
    'use strict';

    /**
     * Validation is an engine to validate HTML forms elements.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Condition
     * @requires ch.Form
     * @requires ch.Bubble
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {Array} [options.conditions] A collection of conditions to validate.
     * @param {String} [options.conditions.name] The name of the condition.
     * @param {String} [options.conditions.message] The given error message to the condition.
     * @param {String} [options.conditions.fn] The method to validate a given condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 10.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Validation.
     * var validation = new ch.Validation($el, [options]);
     * @example
     * // Create a new Validation with jQuery or Zepto.
     * var validation = $(selector).validation([options]);
     * @example
     * // Create a validation with with custom options.
     * var validation = $(selector).validation({
     *     'conditions': [
     *         {
     *             'name': 'required',
     *             'message': 'Please, fill in this information.'
     *         },
     *         {
     *             'name': 'custom-email',
     *             'fn': function (value) { return value === "customail@custom.com"; },
     *             'message': 'Use a valid e-mail such as name@custom.com.'
     *         }
     *     ],
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     */
    function Validation($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Validation is created.
             * @memberof! ch.Validation.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Validation#ready
         * @example
         * // Subscribe to "ready" event.
         * validation.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Validation, ch.Component),
        // Creates methods enable and disable into the prototype.
        methods = ['enable', 'disable'],
        len = methods.length;

    function createMethods(method) {
        Validation.prototype[method] = function (condition) {
            var key;

            // Specific condition
            if (condition !== undefined && this.conditions[condition] !== undefined) {

                this.conditions[condition][method]();

            } else {

                // all conditions
                for (key in this.conditions) {
                    if (this.conditions[key] !== undefined) {
                        this.conditions[key][method]();
                    }
                }

                parent[method].call(this);
            }

            return this;
        };
    }

    /**
     * The name of the component.
     * @memberof! ch.Validation.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var validation = $(selector).data('validation');
     */
    Validation.prototype.name = 'validation';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Validation.prototype
     * @function
     */
    Validation.prototype.constructor = Validation;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Validation.prototype._defaults = {
        'offsetX': 10
    };

    /**
     * Initialize a new instance of Validation and merge custom options with defaults options.
     * @memberof! ch.Validation.prototype
     * @function
     * @private
     * @returns {validation}
     */
    Validation.prototype._init = function ($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        parent._init.call(this, $el, options);

        /**
         * The validation trigger.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$trigger = this._$el;

        /**
         * The validation container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._configureContainer();

        /**
         * The collection of conditions.
         * @type {Object}
         */
        this.conditions = {};

        // Merge conditions
        this._mergeConditions(options.conditions);

        /**
         * Flag that let you know if there's a validation going on.
         * @type {Boolean}
         * @private
         */
        this._shown = false;

        /**
         * The current error. If the validations has not error is "null".
         * @type {Object}
         */
        this.error = null;

        this
            .on('exist', function (data) {
                this._mergeConditions(data.conditions);
            })
            // Clean the validation if is shown;
            .on('disable', this.clear);

        /**
         * Reference to a Form instance. If there isn't any, the Validation instance will create one.
         * @type {form}
         */
        this.form = (that.$trigger.parents('form').data('form') || that.$trigger.parents('form').form());

        this.form.validations.push(this);

        /**
         * Set a validation event to add listeners.
         * @private
         */
        this._validationEvent = (this.$trigger.hasClass('ch-form-options') || this._el.tagName === 'SELECT' || (this._el.tagName === 'INPUT' && this._el.type === 'range')) ? 'change' : 'blur';

        return this;
    };

    /**
     * Merges the collection of conditions with a given conditions.
     * @function
     * @private
     */
    Validation.prototype._mergeConditions = function (conditions) {
        var i = 0,
            j = conditions.length;

        for (i; i < j; i += 1) {
            this.conditions[conditions[i].name] = new ch.Condition(conditions[i]);
        }

        return this;
    };

    /**
     * Validates the value of $el.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {validation}
     */
    Validation.prototype.validate = function () {

        if (this.hasError()) {
            this._error();
        } else {
            this._success();
        }

        return this;
    };

    /**
     * If the validation has got an error executes this function.
     * @private
     */
    Validation.prototype._error = function () {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            previousValue;

        // It must happen only once.
        this.$trigger.on(this._validationEvent + '.validation', function () {

            if (previousValue !== this.value || that._validationEvent === 'change' && that.isShown()) {
                previousValue = this.value;
                that.validate();
            }

            if (that.conditions.required === undefined && this.value === '') {
                that.clear();
            }

        });

        // Lazy Loading pattern
        this._error = function () {

            if (!that._previousError.condition || !that._shown) {
                if (that._el.nodeName === 'INPUT' || that._el.nodeName === 'TEXTAREA') {
                    that.$trigger.addClass('ch-validation-error');
                }

                that._showErrorMessage(that.error.message || 'Error');
            }

            if (that.error.condition !== that._previousError.condition) {
                that._showErrorMessage(that.error.message || that.form._messages[that.error.condition] || 'Error');
            }

            that._shown = true;

            /**
             * It emits an event when a validation hasn't got an error.
             * @event ch.Validation#error
             * @example
             * // Subscribe to "error" event.
             * validation.on('error', function (errors) {
             *     console.log(errors.length);
             * });
             */
            that.emit('error', that.error);

            return that;
        };

        this._error();

        return this;
    };

    /**
     * If the validation hasn't got an error executes this function.
     * @private
     */
    Validation.prototype._success = function () {

        // Status OK (with previous error) this._previousError
        if (this._shown || !this._enabled) {
            // Public status OK
            this._shown = false;
        }

        this.$trigger
            .removeClass('ch-validation-error')
            .removeAttr('aria-label');

        this._hideErrorMessage();

        /**
         * It emits an event when a validation hasn't got an error.
         * @event ch.Validation#success
         * @example
         * // Subscribe to "success" event.
         * validation.on("submit",function () {
         *     // Some code here!
         * });
         */
        this.emit('success');

        return this;
    };

    /**
     * Checks if the validation has got errors but it doesn't show bubbles.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {Boolean}
     * @example
     * // Checks if a validation has errors and do something.
     * if (validation.hasError()) {
     *     // Some code here!
     * };
     */
    Validation.prototype.hasError = function () {

        // Pre-validation: Don't validate disabled
        if (this.$trigger.attr('disabled') || !this._enabled) {
            return false;
        }

        var condition,
            required = this.conditions.required,
            value = this._el.value;

        // Avoid fields that aren't required when they are empty or de-activated
        if (!required && value === '' && this._shown === false) {
            // Has got an error? Nop
            return false;
        }

        /**
         * Stores the previous error object
         * @private
         */
        this._previousError = ch.util.clone(this.error);

        // for each condition
        for (condition in this.conditions) {

            if (this.conditions[condition] !== undefined && !this.conditions[condition].test(value, this)) {
                // Update the error object
                this.error = {
                    'condition': condition,
                    'message': this.conditions[condition].message
                };

                // Has got an error? Yeah
                return true;
            }

        }

        // Update the error object
        this.error = null;

        // Has got an error? No
        return false;
    };

    /**
     * Clear active error.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {validation}
     * @example
     * // Clear active error.
     * validation.clear();
     */
    Validation.prototype.clear = function () {

        this.$trigger
            .removeClass('ch-validation-error')
            .removeAttr('aria-label');

        this.error = null;

        this._hideErrorMessage();

        this._shown = false;

        /**
         * It emits an event when a validation is cleaned.
         * @event ch.Validation#clear
         * @example
         * // Subscribe to "clear" event.
         * validation.on('clear', function () {
         *     // Some code here!
         * });
         */
        this.emit('clear');

        return this;
    };

    /**
     * Returns the jQuerySelector or ZeptoSelector to chaining more validations.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {(jQuerySelector | ZeptoSelector)}
     * @example
     * // Concatenates another validation.
     * validation.and().validation();
     */
    Validation.prototype.and = function () {
        return this.$trigger;
    };

    /**
     * Indicates if the validation is shown.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {Boolean}
     * @example
     * // Execute a function if the validation is shown.
     * if (validation.isShown()) {
     *     fn();
     * }
     */
    Validation.prototype.isShown = function () {
        return this._shown;
    };

    /**
     * Sets or gets messages to specifics conditions.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {(validation | String)}
     * @example
     * // Gets a message from a condition
     * validation.message('required');
     * @example
     * // Sets a new message
     * validation.message('required', 'New message for required validation');
     */
    Validation.prototype.message = function (condition, message) {

        if (condition === undefined) {
            throw new Error('validation.message(condition, message): Please, a condition parameter is required.');
        }

        // Get a new message from a condition
        if (message === undefined) {
            return this.conditions[condition].message;
        }

        // Sets a new message
        this.conditions[condition].message = message;

        if (this.isShown() && this.error.condition === condition) {
            this._showErrorMessage(message);
        }

        return this;
    };

    /**
     * Enables an instance of validation or a specific condition.
     * @memberof! ch.Validation.prototype
     * @name enable
     * @function
     * @param {String} [condition] - A given number of fold to enable.
     * @returns {validation} Returns an instance of Validation.
     * @example
     * // Enabling an instance of Validation.
     * validation.enable();
     * @example
     * // Enabling the "max" condition.
     * validation.enable('max');
     */

    /**
     * Disables an instance of a validation or a specific condition.
     * @memberof! ch.Validation.prototype
     * @name disable
     * @function
     * @param {String} [condition] - A given number of fold to disable.
     * @returns {validation} Returns an instance of Validation.
     * @example
     * // Disabling an instance of Validation.
     * validation.disable();
     * @example
     * // Disabling the "email" condition.
     * validation.disable('email');
     */
    while (len) {
        createMethods(methods[len -= 1]);
    }

    /**
     * Destroys a Validation instance.
     * @memberof! ch.Validation.prototype
     * @function
     * @example
     * // Destroying an instance of Validation.
     * validation.destroy();
     */
    Validation.prototype.destroy = function () {

        this.$trigger
            .off('.validation')
            .removeAttr('data-side data-align');

        parent.destroy.call(this);

        return;
    };

    // Factorize
    ch.factory(Validation);

}(this, this.ch));
(function ($, ch) {
    'use strict';

    /**
     * Creates a bubble to show the validation message.
     * @memberof! ch.Validation.prototype
     * @function
     * @private
     * @returns {validation}
     */
    ch.Validation.prototype._configureContainer = function () {

        var that = this;

        /**
         * Is the little sign that popover showing the validation message. It's a Popover component, so you can change it's content, width or height and change its visibility state.
         * @type {Bubble}
         * @see ch.Bubble
         */
        this.bubble = this._container = $.bubble({
            'reference': that._options.reference || (function () {
                var reference,
                    $trigger = that.$trigger,
                    h4;
                // CHECKBOX, RADIO
                // TODO: when old forms be deprecated we must only support ch-form-options class
                if ($trigger.hasClass('ch-form-options')) {
                // Helper reference from will be fired
                // H4
                    if ($trigger.find('h4').length > 0) {
                        h4 = $trigger.find('h4'); // Find h4
                        h4.wrapInner('<span>'); // Wrap content with inline element
                        reference = h4.children(); // Inline element in h4 like helper reference
                    // Legend
                    } else if ($trigger.prev().prop('tagName') === 'LEGEND') {
                        reference = $trigger.prev(); // Legend like helper reference
                    } else {
                        reference = $($trigger.find('label')[0]);
                    }
                // INPUT, SELECT, TEXTAREA
                } else {
                    reference = $trigger;
                }

                return reference;
            }()),
            'align': that._options.align,
            'side': that._options.side,
            'offsetY': that._options.offsetY,
            'offsetX': that._options.offsetX
            // 'position': that._options.position
        });

    };

    /**
     * Shows the validation message.
     * @memberof! ch.Validation.prototype
     * @function
     * @private
     * @returns {validation}
     */
    ch.Validation.prototype._showErrorMessage = function (message) {
        this.bubble.content(message).show();
        this.$trigger.attr('aria-label', 'ch-' + this.bubble.name + '-' + this.bubble.uid);

        return this;
    };

    /**
     * Hides the validation message.
     * @memberof! ch.Validation.prototype
     * @function
     * @private
     * @returns {validation}
     */
    ch.Validation.prototype._hideErrorMessage = function () {
        this.bubble.hide();
        this.$trigger.removeAttr('aria-label');

        return this;
    };

    /**
     * Sets or gets positioning configuration. Use it without arguments to get actual configuration. Pass an argument to define a new positioning configuration.
     * @memberof! ch.Validation.prototype
     * @function
     * @returns {validation}
     * @example
     * // Change validaton bubble's position.
     * validation.refreshPosition({
     *     offsetY: -10,
     *     side: 'top',
     *     align: 'left'
     * });
     */
    ch.Validation.prototype.refreshPosition = function (options) {

        if (options === undefined) {
            return this.bubble._position;
        }

        this.bubble.refreshPosition(options);

        return this;
    };

}(this.ch.$, this.ch));
(function (ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(message) {
        var options,
            condition = {
                'name': 'string'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof message === 'object') {

            // Stores the current options
            options = message;

            // Creates condition properties
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * String creates a new instance of Validation to validate a given value as string.
     * @memberof ch
     * @name ch.String
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new String Validation.
     * var strValidation = new ch.String($el, [options]);
     * @example
     * // Create a new String validation with jQuery or Zepto.
     * var strValidation = $(selector).string([options]);
     * @example
     * // Create a new String validation with custom options.
     * var strValidation = $(selector).string({
     *     'message': 'This field must be a string.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new String validation using the shorthand way (message as parameter).
     * var strValidation = $(selector).string('This field must be a string.');
     */
    function Str($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.String.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var strValidation = $(selector).data('validation');
     */
    Str.prototype.name = 'string';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.String.prototype
     * @function
     */
    Str.prototype.constructor = Str;

    /**
     * The preset name.
     * @memberof! ch.String.prototype
     * @type {String}
     * @private
     */
    Str.prototype._preset = 'validation';

    ch.factory(Str, normalizeOptions);

}(this.ch));
(function (window, ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(num, message) {
        var options,
            condition = {
                'name': 'maxLength'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof num === 'object') {

            // Stores the current options
            options = num;

            // Creates condition properties
            condition.num = options.num;
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.num;
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.num = num;
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * MaxLength creates a new instance of Validation to validate a maximun amount of characters.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {Number} [options.num] A given maximun amount of characters.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horitontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new MaxLength Validation.
     * var maxLengthValidation = new ch.MaxLength($el, [options]);
     * @example
     * // Create a new MaxLength validation with jQuery or Zepto.
     * var maxLengthValidation = $(selector).maxLength([options]);
     * @example
     * // Create a new MaxLength validation with custom options.
     * var maxLengthValidation = $(selector).maxLength({
     *     'num': 10,
     *     'message': 'No more than 10 characters.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new MaxLength validation using the shorthand way (number and message as parameters).
     * var maxLengthValidation = $(selector).maxLength(10, 'No more than 10 characters.');
     */
    function MaxLength($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.MaxLength.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var maxLengthValidation = $(selector).data('validation');
     */
    MaxLength.prototype.name = 'maxLength';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.MaxLength.prototype
     * @function
     */
    MaxLength.prototype.constructor = ch.MaxLength;

    /**
     * The preset name.
     * @memberof! ch.MaxLength.prototype
     * @type {String}
     * @private
     */
    MaxLength.prototype._preset = 'validation';

    ch.factory(MaxLength, normalizeOptions);

}(this, this.ch));
(function (window, ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(num, message) {
        var options,
            condition = {
                'name': 'minLength'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof num === 'object') {

            // Stores the current options
            options = num;

            // Creates condition properties
            condition.num = options.num;
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.num;
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.num = num;
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * MinLength creates a new instance of Validation to validate a minimun amount of characters.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {Number} [options.num] A given minimun amount of characters.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new MinLength Validation.
     * var minLengthValidation = new ch.MinLength($el, [options]);
     * @example
     * // Create a new MinLength validation with jQuery or Zepto.
     * var minLengthValidation = $(selector).minLength([options]);
     * @example
     * // Create a new MinLength validation with custom options.
     * var minLengthValidation = $(selector).minLength({
     *     'num': 10,
     *     'message': 'At least 10 characters.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new MinLength validation using the shorthand way (number and message as parameters).
     * var minLengthValidation = $(selector).minLength('At least 10 characters.');
     */
    function MinLength($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.MinLength.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var minLengthValidation = $(selector).data('validation');
     */
    MinLength.prototype.name = 'minLength';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.MinLength.prototype
     * @function
     */
    MinLength.prototype.constructor = ch.MinLength;

    /**
     * The preset name.
     * @memberof! ch.MinLength.prototype
     * @type {String}
     * @private
     */
    MinLength.prototype._preset = 'validation';


    ch.factory(MinLength, normalizeOptions);

}(this, this.ch));
(function (window, ch) {
    'use strict';

    function normalizeOptions(message) {
        var options,
            condition = {
                'name': 'email'
            };

        if (typeof message === 'object') {

            options = message;
            condition.message = options.message;
            delete options.message;

        } else {
            options = {};
            condition.message = message;
        }

        options.conditions = [condition];

        return options;
    }

    /**
     * Email creates a new instance of Validation to validate a correct email syntax.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Email Validation.
     * var emailValidation = new ch.Email($el, [options]);
     * @example
     * // Create a new Email validation with jQuery or Zepto.
     * var emailValidation = $(selector).email([options]);
     * @example
     * // Create a new Email validation with custom options.
     * var emailValidation = $(selector).email({
     *     'message': 'This field must be a valid email.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new Email validation using the shorthand way (message as parameter).
     * var emailValidation = $(selector).email('This field must be a valid email.');
     */
    function Email($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Email.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var emailValidation = $(selector).data('email');
     */
    Email.prototype.name = 'email';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Email.prototype
     * @function
     */
    Email.prototype.constructor = Email;

    /**
     * The preset name.
     * @memberof! ch.Email.prototype
     * @type {String}
     * @private
     */
    Email.prototype._preset = 'validation';

    ch.factory(Email, normalizeOptions);

}(this, this.ch));
(function (ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(message) {
        var options,
            condition = {
                'name': 'url'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof message === 'object') {

            // Stores the current options
            options = message;

            // Creates condition properties
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * URL creates a new instance of Validation to validate a correct URL syntax.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new URL Validation.
     * var urlValidation = new ch.Url($el, [options]);
     * @example
     * // Create a new URL validation with jQuery or Zepto.
     * var urlValidation = $(selector).url([options]);
     * @example
     * // Create a new URL validation with custom options.
     * var urlValidation = $(selector).url({
     *     'message': 'This field must be a valid URL.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new URL validation using the shorthand way (message as parameter).
     * var urlValidation = $(selector).url('This field must be a valid URL.');
     */
    function URL($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.URL.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var urlValidation = $(selector).data('validation');
     */
    URL.prototype.name = 'url';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Url.prototype
     * @function
     */
    URL.prototype.constructor = URL;

    /**
     * The preset name.
     * @memberof! ch.URL.prototype
     * @type {String}
     * @private
     */
    URL.prototype._preset = 'validation';

    ch.factory(URL, normalizeOptions);

}(this.ch));
(function (ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(message) {
        var options,
            condition = {
                'name': 'number'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof message === 'object') {

            // Stores the current options
            options = message;

            // Creates condition properties
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * Number creates a new instance of Validation to validate a given value as number.
     * @memberof ch
     * @name ch.Number
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horitontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Number Validation.
     * var numValidation = new ch.Number($el, [options]);
     * @example
     * // Create a new Number validation with jQuery or Zepto.
     * var numValidation = $(selector).number([options]);
     * @example
     * // Create a new Number validation with custom options.
     * var numValidation = $(selector).number({
     *     'message': 'This field must be a number.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new Number validation using the shorthand way (message as parameter).
     * var numValidation = $(selector).number('This field must be a number.');
     */
    function Num($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Number.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var numValidation = $(selector).data('validation');
     */
    Num.prototype.name = 'number';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Number.prototype
     * @function
     */
    Num.prototype.constructor = Num;

    /**
     * The preset name.
     * @memberof! ch.Num.prototype
     * @type {String}
     * @private
     */
    Num.prototype._preset = 'validation';

    ch.factory(Num, normalizeOptions);

}(this.ch));
(function (window, ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(num, message) {
        var options,
            condition = {
                'name': 'min'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof num === 'object') {

            // Stores the current options
            options = num;

            // Creates condition properties
            condition.num = options.num;
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.num;
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.num = num;
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * Min creates a new instance of Validation to validate a number with a minimun value.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {Number} [options.num] A given minimun value.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Min Validation.
     * var minValidation = new ch.Min($el, [options]);
     * @example
     * // Create a new Min validation with jQuery or Zepto.
     * var minValidation = $(selector).min([options]);
     * @example
     * // Create a new Min validation with custom options.
     * var minValidation = $(selector).min({
     *     'num': 10,
     *     'message': 'Write a number bigger than 10.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new Min validation using the shorthand way (number and message as parameters).
     * var minValidation = $(selector).min(10, 'Write a number bigger than 10.');
     */
    function Min($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Min.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var minValidation = $(selector).data('validation');
     */
    Min.prototype.name = 'min';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Min.prototype
     * @function
     */
    Min.prototype.constructor = Min;

    /**
     * The preset name.
     * @memberof! ch.Min.prototype
     * @type {String}
     * @private
     */
    Min.prototype._preset = 'validation';

    ch.factory(Min, normalizeOptions);

}(this, this.ch));
(function (window, ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(num, message) {
        var options,
            condition = {
                'name': 'max'
            };

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof num === 'object') {

            // Stores the current options
            options = num;

            // Creates condition properties
            condition.num = options.num;
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.num;
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.num = num;
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * Max creates a new instance of Validation to validate a number with a maximun value.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {Number} [options.num] A given maximun value.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Max Validation.
     * var maxValidation = new ch.Max($el, [options]);
     * @example
     * // Create a new Max validation with jQuery or Zepto.
     * var maxValidation = $(selector).max([options]);
     * @example
     * // Create a new Max validation with custom options.
     * var maxValidation = $(selector).max({
     *     'num': 10,
     *     'message': 'Write a number smaller than 10.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new Max validation using the shorthand way (number and message as parameters).
     * var maxValidation = $(selector).max(10, 'Write a number smaller than 10.');
     */
    function Max($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Max.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var maxValidation = $(selector).data('validation');
     */
    Max.prototype.name = 'max';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Max.prototype
     * @function
     */
    Max.prototype.constructor = Max;

    /**
     * The preset name.
     * @memberof! ch.Max.prototype
     * @type {String}
     * @private
     */
    Max.prototype._preset = 'validation';

    ch.factory(Max, normalizeOptions);

}(this, this.ch));
(function (window, ch) {
    'use strict';

    /**
     * Normalizes and creates an options object
     * @private
     * @function
     * @returns {Object}
     */
    function normalizeOptions(name, fn, message) {
        var options,
            condition = {};

        // If the first paramater is an object, it creates a condition and append to options
        if (typeof name === 'object') {

            // Stores the current options
            options = name;

            // Creates condition properties
            condition.name = options.name;
            condition.fn = options.fn;
            condition.message = options.message;

            // Removes the keys that has been stored into the condition
            delete options.name;
            delete options.fn;
            delete options.message;

        // Creates an option object if receive more than one parameter
        } else {
            options = {};
            condition.name = name;
            condition.fn = fn;
            condition.message = message;
        }

        // Appends condition object into conditions collection
        options.conditions = [condition];

        return options;
    }

    /**
     * Custom creates a new instance of Validation to validate a custom condition.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.name] The name of the custom condition.
     * @param {String} [options.fn] The method to validate the custom condition.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Custom Validation.
     * var customValidation = new ch.Custom($el, [options]);
     * @example
     * // Create a new Custom validation with jQuery or Zepto.
     * var customValidation = $(selector).custom([options]);
     * @example
     * // Create a new Custom validation with custom options.
     * var customValidation = $(selector).custom({
     *     'name': 'myCustom',
     *     'fn': function (value) {
     *         return (value % 2 == 0) ? true : false;
     *     },
     *     'message': 'Enter an even number.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new Custom validation using the shorthand way (name, fn and message as parameters).
     * var customValidation = $(selector).custom('myCustom', function (value) {
     *     return (value % 2 == 0) ? true : false;
     * }, 'Enter an even number.');
     */
    function Custom($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Custom.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var custom = $(selector).data('custom');
     */
    Custom.prototype.name = 'custom';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Custom.prototype
     * @function
     */
    Custom.prototype.constructor = Custom;

    /**
     * The preset name.
     * @memberof! ch.Custom.prototype
     * @type {String}
     * @private
     */
    Custom.prototype._preset = 'validation';

    ch.factory(Custom, normalizeOptions);

}(this, this.ch));
(function (window, ch) {
    'use strict';

    function normalizeOptions(message) {
        var options,
            condition = {
                'name': 'required'
            };

        if (typeof message === 'object') {

            options = message;
            condition.message = options.message;
            delete options.message;

        } else {
            options = {};
            condition.message = message;
        }

        options.conditions = [condition];

        return options;
    }

    /**
     * Required creates a new instance of Validation to validate required values.
     * @memberof ch
     * @constructor
     * @augments ch.Validation
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Validation.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.message] The given error message to the condition.
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: "10px".
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: "0px".
     * @param {String} [options.position] The type of positioning used. Default: "absolute".
     * @returns {validation} Returns a new instance of Validation.
     * @example
     * // Create a new Required Validation.
     * var reqValidation = new ch.Required($el, [options]);
     * @example
     * // Create a new Required validation with jQuery or Zepto.
     * var reqValidation = $(selector).required([options]);
     * @example
     * // Create a new Required validation with custom options.
     * var reqValidation = $(selector).required({
     *     'message': 'This field is required.',
     *     'offsetX': 0,
     *     'offsetY': 10,
     *     'side': 'bottom',
     *     'align': 'left'
     * });
     * @example
     * // Create a new Required validation using the shorthand way (message as parameter).
     * var reqValidation = $(selector).required('This field is required.');
     */
    function Required($el, options) {
        return new ch.Validation($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Required.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var reqValidation = $(selector).data('validation');
     */
    Required.prototype.name = 'required';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Required.prototype
     * @function
     */
    Required.prototype.constructor = Required;

    /**
     * The preset name.
     * @memberof! ch.Required.prototype
     * @type {String}
     * @private
     */
    Required.prototype._preset = 'validation';

    ch.factory(Required, normalizeOptions);

}(this, this.ch));
(function (window, $, ch) {
    'use strict';

    function normalizeOptions(options) {
        if (typeof options === 'string' || ch.util.is$(options)) {
            options = {
                'content': options
            };
        }
        return options;
    }

    /**
     * Expandable lets you show or hide content. Expandable needs a pair: a title and a container related to title.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @mixes ch.Collapsible
     * @mixes ch.Content
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Expandable.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "none".
     * @param {Boolean} [options.toggle] Customize toggle behavior. Default: true.
     * @param {(jQuerySelector | ZeptoSelector)} [options.container] The container where the expanbdale puts its content. Default: the next sibling of $el.
     * @param {(jQuerySelector | ZeptoSelector | String)} [options.content] The content to be shown into the expandable container.
     * @returns {expandable} Returns a new instance of Expandable.
     * @example
     * // Create a new Expandable.
     * var expandable = new ch.Expandable($el, [options]);
     * @example
     * // Create a new Expandable with jQuery or Zepto.
     * var expandable = $(selector).expandable([options]);
     * @example
     * // Create a new Expandable with custom options.
     * var expandable = $(selector).expandable({
     *     'container': $(selector),
     *     'toggle': false,
     *     'fx': 'slideDown',
     *     'content': 'http://ui.ml.com:3040/ajax'
     * });
     * @example
     * // Create a new Expandable using the shorthand way (content as parameter).
     * var expandable = $(selector).expandable('http://ui.ml.com:3040/ajax');
     */
    function Expandable($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Expandable is created.
             * @memberof! ch.Expandable.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Expandable#ready
         * @example
         * // Subscribe to "ready" event.
         * expandable.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var $document = $(window.document),
        parent = ch.util.inherits(Expandable, ch.Component);

    /**
     * The name of the component.
     * @memberof! ch.Expandable.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var expandable = $(selector).data('expandable');
     */
    Expandable.prototype.name = 'expandable';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Expandable.prototype
     * @function
     */
    Expandable.prototype.constructor = Expandable;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Expandable.prototype._defaults = {
        '_classNameTrigger': 'ch-expandable-trigger ch-expandable-ico',
        '_classNameContainer': 'ch-expandable-container ch-hide',
        'fx': false,
        'toggle': true
    };

    /**
     * Initialize a new instance of Expandable and merge custom options with defaults options.
     * @memberof! ch.Expandable.prototype
     * @function
     * @private
     * @returns {expandable}
     */
    Expandable.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        // Requires abilities
        this.require('Collapsible', 'Content');

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * The expandable trigger.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @example
         * // Gets the expandable trigger.
         * expandable.$trigger;
         */
        this.$trigger = this._$el
            .addClass(this._options._classNameTrigger)
            .on(ch.onpointertap + '.' + this.name, function (event) {

                if (ch.pointerCanceled) {
                    return;
                }

                ch.util.prevent(event);

                if (that._options.toggle) {
                    that._toggle();
                } else {
                    that.show();
                }
            });

        /**
         * The expandable container.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @example
         * // Gets the expandable container.
         * expandable.$container;
         */
        this.$container = this._$content = (this._options.container || this._$el.next())
            .addClass(this._options._classNameContainer)
            .attr('aria-expanded', 'false');

        /**
         * Default behavior
         */
        if (this.$container.prop('id') === '') {
            this.$container.prop('id', 'ch-expandable-' + this.uid);
        }

        this.$trigger.attr('aria-controls', this.$container.prop('id'));

        this
            .on('show', function () {
                $document.trigger(ch.onlayoutchange);
            })
            .on('hide', function () {
                $document.trigger(ch.onlayoutchange);
            });

        ch.util.avoidTextSelection(this.$trigger);

        return this;
    };

    /**
     * Shows expandable's content.
     * @memberof! ch.Expandable.prototype
     * @function
     * @param {(String | jQuerySelector | ZeptoSelector)} [content] The content that will be used by expandable.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @returns {expandable}
     * @example
     * // Shows a basic expandable.
     * component.show();
     * @example
     * // Shows an expandable with new content.
     * component.show('Some new content here!');
     * @example
     * // Shows an expandable with a new content that will be loaded by ajax and some custom options.
     * component.show('http://chico-ui.com.ar/ajax', {
     *     'cache': false,
     *     'params': 'x-request=true'
     * });
     */
    Expandable.prototype.show = function (content, options) {

        if (!this._enabled) {
            return this;
        }

        this._show();

        // Update ARIA
        this.$container.attr('aria-expanded', 'true');

        // Set new content
        if (content !== undefined) {
            this.content(content, options);
        }

        return this;
    };

    /**
     * Hides component's container.
     * @memberof! ch.Expandable.prototype
     * @function
     * @returns {expandable}
     * @example
     * // Close an expandable.
     * expandable.hide();
     */
    Expandable.prototype.hide = function () {

        if (!this._enabled) {
            return this;
        }

        this._hide();

        this.$container.attr('aria-expanded', 'false');

        return this;
    };


    /**
     * Returns a Boolean specifying if the component's core behavior is shown. That means it will return 'true' if the component is on, and it will return false otherwise.
     * @memberof! ch.Expandable.prototype
     * @function
     * @returns {Boolean}
     * @example
     * // Execute a function if the component is shown.
     * if (expandable.isShown()) {
     *     fn();
     * }
     */
    Expandable.prototype.isShown = function () {
        return this._shown;
    };

    /**
     * Destroys an Expandable instance.
     * @memberof! ch.Expandable.prototype
     * @function
     * @example
     * // Destroy an expandable
     * expandable.destroy();
     * // Empty the expandable reference
     * expandable = undefined;
     */
    Expandable.prototype.destroy = function () {

        this.$trigger
            .off('.expandable')
            .removeClass('ch-expandable-trigger ch-expandable-ico ch-user-no-select')
            .removeAttr('aria-controls');

        this.$container
            .removeClass('ch-expandable-container ch-hide')
            .removeAttr('aria-expanded aria-hidden');

        $document.trigger(ch.onlayoutchange);

        parent.destroy.call(this);

        return;
    };

    // Factorize
    ch.factory(Expandable, normalizeOptions);

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Menu lets you organize the links by categories.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Expandable
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Menu.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.fx] Enable or disable UI effects. You should use: "slideDown", "fadeIn" or "none". Default: "slideDown".
     * @returns {menu} Returns a new instance of Menu.
     * @example
     * // Create a new Menu.
     * var menu = new ch.Menu($el, [options]);
     * @example
     * // Create a new Menu with jQuery or Zepto.
     * var menu = $(selector).menu();
     * @example
     * // Create a new Menu with custom options.
     * var menu = $(selector).menu({
     *     'fx': 'none'
     * });
     */
    function Menu($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        that._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Menu is created.
             * @memberof! ch.Menu.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Menu#ready
         * @example
         * // Subscribe to "ready" event.
         * menu.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Menu, ch.Component),

        // Creates methods enable and disable into the prototype.
        methods = ['enable', 'disable'],
        len = methods.length;

    function createMethods(method) {
        Menu.prototype[method] = function (child) {
            var i,
                fold = this.folds[child - 1];

            // Enables or disables a specific expandable fold
            if (fold && fold.name === 'expandable') {

                fold[method]();

            // Enables or disables Expandable folds
            } else {

                i = this.folds.length;

                while (i) {

                    fold = this.folds[i -= 1];

                    if (fold.name === 'expandable') {
                        fold[method]();
                    }
                }

                // Executes parent method
                parent[method].call(this);

                // Updates "aria-disabled" attribute
                this._el.setAttribute('aria-disabled', !this._enabled);
            }

            return this;
        };
    }

    /**
     * The name of the component.
     * @memberof! ch.Menu.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var menu = $(selector).data('menu');
     */
    Menu.prototype.name = 'menu';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Menu.prototype
     * @function
     */
    Menu.prototype.constructor = Menu;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Menu.prototype._defaults = {
        'fx': 'slideDown'
    };

    /**
     * Initialize a new instance of Menu and merge custom options with defaults options.
     * @memberof! ch.Menu.prototype
     * @function
     * @private
     * @returns {menu}
     */
    Menu.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        // cloneNode(true) > parameters is required. Opera & IE throws and internal error. Opera mobile breaks.
        this._snippet = this._el.cloneNode(true);

        /**
         * The menu container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$container = this._$el
            .attr('role', 'navigation')
            .addClass('ch-menu ' + (this._options._className || '') + ' ' + (this._options.addClass || ''));

        /**
         * A collection of folds.
         * @type {Array}
         */
        this.folds = [];

        // Inits an expandable component on each list inside main HTML code snippet
        this._createExpandables();

        return this;
    };

    /**
     * Inits an Expandable component on each list inside main HTML code snippet.
     * @function
     * @private
     */
    Menu.prototype._createExpandables = function () {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            $li,
            $child;

        function createExpandable(i, li) {
            // List element
            $li = $(li).addClass('ch-menu-fold');

            // Children of list elements
            $child = $li.children(':first-child');

            // Anchor inside list
            if ($child[0].tagName === 'A') {
                // Add attr role to match wai-aria
                $li.attr('role', 'presentation');
                //
                $child.addClass('ch-fold-trigger');
                // Add anchor to that.fold
                that.folds.push($child);

            } else {
                // List inside list, inits an Expandable
                var expandable = $child.expandable({
                    // Show/hide on IE8- instead slideUp/slideDown
                    'fx': that._options.fx
                });

                expandable
                    .on('show', function () {
                        /**
                         * Event emitted when the menu shows a fold.
                         * @event ch.Menu#show
                         * @example
                         * // Subscribe to "show" event.
                         * menu.on('show', function (shown) {
                         *     // Some code here!
                         * });
                         */
                        that.emit('show', i + 1);
                    })
                    .on('hide', function () {
                        /**
                         * Event emitted when the menu hides a fold.
                         * @event ch.Menu#hide
                         * @example
                         * // Subscribe to "hide" event.
                         * menu.on('hide', function () {
                         *     // Some code here!
                         * });
                         */
                        that.emit('hide');
                    });

                $child.next()
                    .attr('role', 'menu')
                    .children()
                        .attr('role', 'presentation')
                        .children()
                            .attr('role', 'menuitem');

                // Add expandable to that.fold
                that.folds.push(expandable);
            }
        }

        $.each(this.$container.children(), createExpandable);

        return this;
    };

    /**
     * Shows a specific fold.
     * @memberof! ch.Menu.prototype
     * @function
     * @param {Number} child - A given number of fold.
     * @returns {menu}
     * @example
     * // Shows the second fold.
     * menu.show(2);
     */
    Menu.prototype.show = function (child) {

        this.folds[child - 1].show();

        return this;
    };

    /**
     * Hides a specific fold.
     * @memberof! ch.Menu.prototype
     * @function
     * @param {Number} child - A given number of fold.
     * @returns {menu}
     * @example
     * // Hides the second fold.
     * menu.hide(2);
     */
    Menu.prototype.hide = function (child) {

        this.folds[child - 1].hide();

        return this;
    };

    /**
     * Allows to manage the menu content.
     * @param {Number} fold A given fold to change its content.
     * @param {(String | jQuerySelector | ZeptoSelector)} content The content that will be used by a fold.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @example
     * // Updates the content of the second fold with some string.
     * menu.content(2, 'http://ajax.com', {'cache': false});
     */
    Menu.prototype.content = function (fold, content, options) {
        if (fold === undefined || typeof fold !== 'number') {
            throw new window.Error('Menu.content(fold, content, options): Expected number of fold.');
        }

        if (content === undefined) {
            return this.folds[fold - 1].content();
        }

        this.folds[fold - 1].content(content, options);

        return this;
    };

    while (len) {
        createMethods(methods[len -= 1]);
    }

    /**
     * Destroys a Menu instance.
     * @memberof! ch.Menu.prototype
     * @function
     * @example
     * // Destroy a menu
     * menu.destroy();
     * // Empty the menu reference
     * menu = undefined;
     */
    Menu.prototype.destroy = function () {

        $.each(this.folds, function (i, e) {
            if (e.destroy !== undefined) {
                e.destroy();
            }
        });

        this._el.parentNode.replaceChild(this._snippet, this._el);

        $(window.document).trigger(ch.onlayoutchange);

        parent.destroy.call(this);

        return;
    };

    ch.factory(Menu);

}(this, this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    /**
     * Popover is the basic unit of a dialog window.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @mixes ch.Collapsible
     * @mixes ch.Content
     * @requires ch.Positioner
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Popover.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "fadeIn".
     * @param {String} [options.width] Set a width for the container. Default: "auto".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointertap".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "button".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: the trigger element.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "absolute".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '&lt;div class="ch-loading ch-loading-centered"&gt;&lt;/div&gt;'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Popover container.
     * @returns {popover} Returns a new instance of Popover.
     * @example
     * // Create a new Popover.
     * var popover = new ch.Popover($el, [options]);
     * @example
     * // Create a new Popover with jQuery or Zepto.
     * var popover = $(selector).popover([options]);
     * @example
     * // Create a new Popover with disabled effects.
     * var popover = $(selector).popover({
     *     'fx': 'none'
     * });
     * @example
     * // Create a new Popover using the shorthand way (content as parameter).
     * var popover = $(selector).popover('http://ui.ml.com:3040/ajax');
     */
    function Popover($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Popover is created.
             * @memberof! ch.Popover.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Popover#ready
         * @example
         * // Subscribe to "ready" event.
         * popover.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    var $document = $(window.document),
        $body = $('body'),
        // Inheritance
        parent = ch.util.inherits(Popover, ch.Component),
        shownbyEvent = {
            'pointertap': ch.onpointertap,
            'pointerenter': ch.onpointerenter
        };

    /**
     * The name of the component.
     * @memberof! ch.Popover.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var popover = $(selector).data('popover');
     */
    Popover.prototype.name = 'popover';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Popover.prototype
     * @function
     */
    Popover.prototype.constructor = Popover;

    /**
     * Configuration by default.
     * @memberof! ch.Popover.prototype
     * @type {Object}
     * @private
     */
    Popover.prototype._defaults = {
        '_ariaRole': 'dialog',
        '_className': '',
        '_hideDelay': 400,
        'addClass': '',
        'fx': 'fadeIn',
        'width': 'auto',
        'height': 'auto',
        'shownby': 'pointertap',
        'hiddenby': 'button',
        'waiting': '<div class="ch-loading ch-loading-centered"></div>',
        'position': 'absolute'
    };

    /**
     * Initialize a new instance of Popover and merge custom options with defaults options.
     * @memberof! ch.Popover.prototype
     * @function
     * @private
     * @returns {popover}
     */
    Popover.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        // Require abilities
        this.require('Collapsible', 'Content');

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * The popover container. It's the element that will be shown and hidden.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$container = $([
            '<div',
            ' class="ch-popover ch-hide ' + this._options._className + ' ' + this._options.addClass + '"',
            ' role="' + this._options._ariaRole + '"',
            ' id="ch-' + this.name + '-' + this.uid + '"',
            ' style="z-index:' + (ch.util.zIndex += 1) + ';width:' + this._options.width + ';height:' + this._options.height + '"',
            '>'
        ].join('')).on(ch.onpointertap + '.' + this.name, function (event) {
            event.stopPropagation();
        });

        /**
         * Element where the content will be added.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._$content = $('<div class="ch-popover-content">').appendTo(this.$container);

        // Add functionality to the trigger if it exists
        this._configureTrigger();
        // Configure the way it hides
        this._configureHiding();

        this._positioner = new ch.Positioner({
            'target': this.$container,
            'reference': this._options.reference,
            'side': this._options.side,
            'align': this._options.align,
            'offsetX': this._options.offsetX,
            'offsetY': this._options.offsetY,
            'position': this._options.position
        });

        /**
         * Handler to execute the positioner refresh() method on layout changes.
         * @private
         * @function
         * @todo Define this function on prototype and use bind(): $document.on(ch.onlayoutchange, this.refreshPosition.bind(this));
         */
        this._refreshPositionListener = function () {
            if (that._shown) {
                that._positioner.refresh(options);
            }

            return that;
        };

        // Refresh position:
        // on layout change
        $document.on(ch.onlayoutchange, this._refreshPositionListener);
        // on resize
        ch.viewport.on(ch.onresize, this._refreshPositionListener);

        this
            .once('_show', this._refreshPositionListener)
            // on content change
            .on('_contentchange', this._refreshPositionListener)
            // Remove from DOM the component container after hide
            .on('hide', function () {
                that.$container.remove(null, true);
            });

        return this;
    };

    /**
     * Adds functionality to the trigger. When a non-trigger popover is initialized, this method isn't executed.
     * @memberof! ch.Popover.prototype
     * @private
     * @function
     */
    Popover.prototype._configureTrigger = function () {

        if (this._el === undefined) {
            return;
        }

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            // It will be triggered on pointertap/pointerenter of the $trigger
            // It can toggle, show, or do nothing (in specific cases)
            showHandler = (function () {
                // Toggle as default
                var fn = that._toggle;
                // When a Popover is shown on pointerenter, it will set a timeout to manage when
                // to close the component. Avoid to toggle and let choise when to close to the timer
                if (that._options.shownby === 'pointerenter' || that._options.hiddenby === 'none' || that._options.hiddenby === 'button') {
                    fn = function () {
                        if (!that._shown) {
                            that.show();
                        }
                    };
                }

                return fn;
            }());

        /**
         * The original and entire element and its state, before initialization.
         * @private
         * @type {HTMLDivElement}
         */
        // cloneNode(true) > parameters is required. Opera & IE throws and internal error. Opera mobile breaks.
        this._snippet = this._el.cloneNode(true);

        // Use the trigger as the positioning reference
        this._options.reference = this._options.reference || this._$el;

        // Open event when configured as able to shown anyway
        if (this._options.shownby !== 'none') {
            this._$el
                .addClass('ch-shownby-' + this._options.shownby)
                .on(shownbyEvent[this._options.shownby] + '.' + this.name, function (event) {
                    ch.util.prevent(event);
                    showHandler();
                });
        }

        // Get a content if it's not defined
        if (this._options.content === undefined) {
            // Content from anchor href
            // IE defines the href attribute equal to src attribute on images.
            if (this._el.nodeName === 'A' && this._el.href !== '') {
                this._options.content = this._el.href;

            // Content from title or alt
            } else if (this._el.title !== '' || this._el.alt !== '') {
                // Set the configuration parameter
                this._options.content = this._el.title || this._el.alt;
                // Keep the attributes content into the element for possible usage
                this._el.setAttribute('data-title', this._options.content);
                // Avoid to trigger the native tooltip
                this._el.title = this._el.alt = '';
            }
        }

        // Set WAI-ARIA
        this._el.setAttribute('aria-owns', 'ch-' + this.name + '-' + this.uid);
        this._el.setAttribute('aria-haspopup', 'true');

        /**
         * The popover trigger. It's the element that will show and hide the container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$trigger = this._$el;
    };

    /**
     * Determines how to hide the component.
     * @memberof! ch.Popover.prototype
     * @private
     * @function
     */
    Popover.prototype._configureHiding = function () {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            hiddenby = this._options.hiddenby,
            pointertap = ch.onpointertap + '.' + this.name,
            timeout,
            events = {};

        function hideTimer() {
            timeout = window.setTimeout(function () {
                that.hide();
            }, that._options._hideDelay);
        }

        // Don't hide anytime
        if (hiddenby === 'none') { return; }

        // Hide by leaving the component
        if (hiddenby === 'pointerleave' && this.$trigger !== undefined) {

            events[ch.onpointerenter + '.' + this.name] = function () {
                window.clearTimeout(timeout);
            };

            events[ch.onpointerleave + '.' + this.name] = hideTimer;

            this.$trigger.on(events);
            this.$container.on(events);
        }

        // Hide with the button Close
        if (hiddenby === 'button' || hiddenby === 'all') {
            $('<i class="ch-close" role="button" aria-label="Close"></i>').on(pointertap, function () {
                that.hide();
            }).prependTo(this.$container);
        }

        if ((hiddenby === 'pointers' || hiddenby === 'all') && this._hidingShortcuts !== undefined) {
            this._hidingShortcuts();
        }

    };

    /**
     * Creates an options object from the parameters arriving to the constructor method.
     * @memberof! ch.Popover.prototype
     * @private
     * @function
     */
    Popover.prototype._normalizeOptions = function (options) {
        if (typeof options === 'string' || ch.util.is$(options)) {
            options = {
                'content': options
            };
        }
        return options;
    };

    /**
     * Shows the popover container and appends it to the body.
     * @memberof! ch.Popover.prototype
     * @function
     * @param {(String | jQuerySelector | ZeptoSelector)} [content] The content that will be used by popover.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @returns {popover}
     * @example
     * // Shows a basic popover.
     * popover.show();
     * @example
     * // Shows a popover with new content
     * popover.show('Some new content here!');
     * @example
     * // Shows a popover with a new content that will be loaded by ajax with some custom options
     * popover.show('http://domain.com/ajax/url', {
     *     'cache': false,
     *     'params': 'x-request=true'
     * });
     */
    Popover.prototype.show = function (content, options) {
        // Don't execute when it's disabled
        if (!this._enabled || this._shown) {
            return this;
        }

        // Increase z-index and append to body
        // Do it before set content because when content sets, it triggers the position refresh
        this.$container.css('z-index', (ch.util.zIndex += 1)).appendTo($body);

        // Open the collapsible
        this._show();

        // Request the content
        if (content !== undefined) {
            this.content(content, options);
        }

        return this;
    };

    /**
     * Hides the popover container and deletes it from the body.
     * @memberof! ch.Popover.prototype
     * @function
     * @returns {popover}
     * @example
     * // Close a popover
     * popover.hide();
     */
    Popover.prototype.hide = function () {
        // Don't execute when it's disabled
        if (!this._enabled || !this._shown) {
            return this;
        }

        // Close the collapsible
        this._hide();

        return this;
    };

    /**
     * Returns a Boolean specifying if the container is shown or not.
     * @memberof! ch.Popover.prototype
     * @function
     * @returns {Boolean}
     * @example
     * // Check the popover status
     * popover.isShown();
     * @example
     * // Check the popover status after an user action
     * $(window).on(ch.onpointertap, function () {
     *     if (popover.isShown()) {
     *         alert('Popover: visible');
     *     } else {
     *         alert('Popover: not visible');
     *     }
     * });
     */
    Popover.prototype.isShown = function () {
        return this._shown;
    };

    /**
     * Sets or gets the width of the container.
     * @memberof! ch.Popover.prototype
     * @function
     * @param {String} [data] Set a width for the container.
     * @returns {(Number | popover)}
     * @example
     * // Set a new popover width
     * component.width('300px');
     * @example
     * // Get the current popover width
     * component.width(); // '300px'
     */
    Popover.prototype.width = function (data) {

        if (data === undefined) {
            return this._options.width;
        }

        this.$container.css('width', data);

        this._options.width = data;

        this.refreshPosition();

        return this;
    };

    /**
     * Sets or gets the height of the container.
     * @memberof! ch.Popover.prototype
     * @function
     * @param {String} [data] Set a height for the container.
     * @returns {(Number | popover)}
     * @example
     * // Set a new popover height
     * component.height('300px');
     * @example
     * // Get the current popover height
     * component.height(); // '300px'
     */
    Popover.prototype.height = function (data) {

        if (data === undefined) {
            return this._options.height;
        }

        this.$container.css('height', data);

        this._options.height = data;

        this.refreshPosition();

        return this;
    };

    /**
     * Updates the current position of the container with given options or defaults.
     * @memberof! ch.Popover.prototype
     * @function
     * @params {Object} [options] A configuration object.
     * @returns {popover}
     * @example
     * // Update the current position
     * popover.refreshPosition();
     * @example
     * // Update the current position with a new offsetX and offsetY
     * popover.refreshPosition({
     *     'offestX': 100,
     *     'offestY': 10
     * });
     */
    Popover.prototype.refreshPosition = function (options) {

        if (this._shown) {
            // Refresh its position.
            this._positioner.refresh(options);

        } else {
            // Update its options. It will update position the next time to be shown.
            this._positioner._configure(options);
        }

        return this;
    };

    /**
     * Enables a Popover instance.
     * @memberof! ch.Popover.prototype
     * @function
     * @returns {popover}
     * @example
     * // Enable a popover
     * popover.enable();
     */
    Popover.prototype.enable = function () {

        if (this._el !== undefined) {
            this._el.setAttribute('aria-disabled', false);
        }

        parent.enable.call(this);

        return this;
    };

    /**
     * Disables a Popover instance.
     * @memberof! ch.Popover.prototype
     * @function
     * @returns {popover}
     * @example
     * // Disable a popover
     * popover.disable();
     */
    Popover.prototype.disable = function () {

        if (this._el !== undefined) {
            this._el.setAttribute('aria-disabled', true);
        }

        if (this._shown) {
            this.hide();
        }

        parent.disable.call(this);

        return this;
    };

    /**
     * Destroys a Popover instance.
     * @memberof! ch.Popover.prototype
     * @function
     * @returns {popover}
     * @example
     * // Destroy a popover
     * popover.destroy();
     * // Empty the popover reference
     * popover = undefined;
     */
    Popover.prototype.destroy = function () {

        if (this.$trigger !== undefined) {
            this.$trigger
                .off('.' + this.name)
                .removeClass('ch-' + this.name + '-trigger')
                .removeAttr('data-title aria-owns aria-haspopup data-side data-align role')
                .attr({
                    'alt': this._snippet.alt,
                    'title': this._snippet.title
                });
        }

        $document.off(ch.onlayoutchange, this._refreshPositionListener);

        ch.viewport.off(ch.onresize, this._refreshPositionListener);

        parent.destroy.call(this);

        return;
    };

    ch.factory(Popover, Popover.prototype._normalizeOptions);

}(this, this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    var $document = $(window.document);

    ch.Popover.prototype._hidingShortcuts = function () {

        var that = this,
            pointertap = ch.onpointertap + '.' + this.name;

        function hide(event) {
            // event.button === 0: Fix issue #933 Right click closes it on Firefox.
            if (event.target !== that._el && event.target !== that.$container[0] && event.button === 0) {
                that.hide();
            }
        }

        ch.shortcuts.add(ch.onkeyesc, this.uid, function () {
            that.hide();
        });

        this
            .on('show', function () {
                ch.shortcuts.on(that.uid);
                $document.on(pointertap, hide);
            })
            .on('hide', function () {
                ch.shortcuts.off(that.uid);
                $document.off(pointertap, hide);
            })
            .once('destroy', function () {
                ch.shortcuts.remove(that.uid, ch.onkeyesc);
            });
    };

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Layer is a dialog window that can be shown one at a time.
     * @memberof ch
     * @constructor
     * @augments ch.Popover
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Layer.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "fadeIn".
     * @param {String} [options.width] Set a width for the container. Default: "auto".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointerenter".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "pointerleave".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: the trigger element.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "bottom".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "left".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 10.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "absolute".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '&lt;div class="ch-loading ch-loading-centered"&gt;&lt;/div&gt;'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Layer container.
     * @returns {layer} Returns a new instance of Layer.
     * @example
     * // Create a new Layer.
     * var layer = new ch.Layer($el, [options]);
     * @example
     * // Create a new Layer with jQuery or Zepto.
     * var layer = $(selector).layer([options]);
     * @example
     * // Create a new Layer with disabled effects.
     * var layer = $(selector).layer({
     *     'fx': 'none'
     * });
     * @example
     * // Create a new Layer using the shorthand way (content as parameter).
     * var layer = $(selector).layer('http://ui.ml.com:3040/ajax');
     */
    function Layer($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Layer is created.
             * @memberof! ch.Layer.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Layer#ready
         * @example
         * // Subscribe to "ready" event.
         * layer.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Reference to the last component open. Allows to close and to deny to
    // have 2 components open at the same time
    var lastShown,
        // Inheritance
        parent = ch.util.inherits(Layer, ch.Popover);

    /**
     * The name of the component.
     * @memberof! ch.Layer.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var layer = $(selector).data('layer');
     */
    Layer.prototype.name = 'layer';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Layer.prototype
     * @function
     */
    Layer.prototype.constructor = Layer;

    /**
     * Configuration by default.
     * @memberof! ch.Layer.prototype
     * @type {Object}
     * @private
     */
    Layer.prototype._defaults = $.extend(ch.util.clone(parent._defaults), {
        '_className': 'ch-layer ch-box-lite ch-cone',
        '_ariaRole': 'tooltip',
        'shownby': 'pointerenter',
        'hiddenby': 'pointerleave',
        'side': 'bottom',
        'align': 'left',
        'offsetX': 0,
        'offsetY': 10,
        'waiting': '<div class="ch-loading-small"></div>'
    });

    /**
     * Shows the layer container and hides other layers.
     * @memberof! ch.Layer.prototype
     * @function
     * @param {(String | jQuerySelector | ZeptoSelector)} [content] The content that will be used by layer.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @returns {layer}
     * @example
     * // Shows a basic layer.
     * layer.show();
     * @example
     * // Shows a layer with new content
     * layer.show('Some new content here!');
     * @example
     * // Shows a layer with a new content that will be loaded by ajax with some custom options
     * layer.show('http://domain.com/ajax/url', {
     *     'cache': false,
     *     'params': 'x-request=true'
     * });
     */
    Layer.prototype.show = function (content, options) {
        // Don't execute when it's disabled
        if (!this._enabled || this._shown) {
            return this;
        }

        // Only hide if there was a component opened before
        if (lastShown !== undefined && lastShown.name === this.name && lastShown !== this) {
            lastShown.hide();
        }

        // Only save to future close if this component is closable
        if (this._options.hiddenby !== 'none' && this._options.hiddenby !== 'button') {
            lastShown = this;
        }

        // Execute the original show()
        parent.show.call(this, content, options);

        return this;
    };

    ch.factory(Layer, parent._normalizeOptions);

}(this, this.ch.$, this.ch));

(function ($, ch) {
    'use strict';

    /**
     * Improves the native tooltips.
     * @memberof ch
     * @constructor
     * @augments ch.Popover
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Tooltip.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "fadeIn".
     * @param {String} [options.width] Set a width for the container. Default: "auto".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointerenter".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "pointerleave".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: the trigger element.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "bottom".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "left".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 10.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "absolute".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '<div class="ch-loading ch-loading-centered"></div>'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Tooltip container.
     * @returns {tooltip} Returns a new instance of Tooltip.
     * @example
     * // Create a new Tooltip.
     * var tooltip = new ch.Tooltip($el, [options]);
     * @example
     * // Create a new Tooltip with jQuery or Zepto.
     * var tooltip = $(selector).tooltip([options]);
     * @example
     * // Create a new Tooltip with disabled effects.
     * var tooltip = $(selector).tooltip({
     *     'fx': 'none'
     * });
     * @example
     * // Create a new Tooltip using the shorthand way (content as parameter).
     * var tooltip = $(selector).tooltip('http://ui.ml.com:3040/ajax');
     */
    function Tooltip($el, options) {

        if (options === undefined && $el !== undefined && !ch.util.is$($el)) {
            options = $el;
            $el = undefined;
        }

        options = $.extend(ch.util.clone(this._defaults), options);

        return new ch.Layer($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Tooltip.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var tooltip = $(selector).data('tooltip');
     */
    Tooltip.prototype.name = 'tooltip';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Tooltip.prototype
     * @function
     */
    Tooltip.prototype.constructor = Tooltip;

    /**
     * Configuration by default.
     * @memberof! ch.Tooltip.prototype
     * @type {Object}
     * @private
     */
    Tooltip.prototype._defaults = $.extend(ch.util.clone(ch.Layer.prototype._defaults), {
        '_className': 'ch-tooltip ch-cone'
    });

    ch.factory(Tooltip, ch.Layer.prototype._normalizeOptions);

}(this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    /**
     * Dialog window with an error skin.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Positioner
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Bubble.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "fadeIn".
     * @param {String} [options.width] Set a width for the container. Default: "auto".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "none".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "none".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: the trigger element.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 10.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "absolute".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '&lt;div class="ch-loading ch-loading-centered"&gt;&lt;/div&gt;'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Bubble container. Default: "Check the information, please."
     * @returns {bubble} Returns a new instance of Bubble.
     * @example
     * // Create a new Bubble.
     * var bubble = new ch.Bubble($el, [options]);
     * @example
     * // Create a new Bubble with jQuery or Zepto.
     * var bubble = $(selector).bubble([options]);
     * @example
     * // Create a new Bubble with disabled effects.
     * var bubble = $(selector).bubble({
     *     'fx': 'none'
     * });
     * @example
     * // Create a new Bubble using the shorthand way (content as parameter).
     * var bubble = $(selector).bubble('http://ui.ml.com:3040/ajax');
     */
    function Bubble($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Bubble is created.
             * @memberof! ch.Bubble.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Bubble#ready
         * @example
         * // Subscribe to "ready" event.
         * bubble.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Bubble, ch.Popover);

    /**
     * The name of the component.
     * @memberof! ch.Bubble.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var bubble = $(selector).data('bubble');
     */
    Bubble.prototype.name = 'bubble';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Bubble.prototype
     * @function
     */
    Bubble.prototype.constructor = Bubble;

    /**
     * Configuration by default.
     * @memberof! ch.Bubble.prototype
     * @type {Object}
     * @private
     */
    Bubble.prototype._defaults = $.extend(ch.util.clone(parent._defaults), {
        '_className': 'ch-bubble ch-box-icon ch-box-error ch-cone',
        '_ariaRole': 'alert',
        'shownby': 'none',
        'hiddenby': 'none',
        'side': 'right',
        'align': 'center',
        'offsetX': 10,
        'content': 'Check the information, please.'
    });

    /**
     * Initialize a new instance of Bubble and merge custom options with defaults options.
     * @memberof! ch.Bubble.prototype
     * @function
     * @private
     * @returns {bubble}
     */
    Bubble.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        $('<i class="ch-icon-remove-sign"></i>').prependTo(this.$container);

        return this;
    };

    ch.factory(Bubble, parent._normalizeOptions);

}(this, this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    /**
     * Modal is a dialog window with an underlay.
     * @memberof ch
     * @constructor
     * @augments ch.Popover
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Modal.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "fadeIn".
     * @param {String} [options.width] Set a width for the container. Default: "50%".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointertap".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "all".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: ch.viewport.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "fixed".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '&lt;div class="ch-loading-large ch-loading-centered"&gt;&lt;/div&gt;'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Modal container.
     * @returns {modal} Returns a new instance of Modal.
     * @example
     * // Create a new Modal.
     * var modal = new ch.Modal($el, [options]);
     * @example
     * // Create a new Modal with jQuery or Zepto.
     * var modal = $(selector).modal([options]);
     * @example
     * // Create a new Modal with disabled effects.
     * var modal = $(selector).modal({
     *     'fx': 'none'
     * });
     * @example
     * // Create a new Modal using the shorthand way (content as parameter).
     * var modal = $(selector).modal('http://ui.ml.com:3040/ajax');
     */
    function Modal($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Modal is created.
             * @memberof! ch.Modal.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Modal#ready
         * @example
         * // Subscribe to "ready" event.
         * modal.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    var $body = $('body'),
        $underlay = $('<div class="ch-underlay ch-hide" tabindex="-1">'),
        // Inheritance
        parent = ch.util.inherits(Modal, ch.Popover);

    /**
     * The name of the component.
     * @memberof! ch.Modal.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var modal = $(selector).data('modal');
     */
    Modal.prototype.name = 'modal';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Modal.prototype
     * @function
     */
    Modal.prototype.constructor = Modal;

    /**
     * Configuration by default.
     * @memberof! ch.Modal.prototype
     * @type {Object}
     * @private
     */
    Modal.prototype._defaults = $.extend(ch.util.clone(parent._defaults), {
        '_className': 'ch-modal ch-box-lite',
        '_ariaRole': 'dialog',
        'width': '50%',
        'hiddenby': 'all',
        'reference': ch.viewport,
        'waiting': '<div class="ch-loading-large ch-loading-centered"></div>',
        'position': 'fixed'
    });

    /**
     * Shows the Modal underlay.
     * @memberof! ch.Modal.prototype
     * @function
     * @private
     */
    Modal.prototype._showUnderlay = function () {

        $underlay.css('z-index', ch.util.zIndex).appendTo($body);

        if (this._options.fx !== 'none') {
            $underlay.fadeIn(function () {
                $underlay.removeClass('ch-hide');
            });
        } else {
            $underlay.removeClass('ch-hide');
        }
    };

    /**
     * Hides the Modal underlay.
     * @memberof! ch.Modal.prototype
     * @function
     * @private
     */
    Modal.prototype._hideUnderlay = function () {
        if (this._options.fx !== 'none') {
            $underlay.fadeOut('normal', function () { $underlay.remove(null, true); });
        } else {
            $underlay.addClass('ch-hide').remove(null, true);
        }
    };

    /**
     * Shows the modal container and the underlay.
     * @memberof! ch.Modal.prototype
     * @function
     * @param {(String | jQuerySelector | ZeptoSelector)} [content] The content that will be used by modal.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @returns {modal}
     * @example
     * // Shows a basic modal.
     * modal.show();
     * @example
     * // Shows a modal with new content
     * modal.show('Some new content here!');
     * @example
     * // Shows a modal with a new content that will be loaded by ajax with some custom options
     * modal.show('http://domain.com/ajax/url', {
     *     'cache': false,
     *     'params': 'x-request=true'
     * });
     */
    Modal.prototype.show = function (content, options) {
        // Don't execute when it's disabled
        if (!this._enabled || this._shown) {
            return this;
        }

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        // Add to the underlay the ability to hide the component
        if (this._options.hiddenby === 'all' || this._options.hiddenby === 'pointers') {
            // Allow only one click to analize the config every time and to close ONLY THIS modal
            $underlay.one(ch.onpointertap, function () {
                that.hide();
            });
        }

        // Show the underlay
        this._showUnderlay();
        // Execute the original show()
        parent.show.call(this, content, options);

        return this;
    };

    /**
     * Hides the modal container and the underlay.
     * @memberof! ch.Modal.prototype
     * @function
     * @returns {modal}
     * @example
     * // Close a modal
     * modal.hide();
     */
    Modal.prototype.hide = function () {
        if (!this._shown) {
            return this;
        }

        // Delete the underlay listener
        $underlay.off(ch.onpointertap);
        // Hide the underlay element
        this._hideUnderlay();
        // Execute the original hide()
        parent.hide.call(this);

        return this;
    };

    ch.factory(Modal, parent._normalizeOptions);

}(this, this.ch.$, this.ch));

(function ($, ch) {
    'use strict';

    /**
     * Transition lets you give feedback to the users when their have to wait for an action.
     * @memberof ch
     * @constructor
     * @augments ch.Popover
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Transition.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "fadeIn".
     * @param {String} [options.width] Set a width for the container. Default: "50%".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointertap".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "none".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: ch.viewport.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "fixed".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '&lt;div class="ch-loading-large ch-loading-centered"&gt;&lt;/div&gt;'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Transition container. Default: "Please wait..."
     * @returns {transition} Returns a new instance of Transition.
     * @example
     * // Create a new Transition.
     * var transition = new ch.Transition($el, [options]);
     * @example
     * // Create a new Transition with jQuery or Zepto.
     * var transition = $(selector).transition([options]);
     * @example
     * // Create a new Transition with disabled effects.
     * var transition = $(selector).transition({
     *     'fx': 'none'
     * });
     * @example
     * // Create a new Transition using the shorthand way (content as parameter).
     * var transition = $(selector).transition('http://ui.ml.com:3040/ajax');
     */
    function Transition($el, options) {

        if (options === undefined && $el !== undefined && !ch.util.is$($el)) {
            options = $el;
            $el = undefined;
        }

        options = $.extend(ch.util.clone(this._defaults), options);

        options.content = $('<div class="ch-loading-large"></div><p>' + options.content + '</p>');

        return new ch.Modal($el, options);
    }

    /**
     * The name of the component.
     * @memberof! ch.Transition.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var transition = $(selector).data('transition');
     */
    Transition.prototype.name = 'transition';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Transition.prototype
     * @function
     */
    Transition.prototype.constructor = Transition;

    /**
     * Configuration by default.
     * @memberof! ch.Transition.prototype
     * @type {Object}
     * @private
     */
    Transition.prototype._defaults = $.extend(ch.util.clone(ch.Modal.prototype._defaults), {
        '_className': 'ch-transition ch-box-lite',
        '_ariaRole': 'alert',
        'hiddenby': 'none',
        'content': 'Please wait...'
    });

    ch.factory(Transition, ch.Modal.prototype._normalizeOptions);

}(this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    /**
     * Zoom shows a contextual reference to an augmented version of a declared image.
     * @memberof ch
     * @constructor
     * @augments ch.Layer
     * @requires ch.OnImagesLoads
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Zoom.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "none".
     * @param {String} [options.width] Set a width for the container. Default: "300px".
     * @param {String} [options.height] Set a height for the container. Default: "300px".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointerenter".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "pointerleave".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: the trigger element.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "right".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "top".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally. Default: 20.
     * @param {Number} [options.offsetY] Distance to displace the target vertically. Default: 0.
     * @param {String} [options.position] The type of positioning used. Its value must be "absolute" or "fixed". Default: "absolute".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: 'Loading zoom...'.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Zoom container.
     * @returns {zoom} Returns a new instance of Zoom.
     * @example
     * // Create a new Zoom.
     * var zoom = new ch.Zoom($el, [options]);
     * @example
     * // Create a new Zoom with jQuery or Zepto.
     * var zoom = $(selector).zoom([options]);
     * @example
     * // Create a new Zoom with a defined width (half of the screen).
     * $(selector).zoom({
     *     'width': (ch.viewport.width / 2) + 'px'
     * });
     */
    function Zoom($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Zoom is created.
             * @memberof! ch.Zoom.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Zoom#ready
         * @example
         * // Subscribe to "ready" event.
         * zoom.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Zoom, ch.Layer);

    /**
     * The name of the component.
     * @memberof! ch.Zoom.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var zoom = $(selector).data('zoom');
     */
    Zoom.prototype.name = 'zoom';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Zoom.prototype
     * @function
     */
    Zoom.prototype.constructor = Zoom;

    /**
     * Configuration by default.
     * @memberof! ch.Zoom.prototype
     * @type {Object}
     * @private
     */
    Zoom.prototype._defaults = $.extend(ch.util.clone(parent._defaults), {
        '_className': 'ch-zoom',
        '_ariaRole': 'tooltip',
        '_hideDelay': 0,
        'fx': 'none',
        'width': '300px',
        'height': '300px',
        'side': 'right',
        'align': 'top',
        'offsetX': 20,
        'offsetY': 0,
        'waiting': 'Loading zoom...'
    });

    /**
     * Initialize a new instance of Zoom and merge custom options with defaults options.
     * @memberof! ch.Zoom.prototype
     * @function
     * @private
     * @returns {zoom}
     */
    Zoom.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * Flag to control when zoomed image is loaded.
         * @type {Boolean}
         * @private
         */
        this._loaded = false;

        /**
         * Feedback showed before the zoomed image is load. It's a transition message and its content can be configured through parameter "waiting".
         * @type {(jQuerySelector | ZeptoSelector)}
         * @private
         * @example
         * // Changing the loading feedback.
         * $(selector).zoom({
         *     'waiting': 'My custom message'
         * });
         */
        this._$loading = $('<div class="ch-zoom-loading ch-hide"><div class="ch-loading-large"></div><p>' + this._options.waiting + '</p></div>').appendTo(this.$trigger);

        /**
         * jQuery/Zepto Element (shape) with visual feedback to the relative size of the zoomed area.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @private
         */
        this._$seeker = $('<div class="ch-zoom-seeker ch-hide">').appendTo(this.$trigger);

        /**
         * HTML Element shape with visual feedback to the relative size of the zoomed area.
         * @type {HTMLDivElement}
         * @private
         */
        this._seeker = this._$seeker[0];

        /**
         * The main specified image with original size (not zoomed).
         * @type {(jQuerySelector | ZeptoSelector)}
         * @private
         */
        this._$original = this.$trigger.children().eq(0);

        /**
         * The zoomed image specified as a link href (see the HTML snippet).
         * @type {(jQuerySelector | ZeptoSelector)}
         * @private
         */
        // Use a new Image instead $('<img ...>') to calculate the
        // size before append the image to DOM, in ALL the browsers.
        this._zoomed = new window.Image();

        // Assign event handlers to the original image
        ch.onImagesLoads(this._$original, function () {
            that._originalLoaded();
        });

        // Assign event handlers to the zoomed image
        ch.onImagesLoads($(this._zoomed), function () {
            that._zoomedLoaded();
        });

        // Make the entire Show process if it tried to show before
        this.on('imageload', function () {
            if (!that._$loading.hasClass('ch-hide')) {
                that.show();
            }
        });

        // Assign event handlers to the anchor
        this.$trigger.addClass('ch-zoom-trigger').on({
            // Prevent to redirect to the href
            'click.zoom': function (event) { ch.util.prevent(event); },
            // Bind move calculations
            'mousemove.zoom': function (event) { that._move(event); }
        });

        return this;
    };

    /**
     * Sets the correct size to the wrapper anchor.
     * @memberof! ch.Zoom.prototype
     * @function
     * @private
     */
    Zoom.prototype._originalLoaded = function () {

        var width = this._$original[0].width,
            height = this._$original[0].height,
            offset = ch.util.getOffset(this._el);

        // Set the wrapper anchor size (same as image)
        this.$trigger.css({
            'width': width,
            'height': height
        });

        // Loading position centered into the anchor
        this._$loading.css({
            'left': (width - this._$loading.width()) / 2,
            'top': (height - this._$loading.height()) / 2
        });

        /**
         * Width of the original specified image.
         * @type {Number}
         * @private
         */
        this._originalWidth = width;

        /**
         * Height of the original specified image.
         * @type {Number}
         * @private
         */
        this._originalHeight = height;

        /**
         * Left position of the original specified anchor/image.
         * @type {Number}
         * @private
         */
        this._originalOffsetLeft = offset.left;

        /**
         * Top position of the original specified anchor/image.
         * @type {Number}
         * @private
         */
        this._originalOffsetTop = offset.top;
    };

    /**
     * Loads the Zoom content and sets the Seeker size.
     * @memberof! ch.Zoom.prototype
     * @function
     * @private
     */
    Zoom.prototype._zoomedLoaded = function () {

        /**
         * Relation between the zoomed and the original image width.
         * @type {Number}
         * @private
         */
        this._ratioX = (this._zoomed.width / this._originalWidth);

        /**
         * Relation between the zoomed and the original image height.
         * @type {Number}
         * @private
         */
        this._ratioY = (this._zoomed.height / this._originalHeight);

        /**
         * Width of the Seeker, calculated from ratio.
         * @type {Number}
         * @private
         */
        this._seekerWidth = window.Math.floor(window.parseInt(this._options.width, 10) / this._ratioX);

        /**
         * Height of the Seeker, calculated from ratio.
         * @type {Number}
         * @private
         */
        this._seekerHeight = window.Math.floor(window.parseInt(this._options.height, 10) / this._ratioY);

        /**
         * Half of the width of the Seeker. Used to position it.
         * @type {Number}
         * @private
         */
        this._seekerHalfWidth = window.Math.floor(this._seekerWidth / 2);

        /**
         * Half of the height of the Seeker. Used to position it.
         * @type {Number}
         * @private
         */
        this._seekerHalfHeight = window.Math.floor(this._seekerHeight / 2);

        // Set size of the Seeker
        this._seeker.style.cssText = 'width:' + this._seekerWidth + 'px;height:' + this._seekerHeight + 'px';

        // Use the zoomed image as content for the floated element
        this.content(this._zoomed);

        // Update the flag to allow to zoom
        this._loaded = true;

        /**
         * Event emitted when the zoomed image is downloaded.
         * @event ch.Zoom#imageload
         * @example
         * // Subscribe to "imageload" event.
         * zoom.on('imageload', function () {
         *     alert('Zoomed image ready!');
         * });
         */
        this.emit('imageload');
    };

    /**
     * Calculates movement limits and sets it to Seeker and zoomed image.
     * @memberof! ch.Zoom.prototype
     * @function
     * @private
     * @param {Event} event Used to take the cursor position.
     */
    Zoom.prototype._move = function (event) {
        // Don't execute when it's disabled or it's not loaded
        if (!this._enabled || !this._loaded) {
            return;
        }

        // By defining these variables in here, it avoids to make
        // the substraction twice if it's a free movement
        var seekerLeft = event.pageX - this._seekerHalfWidth,
            seekerTop = event.pageY - this._seekerHalfHeight,
            x,
            y;

        // Left side of seeker LESS THAN left side of image
        if (seekerLeft <= this._originalOffsetLeft) {
            x = 0;
        // Right side of seeker GREATER THAN right side of image
        } else if (event.pageX + this._seekerHalfWidth > this._originalWidth + this._originalOffsetLeft) {
            x = this._originalWidth - this._seekerWidth - 2;
        // Free move
        } else {
            x = seekerLeft - this._originalOffsetLeft;
        }

        // Top side of seeker LESS THAN top side of image
        if (seekerTop <= this._originalOffsetTop) {
            y = 0;
        // Bottom side of seeker GREATER THAN bottom side of image
        } else if (event.pageY + this._seekerHalfHeight > this._originalHeight + this._originalOffsetTop) {
            y = this._originalHeight - this._seekerHeight - 2;
        // Free move
        } else {
            y = seekerTop - this._originalOffsetTop;
        }

        // Move seeker and the zoomed image
        this._seeker.style.left = x + 'px';
        this._seeker.style.top = y + 'px';
        this._zoomed.style.cssText = 'left:' + (-this._ratioX * x) + 'px;top:' + (-this._ratioY * y) + 'px';
    };

    /**
     * Shows the zoom container and the Seeker, or show a loading feedback until the zoomed image loads.
     * @memberof! ch.Zoom.prototype
     * @function
     * @param {(String | jQuerySelector | ZeptoSelector)} [content] The content that will be used by dropdown.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @returns {zoom}
     * @example
     * // Shows a basic zoom.
     * zoom.show();
     * @example
     * // Shows a zoom with new content
     * zoom.show('Some new content here!');
     * @example
     * // Shows a zoom with a new content that will be loaded by ajax with some custom options
     * zoom.show('http://domain.com/ajax/url', {
     *     'cache': false,
     *     'params': 'x-request=true'
     * });
     */
    Zoom.prototype.show = function (content, options) {
        // Don't execute when it's disabled
        if (!this._enabled || this._shown) {
            return this;
        }

        // Show feedback and trigger the image load, if it's not loaded
        if (!this._loaded) {
            this._$loading.removeClass('ch-hide');
            this.loadImage();
            return this;
        }

        // Delete the Loading and show the Seeker
        this._$loading.remove();
        this._$seeker.removeClass('ch-hide');

        // Execute the original show()
        parent.show.call(this, content, options);

        return this;
    };

    /**
     * Hides the zoom container and the Seeker.
     * @memberof! ch.Zoom.prototype
     * @function
     * @returns {zoom}
     * @example
     * // Close a zoom
     * zoom.hide();
     */
    Zoom.prototype.hide = function () {
        if (!this._shown) {
            return this;
        }

        // Avoid unnecessary execution
        if (!this._loaded) {
            this._$loading.addClass('ch-hide');
            return this;
        }

        this._$seeker.addClass('ch-hide');

        parent.hide.call(this);

        return this;
    };

    /**
     * Adds the zoomed image source to the <img> tag to trigger the request.
     * @memberof! ch.Zoom.prototype
     * @function
     * @returns {zoom}
     * @example
     * // Load the zoomed image on demand.
     * component.loadImage();
     */
    Zoom.prototype.loadImage = function () {

        this._zoomed.src = this._el.href;

        return this;
    };

    /**
     * Destroys a Zoom instance.
     * @memberof! ch.Zoom.prototype
     * @function
     * @returns {zoom}
     * @example
     * // Destroy a zoom
     * zoom.destroy();
     * // Empty the zoom reference
     * zoom = undefined;
     */
    Zoom.prototype.destroy = function () {

        this._$seeker.remove();

        parent.destroy.call(this);

        return;
    };

    ch.factory(Zoom, parent._normalizeOptions);

}(this, this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    function normalizeOptions(options) {
        if (typeof options === 'string' || ch.util.isArray(options)) {
            options = {
                'selected': options
            };
        }
        return options;
    }

    /**
     * It lets you move across the months of the year and allow to set dates as selected.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Calendar.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.format] Sets the date format. You must use "DD/MM/YYYY", "MM/DD/YYYY" or "YYYY/MM/DD". Default: "DD/MM/YYYY".
     * @param {String} [options.selected] Sets a date that should be selected by default. Default: The date of today.
     * @param {String} [options.from] Set a minimum selectable date. The format of the given date should be YYYY/MM/DD.
     * @param {String} [options.to] Set a maximum selectable date. The format of the given date should be YYYY/MM/DD.
     * @param {Array} [options.monthsNames] A collection of months names. Default: ["Enero", ... , "Diciembre"].
     * @param {Array} [options.weekdays] A collection of weekdays. Default: ["Dom", ... , "Sab"].
     * @returns {calendar} Returns a new instance of Calendar.
     * @example
     * // Create a new Calendar.
     * var calendar = new ch.Calendar($el, [options]);
     * @example
     * // Create a new Calendar with jQuery or Zepto.
     * var calendar = $(selector).calendar();
     * @example
     * // Creates a new Calendar with custom options.
     * var calendar =  $(selector).calendar({
     *     'format': 'MM/DD/YYYY',
     *     'selected': '2011/12/25',
     *     'from': '2010/12/25',
     *     'to': '2012/12/25',
     *     'monthsNames': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
     *     'weekdays': ['Su', 'Mo', 'Tu', 'We', 'Thu', 'Fr', 'Sa']
     * });
     * @example
     * // Creates a new Calendar using a shorthand way (selected date as parameter).
     * var calendar = $(selector).calendar('2011/12/25');
     */
    function Calendar($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Calendar is created.
             * @memberof! ch.Calendar.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Calendar#ready
         * @example
         * // Subscribe to "ready" event.
         * calendar.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    /**
     * Completes with zero the numbers less than 10.
     * @function
     * @private
     * @returns {String}
     */
    var addZero = function (num) {
            return (parseInt(num, 10) < 10) ? '0' + num : num;
        },

        /**
         * Map of date formats.
         * @type {Object}
         * @private
         */
        FORMAT_dates = {

            /**
             * Converts a given date to "YYYY/MM/DD" format.
             * @params {Date} date A given date to convert.
             * @function
             * @returns {String}
             */
            'YYYY/MM/DD': function (date) {
                return [date.year, addZero(date.month), addZero(date.day)].join('/');
            },

            /**
             * Converts a given date to "DD/MM/YYYY" format.
             * @params {Date} date A given date to convert.
             * @function
             * @returns {String}
             */
            'DD/MM/YYYY': function (date) {
                return [addZero(date.day), addZero(date.month), date.year].join('/');
            },

            /**
             * Converts a given date to "MM/DD/YYYY" format.
             * @params {Date} date A given date to convert.
             * @function
             * @returns {String}
             */
            'MM/DD/YYYY': function (date) {
                return [addZero(date.month), addZero(date.day), date.year].join('/');
            }
        },

        /**
         * Creates a JSON Object with reference to day, month and year, from a determinated date.
         * @function
         * @private
         * @returns {Object}
         */
        createDateObject = function (date) {

            // Uses date parameter or create a date from today
            date = (date === 'today') ? new Date() : new Date(date);

            /**
             * Returned custom Date object.
             * @type {Object}
             * @private
             */
            return {

                /**
                 * Reference to native Date object.
                 * @type {Date}
                 * @private
                 */
                'native': date,

                /**
                 * Number of day.
                 * @type {Number}
                 * @private
                 */
                'day': date.getDate(),

                /**
                 * Order of day in a week.
                 * @type {Number}
                 * @private
                 */
                'order': date.getDay(),

                /**
                 * Number of month.
                 * @type {Number}
                 * @private
                 */
                'month': date.getMonth() + 1,

                /**
                 * Number of full year.
                 * @type {Number}
                 * @private
                 */
                'year': date.getFullYear()
            };
        },

        /**
         * Templates of arrows to move around months.
         * @type {Object}
         * @private
         */
        arrows = {

            /**
             * Template of previous arrow.
             * @type {String}
             */
            'prev': '<div class="ch-calendar-prev" role="button" aria-hidden="false"></div>',

            /**
             * Template of next arrow.
             * @type {String}
             */
            'next': '<div class="ch-calendar-next" role="button" aria-hidden="false"></div>'
        },

        // Inheritance
        parent = ch.util.inherits(Calendar, ch.Component);

    /**
     * The name of the component.
     * @memberof! ch.Calendar.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var calendar = $(selector).data('calendar');
     */
    Calendar.prototype.name = 'calendar';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Calendar.prototype
     * @function
     */
    Calendar.prototype.constructor = Calendar;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Calendar.prototype._defaults = {
        'monthsNames': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        'weekdays': ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        'format': 'DD/MM/YYYY'
    };

    /**
     * Initialize a new instance of Calendar and merge custom options with defaults options.
     * @memberof! ch.Calendar.prototype
     * @function
     * @private
     * @returns {calendar}
     */
    Calendar.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        // cloneNode(true) > parameters is required. Opera & IE throws and internal error. Opera mobile breaks.
        this._snippet = this._el.cloneNode(true);

        /**
         * Object to mange the date and its ranges.
         * @type {Object}
         * @private
         */
        this._dates = {
            'range': {}
        };

        this._dates.today = createDateObject('today');

        this._dates.current = this._dates.today;

        /**
         * Date of selected day.
         * @type {Object}
         * @private
         */
        this._dates.selected = (function () {

            // Get date from configuration or input value, if configured could be an Array with multiple selections
            var selected = that._options.selected;

            // Do it only if there are a "selected" parameter
            if (!selected) { return selected; }

            // Simple date selection
            if (!ch.util.isArray(selected)) {

                if (selected !== 'today') {
                    // Return date object and update currentDate
                    selected = that._dates.current = createDateObject(selected);

                } else {
                    selected = that._dates.today;
                }

            // Multiple date selection
            } else {
                $.each(selected, function (i, e) {
                    // Simple date
                    if (!ch.util.isArray(e)) {
                        selected[i] = (selected[i] !== 'today') ? createDateObject(e) : that._dates.today;
                    // Range
                    } else {
                        selected[i][0] = (selected[i][0] !== 'today') ? createDateObject(e[0]) : that._dates.today;
                        selected[i][1] = (selected[i][1] !== 'today') ? createDateObject(e[1]) : that._dates.today;
                    }
                });
            }

            return selected;
        }());

        // Today's date object
        this._dates.today = createDateObject('today');

        // Minimum selectable date
        this._dates.range.from = (function () {

            // Only works when there are a "from" parameter on configuration
            if (that._options.from === undefined || !that._options.from) { return; }

            // Return date object
            return (that._options.from === 'today') ? that._dates.today : createDateObject(that._options.from);

        }());

        // Maximum selectable date
        this._dates.range.to = (function () {

            // Only works when there are a "to" parameter on configuration
            if (that._options.to === undefined || !that._options.to) { return; }

            // Return date object
            return (that._options.to === 'today') ? that._dates.today : createDateObject(that._options.to);

        }());

        // Show or hide arrows depending on "from" and "to" limits
        this._$prev = $(arrows.prev).attr('aria-controls', 'ch-calendar-grid-' + this.uid).on(ch.onpointertap + '.' + this.name, function (event) { ch.util.prevent(event); that.prevMonth(); });
        this._$next = $(arrows.next).attr('aria-controls', 'ch-calendar-grid-' + this.uid).on(ch.onpointertap + '.' + this.name, function (event) { ch.util.prevent(event); that.nextMonth(); });

        /**
         * The calendar container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$container = this._$el
            .addClass('ch-calendar')
            .prepend(this._$prev)
            .prepend(this._$next)
            .append(this._createTemplate(this._dates.current));

        this._updateControls();

        // Avoid selection on the component
        ch.util.avoidTextSelection(that.$container);

        return this;
    };

    /**
     * Checks if it has got a previous month to show depending on "from" limit.
     * @function
     * @private
     */
    Calendar.prototype._hasPrevMonth = function () {
        return this._dates.range.from === undefined || !(this._dates.range.from.month >= this._dates.current.month && this._dates.range.from.year >= this._dates.current.year);
    };

    /**
     * Checks if it has got a next month to show depending on "to" limits.
     * @function
     * @private
     */
    Calendar.prototype._hasNextMonth = function () {
        return this._dates.range.to === undefined || !(this._dates.range.to.month <= this._dates.current.month && this._dates.range.to.year <= this._dates.current.year);
    };

    /**
     * Refresh arrows visibility depending on "from" and "to" limits.
     * @function
     * @private
     */
    Calendar.prototype._updateControls = function () {

        // Show previous arrow when it's out of limit
        if (this._hasPrevMonth()) {
            this._$prev.removeClass('ch-hide').attr('aria-hidden', 'false');

        // Hide previous arrow when it's out of limit
        } else {
            this._$prev.addClass('ch-hide').attr('aria-hidden', 'true');
        }

        // Show next arrow when it's out of limit
        if (this._hasNextMonth()) {
            this._$next.removeClass('ch-hide').attr('aria-hidden', 'false');

        // Hide next arrow when it's out of limit
        } else {
            this._$next.addClass('ch-hide').attr('aria-hidden', 'true');
        }

        return this;
    };

    /**
     * Refresh the structure of Calendar's table with a new date.
     * @function
     * @private
     */
    Calendar.prototype._updateTemplate = function (date) {
        // Update "currentDate" object
        this._dates.current = (typeof date === 'string') ? createDateObject(date) : date;

        // Delete old table
        this.$container.children('table').remove();

        // Append new table to content
        this.$container.append(this._createTemplate(this._dates.current));

        // Refresh arrows
        this._updateControls();

        return this;
    };

    /**
     * Creates a complete month in a table.
     * @function
     * @private
     */
    Calendar.prototype._createTemplate = function (date) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            cell,
            positive,
            day,
            isSelected,
            thead = (function () {

                // Create thead structure
                var t = ['<thead><tr role="row">'],
                    dayIndex;

                // Add week names
                for (dayIndex = 0; dayIndex < 7; dayIndex += 1) {
                    t.push('<th role="columnheader">' + that._defaults.weekdays[dayIndex] + '</th>');
                }

                // Close thead structure
                t.push('</tr></thead>');

                // Join structure and return
                return t.join('');

            }()),

            table = [
                '<table class="ch-calendar-month" role="grid" id="ch-calendar-grid-' + that.uid + '">',
                '<caption>' + that._defaults.monthsNames[date.month - 1] + ' - ' + date.year + '</caption>',
                thead
            ],

            // Total amount of days into month
            cells = (function () {

                // Amount of days of current month
                var currentMonth = new Date(date.year, date.month, 0).getDate(),

                // Amount of days of previous month
                    prevMonth = new Date([date.year, date.month, '01'].join('/')).getDay(),

                // Merge amount of previous and current month
                    subtotal = prevMonth + currentMonth,

                // Amount of days into last week of month
                    latest = subtotal % 7,

                // Amount of days of next month
                    nextMonth = (latest > 0) ? 7 - latest : 0;

                return {
                    'previous': prevMonth,
                    'subtotal': subtotal,
                    'total': subtotal + nextMonth
                };

            }());

        table.push('<tbody><tr class="ch-calendar-week" role="row">');

        // Iteration of weekdays
        for (cell = 0; cell < cells.total; cell += 1) {

            // Push an empty cell on previous and next month
            if (cell < cells.previous || cell > cells.subtotal - 1) {
                table.push('<td role="gridcell" class="ch-calendar-other">X</td>');
            } else {

                // Positive number of iteration
                positive = cell + 1;

                // Day number
                day = positive - cells.previous;

                // Define if it's the day selected
                isSelected = this._isSelected(date.year, date.month, day);

                // Create cell
                table.push(
                    // Open cell structure including WAI-ARIA and classnames space opening
                    '<td role="gridcell"' + (isSelected ? ' aria-selected="true"' : '') + ' class="ch-calendar-day',

                    // Add Today classname if it's necesary
                    (date.year === that._dates.today.year && date.month === that._dates.today.month && day === that._dates.today.day) ? ' ch-calendar-today' : null,

                    // Add Selected classname if it's necesary
                    (isSelected ? ' ch-calendar-selected ' : null),

                    // From/to range. Disabling cells
                    (
                        // Disable cell if it's out of FROM range
                        (that._dates.range.from && day < that._dates.range.from.day && date.month === that._dates.range.from.month && date.year === that._dates.range.from.year) ||

                        // Disable cell if it's out of TO range
                        (that._dates.range.to && day > that._dates.range.to.day && date.month === that._dates.range.to.month && date.year === that._dates.range.to.year)

                    ) ? ' ch-calendar-disabled' : null,

                    // Close classnames attribute and print content closing cell structure
                    '">' + day + '</td>'
                );

                // Cut week if there are seven days
                if (positive % 7 === 0) {
                    table.push('</tr><tr class="ch-calendar-week" role="row">');
                }

            }

        }

        table.push('</tr></tbody></table>');

        // Return table object
        return table.join('');

    };

    /**
     * Checks if a given date is into 'from' and 'to' dates.
     * @function
     * @private
     */
    Calendar.prototype._isInRange = function (date) {
        var inRangeFrom = true,
            inRangeTo = true;

        if (this._dates.range.from) {
            inRangeFrom = (this._dates.range.from.native <= date.native);
        }

        if (this._dates.range.to) {
            inRangeTo = (this._dates.range.to.native >= date.native);
        }

        return inRangeFrom && inRangeTo;
    };

    /**
     * Indicates if an specific date is selected or not (including date ranges and simple dates).
     * @function
     * @private
     */
    Calendar.prototype._isSelected = function (year, month, day) {
        var yepnope;

        if (!this._dates.selected) { return; }

        yepnope = false;

        // Simple selection
        if (!ch.util.isArray(this._dates.selected)) {
            if (year === this._dates.selected.year && month === this._dates.selected.month && day === this._dates.selected.day) {
                yepnope = true;
                return yepnope;
            }

        // Multiple selection (ranges)
        } else {
            $.each(this._dates.selected, function (i, e) {
                // Simple date
                if (!ch.util.isArray(e)) {
                    if (year === e.year && month === e.month && day === e.day) {
                        yepnope = true;
                        return yepnope;
                    }
                // Range
                } else {
                    if (
                        (year >= e[0].year && month >= e[0].month && day >= e[0].day) &&
                            (year <= e[1].year && month <= e[1].month && day <= e[1].day)
                    ) {
                        yepnope = true;
                        return yepnope;
                    }
                }
            });
        }

        return yepnope;
    };

    /**
     * Selects a specific date or returns the selected date.
     * @memberof! ch.Calendar.prototype
     * @function
     * @param {String} [date] A given date to select. The format of the given date should be "YYYY/MM/DD".
     * @returns {calendar}
     * @example
     * // Returns the selected date.
     * calendar.select();
     * @example
     * // Select a specific date.
     * calendar.select('2014/05/28');
     */
    Calendar.prototype.select = function (date) {
        // Getter
        if (!date) {
            if (this._dates.selected === undefined) {
                return;
            }
            return FORMAT_dates[this._options.format](this._dates.selected);
        }

        // Setter
        var newDate = createDateObject(date);


        if (!this._isInRange(newDate)) {
            return this;
        }

        // Update selected date
        this._dates.selected = (date === 'today') ? this._dates.today : newDate;

        // Create a new table of selected month
        this._updateTemplate(this._dates.selected);

        /**
         * Event emitted when a date is selected.
         * @event ch.Calendar#select
         * @example
         * // Subscribe to "select" event.
         * calendar.on('select', function () {
         *     // Some code here!
         * });
         */
        this.emit('select');

        return this;
    };

    /**
     * Returns date of today
     * @memberof! ch.Calendar.prototype
     * @function
     * @returns {String} The date of today
     * @example
     * // Get the date of today.
     * var today = calendar.getToday();
     */
    Calendar.prototype.getToday = function () {
        return FORMAT_dates[this._options.format](this._dates.today);
    };

    /**
     * Moves to the next month.
     * @memberof! ch.Calendar.prototype
     * @function
     * @returns {calendar}
     * @example
     * // Moves to the next month.
     * calendar.nextMonth();
     */
    Calendar.prototype.nextMonth = function () {
        if (!this._enabled || !this._hasNextMonth()) {
            return this;
        }

        // Next year
        if (this._dates.current.month === 12) {
            this._dates.current.month = 0;
            this._dates.current.year += 1;
        }

        // Create a new table of selected month
        this._updateTemplate([this._dates.current.year, this._dates.current.month + 1, '01'].join('/'));

        /**
         * Event emitted when a next month is shown.
         * @event ch.Calendar#nextmonth
         * @example
         * // Subscribe to "nextmonth" event.
         * calendar.on('nextmonth', function () {
         *     // Some code here!
         * });
         */
        this.emit('nextmonth');

        return this;
    };

    /**
     * Move to the previous month.
     * @memberof! ch.Calendar.prototype
     * @function
     * @returns {calendar}
     * @example
     * // Moves to the prev month.
     * calendar.prevMonth();
     */
    Calendar.prototype.prevMonth = function () {

        if (!this._enabled || !this._hasPrevMonth()) {
            return this;
        }

        // Previous year
        if (this._dates.current.month === 1) {
            this._dates.current.month = 13;
            this._dates.current.year -= 1;
        }

        // Create a new table to the prev month
        this._updateTemplate([this._dates.current.year, this._dates.current.month - 1, '01'].join('/'));

        /**
         * Event emitted when a previous month is shown.
         * @event ch.Calendar#prevmonth
         * @example
         * // Subscribe to "prevmonth" event.
         * calendar.on('prevmonth', function () {
         *     // Some code here!
         * });
         */
        this.emit('prevmonth');

        return this;
    };

    /**
     * Move to the next year.
     * @memberof! ch.Calendar.prototype
     * @function
     * @returns {calendar}
     * @example
     * // Moves to the next year.
     * calendar.nextYear();
     */
    Calendar.prototype.nextYear = function () {

        if (!this._enabled || !this._hasNextMonth()) {
            return this;
        }

        // Create a new table of selected month
        this._updateTemplate([this._dates.current.year + 1, this._dates.current.month, '01'].join('/'));

        /**
         * Event emitted when a next year is shown.
         * @event ch.Calendar#nextyear
         * @example
         * // Subscribe to "nextyear" event.
         * calendar.on('nextyear', function () {
         *     // Some code here!
         * });
         */
        this.emit('nextyear');

        return this;
    };

    /**
     * Move to the previous year.
     * @memberof! ch.Calendar.prototype
     * @function
     * @returns {calendar}
     * @example
     * // Moves to the prev year.
     * calendar.prevYear();
     */
    Calendar.prototype.prevYear = function () {

        if (!this._enabled || !this._hasPrevMonth()) {
            return this;
        }

        // Create a new table to the prev year
        this._updateTemplate([this._dates.current.year - 1, this._dates.current.month, '01'].join('/'));

        /**
         * Event emitted when a previous year is shown.
         * @event ch.Calendar#prevyear
         * @example
         * // Subscribe to "prevyear" event.
         * calendar.on('prevyear', function () {
         *     // Some code here!
         * });
         */
        this.emit('prevyear');

        return this;
    };

    /**
     * Set a minimum selectable date.
     * @memberof! ch.Calendar.prototype
     * @function
     * @param {String} date A given date to set as minimum selectable date. The format of the given date should be "YYYY/MM/DD".
     * @returns {calendar}
     * @example
     * // Set a minimum selectable date.
     * calendar.setFrom('2010/05/28');
     */
    Calendar.prototype.setFrom = function (date) {
        // this from is a reference to the global form
        this._dates.range.from = (date === 'auto') ? undefined : createDateObject(date);
        this._updateTemplate(this._dates.current);

        return this;
    };

    /**
     * Set a maximum selectable date.
     * @memberof! ch.Calendar.prototype
     * @function
     * @param {String} date A given date to set as maximum selectable date. The format of the given date should be "YYYY/MM/DD".
     * @returns {calendar}
     * @example
     * // Set a maximum selectable date.
     * calendar.setTo('2014/05/28');
     */
    Calendar.prototype.setTo = function (date) {
        // this to is a reference to the global to
        this._dates.range.to = (date === 'auto') ? undefined : createDateObject(date);
        this._updateTemplate(this._dates.current);

        return this;
    };

    /**
     * Destroys a Calendar instance.
     * @memberof! ch.Calendar.prototype
     * @function
     * @example
     * // Destroy a calendar
     * calendar.destroy();
     * // Empty the calendar reference
     * calendar = undefined;
     */
    Calendar.prototype.destroy = function () {

        this._el.parentNode.replaceChild(this._snippet, this._el);

        $(window.document).trigger(ch.onlayoutchange);

        parent.destroy.call(this);

        return;
    };

    // Factorize
    ch.factory(Calendar, normalizeOptions);

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Dropdown shows a list of options for navigation.
     * @memberof ch
     * @constructor
     * @augments ch.Layer
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Dropdown.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization.
     * @param {String} [options.fx] Enable or disable UI effects. You must use: "slideDown", "fadeIn" or "none". Default: "none".
     * @param {String} [options.width] Set a width for the container. Default: "auto".
     * @param {String} [options.height] Set a height for the container. Default: "auto".
     * @param {String} [options.shownby] Determines how to interact with the trigger to show the container. You must use: "pointertap", "pointerenter" or "none". Default: "pointertap".
     * @param {String} [options.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "pointers".
     * @param {(jQuerySelector | ZeptoSelector)} [options.reference] It's a reference to position and size of element that will be considered to carry out the position. Default: the trigger element.
     * @param {String} [options.side] The side option where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "bottom".
     * @param {String} [options.align] The align options where the target element will be positioned. Its value can be: "left", "right", "top", "bottom" or "center". Default: "left".
     * @param {Number} [options.offsetX] The offsetX option specifies a distance to displace the target horizontally. Default: 0.
     * @param {Number} [options.offsetY] The offsetY option specifies a distance to displace the target vertically. Default: -1.
     * @param {String} [options.position] The position option specifies the type of positioning used. Its value must be "absolute" or "fixed". Default: "absolute".
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading. Default: '&lt;div class="ch-loading ch-loading-centered"&gt;&lt;/div&gt;'.
     * @param {Boolean} [options.skin] Sets a CSS class name to the trigger and container to get a variation of Dropdown. Default: false.
     * @param {Boolean} [options.shortcuts] Configures navigation shortcuts. Default: true.
     * @param {(jQuerySelector | ZeptoSelector | HTMLElement | String)} [options.content] The content to be shown into the Dropdown container.
     * @returns {dropdown} Returns a new instance of Dropdown.
     * @example
     * // Create a new Dropdown.
     * var dropdown = new ch.Dropdown($el, [options]);
     * @example
     * // Create a new Dropdown with jQuery or Zepto.
     * var dropdown = $(selector).dropdown([options]);
     * @example
     * // Create a new skinned Dropdown.
     * var dropdown = $(selector).dropdown({
     *     'skin': true
     * });
     */
    function Dropdown($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Dropdown is created.
             * @memberof! ch.Dropdown.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Dropdown#ready
         * @example
         * // Subscribe to "ready" event.
         * dropdown.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    var $document = $(window.document),
        pointerenter = ch.onpointerenter + '.dropdown',
        // Inheritance
        parent = ch.util.inherits(Dropdown, ch.Layer);

    /**
     * The name of the component.
     * @memberof! ch.Dropdown.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var dropdown = $(selector).data('dropdown');
     */
    Dropdown.prototype.name = 'dropdown';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Dropdown.prototype
     * @function
     */
    Dropdown.prototype.constructor = Dropdown;

    /**
     * Configuration by default.
     * @memberof! ch.Dropdown.prototype
     * @type {Object}
     * @private
     */
    Dropdown.prototype._defaults = $.extend(ch.util.clone(parent._defaults), {
        '_className': 'ch-dropdown ch-box-lite',
        '_ariaRole': 'combobox',
        'fx': 'none',
        'shownby': 'pointertap',
        'hiddenby': 'pointers',
        'offsetY': -1,
        'skin': false,
        'shortcuts': true
    });

    /**
     * Initialize a new instance of Dropdown and merge custom options with defaults options.
     * @memberof! ch.Dropdown.prototype
     * @function
     * @private
     * @returns {dropdown}
     */
    Dropdown.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            // The second element of the HTML snippet (the dropdown content)
            $content = this.$trigger.next();

        /**
         * The dropdown trigger. It's the element that will show and hide the container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$trigger
            .addClass('ch-dropdown-trigger')
            .prop('aria-activedescendant', 'ch-dropdown' + this.uid + '-selected');

        ch.util.avoidTextSelection(this.$trigger);

        // Skinned dropdown
        if (this._options.skin) {
            this.$trigger.addClass('ch-dropdown-trigger-skin');
            this.$container.addClass('ch-dropdown-skin');
        // Default Skin
        } else {
            this.$trigger.addClass('ch-btn-skin ch-btn-small');
        }

        /**
         * A list of links with the navigation options of the component.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @private
         */
        this._$navigation = $content.find('a').prop('role', 'option');

        // Item selected by mouseover
        $.each(this._$navigation, function (i, e) {
            $(e).on(pointerenter, function () {
                that._$navigation[that._selected = i].focus();
            });
        });

        if (this._options.shortcuts && this._navigationShortcuts !== undefined) {
            this._navigationShortcuts();
        }

        this._options.content = $content;

        /**
         * The original and entire element and its state, before initialization.
         * @private
         * @type {HTMLElement}
         */
        // cloneNode(true) > parameters is required. Opera & IE throws and internal error. Opera mobile breaks.
        this._snippet = this._options.content[0].cloneNode();

        return this;
    };

    /**
     * Shows the dropdown container.
     * @memberof! ch.Dropdown.prototype
     * @function
     * @param {(String | jQuerySelector | ZeptoSelector)} [content] The content that will be used by dropdown.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @returns {dropdown}
     * @example
     * // Shows a basic dropdown.
     * dropdown.show();
     * @example
     * // Shows a dropdown with new content
     * dropdown.show('Some new content here!');
     * @example
     * // Shows a dropdown with a new content that will be loaded by ajax with some custom options
     * dropdown.show('http://domain.com/ajax/url', {
     *     'cache': false,
     *     'params': 'x-request=true'
     * });
     */
    Dropdown.prototype.show = function (content, options) {
        // Don't execute when it's disabled
        if (!this._enabled) {
            return this;
        }

        // Execute the original show()
        parent.show.call(this, content, options);

        // Z-index of trigger over content (secondary / skin dropdown)
        if (this._options.skin) {
            this.$trigger.css('z-index', ch.util.zIndex += 1);
        }

        this._selected = -1;

        return this;
    };

    /**
     * Destroys a Dropdown instance.
     * @memberof! ch.Dropdown.prototype
     * @function
     * @example
     * // Destroy a dropdown
     * dropdown.destroy();
     * // Empty the dropdown reference
     * dropdown = undefined;
     */
    Dropdown.prototype.destroy = function () {

        this.$trigger
            .off('.dropdown')
            .removeClass('ch-dropdown-trigger ch-dropdown-trigger-skin ch-user-no-select ch-btn-skin ch-btn-small')
            .removeAttr('aria-controls')
            .after(this._snippet);

        this.$container.off('.dropdown');

        $document.trigger(ch.onlayoutchange);

        $.each(this._$navigation, function (i, e) {
            $(e).off(pointerenter);
        });

        parent.destroy.call(this);

        return;
    };

    ch.factory(Dropdown);

}(this, this.ch.$, this.ch));

(function (ch) {
    'use strict';

    /**
     * Highlights the current option when navigates by keyboard.
     * @function
     * @private
     */
    ch.Dropdown.prototype._highlightOption = function (key) {

        var optionsLength = this._$navigation.length;

        if (!this._shown) { return; }

        // Sets limits behavior
        if (this._selected === (key === 'down_arrow' ? optionsLength - 1 : 0)) { return; }

        // Unselects current option
        if (this._selected !== -1) {
            this._$navigation[this._selected].blur();
            this._$navigation[this._selected].removeAttribute('id');
        }

        if (key === 'down_arrow') { this._selected += 1; } else { this._selected -= 1; }

        // Selects new current option
        this._$navigation[this._selected].focus();
        this._$navigation[this._selected].id = 'ch-dropdown' + this.uid + '-selected';
    };

    /**
     * Add handlers to manage the keyboard on Dropdown navigation.
     * @function
     * @private
     */
    ch.Dropdown.prototype._navigationShortcuts = function () {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        ch.shortcuts.add(ch.onkeyuparrow, this.uid, function (event) {
            // Prevent default behavior
            ch.util.prevent(event);

            that._highlightOption(event.type);
        });

        ch.shortcuts.add(ch.onkeydownarrow, this.uid, function (event) {
            // Prevent default behavior
            ch.util.prevent(event);

            that._highlightOption(event.type);
        });

        this.once('destroy', function () {
            ch.shortcuts.remove(ch.onkeyuparrow, that.uid);
            ch.shortcuts.remove(ch.onkeydownarrow, that.uid);
        });

        return this;
    };

}(this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Tabs lets you create tabs for static and dynamic content.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Expandable
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Tabs.
     * @returns {tabs} Returns a new instance of Tabs.
     * @example
     * // Create a new Tabs.
     * var tabs = new ch.Tabs($el);
     * @example
     * // Create a new Tabs with jQuery or Zepto.
     * var tabs = $(selector).tabs();
     */
    function Tabs($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Tabs is created.
             * @memberof! ch.Tabs.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Emits the event 'ready' when the component is ready to use.
         * @event ch.Tabs#ready
         * @example
         * // Subscribe to "ready" event.
         * tabs.on('ready',function () {
         *     this.show();
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Tabs, ch.Component),

        location = window.location,

        // Creates methods enable and disable into the prototype.
        methods = ['enable', 'disable'],
        len = methods.length,

        // Regular expresion to get hash
        hashRegExp = new RegExp('\\#!?\\/?(.[^\\?|\\&|\\s]+)');


    function createMethods(method) {
        Tabs.prototype[method] = function (tab) {
            var i;

            // Enables or disables an specifc tab panel
            if (tab !== undefined) {
                this.tabpanels[tab - 1][method]();

            // Enables or disables Tabs
            } else {

                i = this.tabpanels.length;

                while (i) {
                    this.tabpanels[i -= 1][method]();
                }

                // Executes parent method
                parent[method].call(this);

                // Updates "aria-disabled" attribute
                this._el.setAttribute('aria-disabled', !this._enabled);
            }

            return this;
        };
    }

    /**
     * The name of the component.
     * @memberof! ch.Tabs.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var tabs = $(selector).data('tabs');
     */
    Tabs.prototype.name = 'tabs';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Tabs.prototype
     * @function
     */
    Tabs.prototype.constructor = Tabs;

    /**
     * Initialize a new instance of Tabs and merge custom options with defaults options.
     * @memberof! ch.Tabs.prototype
     * @function
     * @private
     * @returns {tabs}
     */
    Tabs.prototype._init = function ($el, options) {
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
        * The actual location hash, is used to know if there's a specific tab panel shwown.
        * @type {String}
        * @private
        */
        this._currentHash = (function () {
            var hash = location.hash.match(hashRegExp);
            return (hash !== null) ? hash[1] : '';
        }());

        // cloneNode(true) > parameters is required. Opera & IE throws and internal error. Opera mobile breaks.
        this._snippet = this._el.cloneNode(true);

        /**
         * The tabs container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$container = this._$el
            .addClass('ch-tabs');

        /**
         * The tabs triggers.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$triggers = this.$container.children(':first-child')
            .addClass('ch-tabs-triggers')
            .attr('role', 'tablist');

        /**
         * A collection of tab panel.
         * @type {Array}
         */
        this.tabpanels = [];

        /**
         * The container of tab panels.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$panel = this.$container.children(':last-child')
            .addClass('ch-tabs-panel ch-box-lite')
            .attr('role', 'presentation');

        /**
         * The tab panel's containers.
         * @type {jQuery}
         * @private
         */
        this._$tabsPanels = this.$panel.children();

        // Creates tab
        this.$triggers.find('a').each(function (i, e) {
            that._createTab(i, e);
        });

        // Set the default shown tab.
        this._shown = 1;

        // Checks if the url has a hash to shown the associated tab.
        this._hasHash();

        return this;
    };

    /**
     * Create tab panels.
     * @function
     * @private
     */
    Tabs.prototype._createTab = function (i, e) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            tab,

            $panel = this._$tabsPanels.eq(i),

            // Create Tab panel's options
            options = {
                '_classNameTrigger': 'ch-tab',
                '_classNameContainer': 'ch-tabpanel ch-hide',
                'toggle': false
            };

        // Tab panel async configuration
        if ($panel[0] === undefined) {

            $panel = $('<div id="' + e.href.split('#')[1] + '">').appendTo(this.$panel);

            options.content = e.href;
            options.waiting = this._options.waiting;
            options.cache = this._options.cache;
            options.method = this._options.method;
        }

        // Tab panel container configuration
        options.container = $panel;

        // Creates new Tab panel
        tab = new ch.Expandable($(e), options);

        // Creates tab's hash
        tab._hash = e.href.split('#')[1];

        // Add ARIA roles
        tab.$trigger.attr('role', 'tab');
        tab.$container.attr('role', 'tabpanel');

        // Binds show event
        tab.on('show', function () {
            that._updateShown(i + 1);
        });

        // Adds tab panel to the collection
        this.tabpanels.push(tab);

        return this;
    };

    /**
     * Checks if the url has a hash to shown the associated tab panel.
     * @function
     * @private
     */
    Tabs.prototype._hasHash = function () {

        /**
         * Event emitted when a tab hide a tab panel container.
         * @event ch.Tabs#hide
         * @example
         * // Subscribe to "hide" event.
         * tabs.on('hide', function () {
         *     // Some code here!
         * });
         */
        this.emit('hide', this._shown);

        var i = 0,
            // Shows the first tab panel if not hash or it's hash and it isn't from the current tab panel,
            l = this.tabpanels.length;

        // If hash open that tab panel
        for (i; i < l; i += 1) {
            if (this.tabpanels[i]._hash === this._currentHash) {
                this._shown = i + 1;
                break;
            }
        }

        this.tabpanels[this._shown - 1].show();

        /**
         * Event emitted when the tabs shows a tab panel container.
         * @event ch.Tabs#show
         * @ignore
         */
        this.emit('show', this._shown);

        return this;
    };

    /**
     * Shows a specific tab panel.
     * @memberof! ch.Tabs.prototype
     * @function
     * @param {Number} tab - A given number of tab panel.
     * @returns {tabs}
     * @example
     * // Shows the second tab panel.
     * tabs.show(2);
     */
    Tabs.prototype.show = function (tab) {

        // Shows the current tab
        this.tabpanels[tab - 1].show();

        return this;
    };

    /**
     * Updates the shown tab panel, hides the previous tab panel, changes window location and emits "show" event.
     * @memberof! ch.Tabs.prototype
     * @function
     * @private
     * @param {Number} tab - A given number of tab panel.
     */
    Tabs.prototype._updateShown = function (tab) {

        // If tab doesn't exist or if it's shown do nothing
        if (this._shown === tab) {
            return this;
        }

        /**
         * Event emitted when a tab hide a tab panel container.
         * @event ch.Tabs#hide
         * @example
         * // Subscribe to "hide" event.
         * tabs.on('hide', function () {
         *     // Some code here!
         * });
         */
        this.emit('hide', this._shown);

        // Hides the shown tab
        this.tabpanels[this._shown - 1].hide();

        /**
         * Get wich tab panel is shown.
         * @name ch.Tabs#_shown
         * @type {Number}
         * @private
         */
        this._shown = tab;

        // Update window location hash
        location.hash = this._currentHash = (this._currentHash === '')
            // If the current hash is empty, create it.
            ? '#!/' + this.tabpanels[this._shown - 1]._hash
            // update only the previous hash
            : location.hash.replace(location.hash.match(hashRegExp)[1], this.tabpanels[this._shown - 1]._hash);

        /**
         * Event emitted when the tabs shows a tab panel container.
         * @event ch.Tabs#show
         * @example
         * // Subscribe to "show" event.
         * tabs.on('show', function (shownTab) {
         *     // Some code here!
         * });
         */
        this.emit('show', this._shown);

        return this;
    };

    /**
     * Returns the number of the shown tab panel.
     * @memberof! ch.Tabs.prototype
     * @function
     * @returns {Boolean}
     * @example
     * if (tabs.getShown() === 1) {
     *     fn();
     * }
     */
    Tabs.prototype.getShown = function () {
        return this._shown;
    };

    /**
     * Allows to manage the tabs content.
     * @param {Number} tab A given tab to change its content.
     * @param {(String | jQuerySelector | ZeptoSelector)} content The content that will be used by a tabpanel.
     * @param {Object} [options] A custom options to be used with content loaded by ajax.
     * @param {String} [options.method] The type of request ("POST" or "GET") to load content by ajax. Default: "GET".
     * @param {String} [options.params] Params like query string to be sent to the server.
     * @param {Boolean} [options.cache] Force to cache the request by the browser. Default: true.
     * @param {Boolean} [options.async] Force to sent request asynchronously. Default: true.
     * @param {(String | jQuerySelector | ZeptoSelector)} [options.waiting] Temporary content to use while the ajax request is loading.
     * @example
     * // Updates the content of the second tab with some string.
     * tabs.content(2, 'http://ajax.com', {'cache': false});
     */
    Tabs.prototype.content = function (tab, content, options) {
        if (tab === undefined || typeof tab !== 'number') {
            throw new window.Error('Tabs.content(tab, content, options): Expected a number of tab.');
        }

        if (content === undefined) {
            return this.tab[tab - 1].content();
        }

        this.tabpanels[tab - 1].content(content, options);

        return this;
    };

    /**
     * Enables an instance of Tabs or a specific tab panel.
     * @memberof! ch.Tabs.prototype
     * @name enable
     * @function
     * @param {Number} [tab] - A given number of tab panel to enable.
     * @returns {tabs} Returns an instance of Tabs.
     * @example
     * // Enabling an instance of Tabs.
     * tabs.enable();
     * @example
     * // Enabling the second tab panel of a tabs.
     * tabs.enable(2);
     */

    /**
     * Disables an instance of Tabs or a specific tab panel.
     * @memberof! ch.Tabs.prototype
     * @name disable
     * @function
     * @param {Number} [tab] - A given number of tab panel to disable.
     * @returns {tabs} Returns an instance of Tabs.
     * @example
     * // Disabling an instance of Tabs.
     * tabs.disable();
     * @example
     * // Disabling the second tab panel.
     * tabs.disable(2);
     */
    while (len) {
        createMethods(methods[len -= 1]);
    }

    /**
     * Destroys a Tabs instance.
     * @memberof! ch.Tabs.prototype
     * @function
     * @example
     * // Destroying an instance of Tabs.
     * tabs.destroy();
     */
    Tabs.prototype.destroy = function () {

        this._el.parentNode.replaceChild(this._snippet, this._el);

        $(window.document).trigger(ch.onlayoutchange);

        parent.destroy.call(this);
    };

    /**
     * Factory
     */
    ch.factory(Tabs);

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * A large list of elements. Some elements will be shown in a preset area, and others will be hidden waiting for the user interaction to show it.
     * @memberof ch
     * @constructor
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Carousel.
     * @param {Object} [options] Options to customize an instance.
     * @param {Number} [options.async] Defines the number of future asynchronous items to add to the component. Default: 0.
     * @param {Boolean} [options.arrows] Defines if the arrow-buttons must be created or not at initialization. Default: true.
     * @param {Boolean} [options.pagination] Defines if a pagination must be created or not at initialization. Default: false.
     * @param {Boolean} [options.fx] Enable or disable the slide effect. Default: true.
     * @param {Number} [options.limitPerPage] Set the maximum amount of items to show in each page.
     * @returns {carousel} Returns a new instance of Carousel.
     * @example
     * // Create a new carousel.
     * var carousel = new ch.Carousel($el, [options]);
     * @example
     * // Create a new Carousel with jQuery or Zepto.
     * var carousel = $(selector).carousel([options]);
     * @example
     * // Create a new Carousel with disabled effects.
     * var carousel = $(selector).carousel({
     *     'fx': false
     * });
     * @example
     * // Create a new Carousel with items asynchronously loaded.
     * var carousel = $(selector).carousel({
     *     'async': 10
     * }).on('itemsadd', function ($items) {
     *     // Inject content into the added <li> elements
     *     $.each($items, function (i, e) {
     *         e.innerHTML = 'Content into one of newly inserted <li> elements.';
     *     });
     * });
     */
    function Carousel($el, options) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Carousel is created.
             * @memberof! ch.Carousel.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Carousel#ready
         * @example
         * // Subscribe to "ready" event.
         * carousel.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    var pointertap = ch.onpointertap + '.carousel',
        Math = window.Math,
        setTimeout = window.setTimeout,
        // Inheritance
        parent = ch.util.inherits(Carousel, ch.Component);

    /**
     * The name of the component.
     * @memberof! ch.Carousel.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var carousel = $(selector).data('carousel');
     */
    Carousel.prototype.name = 'carousel';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Carousel.prototype
     * @function
     */
    Carousel.prototype.constructor = Carousel;

    /**
     * Configuration by default.
     * @memberof! ch.Carousel.prototype
     * @type {Object}
     * @private
     */
    Carousel.prototype._defaults = {
        'async': 0,
        'arrows': true,
        'pagination': false,
        'fx': true
    };

    /**
     * Initialize a new instance of Carousel and merge custom options with defaults options.
     * @memberof! ch.Carousel.prototype
     * @function
     * @private
     * @returns {carousel}
     */
    Carousel.prototype._init = function ($el, options) {
        // Call to its parents init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * The original and entire element and its state, before initialization.
         * @type {HTMLDivElement}
         * @private
         */
        // cloneNode(true) > parameters is required. Opera & IE throws and internal error. Opera mobile breaks.
        this._snippet = this._el.cloneNode(true);

        /**
         * Element that moves (slides) across the component (inside the mask).
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._$list = this._$el.addClass('ch-carousel').children().addClass('ch-carousel-list');

        /**
         * Collection of each child of the slider list.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._$items = this._$list.children().addClass('ch-carousel-item');

        /**
         * Element that wraps the list and denies its overflow.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._$mask = $('<div class="ch-carousel-mask" role="tabpanel">').html(this._$list).appendTo(this._$el);

        /**
         * Size of the mask (width). Updated in each refresh.
         * @private
         * @type {Number}
         */
        this._maskWidth = ch.util.getOuterDimensions(this._$mask[0]).width;

        /**
         * The width of each item, including paddings, margins and borders. Ideal for make calculations.
         * @private
         * @type {Number}
         */
        this._itemWidth = this._$items.width();

        /**
         * The width of each item, without paddings, margins or borders. Ideal for manipulate CSS width property.
         * @private
         * @type {Number}
         */
        this._itemOuterWidth = ch.util.getOuterDimensions(this._$items[0]).width;

        /**
         * The size added to each item to make it elastic/responsive.
         * @private
         * @type {Number}
         */
        this._itemExtraWidth = 0;

        /**
         * The height of each item, including paddings, margins and borders. Ideal for make calculations.
         * @private
         * @type {Number}
         */
        this._itemHeight = this._$items.height();

        /**
         * The margin of all items. Updated in each refresh only if it's necessary.
         * @private
         * @type {Number}
         */
        this._itemMargin = 0;

        /**
         * Flag to control when arrows were created.
         * @private
         * @type {Boolean}
         */
        this._arrowsCreated = false;

        /**
         * Flag to control when pagination was created.
         * @private
         * @type {Boolean}
         */
        this._paginationCreated = false;

        /**
         * Amount of items in each page. Updated in each refresh.
         * @private
         * @type {Number}
         */
        this._limitPerPage = 0;

        /**
         * Page currently showed.
         * @private
         * @type {Number}
         */
        this._currentPage = 1;

        /**
         * Total amount of pages. Data updated in each refresh.
         * @private
         * @type {Number}
         */
        this._pages = 0;

        /**
         * Distance needed to move ONLY ONE PAGE. Data updated in each refresh.
         * @private
         * @type {Number}
         */
        this._pageWidth = 0;

        /**
         * List of items that should be loaded asynchronously on page movement.
         * @private
         * @type {Number}
         */
        this._async = this._options.async;

        /**
         * UI element of arrow that moves the Carousel to the previous page.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._$prevArrow = $('<div class="ch-carousel-prev ch-carousel-disabled" role="button" aria-hidden="true">')
            .on(pointertap, function () { that.prev(); });

        /**
         * UI element of arrow that moves the Carousel to the next page.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        that._$nextArrow = $('<div class="ch-carousel-next" role="button" aria-hidden="false">')
            .on(pointertap, function () { that.next(); });

        /**
         * UI element that contains all the thumbnails for pagination.
         * @private
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this._$pagination = $('<div class="ch-carousel-pages" role="navigation">').on(pointertap, function (event) {
            // Get the page from the element
            var page = event.target.getAttribute('data-page');
            // Allow interactions from a valid page of pagination
            if (page !== null) { that.select(window.parseInt(page, 10)); }
        });

        // Refresh calculation when the viewport resizes
        ch.viewport.on('resize', function () { that.refresh(); });

        // If efects aren't needed, avoid transition on list
        if (!this._options.fx) { this._$list.addClass('ch-carousel-nofx'); }

        // Position absolutelly the list when CSS transitions aren't supported
        if (!ch.support.transition) { this._$list.css({'position': 'absolute', 'left': '0'}); }

        // If there is a parameter specifying a pagination, add it
        if (this._options.pagination) { this._addPagination(); }

        // Allow to render the arrows
        if (this._options.arrows !== undefined && this._options.arrows !== false) { this._addArrows(); }

        // Set WAI-ARIA properties to each item depending on the page in which these are
        this._updateARIA();

        // Calculate items per page and calculate pages, only when the amount of items was changed
        this._updateLimitPerPage();

        // Update the margin between items and its size
        this._updateDistribution();

        return this;
    };

    /**
     * Set accesibility properties to each item depending on the page in which these are.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._updateARIA = function () {
        /**
         * Reference to an internal component instance, saves all the information and configuration properties.
         * @type {Object}
         * @private
         */
        var that = this,
            // Amount of items when ARIA is updated
            total = this._$items.length + this._async,
            // Page where each item is in
            page;

        // Update WAI-ARIA properties on all items
        $.each(this._$items, function (i, item) {
            // Update page where this item is in
            page = Math.floor(i / that._limitPerPage) + 1;
            // Update ARIA attributes
            item.setAttribute('aria-hidden', (page !== that._currentPage));
            item.setAttribute('aria-setsize', total);
            item.setAttribute('aria-posinset', (i + 1));
            item.setAttribute('aria-label', 'page' + page);
        });
    };

    /**
     * Adds items when page/pages needs to load it asynchronously.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._loadAsyncItems = function () {

        // Load only when there are items to load
        if (this._async === 0) { return; }

        // Amount of items from the beginning to current page
        var total = this._currentPage * this._limitPerPage,
            // How many items needs to add to items rendered to complete to this page
            amount = total - this._$items.length,
            // The new width calculated from current width plus extraWidth
            width = (this._itemWidth + this._itemExtraWidth),
            // Get the height using new width and relation between width and height of item (ratio)
            height = ((width * this._itemHeight) / this._itemWidth).toFixed(3),
            // Generic <LI> HTML Element to be added to the Carousel
            item = [
                '<li',
                ' class="ch-carousel-item"',
                ' style="width:' + width + 'px;height:' + height + 'px;margin-right:' + this._itemMargin + 'px"',
                '></li>'
            ].join(''),
            // It stores <LI> that will be added to the DOM collection
            items = '',
            // Wrapped items
            $items;

        // Load only when there are items to add
        if (amount < 1) { return; }

        // If next page needs less items than it support, then add that amount
        amount = (this._async < amount) ? this._async : amount;

        // Add the necessary amount of items
        while (amount) {
            items += item;
            amount -= 1;
        }

        // Wrap the string elements into jQuery/Zepto
        $items = $(items);

        // Add sample items to the list
        this._$list.append($items);

        // Update items collection
        this._$items = this._$list.children();

        // Set WAI-ARIA properties to each item
        this._updateARIA();

        // Update amount of items to add asynchronously
        this._async -= amount;

        /**
         * Event emitted when the component creates new asynchronous empty items.
         * @event ch.Carousel#itemsadd
         * @example
         * // Create a new Carousel with items asynchronously loaded.
         * var carousel = $(selector).carousel({
         *     'async': 10
         * }).on('itemsadd', function ($items) {
         *     // Inject content into the added <li> elements
         *     $.each($items, function (i, e) {
         *         e.innerHTML = 'Content into one of newly inserted <li> elements.';
         *     });
         * });
         */
        this.emit('itemsadd', $items);
    };

    /**
     * Creates the pagination of the component.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._addPagination = function () {
        // Remove the current pagination if it's necessary to create again
        if (this._paginationCreated) {
            this._removePagination();
        }

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            thumbs = [],
            page = that._pages,
            isSelected;

        // Generate a thumbnail for each page on Carousel
        while (page) {
            // Determine if this thumbnail is selected or not
            isSelected = (page === that._currentPage);
            // Add string to collection
            thumbs.unshift(
                '<span',
                ' role="button"',
                ' aria-selected="' + isSelected + '"',
                ' aria-controls="page' + page + '"',
                ' data-page="' + page + '"',
                ' class="' + (isSelected ? 'ch-carousel-selected' : '') + '"',
                '>' + page + '</span>'
            );

            page -= 1;
        }

        // Append thumbnails to pagination and append this to Carousel
        that._$pagination.html(thumbs.join('')).appendTo(that._$el);

        // Avoid selection on the pagination
        ch.util.avoidTextSelection(that._$pagination);

        // Check pagination as created
        that._paginationCreated = true;
    };

    /**
     * Deletes the pagination from the component.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._removePagination = function () {
        // Avoid to change something that not exists
        if (!this._paginationCreated) { return; }
        // Delete thumbnails
        this._$pagination[0].innerHTML = '';
        // Check pagination as deleted
        this._paginationCreated = false;
    };

    /**
     * It stops the slide effect while the list moves.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     * @param {Function} callback A function to execute after disable the effects.
     */
    Carousel.prototype._standbyFX = function (callback) {
        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        // Do it if is required
        if (this._options.fx) {
            // Delete efects on list to make changes instantly
            this._$list.addClass('ch-carousel-nofx');
            // Execute the custom method
            callback.call(this);
            // Restore efects to list
            // Use a setTimeout to be sure to do this AFTER changes
            setTimeout(function () { that._$list.removeClass('ch-carousel-nofx'); }, 0);
        // Avoid to add/remove classes if it hasn't effects
        } else {
            callback.call(this);
        }
    };

    /**
     * Calculates the total amount of pages and executes internal methods to load asynchronous items, update WAI-ARIA, update the arrows and update pagination.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._updatePages = function () {
        // Update the amount of total pages
        // The ratio between total amount of items and items in each page
        this._pages = Math.ceil((this._$items.length + this._async) / this._limitPerPage);
        // Add items to the list, if it's necessary
        this._loadAsyncItems();
        // Set WAI-ARIA properties to each item
        this._updateARIA();
        // Update arrows (when pages === 1, there is no arrows)
        this._updateArrows();
        // Update pagination
        if (this._options.pagination) {
            this._addPagination();
        }
    };

    /**
     * Calculates the correct items per page and calculate pages, only when the amount of items was changed.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._updateLimitPerPage = function () {

        var max = this._options.limitPerPage,
            // Go to the current first item on the current page to restore if pages amount changes
            firstItemOnPage,
            // The width of each item into the width of the mask
            // Avoid zero items in a page
            limitPerPage = Math.floor(this._maskWidth / this._itemOuterWidth) || 1;

        // Limit amount of items when user set a limitPerPage amount
        if (max !== undefined && limitPerPage > max) { limitPerPage = max; }

        // Set data and calculate pages, only when the amount of items was changed
        if (limitPerPage === this._limitPerPage) { return; }

        // Restore if limitPerPage is NOT the same after calculations (go to the current first item page)
        firstItemOnPage = ((this._currentPage - 1) * this._limitPerPage) + 1;
        // Update amount of items into a single page (from conf or auto calculations)
        this._limitPerPage = limitPerPage;
        // Calculates the total amount of pages and executes internal methods
        this._updatePages();
        // Go to the current first item page
        this.select(Math.ceil(firstItemOnPage / limitPerPage));
    };

    /**
     * Calculates and set the size of the items and its margin to get an adaptive Carousel.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._updateDistribution = function () {

        var moreThanOne = this._limitPerPage > 1,
            // Total space to use as margin into mask
            // It's the difference between mask width and total width of all items
            freeSpace = this._maskWidth - (this._itemOuterWidth * this._limitPerPage),
            // Width to add to each item to get responsivity
            // When there are more than one item, get extra width for each one
            // When there are only one item, extraWidth must be just the freeSpace
            extraWidth = moreThanOne ? Math.ceil(freeSpace / this._limitPerPage / 2) : Math.ceil(freeSpace),
            // Amount of spaces to distribute the free space
            spaces,
            // The new width calculated from current width plus extraWidth
            width;

        // Update ONLY IF margin changed from last refresh
        // If *new* and *old* extra width are 0, continue too
        if (extraWidth === this._itemExtraWidth && extraWidth > 0) { return; }

        // Update global value of width
        this._itemExtraWidth = extraWidth;

        // When there are 6 items on a page, there are 5 spaces between them
        // Except when there are only one page that NO exist spaces
        spaces = moreThanOne ? this._limitPerPage - 1 : 0;
        // The new width calculated from current width plus extraWidth
        width = this._itemWidth + extraWidth;

        // Free space for each space between items
        // Ceil to delete float numbers (not Floor, because next page is seen)
        // There is no margin when there are only one item in a page
        // Update global values
        this._itemMargin = moreThanOne ? Math.ceil(freeSpace / spaces / 2) : 0;

        // Update distance needed to move ONLY ONE page
        // The width of all items on a page, plus the width of all margins of items
        this._pageWidth = (this._itemOuterWidth + extraWidth + this._itemMargin) * this._limitPerPage;

        // Update the list width
        // Do it before item resizing to make space to all items
        // Delete efects on list to change width instantly
        this._standbyFX(function () {
            this._$list.css('width', this._pageWidth * this._pages);
        });

        // Update element styles
        // Get the height using new width and relation between width and height of item (ratio)
        this._$items.css({
            'width': width,
            'height': ((width * this._itemHeight) / this._itemWidth).toFixed(3),
            'margin-right': this._itemMargin
        });

        // Update the mask height with the list height
        this._$mask[0].style.height = ch.util.getOuterDimensions(this._$items[0]).height + 'px';

        // Suit the page in place
        this._standbyFX(function () {
            this._translate(-this._pageWidth * (this._currentPage - 1));
        });
    };

    /**
     * Adds arrows to the component.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._addArrows = function () {
        // Avoid selection on the arrows
        ch.util.avoidTextSelection(this._$prevArrow, this._$nextArrow);
        // Add arrows to DOM
        this._$el.prepend(this._$prevArrow).append(this._$nextArrow);
        // Check arrows as created
        this._arrowsCreated = true;
    };

    /**
     * Set as disabled the arrows by adding a classname and a WAI-ARIA property.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     * @param {Boolean} prev Defines if the "previous" arrow must be disabled or not.
     * @param {Boolean} next Defines if the "next" arrow must be disabled or not.
     */
    Carousel.prototype._disableArrows = function (prev, next) {
        this._$prevArrow.attr('aria-disabled', prev)[prev ? 'addClass' : 'removeClass']('ch-carousel-disabled');
        this._$nextArrow.attr('aria-disabled', next)[next ? 'addClass' : 'removeClass']('ch-carousel-disabled');
    };

    /**
     * Check for arrows behavior on first, last and middle pages, and update class name and WAI-ARIA values.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     */
    Carousel.prototype._updateArrows = function () {
        // Check arrows existency
        if (!this._arrowsCreated) {
            return;
        }
        // Case 1: Disable both arrows if there are ony one page
        if (this._pages === 1) {
            this._disableArrows(true, true);
        // Case 2: "Previous" arrow hidden on first page
        } else if (this._currentPage === 1) {
            this._disableArrows(true, false);
        // Case 3: "Next" arrow hidden on last page
        } else if (this._currentPage === this._pages) {
            this._disableArrows(false, true);
        // Case 4: Enable both arrows on Carousel's middle
        } else {
            this._disableArrows(false, false);
        }
    };

    /**
     * Moves the list corresponding to specified displacement.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     * @param {Number} displacement Distance to move the list.
     */
    Carousel.prototype._translate = (function () {
        // CSS property written as string to use on CSS movement
        var transform = '-' + ch.util.VENDOR_PREFIX + '-transform';

        // Use CSS transform to move
        if (ch.support.transition) {
            return function (displacement) {
                this._$list.css(transform, 'translateX(' + displacement + 'px)');
            };
        }

        // Use JS to move
        // Ask for fx INTO the method because the "fx" is an instance property
        return function (displacement) {
            this._$list[(this._options.fx) ? 'animate' : 'css']({'left': displacement});
        };
    }());

    /**
     * Updates the selected page on pagination.
     * @memberof! ch.Carousel.prototype
     * @private
     * @function
     * @param {Number} from Page previously selected. It will be unselected.
     * @param {Number} to Page to be selected.
     */
    Carousel.prototype._switchPagination = function (from, to) {
        // Avoid to change something that not exists
        if (!this._paginationCreated) { return; }
        // Get all thumbnails of pagination element
        var children = this._$pagination.children();
        // Unselect the thumbnail previously selected
        children.eq(from - 1).attr('aria-selected', false).removeClass('ch-carousel-selected');
        // Select the new thumbnail
        children.eq(to - 1).attr('aria-selected', true).addClass('ch-carousel-selected');
    };

    /**
     * Triggers all the necessary recalculations to be up-to-date.
     * @memberof! ch.Carousel.prototype
     * @function
     * @returns {carousel}
     */
    Carousel.prototype.refresh = function () {

        var that = this,
            maskWidth = ch.util.getOuterDimensions(this._$mask[0]).width;

        // Check for changes on the width of mask, for the elastic carousel
        // Update the width of the mask
        if (maskWidth !== this._maskWidth) {
            // Update the global reference to the with of the mask
            this._maskWidth = maskWidth;
            // Calculate items per page and calculate pages, only when the amount of items was changed
            this._updateLimitPerPage();
            // Update the margin between items and its size
            this._updateDistribution();

            /**
             * Event emitted when the component makes all the necessary recalculations to be up-to-date.
             * @event ch.Carousel#refresh
             * @example
             * // Subscribe to "refresh" event.
             * carousel.on('refresh', function () {
             *     alert('Carousel was refreshed.');
             * });
             */
            this.emit('refresh');
        }

        // Check for a change in the total amount of items
        // Update items collection
        if (this._$list.children().length !== this._$items.length) {
            // Update the entire reference to items
            this._$items = this._$list.children();
            // Calculates the total amount of pages and executes internal methods
            this._updatePages();
            // Go to the last page in case that the current page no longer exists
            if (this._currentPage > this._pages) {
                this._standbyFX(function () {
                    that.select(that._pages);
                });
            }

            /**
             * Event emitted when the component makes all the necessary recalculations to be up-to-date.
             * @event ch.Carousel#refresh
             * @ignore
             */
            this.emit('refresh');
        }

        return this;
    };

    /**
     * Moves the list to the specified page.
     * @memberof! ch.Carousel.prototype
     * @function
     * @param {Number} page Reference of page where the list has to move.
     * @returns {carousel}
     */
    Carousel.prototype.select = function (page) {
        // Getter
        if (page === undefined) {
            return this._currentPage;
        }

        // Avoid to move if it's disabled
        // Avoid to select the same page that is selected yet
        // Avoid to move beyond first and last pages
        if (!this._enabled || page === this._currentPage || page < 1 || page > this._pages) {
            return this;
        }

        // Perform these tasks in the following order:
        // Task 1: Move the list from 0 (zero), to page to move (page number beginning in zero)
        this._translate(-this._pageWidth * (page - 1));
        // Task 2: Update selected thumbnail on pagination
        this._switchPagination(this._currentPage, page);
        // Task 3: Update value of current page
        this._currentPage = page;
        // Task 4: Check for arrows behavior on first, last and middle pages
        this._updateArrows();
        // Task 5: Add items to the list, if it's necessary
        this._loadAsyncItems();

        /**
         * Event emitted when the component moves to another page.
         * @event ch.Carousel#select
         * @example
         * // Subscribe to "select" event.
         * carousel.on('select', function () {
         *     alert('Carousel was moved.');
         * });
         */
        this.emit('select');

        return this;
    };

    /**
     * Moves the list to the previous page.
     * @memberof! ch.Carousel.prototype
     * @function
     * @returns {carousel}
     */
    Carousel.prototype.prev = function () {

        this.select(this._currentPage - 1);

        /**
         * Event emitted when the component moves to the previous page.
         * @event ch.Carousel#prev
         * @example
         * carousel.on('prev', function () {
         *     alert('Carousel has moved to the previous page.');
         * });
         */
        this.emit('prev');

        return this;
    };

    /**
     * Moves the list to the next page.
     * @memberof! ch.Carousel.prototype
     * @function
     * @returns {carousel}
     */
    Carousel.prototype.next = function () {

        this.select(this._currentPage + 1);

        /**
         * Event emitted when the component moves to the next page.
         * @event ch.Carousel#next
         * @example
         * carousel.on('next', function () {
         *     alert('Carousel has moved to the next page.');
         * });
         */
        this.emit('next');

        return this;
    };

    /**
     * Enables a Carousel instance.
     * @memberof! ch.Carousel.prototype
     * @function
     * @returns {carousel}
     */
    Carousel.prototype.enable = function () {

        this._el.setAttribute('aria-disabled', false);

        this._disableArrows(false, false);

        parent.enable.call(this);

        return this;
    };

    /**
     * Disables a Carousel instance.
     * @memberof! ch.Carousel.prototype
     * @function
     * @returns {carousel}
     */
    Carousel.prototype.disable = function () {

        this._el.setAttribute('aria-disabled', true);

        this._disableArrows(true, true);

        parent.disable.call(this);

        return this;
    };

    /**
     * Destroys a Carousel instance.
     * @memberof! ch.Carousel.prototype
     * @function
     */
    Carousel.prototype.destroy = function () {

        this._el.parentNode.replaceChild(this._snippet, this._el);

        $(window.document).trigger(ch.onlayoutchange);

        parent.destroy.call(this);

        return;
    };

    ch.factory(Carousel);

}(this, this.ch.$, this.ch));

(function (window, $, ch) {
    'use strict';

    function normalizeOptions(options) {
        var num = window.parseInt(options, 10);

        if (!window.isNaN(num)) {
            options = {
                'max': num
            };
        }

        return options;
    }

    /**
     * Countdown counts the maximum of characters that user can enter in a form control. Countdown could limit the possibility to continue inserting charset.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Countdown.
     * @param {Object} [options] Options to customize an instance.
     * @param {Number} [options.max] Number of the maximum amount of characters user can input in form control. Default: 500.
     * @param {String} [options.plural] Message of remaining amount of characters, when it's different to 1. The variable that represents the number to be replaced, should be a hash. Default: "# characters left.".
     * @param {String} [options.singular] Message of remaining amount of characters, when it's only 1. The variable that represents the number to be replaced, should be a hash. Default: "# character left.".
     * @returns {countdown} Returns a new instance of Countdown.
     * @example
     * // Create a new Countdown.
     * var countdown = new ch.Countdown($el, [options]);
     * @example
     * // Create a new Countdown with jQuery or Zepto.
     * var countdown = $(selector).countdown();
     * @example
     * // Create a new Countdown with custom options.
     * var countdown = $(selector).countdown({
     *     'max': 250,
     *     'plural': 'Left: # characters.',
     *     'singular': 'Left: # character.'
     * });
     * @example
     * // Create a new Countdown using the shorthand way (max as parameter).
     * $(selector).countdown(500);
     */
    function Countdown($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        that._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Countdown is created.
             * @memberof! ch.Countdown.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Countdown#ready
         * @example
         * // Subscribe to "ready" event.
         * countdown.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit("ready"); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Countdown, ch.Component);

    /**
     * The name of the component.
     * @memberof! ch.Countdown.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var countdown = $(selector).data('countdown');
     */
    Countdown.prototype.name = 'countdown';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Countdown.prototype
     * @function
     */
    Countdown.prototype.constructor = Countdown;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Countdown.prototype._defaults = {
        'plural': '# characters left.',
        'singular': '# character left.',
        'max': 500
    };

    /**
     * Initialize a new instance of Countdown and merge custom options with defaults options.
     * @memberof! ch.Countdown.prototype
     * @function
     * @private
     * @returns {countdown}
     */
    Countdown.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,

            /**
             * Create the "id" attribute.
             * @type {String}
             * @private
             */
            messageID = 'ch-countdown-message-' + that.uid,

           /**
             * Singular or Plural message depending on amount of remaining characters.
             * @type {String}
             * @private
             */
            message;

        /**
         * The countdown trigger.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @example
         * // Gets the countdown trigger.
         * countdown.$trigger;
         */
        this.$trigger = this._$el.on('keyup.countdown keypress.countdown keydown.countdown paste.countdown cut.countdown input.countdown', function () { that._count(); });

        /**
         * Amount of free characters until full the field.
         * @type {Number}
         * @private
         */
        that._remaining = that._options.max - that._contentLength();

        // Update the message
        message = ((that._remaining === 1) ? that._options.singular : that._options.plural);

        /**
         * The countdown container.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        that.$container = $('<p class="ch-countdown ch-form-hint" id="' + messageID + '">' + message.replace('#', that._remaining) + '</p>').appendTo(that._$el.parent());

        this.on('disable', this._removeError);

        return this;
    };

    /**
     * Returns the length of value.
     * @function
     * @private
     * @returns {Number}
     */
    Countdown.prototype._contentLength = function () {
        return this._el.value.length;
    };

    /**
     * Process input of data on form control and updates remaining amount of characters or limits the content length. Also, change the visible message of remaining characters.
     * @function
     * @private
     * @returns {countdown}
     */
    Countdown.prototype._count = function () {

        if (!this._enabled) {
            return this;
        }

        var length = this._contentLength(),
            message;

        this._remaining = this._options.max - length;

        // Limit Count alert the user
        if (length <= this._options.max) {

            if (this._exceeded) {
                // Update exceeded flag
                this._exceeded = false;
                this._removeError();
            }

        } else if (length > this._options.max) {

            /**
             * Event emitted when the lenght of characters is exceeded.
             * @event ch.Countdown#exceed
             * @example
             * // Subscribe to "exceed" event.
             * countdown.on('exceed', function () {
             *     // Some code here!
             * });
             */
            this.emit('exceed');

            // Update exceeded flag
            this._exceeded = true;

            this.$trigger
                .addClass('ch-validation-error')
                .attr('aria-invalid', 'true');

            this.$container.addClass('ch-countdown-exceeded');
        }

        // Change visible message of remaining characters
        // Singular or Plural message depending on amount of remaining characters
        message = (this._remaining !== 1 ? this._options.plural : this._options.singular).replace(/\#/g, this._remaining);

        // Update DOM text
        this.$container.text(message);

        return this;

    };

     /**
     * Process input of data on form control and updates remaining amount of characters or limits the content length. Also, change the visible message of remaining characters.
     * @function
     * @private
     * @returns {countdown}
     */
    Countdown.prototype._removeError = function () {
        this.$trigger
            .removeClass('ch-validation-error')
            .attr('aria-invalid', 'false');

        this.$container.removeClass('ch-countdown-exceeded');

        return this;
    };

    /**
     * Destroys a Countdown instance.
     * @memberof! ch.Countdown.prototype
     * @function
     * @example
     * // Destroy a countdown
     * countdown.destroy();
     * // Empty the countdown reference
     * countdown = undefined;
     */
    Countdown.prototype.destroy = function () {

        this.$trigger.off('.countdown');

        this.$container.remove();

        $(window.document).trigger(ch.onlayoutchange);

        parent.destroy.call(this);

        return;
    };

    // Factorize
    ch.factory(Countdown, normalizeOptions);

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Datepicker lets you select dates.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Calendar
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Datepicker.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.format] Sets the date format. Default: "DD/MM/YYYY".
     * @param {String} [options.selected] Sets a date that should be selected by default. Default: "today".
     * @param {String} [options.from] Set a minimum selectable date. The format of the given date should be "YYYY/MM/DD".
     * @param {String} [options.to] Set a maximum selectable date. The format of the given date should be "YYYY/MM/DD".
     * @param {Array} [options.monthsNames] A collection of months names. Default: ["Enero", ... , "Diciembre"].
     * @param {Array} [options.weekdays] A collection of weekdays. Default: ["Dom", ... , "Sab"].
     * @param {Boolean} [conf.hiddenby] Determines how to hide the component. You must use: "button", "pointers", "pointerleave", "all" or "none". Default: "pointers".
     * @param {(jQuerySelector | ZeptoSelector)} [options.context] It's a reference to position and size of element that will be considered to carry out the position.
     * @param {String} [options.side] The side option where the target element will be positioned. You must use: "left", "right", "top", "bottom" or "center". Default: "bottom".
     * @param {String} [options.align] The align options where the target element will be positioned. You must use: "left", "right", "top", "bottom" or "center". Default: "center".
     * @param {Number} [options.offsetX] Distance to displace the target horizontally.
     * @param {Number} [options.offsetY] Distance to displace the target vertically.
     * @param {String} [options.position] The type of positioning used. You must use: "absolute" or "fixed". Default: "absolute".
     * @returns {datepicker} Returns a new instance of Datepicker.
     * @example
     * // Create a new Datepicker.
     * var datepicker = new ch.Datepicker($el, [options]);
     * @example
     * // Create a new Datepicker with jQuery or Zepto.
     * var datepicker = $(selector).datepicker();
     * @example
     * // Create a new Datepicker with custom options.
     * var datepicker = $(selector).datepicker({
     *     "format": "MM/DD/YYYY",
     *     "selected": "2011/12/25",
     *     "from": "2010/12/25",
     *     "to": "2012/12/25",
     *     "monthsNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
     *     "weekdays": ["Su", "Mo", "Tu", "We", "Thu", "Fr", "Sa"]
     * });
     */
    function Datepicker($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Datepicker is created.
             * @memberof! ch.Datepicker.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Datepicker#ready
         * @example
         * // Subscribe to "ready" event.
         * datepicker.on('ready', function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);
    }

    // Inheritance
    var parent = ch.util.inherits(Datepicker, ch.Component),
        // Creates methods enable and disable into the prototype.
        methods = ['enable', 'disable'],
        len = methods.length;

    function createMethods(method) {
        Datepicker.prototype[method] = function () {

            this._popover[method]();

            parent[method].call(this);

            return this;
        };
    }

    /**
     * The name of the component.
     * @memberof! ch.Datepicker.prototype
     * @type {String}
     * @example
     * // You can reach the associated instance.
     * var datepicker = $(selector).data('datepicker');
     */
    Datepicker.prototype.name = 'datepicker';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Datepicker.prototype
     * @function
     */
    Datepicker.prototype.constructor = Datepicker;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Datepicker.prototype._defaults = {
        'format': 'DD/MM/YYYY',
        'side': 'bottom',
        'align': 'center',
        'hiddenby': 'pointers'
    };

    /**
     * Initialize a new instance of Datepicker and merge custom options with defaults options.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @private
     * @returns {datepicker}
     */
    Datepicker.prototype._init = function ($el, options) {
        // Call to its parent init method
        parent._init.call(this, $el, options);

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        /**
         * The datepicker input field.
         * @type {HTMLElement}
         */
        this.field = this._el;

        /**
         * The datepicker trigger.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$trigger = $('<i role="button" class="ch-datepicker-trigger ch-icon-calendar"></i>').insertAfter(this.field);

        /**
         * Reference to the Calendar component instanced.
         * @type {ch.Calendar}
         * @private
         */
        this._calendar = $('<div>').calendar(options);

        /**
         * Reference to the Popover component instanced.
         * @type {ch.Popover}
         * @private
         */
        this._popover = this.$trigger.popover({
            '_className': 'ch-datepicker ch-cone',
            '_ariaRole': 'tooltip',
            'content': this._calendar.$container,
            'side': this._options.side,
            'align': this._options.align,
            'offsetX': 1,
            'offsetY': 10,
            'shownby': 'pointertap',
            'hiddenby': this._options.hiddenby
        });

        this._popover._$content.on(ch.onpointertap, function (event) {
            var el = event.target;

            // Day selection
            if (el.nodeName === 'TD' && el.className.indexOf('ch-calendar-disabled') === -1 && el.className.indexOf('ch-calendar-other') === -1) {
                that.pick(el.innerHTML);
            }

        });

        this.field.setAttribute('aria-describedby', 'ch-popover-' + this._popover.uid);

        // Change type of input to "text"
        this.field.type = 'text';

        // Change value of input if there are a selected date
        this.field.value = (this._options.selected) ? this._calendar.select() : this.field.value;

        // Hide popover
        this.on('disable', this.hide);

        return this;
    };

    /**
     * Shows the datepicker.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Shows a datepicker.
     * datepicker.show();
     */
    Datepicker.prototype.show = function () {

        if (!this._enabled) {
            return this;
        }

        this._popover.show();

        /**
         * Event emitted when a datepicker is shown.
         * @event ch.Datepicker#show
         * @example
         * // Subscribe to "show" event.
         * datepicker.on('show', function () {
         *     // Some code here!
         * });
         */
        this.emit('show');

        return this;
    };

    /**
     * Hides the datepicker.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Shows a datepicker.
     * datepicker.hide();
     */
    Datepicker.prototype.hide = function () {
        this._popover.hide();

        /**
         * Event emitted when a datepicker is hidden.
         * @event ch.Datepicker#hide
         * @example
         * // Subscribe to "hide" event.
         * datepicker.on('hide', function () {
         *     // Some code here!
         * });
         */
        this.emit('hide');

        return this;
    };

    /**
     * Selects a specific day into current month and year.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @private
     * @param {(String | Number)} day A given day to select.
     * @returns {datepicker}
     * @example
     * // Select a specific day.
     * datepicker.pick(28);
     */
    Datepicker.prototype.pick = function (day) {

        // Select the day and update input value with selected date
        this.field.value = [this._calendar._dates.current.year, this._calendar._dates.current.month, day].join('/');

        // Hide float
        this._popover.hide();

        // Select a date
        this.select(this.field.value);

        return this;
    };

    /**
     * Selects a specific date or returns the selected date.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @param {String} [date] A given date to select. The format of the given date should be "YYYY/MM/DD".
     * @returns {(datepicker | String)}
     * @example
     * // Returns the selected date.
     * datepicker.select();
     * @example
     * // Select a specific date.
     * datepicker.select('2014/05/28');
     */
    Datepicker.prototype.select = function (date) {

       // Setter
       // Select the day and update input value with selected date
        if (date) {
            this._calendar.select(date);
            this.field.value = this._calendar.select();

            /**
             * Event emitted when a date is selected.
             * @event ch.Datepicker#select
             * @example
             * // Subscribe to "select" event.
             * datepicker.on('select', function () {
             *     // Some code here!
             * });
             */
            this.emit('select');

            return this;
        }

        // Getter
        return this._calendar.select();
    };

    /**
     * Returns date of today
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {String} The date of today
     * @example
     * // Get the date of today.
     * var today = datepicker.getToday();
     */
    Datepicker.prototype.getToday = function () {
        return this._calendar.getToday();
    };

    /**
     * Moves to the next month.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Moves to the next month.
     * datepicker.nextMonth();
     */
    Datepicker.prototype.nextMonth = function () {
        this._calendar.nextMonth();

        /**
         * Event emitted when a next month is shown.
         * @event ch.Datepicker#nextmonth
         * @example
         * // Subscribe to "nextmonth" event.
         * datepicker.on('nextmonth', function () {
         *     // Some code here!
         * });
         */
        this.emit('nextmonth');

        return this;
    };

    /**
     * Move to the previous month.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Moves to the prev month.
     * datepicker.prevMonth();
     */
    Datepicker.prototype.prevMonth = function () {

        this._calendar.prevMonth();

        /**
         * Event emitted when a previous month is shown.
         * @event ch.Datepicker#prevmonth
         * @example
         * // Subscribe to "prevmonth" event.
         * datepicker.on('prevmonth', function () {
         *     // Some code here!
         * });
         */
        this.emit('prevmonth');

        return this;
    };

    /**
     * Move to the next year.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Moves to the next year.
     * datepicker.nextYear();
     */
    Datepicker.prototype.nextYear = function () {

        this._calendar.nextYear();

        /**
         * Event emitted when a next year is shown.
         * @event ch.Datepicker#nextyear
         * @example
         * // Subscribe to "nextyear" event.
         * datepicker.on('nextyear', function () {
         *     // Some code here!
         * });
         */
        this.emit('nextyear');

        return this;
    };

    /**
     * Move to the previous year.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Moves to the prev year.
     * datepicker.prevYear();
     */
    Datepicker.prototype.prevYear = function () {

        this._calendar.prevYear();

        /**
         * Event emitted when a previous year is shown.
         * @event ch.Datepicker#prevyear
         * @example
         * // Subscribe to "prevyear" event.
         * datepicker.on('prevyear', function () {
         *     // Some code here!
         * });
         */
        this.emit('prevyear');

        return this;
    };

    /**
     * Reset the Datepicker to date of today
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker}
     * @example
     * // Resset the datepicker
     * datepicker.reset();
     */
    Datepicker.prototype.reset = function () {

        // Delete input value
        this.field.value = '';
        this._calendar.reset();

        /**
         * Event emitter when the datepicker is reseted.
         * @event ch.Datepicker#reset
         * @example
         * // Subscribe to "reset" event.
         * datepicker.on('reset', function () {
         *     // Some code here!
         * });
         */
        this.emit('reset');

        return this;
    };

    /**
     * Set a minimum selectable date.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @param {String} date A given date to set as minimum selectable date. The format of the given date should be "YYYY/MM/DD".
     * @returns {datepicker}
     * @example
     * // Set a minimum selectable date.
     * datepicker.setFrom('2010/05/28');
     */
    Datepicker.prototype.setFrom = function (date) {
        this._calendar.setFrom(date);

        return this;
    };

    /**
     * Set a maximum selectable date.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @param {String} date A given date to set as maximum selectable date. The format of the given date should be "YYYY/MM/DD".
     * @returns {datepicker}
     * @example
     * // Set a maximum selectable date.
     * datepicker.setTo('2014/05/28');
     */
    Datepicker.prototype.setTo = function (date) {
        this._calendar.setTo(date);

        return this;
    };

    /**
     * Enables an instance of Datepicker.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker} Returns an instance of Datepicker.
     * @example
     * // Enabling an instance of Datepicker.
     * datepicker.enable();
     */

    /**
     * Disables an instance of Datepicker.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @returns {datepicker} Returns an instance of Datepicker.
     * @example
     * // Disabling an instance of Datepicker.
     * datepicker.disable();
     */
    while (len) {
        createMethods(methods[len -= 1]);
    }

    /**
     * Destroys a Datepicker instance.
     * @memberof! ch.Datepicker.prototype
     * @function
     * @example
     * // Destroying an instance of Datepicker.
     * datepicker.destroy();
     */
    Datepicker.prototype.destroy = function () {

        this.$trigger.remove();

        this._el.removeAttribute('aria-describedby');
        this._el.type = 'date';

        this._popover.destroy();

        parent.destroy.call(this);
    };

    // Factorize
    ch.factory(Datepicker);

}(this, this.ch.$, this.ch));
(function (window, $, ch) {
    'use strict';

    /**
     * Autocomplete Component shows a list of suggestions for a HTMLInputElement.
     * @memberof ch
     * @constructor
     * @augments ch.Component
     * @requires ch.Popover
     * @param {(jQuerySelector | ZeptoSelector)} $el A jQuery or Zepto Selector to create an instance of ch.Autocomplete.
     * @param {Object} [options] Options to customize an instance.
     * @param {String} [options.loadingClass] Default: "ch-autocomplete-loading".
     * @param {String} [options.highlightedClass] Default: "ch-autocomplete-highlighted".
     * @param {String} [options.itemClass] Default: "ch-autocomplete-item".
     * @param {String} [options.addClass] CSS class names that will be added to the container on the component initialization. Default: "ch-box-lite ch-autocomplete".
     * @param {Number} [options.keystrokesTime] Default: 150.
     * @param {Boolean} [options.html] Default: false.
     * @param {String} [options.side] The side option where the target element will be positioned. You must use: "left", "right", "top", "bottom" or "center". Default: "bottom".
     * @param {String} [options.align] The align options where the target element will be positioned. You must use: "left", "right", "top", "bottom" or "center". Default: "left".
     * @param {Number} [options.offsetX] The offsetX option specifies a distance to displace the target horitontally.
     * @param {Number} [options.offsetY] The offsetY option specifies a distance to displace the target vertically.
     * @param {String} [options.positioned] The positioned option specifies the type of positioning used. You must use: "absolute" or "fixed". Default: "absolute".
     * @returns {autocomplete}
     * @example
     * // Create a new AutoComplete.
     * var autocomplete = new AutoComplete($el, [options]);
     * @example
     * // Create a new AutoComplete with configuration.
     * var autocomplete = new AutoComplete($el, {
     *  'loadingClass': 'custom-loading',
     *  'highlightedClass': 'custom-highlighted',
     *  'itemClass': 'custom-item',
     *  'addClass': 'carousel-cities',
     *  'keystrokesTime': 600,
     *  'html': true,
     *  'side': 'center',
     *  'align': 'center',
     *  'offsetX': 0,
     *  'offsetY': 0,
     *  'positioned': 'fixed'
     * });
     */
    function Autocomplete($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        this._init($el, options);

        if (this.initialize !== undefined) {
            /**
             * If you define an initialize method, it will be executed when a new Autocomplete is created.
             * @memberof! ch.Autocomplete.prototype
             * @function
             */
            this.initialize();
        }

        /**
         * Event emitted when the component is ready to use.
         * @event ch.Autocomplete#ready
         * @example
         * // Subscribe to "ready" event.
         * autocomplete.on('ready',function () {
         *     // Some code here!
         * });
         */
        window.setTimeout(function () { that.emit('ready'); }, 50);

        return this;

    }

    // Inheritance
    var parent = ch.util.inherits(Autocomplete, ch.Component);

    /**
     * The name of the component.
     * @type {String}
     */
    Autocomplete.prototype.name = 'autocomplete';

    /**
     * Returns a reference to the constructor function.
     * @memberof! ch.Autocomplete.prototype
     * @function
     */
    Autocomplete.prototype.constructor = Autocomplete;

    /**
     * Configuration by default.
     * @type {Object}
     * @private
     */
    Autocomplete.prototype._defaults = {
        'loadingClass': 'ch-autocomplete-loading',
        'highlightedClass': 'ch-autocomplete-highlighted',
        'itemClass': 'ch-autocomplete-item',
        'addClass': 'ch-box-lite ch-autocomplete',
        'side': 'bottom',
        'align': 'left',
        'html': false,
        '_hiddenby': 'none',
        'keystrokesTime': 150,
        '_itemTemplate': '<li class="{{itemClass}}"{{suggestedData}}>{{term}}<i class="ch-icon-arrow-up" data-js="ch-autocomplete-complete-query"></i></li>'
    };

    /**
     * Initialize a new instance of Autocomplete and merge custom options with defaults options.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._init = function ($el, options) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            POINTERDOWN = 'mousedown' + '.' + this.name,
            MOUSEENTER = 'mouseover' + '.' + this.name,
            // there is no mouseenter to highlight the item, so it happens when the user do mousedown
            highlightEvent = (ch.support.touch) ? POINTERDOWN : MOUSEENTER;

        // Call to its parent init method
        parent._init.call(this, $el, options);

        // creates the basic item template for this instance
        this._options._itemTemplate = this._options._itemTemplate.replace('{{itemClass}}', this._options.itemClass);

        if (this._options.html) {
            // remove the suggested data space when html is configured
            this._options._itemTemplate = this._options._itemTemplate.replace('{{suggestedData}}', '');
        }

        /**
         * The autocomplete suggestion list.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @private
         */
        this._$suggestionsList = $('<ul class="ch-autocomplete-list"></ul>');

        // The component who shows and manage the suggestions.
        this._popover = $.popover({
            'reference': this._$el,
            'content': this._$suggestionsList,
            'side': this._options.side,
            'align': this._options.align,
            'addClass': this._options.addClass,
            'hiddenby': this._options._hiddenby,
            'width': this._el.getBoundingClientRect().width + 'px',
            'fx': this._options.fx
        });
        /**
         * The autocomplete container.
         * @type {(jQuerySelector | ZeptoSelector)}
         * @example
         * // Gets the autocomplete container to append or prepend content.
         * autocomplete.$container.append('&lt;button&gt;Hide Suggestions&lt;/button&gt;');
         */
        this.$container = this._popover.$container.attr('aria-hidden', 'true')
            .on(highlightEvent, function (event) {
                that._highlightSuggestion($(event.target));
            })
            .on(POINTERDOWN, function (event) {

                // completes the value, it is a shortcut to avoid write the complete word
                if (event.target.nodeName === 'I' && !that._options.html) {
                    ch.util.prevent(event);
                    that._el.value = that._suggestions[that._highlighted];
                    that.emit('type', that._el.value);
                    return;
                }

                if ((event.target.nodeName === 'LI' && event.target.className.indexOf(that._options.itemClass) !== -1) || (event.target.parentElement.nodeName === 'LI' && event.target.parentElement.className.indexOf(that._options.itemClass) !== -1)) {
                    that._selectSuggestion();
                }
            });

        /**
         * The autocomplete trigger.
         * @type {(jQuerySelector | ZeptoSelector)}
         */
        this.$trigger = this._$el
            .attr({
                'aria-autocomplete': 'list',
                'aria-haspopup': 'true',
                'aria-owns': this.$container[0].id,
                'autocomplete': 'off'
            })
            .on('focus.' + this.name, function () {
                that._turnOn();
            })
            .on('blur.' + this.name, function () {
                that._turnOff();
            });

        // The number of the selected item or null when no selected item is.
        this._highlighted = null;

        // Collection of suggestions to be shown.
        this._suggestions = [];

        // Used to show when the user cancel the suggestions
        this._originalQuery = this._currentQuery = this._el.value;

        if (this._configureShortcuts !== undefined) {
            this._configureShortcuts();
        }

        if (this._$el.is(':focus')) {
            this._turnOn();
        }

        return this;
    };

    /**
     * Turns on the ability off listen the keystrokes
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._turnOn = function () {

        if (!this._enabled) {
            return this;
        }

        var that = this;

        this._originalQuery = this._el.value;

        this.$trigger.on(ch.onkeyinput, function () {

            // .trim()
            that._currentQuery = that._el.value.replace(/^\s+|\s+$/g, '');

            if (that._currentQuery === '') {
                return that.hide();
            }

            // when the user writes
            window.clearTimeout(that._stopTyping);

            that._stopTyping = window.setTimeout(function () {
                that.$trigger.addClass(that._options.loadingClass);
                /**
                 * Event emitted when the user is typing.
                 * @event ch.Autocomplete#type
                 * @example
                 * // Subscribe to "type" event with ajax call
                 * autocomplete.on('type', function (userInput) {
                 *      $.ajax({
                 *          'url': '/countries?q=' + userInput,
                 *          'dataType': 'json',
                 *          'success': function (response) {
                 *              autocomplete.suggest(response);
                 *          }
                 *      });
                 * });
                 * @example
                 * // Subscribe to "type" event with jsonp
                 * autocomplete.on('type', function (userInput) {
                 *       $.ajax({
                 *           'url': '/countries?q='+ userInput +'&callback=parseResults',
                 *           'dataType': 'jsonp',
                 *           'cache': false,
                 *           'global': true,
                 *           'context': window,
                 *           'jsonp': 'parseResults',
                 *           'crossDomain': true
                 *       });
                 * });
                 */
                that.emit('type', that._currentQuery);
            }, that._options.keystrokesTime);

        });

        return this;

    };

    /**
     * Turns off the ability off listen the keystrokes
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._turnOff = function () {

        if (!this._enabled) {
            return this;
        }

        this.hide();

        this.$trigger.off(ch.onkeyinput);

        return this;
    };

    /**
     * It sets to the HTMLInputElement the selected query and it emits a 'select' event.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._selectSuggestion = function () {

        window.clearTimeout(this._stopTyping);

        if (this._highlighted === null) {
            return this;
        }

        if (!this._options.html) {
            this._el.value = this._suggestions[this._highlighted];
        }

        this._el.blur();

        /**
         * Event emitted when a suggestion is selected.
         * @event ch.Autocomplete#select
         * @example
         * // Subscribe to "select" event.
         * autocomplete.on('select', function () {
         *     // Some code here!
         * });
         */
        this.emit('select');

        return this;
    };

    /**
     * Selects the items
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._highlightSuggestion = function ($target) {
        var $suggestion = $target.attr('aria-posinset') ? $target : $target.parents('li[aria-posinset]');

        // TODO: Documentation - Number or null
        this._highlighted = ($suggestion[0] !== undefined) ? (parseInt($suggestion.attr('aria-posinset'), 10) - 1) : null;

        this._toogleHighlighted();

        return this;
    };

    /**
     * It highlights the item adding the "ch-autocomplete-highlighted" class name or the class name that you configured as "highlightedClass" option.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._toogleHighlighted = function () {

        var id = '#' + this.$container[0].id,
            // null is when is not a selected item but,
            // increments 1 _highlighted because aria-posinset starts in 1 instead 0 as the collection that stores the data
            current = (this._highlighted === null) ? null : (this._highlighted + 1);

        // background the highlighted item
        $(id + ' [aria-posinset].' + this._options.highlightedClass).removeClass(this._options.highlightedClass);
        // highlight the selected item
        $(id + ' [aria-posinset="' + current + '"]').addClass(this._options.highlightedClass);

        return this;
    };

    /**
     * Add suggestions to be shown.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @returns {autocomplete}
     * @example
     * // The suggest method needs an Array of strings to work with default configuration
     * autocomplete.suggest(['Aruba','Armenia','Argentina']);
     * @example
     * // To work with html configuration, it needs an Array of strings. Each string must to be as you wish you watch it
     * autocomplete.suggest([
     *  '<strong>Ar</strong>uba <i class="flag-aruba"></i>',
     *  '<strong>Ar</strong>menia <i class="flag-armenia"></i>',
     *  '<strong>Ar</strong>gentina <i class="flag-argentina"></i>'
     * ]);
     */
    Autocomplete.prototype.suggest = function (suggestions) {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this,
            items = [],
            matchedRegExp = new RegExp('(' + this._currentQuery.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1") + ')', 'ig'),
            totalItems = 0,
            $items,
            itemTemplate = this._options._itemTemplate,
            suggestedItem,
            term,
            suggestionsLength = suggestions.length,
            el;

        // hide the loading feedback
        this.$trigger.removeClass(that._options.loadingClass);

        // hides the suggestions list
        if (suggestionsLength === 0) {
            this._popover.hide();

            return this;
        }

        // shows the suggestions list when the is closed and the element is withs focus
        if (!this._popover.isShown() && window.document.activeElement === this._el) {
            this._popover.show();
        }

        // remove the class from the extra added items
        $('.' + this._options.highlightedClass, this.$container).removeClass(this._options.highlightedClass);

        // add each suggested item to the suggestion list
        for (suggestedItem = 0; suggestedItem < suggestionsLength; suggestedItem += 1) {
            // get the term to be replaced
            term = suggestions[suggestedItem];

            // for the html configured component doesn't highlight the term matched it must be done by the user
            if (!that._options.html) {
                term = term.replace(matchedRegExp, '<strong>$1</strong>');
                itemTemplate = this._options._itemTemplate.replace('{{suggestedData}}', ' data-suggested="' + suggestions[suggestedItem] + '"');
            }

            items.push(itemTemplate.replace('{{term}}', term));
        }

        this._$suggestionsList[0].innerHTML = items.join('');

        $items = $('.' + this._options.itemClass, this.$container);

        // with this we set the aria-setsize value that counts the total
        totalItems = $items.length;

        // Reset suggestions collection.
        this._suggestions.length = 0;

        for (suggestedItem = 0; suggestedItem < totalItems; suggestedItem += 1) {
            el = $items[suggestedItem];

            // add the data to the suggestions collection
            that._suggestions.push(el.getAttribute('data-suggested'));

            el.setAttribute('aria-posinset', that._suggestions.length);
            el.setAttribute('aria-setsize', totalItems);
        }

        this._highlighted = null;

        this._suggestionsQuantity = this._suggestions.length;

        return this;
    };

    /**
     * Hides component's container.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @returns {autocomplete}
     * @example
     * // Hides the autocomplete.
     * autocomplete.hide();
     */
    Autocomplete.prototype.hide = function () {

        if (!this._enabled) {
            return this;
        }

        this._popover.hide();

        /**
         * Event emitted when the Autocomplete container is hidden.
         * @event ch.Autocomplete#hide
         * @example
         * // Subscribe to "hide" event.
         * autocomplete.on('hide', function () {
         *  // Some code here!
         * });
         */
        this.emit('hide');

        return this;
    };

    /**
     * Returns a Boolean if the component's core behavior is shown. That means it will return 'true' if the component is on and it will return false otherwise.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @returns {Boolean}
     * @example
     * // Execute a function if the component is shown.
     * if (autocomplete.isShown()) {
     *     fn();
     * }
     */
    Autocomplete.prototype.isShown = function () {
        return this._popover.isShown();
    };

    Autocomplete.prototype.disable = function () {
        if (this.isShown()) {
            this.hide();
            this._el.blur();
        }

        parent.disable.call(this);

        return this;
    };

    /**
     * Destroys an Autocomplete instance.
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @example
     * // Destroying an instance of Autocomplete.
     * autocomplete.destroy();
     */
    Autocomplete.prototype.destroy = function () {

        this.$trigger
            .off('.' + this.name)
            .removeAttr('autocomplete aria-autocomplete aria-haspopup aria-owns');

        this._popover.destroy();

        parent.destroy.call(this);

        return;
    };

    ch.factory(Autocomplete);

}(this, this.ch.$, this.ch));

(function (Autocomplete, ch) {
    'use strict';
    /**
     * Congfigure shortcuts to navigate and set values, or cancel the typed text
     * @memberof! ch.Autocomplete.prototype
     * @function
     * @private
     * @returns {autocomplete}
     */
    Autocomplete.prototype._configureShortcuts = function () {

        /**
         * Reference to context of an instance.
         * @type {Object}
         * @private
         */
        var that = this;

        // Shortcuts
        ch.shortcuts.add(ch.onkeyenter, this.uid, function (event) {
            ch.util.prevent(event);
            that._selectSuggestion();
        });

        ch.shortcuts.add(ch.onkeyesc, this.uid, function () {
            that.hide();
            that._el.value = that._originalQuery;
        });

        ch.shortcuts.add(ch.onkeyuparrow, this.uid, function (event) {
            ch.util.prevent(event);

            var value;

            // change the selected value & stores the future HTMLInputElement value
            if (that._highlighted === null) {

                that._highlighted = that._suggestionsQuantity - 1;
                value = that._suggestions[that._highlighted];

            } else if (that._highlighted <= 0) {

                this._prevHighlighted = this._currentHighlighted = null;
                value = that._currentQuery;

            } else {

                that._highlighted -= 1;
                value = that._suggestions[that._highlighted];

            }

            that._toogleHighlighted();

            if (!that._options.html) {
                that._el.value = value;
            }

        });

        ch.shortcuts.add(ch.onkeydownarrow, this.uid, function () {
            var value;

            // change the selected value & stores the future HTMLInputElement value
            if (that._highlighted === null) {

                that._highlighted = 0;

                value = that._suggestions[that._highlighted];

            } else if (that._highlighted >= that._suggestionsQuantity - 1) {

                that._highlighted = null;
                value = that._currentQuery;

            } else {

                that._highlighted += 1;
                value = that._suggestions[that._highlighted];

            }

            that._toogleHighlighted();

            if (!that._options.html) {
                that._el.value = value;
            }

        });

        // Activate the shortcuts for this instance
        this._popover.on('show', function () { ch.shortcuts.on(that.uid); });

        // Deactivate the shortcuts for this instance
        this._popover.on('hide', function () { ch.shortcuts.off(that.uid); });

        this.on('destroy', function () {
            ch.shortcuts.remove(this.uid);
        });

        return this;
    };

}(this.ch.Autocomplete, this.ch));
/*!
 * MockJax - jQuery Plugin to Mock Ajax requests
 *
 * Version:  1.6.2
 * Released:
 * Home:   https://github.com/jakerella/jquery-mockjax
 * Author:   Jonathan Sharp (http://jdsharp.com)
 * License:  MIT,GPL
 *
 * Copyright (c) 2014 appendTo, Jordan Kasper
 * NOTE: This repository was taken over by Jordan Kasper (@jakerella) October, 2014
 *
 * Dual licensed under the MIT or GPL licenses.
 * http://opensource.org/licenses/MIT OR http://www.gnu.org/licenses/gpl-2.0.html
 */
(function($) {
	var _ajax = $.ajax,
		mockHandlers = [],
		mockedAjaxCalls = [],
		unmockedAjaxCalls = [],
		CALLBACK_REGEX = /=\?(&|$)/,
		jsc = (new Date()).getTime();


	// Parse the given XML string.
	function parseXML(xml) {
		if ( window.DOMParser == undefined && window.ActiveXObject ) {
			DOMParser = function() { };
			DOMParser.prototype.parseFromString = function( xmlString ) {
				var doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML( xmlString );
				return doc;
			};
		}

		try {
			var xmlDoc = ( new DOMParser() ).parseFromString( xml, 'text/xml' );
			if ( $.isXMLDoc( xmlDoc ) ) {
				var err = $('parsererror', xmlDoc);
				if ( err.length == 1 ) {
					throw new Error('Error: ' + $(xmlDoc).text() );
				}
			} else {
				throw new Error('Unable to parse XML');
			}
			return xmlDoc;
		} catch( e ) {
			var msg = ( e.name == undefined ? e : e.name + ': ' + e.message );
			$(document).trigger('xmlParseError', [ msg ]);
			return undefined;
		}
	}

	// Check if the data field on the mock handler and the request match. This
	// can be used to restrict a mock handler to being used only when a certain
	// set of data is passed to it.
	function isMockDataEqual( mock, live ) {
		var identical = true;
		// Test for situations where the data is a querystring (not an object)
		if (typeof live === 'string') {
			// Querystring may be a regex
			return $.isFunction( mock.test ) ? mock.test(live) : mock == live;
		}
		$.each(mock, function(k) {
			if ( live[k] === undefined ) {
				identical = false;
				return identical;
			} else {
				if ( typeof live[k] === 'object' && live[k] !== null ) {
					if ( identical && $.isArray( live[k] ) ) {
						identical = $.isArray( mock[k] ) && live[k].length === mock[k].length;
					}
					identical = identical && isMockDataEqual(mock[k], live[k]);
				} else {
					if ( mock[k] && $.isFunction( mock[k].test ) ) {
						identical = identical && mock[k].test(live[k]);
					} else {
						identical = identical && ( mock[k] == live[k] );
					}
				}
			}
		});

		return identical;
	}

    // See if a mock handler property matches the default settings
    function isDefaultSetting(handler, property) {
        return handler[property] === $.mockjaxSettings[property];
    }

	// Check the given handler should mock the given request
	function getMockForRequest( handler, requestSettings ) {
		// If the mock was registered with a function, let the function decide if we
		// want to mock this request
		if ( $.isFunction(handler) ) {
			return handler( requestSettings );
		}

		// Inspect the URL of the request and check if the mock handler's url
		// matches the url for this ajax request
		if ( $.isFunction(handler.url.test) ) {
			// The user provided a regex for the url, test it
			if ( !handler.url.test( requestSettings.url ) ) {
				return null;
			}
		} else {
			// Look for a simple wildcard '*' or a direct URL match
			var star = handler.url.indexOf('*');
			if (handler.url !== requestSettings.url && star === -1 ||
					!new RegExp(handler.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, '.+')).test(requestSettings.url)) {
				return null;
			}
		}

		// Inspect the data submitted in the request (either POST body or GET query string)
		if ( handler.data ) {
			if ( ! requestSettings.data || !isMockDataEqual(handler.data, requestSettings.data) ) {
				// They're not identical, do not mock this request
				return null;
			}
		}
		// Inspect the request type
		if ( handler && handler.type &&
				handler.type.toLowerCase() != requestSettings.type.toLowerCase() ) {
			// The request type doesn't match (GET vs. POST)
			return null;
		}

		return handler;
	}

	function parseResponseTimeOpt(responseTime) {
		if ($.isArray(responseTime)) {
			var min = responseTime[0];
			var max = responseTime[1];
			return (typeof min === 'number' && typeof max === 'number') ? Math.floor(Math.random() * (max - min)) + min : null;
		} else {
			return (typeof responseTime === 'number') ? responseTime: null;
		}
	}

	// Process the xhr objects send operation
	function _xhrSend(mockHandler, requestSettings, origSettings) {

		// This is a substitute for < 1.4 which lacks $.proxy
		var process = (function(that) {
			return function() {
				return (function() {
					// The request has returned
					this.status     = mockHandler.status;
					this.statusText = mockHandler.statusText;
					this.readyState	= 1;

					var finishRequest = function () {
						this.readyState	= 4;

						var onReady;
						// Copy over our mock to our xhr object before passing control back to
						// jQuery's onreadystatechange callback
						if ( requestSettings.dataType == 'json' && ( typeof mockHandler.responseText == 'object' ) ) {
							this.responseText = JSON.stringify(mockHandler.responseText);
						} else if ( requestSettings.dataType == 'xml' ) {
							if ( typeof mockHandler.responseXML == 'string' ) {
								this.responseXML = parseXML(mockHandler.responseXML);
								//in jQuery 1.9.1+, responseXML is processed differently and relies on responseText
								this.responseText = mockHandler.responseXML;
							} else {
								this.responseXML = mockHandler.responseXML;
							}
						} else if (typeof mockHandler.responseText === 'object' && mockHandler.responseText !== null) {
							// since jQuery 1.9 responseText type has to match contentType
							mockHandler.contentType = 'application/json';
							this.responseText = JSON.stringify(mockHandler.responseText);
						} else {
							this.responseText = mockHandler.responseText;
						}
						if( typeof mockHandler.status == 'number' || typeof mockHandler.status == 'string' ) {
							this.status = mockHandler.status;
						}
						if( typeof mockHandler.statusText === "string") {
							this.statusText = mockHandler.statusText;
						}
						// jQuery 2.0 renamed onreadystatechange to onload
						onReady = this.onreadystatechange || this.onload;

						// jQuery < 1.4 doesn't have onreadystate change for xhr
						if ( $.isFunction( onReady ) ) {
							if( mockHandler.isTimeout) {
								this.status = -1;
							}
							onReady.call( this, mockHandler.isTimeout ? 'timeout' : undefined );
						} else if ( mockHandler.isTimeout ) {
							// Fix for 1.3.2 timeout to keep success from firing.
							this.status = -1;
						}
					};

					// We have an executable function, call it to give
					// the mock handler a chance to update it's data
					if ( $.isFunction(mockHandler.response) ) {
						// Wait for it to finish
						if ( mockHandler.response.length === 2 ) {
							mockHandler.response(origSettings, function () {
								finishRequest.call(that);
							});
							return;
						} else {
							mockHandler.response(origSettings);
						}
					}

					finishRequest.call(that);
				}).apply(that);
			};
		})(this);

		if ( mockHandler.proxy ) {
			// We're proxying this request and loading in an external file instead
			_ajax({
				global: false,
				url: mockHandler.proxy,
				type: mockHandler.proxyType,
				data: mockHandler.data,
				dataType: requestSettings.dataType === "script" ? "text/plain" : requestSettings.dataType,
				complete: function(xhr) {
					mockHandler.responseXML = xhr.responseXML;
					mockHandler.responseText = xhr.responseText;
                    // Don't override the handler status/statusText if it's specified by the config
                    if (isDefaultSetting(mockHandler, 'status')) {
					    mockHandler.status = xhr.status;
                    }
                    if (isDefaultSetting(mockHandler, 'statusText')) {
					    mockHandler.statusText = xhr.statusText;
                    }
					this.responseTimer = setTimeout(process, parseResponseTimeOpt(mockHandler.responseTime) || 0);
				}
			});
		} else {
			// type == 'POST' || 'GET' || 'DELETE'
			if ( requestSettings.async === false ) {
				// TODO: Blocking delay
				process();
			} else {
				this.responseTimer = setTimeout(process, parseResponseTimeOpt(mockHandler.responseTime) || 50);
			}
		}
	}

	// Construct a mocked XHR Object
	function xhr(mockHandler, requestSettings, origSettings, origHandler) {
		// Extend with our default mockjax settings
		mockHandler = $.extend(true, {}, $.mockjaxSettings, mockHandler);

		if (typeof mockHandler.headers === 'undefined') {
			mockHandler.headers = {};
		}
		if (typeof requestSettings.headers === 'undefined') {
			requestSettings.headers = {};
		}
		if ( mockHandler.contentType ) {
			mockHandler.headers['content-type'] = mockHandler.contentType;
		}

		return {
			status: mockHandler.status,
			statusText: mockHandler.statusText,
			readyState: 1,
			open: function() { },
			send: function() {
				origHandler.fired = true;
				_xhrSend.call(this, mockHandler, requestSettings, origSettings);
			},
			abort: function() {
				clearTimeout(this.responseTimer);
			},
			setRequestHeader: function(header, value) {
				requestSettings.headers[header] = value;
			},
			getResponseHeader: function(header) {
				// 'Last-modified', 'Etag', 'content-type' are all checked by jQuery
				if ( mockHandler.headers && mockHandler.headers[header] ) {
					// Return arbitrary headers
					return mockHandler.headers[header];
				} else if ( header.toLowerCase() == 'last-modified' ) {
					return mockHandler.lastModified || (new Date()).toString();
				} else if ( header.toLowerCase() == 'etag' ) {
					return mockHandler.etag || '';
				} else if ( header.toLowerCase() == 'content-type' ) {
					return mockHandler.contentType || 'text/plain';
				}
			},
			getAllResponseHeaders: function() {
				var headers = '';
				// since jQuery 1.9 responseText type has to match contentType
				if (mockHandler.contentType) {
					mockHandler.headers['Content-Type'] = mockHandler.contentType;
				}
				$.each(mockHandler.headers, function(k, v) {
					headers += k + ': ' + v + "\n";
				});
				return headers;
			}
		};
	}

	// Process a JSONP mock request.
	function processJsonpMock( requestSettings, mockHandler, origSettings ) {
		// Handle JSONP Parameter Callbacks, we need to replicate some of the jQuery core here
		// because there isn't an easy hook for the cross domain script tag of jsonp

		processJsonpUrl( requestSettings );

		requestSettings.dataType = "json";
		if(requestSettings.data && CALLBACK_REGEX.test(requestSettings.data) || CALLBACK_REGEX.test(requestSettings.url)) {
			createJsonpCallback(requestSettings, mockHandler, origSettings);

			// We need to make sure
			// that a JSONP style response is executed properly

			var rurl = /^(\w+:)?\/\/([^\/?#]+)/,
				parts = rurl.exec( requestSettings.url ),
				remote = parts && (parts[1] && parts[1] !== location.protocol || parts[2] !== location.host);

			requestSettings.dataType = "script";
			if(requestSettings.type.toUpperCase() === "GET" && remote ) {
				var newMockReturn = processJsonpRequest( requestSettings, mockHandler, origSettings );

				// Check if we are supposed to return a Deferred back to the mock call, or just
				// signal success
				if(newMockReturn) {
					return newMockReturn;
				} else {
					return true;
				}
			}
		}
		return null;
	}

	// Append the required callback parameter to the end of the request URL, for a JSONP request
	function processJsonpUrl( requestSettings ) {
		if ( requestSettings.type.toUpperCase() === "GET" ) {
			if ( !CALLBACK_REGEX.test( requestSettings.url ) ) {
				requestSettings.url += (/\?/.test( requestSettings.url ) ? "&" : "?") +
					(requestSettings.jsonp || "callback") + "=?";
			}
		} else if ( !requestSettings.data || !CALLBACK_REGEX.test(requestSettings.data) ) {
			requestSettings.data = (requestSettings.data ? requestSettings.data + "&" : "") + (requestSettings.jsonp || "callback") + "=?";
		}
	}

	// Process a JSONP request by evaluating the mocked response text
	function processJsonpRequest( requestSettings, mockHandler, origSettings ) {
		// Synthesize the mock request for adding a script tag
		var callbackContext = origSettings && origSettings.context || requestSettings,
			newMock = null;


		// If the response handler on the moock is a function, call it
		if ( mockHandler.response && $.isFunction(mockHandler.response) ) {
			mockHandler.response(origSettings);
		} else {

			// Evaluate the responseText javascript in a global context
			if( typeof mockHandler.responseText === 'object' ) {
				$.globalEval( '(' + JSON.stringify( mockHandler.responseText ) + ')');
			} else {
				$.globalEval( '(' + mockHandler.responseText + ')');
			}
		}

		// Successful response
		setTimeout(function() {
			jsonpSuccess( requestSettings, callbackContext, mockHandler );
			jsonpComplete( requestSettings, callbackContext, mockHandler );
		}, parseResponseTimeOpt(mockHandler.responseTime) || 0);

		// If we are running under jQuery 1.5+, return a deferred object
		if($.Deferred){
			newMock = new $.Deferred();
			if(typeof mockHandler.responseText == "object"){
				newMock.resolveWith( callbackContext, [mockHandler.responseText] );
			}
			else{
				newMock.resolveWith( callbackContext, [$.parseJSON( mockHandler.responseText )] );
			}
		}
		return newMock;
	}


	// Create the required JSONP callback function for the request
	function createJsonpCallback( requestSettings, mockHandler, origSettings ) {
		var callbackContext = origSettings && origSettings.context || requestSettings;
		var jsonp = requestSettings.jsonpCallback || ("jsonp" + jsc++);

		// Replace the =? sequence both in the query string and the data
		if ( requestSettings.data ) {
			requestSettings.data = (requestSettings.data + "").replace(CALLBACK_REGEX, "=" + jsonp + "$1");
		}

		requestSettings.url = requestSettings.url.replace(CALLBACK_REGEX, "=" + jsonp + "$1");


		// Handle JSONP-style loading
		window[ jsonp ] = window[ jsonp ] || function( tmp ) {
			data = tmp;
			jsonpSuccess( requestSettings, callbackContext, mockHandler );
			jsonpComplete( requestSettings, callbackContext, mockHandler );
			// Garbage collect
			window[ jsonp ] = undefined;

			try {
				delete window[ jsonp ];
			} catch(e) {}

		};
	}

	// The JSONP request was successful
	function jsonpSuccess(requestSettings, callbackContext, mockHandler) {
		// If a local callback was specified, fire it and pass it the data
		if ( requestSettings.success ) {
			requestSettings.success.call( callbackContext, mockHandler.responseText || "", status, {} );
		}

		// Fire the global callback
		if ( requestSettings.global ) {
			(requestSettings.context ? $(requestSettings.context) : $.event).trigger("ajaxSuccess", [{}, requestSettings]);
		}
	}

	// The JSONP request was completed
	function jsonpComplete(requestSettings, callbackContext) {
		// Process result
		if ( requestSettings.complete ) {
			requestSettings.complete.call( callbackContext, {} , status );
		}

		// The request was completed
		if ( requestSettings.global ) {
			(requestSettings.context ? $(requestSettings.context) : $.event).trigger("ajaxComplete", [{}, requestSettings]);
		}

		// Handle the global AJAX counter
		if ( requestSettings.global && ! --$.active ) {
			$.event.trigger( "ajaxStop" );
		}
	}


	// The core $.ajax replacement.
	function handleAjax( url, origSettings ) {
		var mockRequest, requestSettings, mockHandler, overrideCallback;

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			origSettings = url;
			url = undefined;
		} else {
			// work around to support 1.5 signature
			origSettings = origSettings || {};
			origSettings.url = url;
		}

		// Extend the original settings for the request
		requestSettings = $.extend(true, {}, $.ajaxSettings, origSettings);

		// Generic function to override callback methods for use with
		// callback options (onAfterSuccess, onAfterError, onAfterComplete)
		overrideCallback = function(action, mockHandler) {
			var origHandler = origSettings[action.toLowerCase()];
			return function() {
				if ( $.isFunction(origHandler) ) {
					origHandler.apply(this, [].slice.call(arguments));
				}
				mockHandler['onAfter' + action]();
			};
		};

		// Iterate over our mock handlers (in registration order) until we find
		// one that is willing to intercept the request
		for(var k = 0; k < mockHandlers.length; k++) {
			if ( !mockHandlers[k] ) {
				continue;
			}

			mockHandler = getMockForRequest( mockHandlers[k], requestSettings );
			if(!mockHandler) {
				// No valid mock found for this request
				continue;
			}

			mockedAjaxCalls.push(requestSettings);

			// If logging is enabled, log the mock to the console
			$.mockjaxSettings.log( mockHandler, requestSettings );


			if ( requestSettings.dataType && requestSettings.dataType.toUpperCase() === 'JSONP' ) {
				if ((mockRequest = processJsonpMock( requestSettings, mockHandler, origSettings ))) {
					// This mock will handle the JSONP request
					return mockRequest;
				}
			}


			// Removed to fix #54 - keep the mocking data object intact
			//mockHandler.data = requestSettings.data;

			mockHandler.cache = requestSettings.cache;
			mockHandler.timeout = requestSettings.timeout;
			mockHandler.global = requestSettings.global;

			// In the case of a timeout, we just need to ensure
			// an actual jQuery timeout (That is, our reponse won't)
			// return faster than the timeout setting.
			if ( mockHandler.isTimeout ) {
				if ( mockHandler.responseTime > 1 ) {
					origSettings.timeout = mockHandler.responseTime - 1;
				} else {
					mockHandler.responseTime = 2;
					origSettings.timeout = 1;
				}
				mockHandler.isTimeout = false;
			}

			// Set up onAfter[X] callback functions
			if ( $.isFunction( mockHandler.onAfterSuccess ) ) {
				origSettings.success = overrideCallback('Success', mockHandler);
			}
			if ( $.isFunction( mockHandler.onAfterError ) ) {
				origSettings.error = overrideCallback('Error', mockHandler);
			}
			if ( $.isFunction( mockHandler.onAfterComplete ) ) {
				origSettings.complete = overrideCallback('Complete', mockHandler);
			}

			copyUrlParameters(mockHandler, origSettings);

			(function(mockHandler, requestSettings, origSettings, origHandler) {

				mockRequest = _ajax.call($, $.extend(true, {}, origSettings, {
					// Mock the XHR object
					xhr: function() { return xhr( mockHandler, requestSettings, origSettings, origHandler ); }
				}));
			})(mockHandler, requestSettings, origSettings, mockHandlers[k]);

			return mockRequest;
		}

		// We don't have a mock request
		unmockedAjaxCalls.push(origSettings);
		if($.mockjaxSettings.throwUnmocked === true) {
			throw new Error('AJAX not mocked: ' + origSettings.url);
		}
		else { // trigger a normal request
			return _ajax.apply($, [origSettings]);
		}
	}

	/**
	* Copies URL parameter values if they were captured by a regular expression
	* @param {Object} mockHandler
	* @param {Object} origSettings
	*/
	function copyUrlParameters(mockHandler, origSettings) {
		//parameters aren't captured if the URL isn't a RegExp
		if (!(mockHandler.url instanceof RegExp)) {
			return;
		}
		//if no URL params were defined on the handler, don't attempt a capture
		if (!mockHandler.hasOwnProperty('urlParams')) {
			return;
		}
		var captures = mockHandler.url.exec(origSettings.url);
		//the whole RegExp match is always the first value in the capture results
		if (captures.length === 1) {
			return;
		}
		captures.shift();
		//use handler params as keys and capture resuts as values
		var i = 0,
		capturesLength = captures.length,
		paramsLength = mockHandler.urlParams.length,
		//in case the number of params specified is less than actual captures
		maxIterations = Math.min(capturesLength, paramsLength),
		paramValues = {};
		for (i; i < maxIterations; i++) {
			var key = mockHandler.urlParams[i];
			paramValues[key] = captures[i];
		}
		origSettings.urlParams = paramValues;
	}


	// Public

	$.extend({
		ajax: handleAjax
	});

	$.mockjaxSettings = {
		//url:        null,
		//type:       'GET',
		log:          function( mockHandler, requestSettings ) {
			if ( mockHandler.logging === false ||
				 ( typeof mockHandler.logging === 'undefined' && $.mockjaxSettings.logging === false ) ) {
				return;
			}
			if ( window.console && console.log ) {
				var message = 'MOCK ' + requestSettings.type.toUpperCase() + ': ' + requestSettings.url;
				var request = $.extend({}, requestSettings);

				if (typeof console.log === 'function') {
					console.log(message, request);
				} else {
					try {
						console.log( message + ' ' + JSON.stringify(request) );
					} catch (e) {
						console.log(message);
					}
				}
			}
		},
		logging:       true,
		status:        200,
		statusText:    "OK",
		responseTime:  500,
		isTimeout:     false,
		throwUnmocked: false,
		contentType:   'text/plain',
		response:      '',
		responseText:  '',
		responseXML:   '',
		proxy:         '',
		proxyType:     'GET',

		lastModified:  null,
		etag:          '',
		headers: {
			etag: 'IJF@H#@923uf8023hFO@I#H#',
			'content-type' : 'text/plain'
		}
	};

	$.mockjax = function(settings) {
		var i = mockHandlers.length;
		mockHandlers[i] = settings;
		return i;
	};
	$.mockjax.clear = function(i) {
		if ( arguments.length == 1 ) {
			mockHandlers[i] = null;
		} else {
			mockHandlers = [];
		}
		mockedAjaxCalls = [];
		unmockedAjaxCalls = [];
	};
	// support older, deprecated version
	$.mockjaxClear = function(i) {
		window.console && window.console.warn && window.console.warn( 'DEPRECATED: The $.mockjaxClear() method has been deprecated in 1.6.0. Please use $.mockjax.clear() as the older function will be removed soon!' );
		$.mockjax.clear();
	};
	$.mockjax.handler = function(i) {
		if ( arguments.length == 1 ) {
			return mockHandlers[i];
		}
	};
	$.mockjax.mockedAjaxCalls = function() {
		return mockedAjaxCalls;
	};
	$.mockjax.unfiredHandlers = function() {
		var results = [];
		for (var i=0, len=mockHandlers.length; i<len; i++) {
			var handler = mockHandlers[i];
            if (handler !== null && !handler.fired) {
				results.push(handler);
			}
		}
		return results;
	};
	$.mockjax.unmockedAjaxCalls = function() {
		return unmockedAjaxCalls;
	};
})(jQuery);

$.mockjax({
    url: "/campaigns",
    proxy: "mocks/responses/campaigns-get.json",
    type: 'GET'

});
$.mockjax({
    url: "/campaigns",
    proxy: "mocks/responses/campaigns-get.json",
    type: 'POST'
});

this["__templates"] = this["__templates"] || {};
this["__templates"]["campaignModify"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<td>\n    <input id=\"name\" class=\"readonly-element\" type=\"text\" name=\"name\" value=\""
    + alias3(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td>\n    <input id=\"dailyBudget\" class=\"readonly-element\" type=\"text\" name=\"dailyBudget\" value=\""
    + alias3(((helper = (helper = helpers.dailyBudget || (depth0 != null ? depth0.dailyBudget : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"dailyBudget","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.startingDate || (depth0 != null ? depth0.startingDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"startingDate","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    <input id=\"endingDate\" class=\"readonly-element\" type=\"text\" name=\"endingDate\" value=\""
    + alias3(((helper = (helper = helpers.endingDate || (depth0 != null ? depth0.endingDate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"endingDate","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.cpcProm || (depth0 != null ? depth0.cpcProm : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"cpcProm","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.clics || (depth0 != null ? depth0.clics : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"clics","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.prints || (depth0 != null ? depth0.prints : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"prints","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.ctr || (depth0 != null ? depth0.ctr : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"ctr","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    "
    + alias3(((helper = (helper = helpers.budget || (depth0 != null ? depth0.budget : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"budget","hash":{},"data":data}) : helper)))
    + "\n</td>\n<td>\n    <input id=\"estate\" class=\"readonly-element\" type=\"text\" name=\"estate\" value=\""
    + alias3(((helper = (helper = helpers.estate || (depth0 != null ? depth0.estate : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"estate","hash":{},"data":data}) : helper)))
    + "\" readonly=\"readonly\">\n</td>\n<td class=\"modify\">\n    <input type=\"button\" value=\"Modificar\" class=\"ch-btn ch-btn-small\"  data-js=\"modifyBtn\">\n</td>\n<td class=\"save\">\n    <input type=\"button\" value=\"Guardar\" class=\"ch-btn ch-btn-small\"  data-js=\"saveBtn\">\n</td>\n<td class=\"delete\">\n    <div class=\"icon\" role=\"button\" data-js=\"deleteBtn\">\n      <div class=\"lid\"></div>\n      <div class=\"lidcap\"></div>\n      <div class=\"bin\"></div>\n    </div>\n</td>\n";
},"useData":true});
this["__templates"]["tableCampaign"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<caption>Administrador de Campañas</caption>\n<thead>\n    <tr>\n        <th class=\"medium2-col\">\n            Name\n        </th>\n        <th class=\"medium-col\">\n            Daily budget\n        </th>\n        <th class=\"medium-col\">\n            Starting Date\n        </th>\n        <th class=\"medium-col\">\n            Ending date\n        </th>\n        <th class=\"small-col\">\n            CPC\n        </th>\n        <th class=\"small-col\">\n            Clics\n        </th>\n        <th class=\"small-col\">\n            Prints\n        </th>\n        <th class=\"small-col\">\n            CTR\n        </th>\n        <th class=\"small-col\">\n            Budget\n        </th>\n        <th class=\"medium-col\">\n            State\n        </th>\n        <th class=\"medium-col\">\n            Acción\n        </th>\n        <th class=\"small-col\">\n            Delete\n        </th>\n    </tr>\n</thead>\n<tbody></tbody>\n<tfoot>\n    <tr>\n        <td colspan=\"12\">\n            <input id=\"newAddRow\" type=\"button\" value=\"Agregar\" class=\"ch-btn ch-btn-small\" data-js=\"addBtn\">\n        </td>\n    </tr>\n</tfoot>\n";
},"useData":true});
var Advertising = {
    Models: {},
    Collections: {},
    Views: {},
    Utils: {},
    Cache: {}
};

Advertising.Views.Campaign = Backbone.View.extend({

    tagName: 'table',

    className: 'campaigns ch-datagrid',

    template: __templates.tableCampaign,

    events: {
        'click [data-js="addBtn"]': 'addCampaign'
    },

    initialize: function () {
        var that = this;

        this.collection.on('fetched', function() {
            that.render();
        });
    },

    render: function () {

        var  that = this;

        this.$el.empty();

        this.$el.append(this.template());

        _.each(this.collection.models, function(model, i){

            var modifyCampaign = new Advertising.Views.ModifyCampaign({
                model: model,
                isEdit : false
            });

            that.$('tbody').append(modifyCampaign.el);

        });

    },

    addCampaign: function () {
        var newCampaign = new Advertising.Models.Campaign();
        var modifyCampaign = new Advertising.Views.ModifyCampaign({
            model: newCampaign,
            isAdding : true
        });
        this.collection.add(newCampaign);
        this.$('tbody').append(modifyCampaign.el);
    }

});

Advertising.Views.ModifyCampaign = Backbone.View.extend({

    tagName: 'tr',

    className: 'view-campaign',

    template: __templates.campaignModify,

    events: {
        'click [data-js="saveBtn"]': 'saveCampaign',
        'click [data-js="modifyBtn"]': 'modifyCampaign',
        'click [data-js="deleteBtn"]': 'deleteCampaign'
    },

    initialize: function (options) {
        this.isAdding = options.isAdding;
        this.render();
    },

    render: function () {

        this.$el.html(this.template(this.model.toJSON()));
        if (this.isAdding) {
            this.$el.addClass('modify-campaign ch-hide');
            this.$el.find('.readonly-element').attr('readonly', false);
            this.$el.fadeIn("slow");
        }
    },

    saveCampaign: function() {
        that = this;
        this.$el.hide();
        this.model.set({
            name: this.$('#name').val(),
            dailyBudget: this.$('#dailyBudget').val(),
            endingDate: this.$('#endingDate').val(),
            estate: this.$('#estate').val()
        });
        this.model.save();
        that.$el.find('input').removeClass('error-border');
        if (this.model.validationError) {
          this.$el.addClass('error-color');
          $.each(this.model.validationError, function(index, value) {
              var element = '#' + value;
              that.$el.find(element).addClass('error-border');
          });
      } else {
          this.$el.removeClass('error-color');
          this.$el.removeClass('modify-campaign');
          this.$el.find('.readonly-element').attr('readonly', true);
      }
        this.$el.fadeIn("slow");
    },

    modifyCampaign: function() {
        this.$el.hide();
        this.$el.addClass('modify-campaign');
        this.$el.find('.readonly-element').attr('readonly', false);
        this.trigger('onModify');
        this.$el.fadeIn("slow");
    },

    deleteCampaign: function() {
        that = this;
        this.$el.fadeOut();
        this.model.destroy({
            success: function(){
                that.$el.remove();
            },
            error: function(){
                that.$el.fadeIn();
            }
        });


    }
});

Advertising.Models.Campaign = Backbone.Model.extend({
    validate: function(attrs, options) {
        var errorFields = [];
        $.each(attrs, function(index, value) {
            if (value === ''){
                errorFields.push(index);
            }
        });
        if (errorFields.length > 0) {
            return errorFields;
        }
    },
    defaults:{
        'campaignId': null,
        'name': null,
        'dailyBudget': null,
        'startingDate': function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;

            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd;
            }
            if(mm<10){
                mm='0'+mm;
            }
            var formatToday = dd+'/'+mm+'/'+yyyy;

            return formatToday;
        },
        'endingDate': null,
        'cpcProm': 0,
        'clics': 0,
        'prints': 0,
        'ctr': "0.00%",
        'budget': 0,
        'estate': null
    }
});

Advertising.Collections.Campaigns = Backbone.Collection.extend({
    'url': '/campaigns',
    model: Advertising.Models.Campaign
});

var Router = Backbone.Router.extend({
    routes: {
        "": "index"
    },

    index: function() {

        Advertising.Cache.campaigns = new Advertising.Collections.Campaigns();

        Advertising.Cache.campaigns.fetch({
            'success': function(collection, response, options){
                collection.trigger('fetched');
            }
        });

        var campaignView = new Advertising.Views.Campaign({
            collection: Advertising.Cache.campaigns
        });

        $('#app').html(campaignView.el);

    }
});

$(function(){
    Advertising.router = new Router();
    Backbone.history.start({pushState: true});
});


