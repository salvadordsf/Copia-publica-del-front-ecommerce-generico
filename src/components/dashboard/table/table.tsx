"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUiTable, IUiTableBodyRow } from "./table.types";

export default function UiTable({
  rows,
  caption = "",
  className = "",
}: IUiTable) {
  return (
    <div>
      <Table className={className}>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow className="text-lg font-bold">
            {rows.headerRow.map((cell, i) => (
              <TableHead
                key={`${cell.text}-${i}`}
                className={`px-10 ${cell.className} font-bold ${i === 0 && "pl-1"}`}
              >
                {cell.text ? cell.text : "-"}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.bodyRows.map((row, i) => (
            <TableRow
              key={`${(row as IUiTableBodyRow).rowCells[0].text}-${i}`}
              onClick={(row as IUiTableBodyRow).onClickAction}
              className={row.className && row.className}
            >
              {(row as IUiTableBodyRow).rowCells.map((cell, ii) => (
                <TableCell
                  key={`${i}-${ii}-${cell.text}`}
                  className={`
                    ${cell.className ? cell.className : "capitalize italic"} ${ii === 0 ? ""  : "text-center"}
                  `}
                >
                  {cell.text ? cell.text : "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
