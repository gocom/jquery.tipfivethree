jquery.tipFiveThree
=============

CSS3 powered jQuery tooltips plugin. This ain't stable yet. While this is a real plugin sitting on top of functional codebase, it was originally sparked from the idea and want to test [Bower](https://github.com/twitter/bower). It's quick old script of mine. It used to use normal JavaScript based animations, but to spice things up I changed them to just all CSS. Thus the name and slogan. And, yes they are buggy. Slowdowns, blocking and especially all sorts of text and shadow rendering issues. Totally wort it.

I wouldn't use this for anything production, not in the state it is now. Let's see how well I can get this thing polished up. Anyhow, let's get the standard install instructions thing over next.

Installing
-------------

Using [Bower](https://github.com/twitter/bower):

    $ bower install jquery.tipFiveThree

Yes, it's case-sensitive.

Basic usage
-------------

Importing sources the old way:

```html
<link rel="stylesheet" href="components/jquery.tipFiveThree/jquery.tipfivethree.css" />
<script src="components/jquery/jquery.min.js"></script>
<script src="components/jquery.tipFiveThree/jquery.tipfivethree.js"></script>
```

Initializing on-hover tooltips:

```js
$('[title]').tipFiveThree();
```

Changelog
-------------

### Version 0.3.0 - 2012/12/20

* Fixed: Centering and positioning calculations.
* Added: Automatic side, direction and position changing.

### Version 0.2.0 - 2012/12/20

* Fixed: Removes created data properties from documented correctly.
* Fixed: Prevent template tag injection through attributes.
* Fixed: Issue with text-rendering and cursor flicker on Safari.
* Added: Option to apply a custom class with ```class``` option.
* Added: Ability to target tooltips based on the parent's ID.
* Added: License headers to source files.
* Added: Some instructions to the readme.
* Changed: Uses as much ems units as possible instead of pixels.

### Version 0.1.0 - 2012/12/19

* Initial publicly published pre-beta tag. Still missing stuff like crazy.