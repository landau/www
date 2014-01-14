{{{
	"title"	: "is.js - not an assertion library",
	"tags"	 : ["opensource", "javascript"],
	"category" : "predicate",
	"date"	 : "12-15-2013"
}}}

I spent a little time lately creating a predicate library for javascript. As a programmer, I'm frequently writing `if` statements. These statements often look like, `typeof val === 'function'` or `val > other`. Many times this type of code is verbose or error prone (plus you have to leave the main area of the keyboard). Some errors can be avoided by using a tool like [JSHint](www.jshint.com), but some projects (legacy or otherwise) can't make room for that. While I definitely encourage the use of JSHint, we can remove some of that linting burden off JSHint's shoulders by using functions to test the truthyness of values.

Enter `is.js`. `is.js` provides functions that allow you to compare values, test types of values, and create comparator functions using these functions (or your own).

### Need more convincing?

We developers are frequently writing `if` statements containing a chain of comparisons which can at times be confusing, contain typos, or whatever. `is.js` helps prevent many of these mistakes. You'll also find yourself writing less code!

Let's look at a few examples:

```
if (x = 'dogbird') // oops reassigned
if (x == 'dogbird') // should use triple equal

// explicit
// CAN'T be mistakenly reassigned
// always triple equal
if (is.equal(x, 'dogbird')) 
```  

```
if (typeof 'foo' === 'string')
if (typeof('foo') === 'string')
if (typeof('foo') === 'strnig')

// don't fight about how typeof should be written
// less code and repetition, no debugging typos!
if (is.str('foo'))
```

```
// handy type checkers!
if (is.date(new Date)))
if (is.NaN(1))
if (is.num(5))
if (is.error(new TypeError)))
...more
```

`is` also provides a comparator function that **should** be used in tandem with `is` predicates.

```
var a = [2, 5, 1]; // unsorted
a.sort(is.cmp(is.less)); // [1, 2, 5]
```
In the above excerpt, I pass the predicate `less` to `cmp` which returns a comparator function that will use `less` for comparing values as sort iterates over the array's values.

Does your comparator function need to access a property of an object? No problem. Pass the string name of your property to be accessed and let `is` handle the rest.

```
var a = [
  { name: 'albert'}
  { name: 'bob'}
  { name: 'cat'}
];
a.sort(is.cmp(is.greater, 'name')); // reverse the array
```

In the near future, you'll be able to chain your comparison and type checking similarly to how you would use `&&` and `||`. Imagine something like this:

```
if(is.all().string(a).function(b))
```

Pretty nice, eh?

### Why not...
As the creator of this lib it's my responsibility to inform you that `is` does have a flaw. Because everything is run through a function you're code will incur optimization penalties. If your is performance critical, I advise against using this library heavily. However, though I'm unsure, Google's [closure compiler](https://developers.google.com/closure/compiler/) may replace functions of `is` with the bare code under the hood. Don't quote me on that though :).

Hell, it's at least valuable for unit testing!

### Install today!

`is` can be downloaded through `npm`, `bower`, or downloaded [here](https://github.com/landau/is/dist/is.js).

> `npm install --save is-predicate`
> 
> `bower install --save is-predicate` 

### Want to Contribute? Have any Ideas?
I'm hoping this project can become another useful compartment on the JS Dev's tool-belt not unlike underscore. If you have any thoughts on how to improve the code base, tests, documentation, or whatever, don't hesitate to make a [pull request](https://github.com/landau/is) or [file an issue](https://github.com/landau/is/issues).


