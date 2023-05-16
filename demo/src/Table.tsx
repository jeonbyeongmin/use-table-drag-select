import { forwardRef } from 'react';

interface Props {
  value: boolean[][];
}

export const Table = forwardRef<HTMLTableElement, Props>(({ value }, ref) => {
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
              <td key={columnIndex} className={value[rowIndex][columnIndex] ? 'selected' : ''} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
