在 JavaScript 中获取表单的值是常见的操作，下面为你介绍几种不同场景下获取表单值的方法。

### 1. 获取单个输入框的值
当表单中只有一个输入框时，可以通过 `document.getElementById` 或 `document.querySelector` 方法获取输入框元素，然后使用 `value` 属性获取其值。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>获取单个输入框的值</title>
</head>

<body>
    <input type="text" id="username" placeholder="请输入用户名">
    <button onclick="getInputValue()">获取值</button>
    <script>
        function getInputValue() {
            const input = document.getElementById('username');
            const value = input.value;
            alert('输入的值是: ' + value);
        }
    </script>
</body>

</html>
```
在上述代码中，通过 `document.getElementById('username')` 获取输入框元素，再使用 `input.value` 获取输入框中的值。

### 2. 获取表单中多个输入框的值
对于包含多个输入框的表单，可以通过 `document.forms` 或 `document.getElementById` 获取表单元素，然后遍历表单中的输入元素来获取值。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>获取表单中多个输入框的值</title>
</head>

<body>
    <form id="myForm">
        <input type="text" name="username" placeholder="请输入用户名">
        <input type="password" name="password" placeholder="请输入密码">
        <button type="button" onclick="getFormValues()">获取值</button>
    </form>
    <script>
        function getFormValues() {
            const form = document.getElementById('myForm');
            const formData = {};
            for (let i = 0; i < form.elements.length; i++) {
                const element = form.elements[i];
                if (element.name) {
                    formData[element.name] = element.value;
                }
            }
            console.log(formData);
        }
    </script>
</body>

</html>
```
这里通过 `document.getElementById('myForm')` 获取表单元素，然后使用 `for` 循环遍历表单中的所有元素，将元素的 `name` 属性作为键，`value` 属性作为值存储在 `formData` 对象中。

### 3. 获取复选框和单选框的值
对于复选框和单选框，需要根据其 `checked` 属性来判断是否被选中，再获取其值。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>获取复选框和单选框的值</title>
</head>

<body>
    <form id="myForm">
        <input type="checkbox" name="hobbies" value="reading"> 阅读
        <input type="checkbox" name="hobbies" value="sports"> 运动
        <input type="radio" name="gender" value="male"> 男
        <input type="radio" name="gender" value="female"> 女
        <button type="button" onclick="getCheckboxAndRadioValues()">获取值</button>
    </form>
    <script>
        function getCheckboxAndRadioValues() {
            const form = document.getElementById('myForm');
            const hobbies = [];
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    hobbies.push(checkbox.value);
                }
            });
            const genders = form.querySelectorAll('input[type="radio"]');
            let gender = '';
            genders.forEach(radio => {
                if (radio.checked) {
                    gender = radio.value;
                }
            });
            console.log('爱好: ', hobbies);
            console.log('性别: ', gender);
        }
    </script>
</body>

</html>
```
对于复选框，使用 `querySelectorAll` 方法获取所有复选框元素，遍历这些元素，将 `checked` 属性为 `true` 的元素的 `value` 属性添加到 `hobbies` 数组中。对于单选框，同样使用 `querySelectorAll` 方法获取所有单选框元素，遍历找到 `checked` 属性为 `true` 的元素，将其 `value` 属性赋值给 `gender` 变量。

### 4. 获取下拉列表的值
对于下拉列表（`<select>` 元素），可以使用 `selectedIndex` 属性获取选中项的索引，再通过 `options` 属性获取选中项的值。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>获取下拉列表的值</title>
</head>

<body>
    <select id="country">
        <option value="china">中国</option>
        <option value="usa">美国</option>
        <option value="uk">英国</option>
    </select>
    <button onclick="getSelectValue()">获取值</button>
    <script>
        function getSelectValue() {
            const select = document.getElementById('country');
            const selectedIndex = select.selectedIndex;
            const value = select.options[selectedIndex].value;
            alert('选中的值是: ' + value);
        }
    </script>
</body>

</html>
```
通过 `document.getElementById('country')` 获取下拉列表元素，使用 `selectedIndex` 属性获取选中项的索引，再通过 `select.options[selectedIndex].value` 获取选中项的值。

通过以上方法，你可以在 JavaScript 中获取表单中各种输入元素的值。 