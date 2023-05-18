# use-table-drag-select

![2](https://github.com/jeonbyeongmin/use-table-drag-select/assets/28756358/e27b086a-cf40-40cc-81c0-caaff580ee97)

React hook to select table by drag
- Super simple
- useful in implementing a timetable

<br>

## Installation

```
npm i use-table-drag-select
```

```
yarn add use-table-drag-select
```

<br>

## Usage

All you have to do is add a **ref**

<br>

1. With initial table values
```tsx
export function Table() {
  const [ref, value] = useTableDragSelect([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);

  return (
    <table ref={ref} className="timetable">
      <thead>
        <tr>
          <th></th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        {value.map((row, rowIndex) => (
          <tr key={rowIndex}>
            <th>{rowIndex + 1}</th>
            {row.map((_, columnIndex) => (
              <td key={columnIndex} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
```
You can use a iterable `value` on `render()`

<br>

2. With complete table DOM
```tsx
export function Table() {
  const [ref, value] = useTableDragSelect();

  return (
    <table ref={ref} className="timetable">
      <thead>
        <tr>
          <th></th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        <tr>
          <th>2</th>
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
          <td />
        </tr>
        ...
      </tbody>
    </table>
  );
});
```
You should not put anything in `useTableDragSelect`

<br>

## Demo
A minimal demo page can be found in `demo` directory.

[Online demo](https://jeonbyeongmin.github.io/use-table-drag-select/) is also available.
