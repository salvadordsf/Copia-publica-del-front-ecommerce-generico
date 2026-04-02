interface IUiTableCell {
  type: "header" | "body";
  text: string;
  className?: string;
}

export interface IUiTableBodyRow {
  rowCells: (Omit<IUiTableCell, "type"> & { type: "body" })[];
  onClickAction: () => void;
  className?: string;
}

export interface IUiTable {
  rows: {
    headerRow: (Omit<IUiTableCell, "type"> & { type: "header" })[];
    bodyRows: (IUiTableBodyRow | { className: string })[];
  }
  caption?: string;
  className?: string;
}