import { renderHook } from '@testing-library/react';
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
});
