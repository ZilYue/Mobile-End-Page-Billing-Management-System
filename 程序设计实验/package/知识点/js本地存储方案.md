在 JavaScript 里，有几种本地存储方案可用于在浏览器端存储数据，这些方案各有特点，适用于不同的场景。下面为你详细介绍常见的本地存储方案。

### 1. `localStorage`
`localStorage` 是 HTML5 引入的一种简单的键值对存储机制，数据会一直存储在浏览器中，除非手动清除，否则不会过期。

#### 特点
- 存储容量通常为 5MB 左右。
- 数据会在不同的页面会话中保持，即使关闭浏览器再重新打开，数据依然存在。
- 只能存储字符串类型的数据，若要存储对象或数组，需先将其转换为 JSON 字符串。

#### 使用示例
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>localStorage 示例</title>
</head>

<body>
    <button onclick="saveData()">保存数据</button>
    <button onclick="getData()">获取数据</button>
    <button onclick="removeData()">删除数据</button>
    <script>
        function saveData() {
            const data = { name: 'John', age: 30 };
            const jsonData = JSON.stringify(data);
            localStorage.setItem('user', jsonData);
            alert('数据已保存');
        }

        function getData() {
            const jsonData = localStorage.getItem('user');
            if (jsonData) {
                const data = JSON.parse(jsonData);
                alert(`姓名: ${data.name}, 年龄: ${data.age}`);
            } else {
                alert('未找到数据');
            }
        }

        function removeData() {
            localStorage.removeItem('user');
            alert('数据已删除');
        }
    </script>
</body>

</html>
```
#### 代码解释
- `localStorage.setItem(key, value)`：用于存储数据，`key` 是数据的键，`value` 是要存储的数据。
- `localStorage.getItem(key)`：用于获取存储的数据，根据 `key` 来查找对应的值。
- `localStorage.removeItem(key)`：用于删除指定 `key` 的数据。
- `JSON.stringify()` 和 `JSON.parse()`：用于将对象或数组转换为 JSON 字符串以及将 JSON 字符串转换回对象或数组。

### 2. `sessionStorage`
`sessionStorage` 与 `localStorage` 类似，也是一种键值对存储机制，但数据仅在当前会话期间有效，当关闭浏览器窗口或标签页时，数据会被清除。

#### 特点
- 存储容量通常为 5MB 左右。
- 数据只在当前会话中可用，不同的页面会话之间数据不共享。
- 同样只能存储字符串类型的数据。

#### 使用示例
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>sessionStorage 示例</title>
</head>

<body>
    <button onclick="saveSessionData()">保存数据</button>
    <button onclick="getSessionData()">获取数据</button>
    <button onclick="removeSessionData()">删除数据</button>
    <script>
        function saveSessionData() {
            const data = { message: '这是会话数据' };
            const jsonData = JSON.stringify(data);
            sessionStorage.setItem('sessionData', jsonData);
            alert('会话数据已保存');
        }

        function getSessionData() {
            const jsonData = sessionStorage.getItem('sessionData');
            if (jsonData) {
                const data = JSON.parse(jsonData);
                alert(data.message);
            } else {
                alert('未找到会话数据');
            }
        }

        function removeSessionData() {
            sessionStorage.removeItem('sessionData');
            alert('会话数据已删除');
        }
    </script>
</body>

</html>
```
#### 代码解释
`sessionStorage` 的使用方法与 `localStorage` 相同，只是将 `localStorage` 替换为 `sessionStorage` 即可。

### 3. `IndexedDB`
`IndexedDB` 是一种基于数据库的本地存储方案，支持存储大量的数据，包括文件、二进制数据等，并且可以进行复杂的查询操作。

#### 特点
- 存储容量较大，通常没有严格的限制。
- 支持事务操作，确保数据的一致性。
- 可以存储各种类型的数据，包括对象、数组等。

#### 使用示例
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IndexedDB 示例</title>
</head>

<body>
    <button onclick="saveToIndexedDB()">保存数据到 IndexedDB</button>
    <button onclick="getFromIndexedDB()">从 IndexedDB 获取数据</button>
    <script>
        let db;
        const request = indexedDB.open('myDatabase', 1);

        request.onupgradeneeded = function (event) {
            db = event.target.result;
            const objectStore = db.createObjectStore('users', { keyPath: 'id' });
            objectStore.createIndex('name', 'name', { unique: false });
        };

        request.onsuccess = function (event) {
            db = event.target.result;
        };

        request.onerror = function (event) {
            console.error('打开数据库时出错:', event.target.error);
        };

        function saveToIndexedDB() {
            const transaction = db.transaction(['users'], 'readwrite');
            const objectStore = transaction.objectStore('users');
            const user = { id: 1, name: 'Jane', age: 25 };
            const addRequest = objectStore.add(user);

            addRequest.onsuccess = function (event) {
                alert('数据已保存到 IndexedDB');
            };

            addRequest.onerror = function (event) {
                console.error('保存数据时出错:', event.target.error);
            };
        }

        function getFromIndexedDB() {
            const transaction = db.transaction(['users'], 'readonly');
            const objectStore = transaction.objectStore('users');
            const getRequest = objectStore.get(1);

            getRequest.onsuccess = function (event) {
                const user = event.target.result;
                if (user) {
                    alert(`姓名: ${user.name}, 年龄: ${user.age}`);
                } else {
                    alert('未找到数据');
                }
            };

            getRequest.onerror = function (event) {
                console.error('获取数据时出错:', event.target.error);
            };
        }
    </script>
</body>

</html>
```
#### 代码解释
- `indexedDB.open()`：用于打开或创建一个数据库。
- `onupgradeneeded` 事件：在数据库版本更新或首次创建时触发，用于创建对象存储和索引。
- `transaction()`：用于创建一个事务，指定要操作的对象存储和事务模式（`readwrite` 或 `readonly`）。
- `objectStore()`：用于获取指定的对象存储。
- `add()` 和 `get()`：分别用于向对象存储中添加数据和从对象存储中获取数据。

### 总结
- 若要存储少量的简单数据，且需要在不同页面会话中保持数据，可以使用 `localStorage`。
- 若数据仅在当前会话中有效，可使用 `sessionStorage`。
- 若需要存储大量的数据，并且要进行复杂的查询操作，可选择 `IndexedDB`。 