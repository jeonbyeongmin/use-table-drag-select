import { render, renderHook, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { useTableDragSelect } from '..';

const initialValue = [
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false],
];

describe('useTableDragSelect', () => {
  it('useTableDragSelect 타입 테스트', () => {
    const { result } = renderHook(() => useTableDragSelect());

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current[0]).toBeInstanceOf(Object);
    expect(result.current[1]).toBeInstanceOf(Array);
  });

  it('useTableDragSelect 초기값 테스트', () => {
    const { result } = renderHook(() => useTableDragSelect(initialValue));

    expect(result.current[1]).toEqual(initialValue);
  });

  it('intialValue가 없다면 tbody을 기준으로 value를 초기화해야 한다.', async () => {
    let value: boolean[][] = [];

    const TestComponent = () => {
      const [tableRef, tableValue] = useTableDragSelect();
      return (
        <div>
          <table ref={tableRef}>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th></th>
                <td>1</td>
                <td>2</td>
              </tr>
              <tr>
                <th></th>
                <td>1</td>
                <td>2</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <td>1</td>
                <td>2</td>
              </tr>
            </tfoot>
          </table>

          <button
            onClick={() => {
              value = tableValue;
            }}
          >
            value 저장
          </button>
        </div>
      );
    };

    render(<TestComponent />);

    await userEvent.click(await screen.findByRole('button', { name: 'value 저장' }));

    expect(value).toEqual([
      [false, false],
      [false, false],
    ]);
  });

  it('initialValue가 있다면 initialValue를 기준으로 value를 초기화해야 한다.', async () => {
    const TestComponent = () => {
      const [tableRef, tableValue] = useTableDragSelect(initialValue);
      return (
        <div>
          <table ref={tableRef}>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableValue.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((col, colIndex) => (
                    <td key={colIndex}>{col ? 'true' : 'false'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <td>1</td>
                <td>2</td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    };

    const rendered = render(<TestComponent />);

    expect(rendered.container.querySelectorAll('tbody > tr').length).toBe(initialValue.length);

    expect(rendered.container.querySelectorAll('tbody > tr > td').length).toBe(
      initialValue.length * initialValue[0].length
    );

    expect(
      Array.from(rendered.container.querySelectorAll('tbody > tr')).map(d =>
        Array.from(d.querySelectorAll('td')).map(d => d.innerHTML)
      )
    ).toEqual([
      ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
      ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
      ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
      ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
      ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
      ['false', 'false', 'false', 'false', 'false', 'false', 'false'],
    ]);
  });
});
