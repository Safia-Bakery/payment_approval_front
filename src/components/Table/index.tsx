import { FC } from "react";
import { numberWithCommas } from "src/utils/helpers";

interface Props {
  column: string[];
}

const Table: FC<Props> = ({ column }) => {
  return (
    <div className="content table-responsive table-full-width">
      <table className="table table-hover table-striped">
        <thead>
          {column.map(name => (
            <th key={name}>{name}</th>
          ))}
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Marat</td>
            <td>fabrika</td>
            <td>Monitor</td>
            <td>{numberWithCommas(1500000)}</td>
            <td>accepted</td>
            <td className="d-flex gap-2">
              <button type="button" className="btn btn-success">
                Success
              </button>
              <button type="button" className="btn btn-danger">
                Danger
              </button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Makhmud</td>
            <td>fabrika</td>
            <td>Monitor</td>
            <td>{numberWithCommas(1500000)}</td>
            <td>accepted</td>
            <td className="d-flex gap-2">
              <button type="button" className="btn btn-success">
                Success
              </button>
              <button type="button" className="btn btn-danger">
                Danger
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
