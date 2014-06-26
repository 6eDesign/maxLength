#maxLength.js

A tiny bit of javascript which will fix the maxlength property's inconsistencies across modern browsers.  This cross-browser maxLength script will also allow for working maxlength attributes in older browsers.   

[See a live Example on the maxLength.js github.io Page](http://6eDesign.github.io/maxLength/)
![alt tag](http://6edesign.github.io/maxLength/dist/img/demo/image1.png)

## Getting Started, Dependencies: 
````html
<!-- Include the JavaScripts -->
<script type="text/javascript" src="./dist/js/vendor.min.js"></script>
<script type="text/javascript" src="./dist/js/maxLength.min.js"></script>
<!-- Vendor.min.js simply includes jQuery if you aren't already using it -->
````

maxLength.js uses jQuery for a few simple things.  If you really don't want jQuery let me know on my github issues page and I will get rid of the few jQuery dependencies in this script.  Don't include vendor.min.js if you already have jQuery on your page.

## In your Markup (basic): 
````html
<label for="myTextarea3">
	My Basic Textarea
</label>
<textarea id='myTextarea3' cols="30" rows="10" maxlength='100'></textarea>
<span class="maxLength" data-textareaid="myTextarea3"></span>
````
To get started, all you need is a textarea with an ID attribute and an element with a class of 'maxLength' and data-textareaid attribute which specifies the corresponding textarea's ID. maxLength.js includes default settings that will work out of the box. 

## In your Markup (advanced):
````html
<label for="myTextarea3">
	My Fancy Textarea
</label>
<span 
	class="maxLength"
	data-textareaid="myTextarea3" 
	data-warnclass="warning" 
	data-warnthreshold="40"></span>
<textarea id='myTextarea3' cols="30" rows="10" maxlength='100'></textarea>
<span class='maxLength' data-textareaid='myTextarea3' data-string="#{current}/#{limit}"></span>
````

You can include as many counters for a given textarea as you would like and each can include its own isolated settings. You can also add a special warning class to the counter when the number of characters left reach your (or the default's) specified threshold.  

Finally, you can customize the counter's appearance and working via the data-string attribute.  With this property you can specify a simple string or a string of HTML code and include any of the following keys which will be constantly updated with live values from the textaea: "#{left}", "#{limit}", "#{current}". (Ex: data-string="#{current}/#{limit} characters used.")

## Options: 
Options can be chosen via data-attributes when using DOM declarations to include an apptPicker or by passing an {options} object to apptPicker(id).create({options}). When using data-attributes, simply prepend 'data-' to each option key in the DOM. 

Attribute | Description | Example | Default
--- | --- | --- | ---
'data-textareaid' | The ID of the textarea which will be limited and reported on. | null | "myTextareaID"
'data-string' | A simple string or chunk of HTML where you can include #{left}, #{limit}, and #{current} in order to properly format your counter's text. | "#{current}/#{limit}" | '#{left} of #{limit} characters remaining.'
'data-warnclass' | Include this parameter if you would like to add a special class to character counters when they reach a certain threshold of remaining characters.  The class added will be the string specified in this attribute. | 'mySpecialWarningClass' | false
'data-warnthreshold' | Specify how many characters you'd like to have remaining when the warning class is added. | "10" | "50"


### License
````js
The MIT License (MIT)

Copyright (c) 2013 Jonathan Greenemeier

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
````