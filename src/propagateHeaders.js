function propagateHeaders(rows, options = {}) {
  const {
    headerColumnIndex = 0,
    valueColumnIndex = rows.length ? rows[0].length - 1 : 0,
    headerDetector = defaultHeaderDetector,
  } = options;

  const keyOrder = [];
  const state = new Map();
  const pending = new Map();
  const result = [];

  rows.forEach((row, rowIndex) => {
    // Ensure the row has space for existing prefix columns
    const outputRow = [
      ...Array(keyOrder.length).fill(''),
      ...row,
    ];
    result.push(outputRow);

    const cell = row[headerColumnIndex];
    const valueCell = row[valueColumnIndex];
    const headerInfo = headerDetector(cell, valueCell);

    if (headerInfo) {
      const { key, value } = headerInfo;
      let keyIndex = keyOrder.indexOf(key);

      if (keyIndex === -1) {
        keyOrder.push(key);
        keyIndex = keyOrder.length - 1;
        pending.set(key, new Set());
        // Insert the new column for all existing rows (including current)
        for (let i = 0; i < result.length; i += 1) {
          result[i].splice(keyIndex, 0, '');
        }
        // All previously processed rows are waiting for the first value of this key
        for (let i = 0; i < rowIndex; i += 1) {
          pending.get(key).add(i);
        }
      }

      // A change in a higher-level key invalidates dependent keys
      for (let j = keyIndex + 1; j < keyOrder.length; j += 1) {
        const dependentKey = keyOrder[j];
        state.delete(dependentKey);
        pending.get(dependentKey).add(rowIndex);
      }

      state.set(key, value);

      const pendingRows = pending.get(key);
      pendingRows.add(rowIndex);
      pendingRows.forEach((pendingRowIndex) => {
        result[pendingRowIndex][keyIndex] = value;
      });
      pendingRows.clear();
    }

    keyOrder.forEach((key, keyIndex) => {
      const value = state.get(key);
      if (value === undefined) {
        pending.get(key).add(rowIndex);
      } else {
        result[rowIndex][keyIndex] = value;
        const rowsWaiting = pending.get(key);
        if (rowsWaiting) {
          rowsWaiting.delete(rowIndex);
        }
      }
    });
  });

  return result;
}

function defaultHeaderDetector(cell, valueCell) {
  const normalizedCell = normalizeCell(cell);
  if (!normalizedCell) {
    return null;
  }

  const colonIndex = normalizedCell.indexOf(':');
  if (colonIndex === -1) {
    return null;
  }

  const hasValue = hasMeaningfulValue(valueCell);
  if (hasValue) {
    return null;
  }

  const key = normalizedCell.slice(0, colonIndex).trim();
  if (!key) {
    return null;
  }

  return { key, value: normalizedCell };
}

function normalizeCell(cell) {
  if (cell === null || cell === undefined) {
    return '';
  }

  if (typeof cell === 'string') {
    return cell;
  }

  if (typeof cell === 'number' || typeof cell === 'boolean') {
    return String(cell);
  }

  if (typeof cell === 'object' && typeof cell.toString === 'function') {
    const text = cell.toString();
    return typeof text === 'string' ? text : '';
  }

  return '';
}

function hasMeaningfulValue(value) {
  if (value === null || value === undefined) {
    return false;
  }

  if (typeof value === 'string') {
    return value.trim() !== '';
  }

  return true;
}

module.exports = { propagateHeaders, defaultHeaderDetector };
