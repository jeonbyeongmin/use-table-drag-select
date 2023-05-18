import { useTableDragSelect } from 'use-table-drag-select';
import './App.css';
import { Table } from './Table';

function App() {
  const [ref, value] = useTableDragSelect([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);

  console.log(value);

  return (
    <div>
      <h1>
        <a href="https://github.com/jeonbyeongmin/use-table-drag-select">useTableDragSelect </a>
      </h1>

      <Table ref={ref} value={value} />
      <div className="description">
        <p>1. Click and drag to select multiple cells.</p>
        <p>2. Click and drag again to deselect cells.</p>
      </div>
      <div className="view">
        <pre>
          <table cellSpacing={10}>
            {value.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td key={colIndex} align="center">
                    {JSON.stringify(col)}
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </pre>
      </div>
    </div>
  );
}

export default App;
