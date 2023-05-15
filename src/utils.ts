import { isMouseEvent, isTouchEvent } from './guards';

export function convertIndexToString(rowIndex: number, colIndex: number) {
  return `${rowIndex}-${colIndex}`;
}

export function convertStringToIndex(indexString: string) {
  if (!indexString.includes('-')) {
    throw new Error('indexString must be in the format of "rowIndex-colIndex"');
  }

  return indexString.split('-').map(Number);
}

export function getTableCellElement(e: Event): HTMLTableCellElement | null {
  let target;

  if (isTouchEvent(e) && e.touches) {
    const { clientX, clientY } = e.touches[0];
    target = document.elementFromPoint(clientX, clientY);
  } else if (isMouseEvent(e)) {
    target = e.target;
  }

  if (target instanceof HTMLTableCellElement && target.tagName === 'TD') {
    return target;
  }

  return null;
}

export function getTableCellIndex(e: Event) {
  let rowIndex: number | null = null;
  let colIndex: number | null = null;

  const target = getTableCellElement(e);

  if (!target) {
    return null;
  }

  if (target.parentNode instanceof HTMLTableRowElement) {
    const tr = target.parentNode;

    rowIndex = tr.sectionRowIndex;

    const tds = tr.querySelectorAll('td');

    for (let i = 0; i < tds.length; i++) {
      if (tds[i] === target) {
        colIndex = i;
        break;
      }
    }
  }

  if (rowIndex === null || colIndex === null) {
    return null;
  }

  return { rowIndex, colIndex };
}
