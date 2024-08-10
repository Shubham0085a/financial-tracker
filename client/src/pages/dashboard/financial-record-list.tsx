import { useCallback, useMemo, useState } from "react";
import { FinancialRecord } from "../../contexts/financial-record-context";
import { useTable, Column, CellProps } from "react-table";
import { useFinancialRecords } from "../../contexts/useFinancialRecords";

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (
    rowIndex: number,
    columnId: string,
    value: string | number
  ) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };
  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? "pointer" : "default" }}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          style={{ width: "100%" }}
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

  const updateCellRecord = useCallback(
    <T extends keyof FinancialRecord>(
      rowIndex: number,
      columnId: T,
      value: FinancialRecord[T]
    ) => {
      const id = records[rowIndex]?._id;
      updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
    },
    [records, updateRecord]
  );

  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={(rowIndex, columnId, value) =>
              updateCellRecord(
                rowIndex,
                columnId as keyof FinancialRecord,
                value
              )
            }
            editable={true}
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={(rowIndex, columnId, value) =>
              updateCellRecord(
                rowIndex,
                columnId as keyof FinancialRecord,
                value
              )
            }
            editable={true}
          />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={(rowIndex, columnId, value) =>
              updateCellRecord(
                rowIndex,
                columnId as keyof FinancialRecord,
                value
              )
            }
            editable={true}
          />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={(rowIndex, columnId, value) =>
              updateCellRecord(
                rowIndex,
                columnId as keyof FinancialRecord,
                value
              )
            }
            editable={true}
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={(rowIndex, columnId, value) =>
              updateCellRecord(
                rowIndex,
                columnId as keyof FinancialRecord,
                value
              )
            }
            editable={false}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="button"
          >
            Delete
          </button>
        ),
      },
    ],
    [updateCellRecord, deleteRecord]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((hg) => (
            <tr {...hg.getHeaderGroupProps()}>
              {hg.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};