<a name="module_Assertion"></a>
## Assertion
Assertion


* [Assertion](#module_Assertion)
  * [.typeIs](#module_Assertion.typeIs) ⇒ <code>any</code>
  * [.ok(e)](#module_Assertion.ok) ⇒ <code>any</code>
  * [.nothing(e)](#module_Assertion.nothing) ⇒ <code>any</code>
  * [.fail(e)](#module_Assertion.fail) ⇒ <code>any</code>
  * [.empty(obj)](#module_Assertion.empty) ⇒ <code>Array</code> &#124; <code>String</code>
  * [.notEmpty(obj)](#module_Assertion.notEmpty) ⇒ <code>Array</code> &#124; <code>String</code>
  * [.isA(o, c)](#module_Assertion.isA) ⇒ <code>any</code>
  * [.isString(s)](#module_Assertion.isString) ⇒ <code>String</code>
  * [.eq(a, b)](#module_Assertion.eq) ⇒ <code>any</code>
  * [.ne(a, b)](#module_Assertion.ne) ⇒ <code>any</code>
  * [.gt(a, b)](#module_Assertion.gt) ⇒ <code>Number</code>
  * [.ge(a, b)](#module_Assertion.ge) ⇒ <code>Number</code>
  * [.lt(a, b)](#module_Assertion.lt) ⇒ <code>Number</code>
  * [.le(a, b)](#module_Assertion.le) ⇒ <code>Number</code>
  * [.throws(f)](#module_Assertion.throws) ⇒ <code>any</code>

<a name="module_Assertion.typeIs"></a>
### Assertion.typeIs ⇒ <code>any</code>
Assertion fails if (typeof v !== t)

**Kind**: static property of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - v  

| Param | Type |
| --- | --- |
| v | <code>any</code> | 
| t | <code>any</code> | 

**Example**  
```js
t.typeIs([], Object);
```
<a name="module_Assertion.ok"></a>
### Assertion.ok(e) ⇒ <code>any</code>
Assertion fails if (!e)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - e  

| Param | Type |
| --- | --- |
| e | <code>any</code> | 

**Example**  
```js
t.ok(true);
```
<a name="module_Assertion.nothing"></a>
### Assertion.nothing(e) ⇒ <code>any</code>
Assertion fails if (e)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - e  

| Param | Type |
| --- | --- |
| e | <code>any</code> | 

**Example**  
```js
t.nothing(false);
```
<a name="module_Assertion.fail"></a>
### Assertion.fail(e) ⇒ <code>any</code>
Assertion fails if (e)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - e  

| Param | Type |
| --- | --- |
| e | <code>any</code> | 

**Example**  
```js
t.fail(e);
```
<a name="module_Assertion.empty"></a>
### Assertion.empty(obj) ⇒ <code>Array</code> &#124; <code>String</code>
Assertion fails if (obj.length !== 0)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>Array</code> &#124; <code>String</code> - obj  

| Param | Type |
| --- | --- |
| obj | <code>Array</code> &#124; <code>String</code> | 

**Example**  
```js
t.empty([]);
```
<a name="module_Assertion.notEmpty"></a>
### Assertion.notEmpty(obj) ⇒ <code>Array</code> &#124; <code>String</code>
Assertion fails if (obj.length === 0)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>Array</code> &#124; <code>String</code> - obj  

| Param | Type |
| --- | --- |
| obj | <code>Array</code> &#124; <code>String</code> | 

**Example**  
```js
t.notEmpty([]);
```
<a name="module_Assertion.isA"></a>
### Assertion.isA(o, c) ⇒ <code>any</code>
Assertion fails if (!(o instanceof c))

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - o  

| Param | Type |
| --- | --- |
| o | <code>any</code> | 
| c | <code>any</code> | 

**Example**  
```js
t.isA([], Array);
```
<a name="module_Assertion.isString"></a>
### Assertion.isString(s) ⇒ <code>String</code>
Assertion fails if (typeof s !== 'string')

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>String</code> - s  

| Param | Type |
| --- | --- |
| s | <code>String</code> | 

**Example**  
```js
t.isString('t.isString');
```
<a name="module_Assertion.eq"></a>
### Assertion.eq(a, b) ⇒ <code>any</code>
Assertion fails if (a !== b)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - a  

| Param | Type |
| --- | --- |
| a | <code>any</code> | 
| b | <code>any</code> | 

**Example**  
```js
t.eq(false, false);
```
<a name="module_Assertion.ne"></a>
### Assertion.ne(a, b) ⇒ <code>any</code>
Assertion fails if (a === b)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - a  

| Param | Type |
| --- | --- |
| a | <code>any</code> | 
| b | <code>any</code> | 

**Example**  
```js
t.ne(0, 1);
```
<a name="module_Assertion.gt"></a>
### Assertion.gt(a, b) ⇒ <code>Number</code>
Assertion fails if (a <= b)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>Number</code> - a  

| Param | Type |
| --- | --- |
| a | <code>Number</code> | 
| b | <code>Number</code> | 

**Example**  
```js
t.gt(1, 0);
```
<a name="module_Assertion.ge"></a>
### Assertion.ge(a, b) ⇒ <code>Number</code>
Assertion fails if (a < b)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>Number</code> - a  

| Param | Type |
| --- | --- |
| a | <code>Number</code> | 
| b | <code>Number</code> | 

**Example**  
```js
t.ge(1, 1);
```
<a name="module_Assertion.lt"></a>
### Assertion.lt(a, b) ⇒ <code>Number</code>
Assertion fails if (a >= b)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>Number</code> - a  

| Param | Type |
| --- | --- |
| a | <code>Number</code> | 
| b | <code>Number</code> | 

**Example**  
```js
t.lt(1, 2);
```
<a name="module_Assertion.le"></a>
### Assertion.le(a, b) ⇒ <code>Number</code>
Assertion fails if (a > b)

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>Number</code> - a  

| Param | Type |
| --- | --- |
| a | <code>Number</code> | 
| b | <code>Number</code> | 

**Example**  
```js
t.le(1, 1);
```
<a name="module_Assertion.throws"></a>
### Assertion.throws(f) ⇒ <code>any</code>
Assertion fails if nothing thrown from f()

**Kind**: static method of <code>[Assertion](#module_Assertion)</code>  
**Returns**: <code>any</code> - sth. f() returns  

| Param | Type |
| --- | --- |
| f | <code>function</code> | 

**Example**  
```js
t.throws(() => t.lt(2, 1), Object), f() must contains at most 1 assertion will throw exceptions.
```
