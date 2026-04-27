import { FC, useMemo } from "react";
import { TableCellValue, TableColumn, TablePayload } from "../types";
import { useArtifactNumberFormat } from "../hooks/useArtifactNumberFormat";

interface ArtifactTableProps {
  title?: string | null;
  payload: TablePayload;
}

const inferAlign = (
  column: TableColumn,
  rows: Array<Record<string, TableCellValue>>,
): "left" | "right" | "center" => {
  if (column.align) return column.align;
  const allNumeric =
    rows.length > 0 &&
    rows.every((row) => {
      const cell = row[column.key];
      return cell === null || cell === undefined || typeof cell === "number";
    });
  return allNumeric ? "right" : "left";
};

const ArtifactTable: FC<ArtifactTableProps> = ({ title, payload }) => {
  const { columns = [], rows = [], footer } = payload;
  const { formatNumber, locale } = useArtifactNumberFormat();

  const aligns = useMemo(
    () => columns.map((col) => inferAlign(col, rows)),
    [columns, rows],
  );

  const renderCell = (value: TableCellValue): string => {
    if (value === null || value === undefined) return "—";
    if (typeof value === "number") return formatNumber(value);
    return value;
  };

  return (
    <div className="gf-table-card" lang={locale}>
      {title ? <div className="gf-table-card__head">{title}</div> : null}
      <table className="gf-table">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.key}
                className={
                  aligns[idx] === "right"
                    ? "is-right"
                    : aligns[idx] === "center"
                      ? "is-center"
                      : ""
                }
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {columns.map((col, colIdx) => (
                <td
                  key={col.key}
                  className={
                    aligns[colIdx] === "right"
                      ? "is-right"
                      : aligns[colIdx] === "center"
                        ? "is-center"
                        : ""
                  }
                >
                  {renderCell(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {footer ? (
          <tfoot>
            <tr>
              {columns.map((col, colIdx) => (
                <td
                  key={col.key}
                  className={
                    aligns[colIdx] === "right"
                      ? "is-right"
                      : aligns[colIdx] === "center"
                        ? "is-center"
                        : ""
                  }
                >
                  {renderCell(footer[col.key] ?? null)}
                </td>
              ))}
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
};

export default ArtifactTable;
