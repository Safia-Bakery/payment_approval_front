import Container from "src/components/Container";
import { numberWithCommas } from "src/utils/helpers";

const column = ["#", "name", "department", "Item Name", "price", "status", "action"];

const ActiveOrders = () => {
  return (
    <Container>
      <h1>Active Orders</h1>
      <div className="content table-responsive table-full-width">
        <table className="table table-hover table-striped">
          <thead>
            {column.map(name => (
              <th className="text-capitalize" key={name}>
                {name}
              </th>
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
                  Accept
                </button>
                <button type="button" className="btn btn-danger">
                  Deny
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
                  Accept
                </button>
                <button type="button" className="btn btn-danger">
                  Deny
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ActiveOrders;
