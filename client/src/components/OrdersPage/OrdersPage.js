import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getOrdersForCurrentUser } from "../../api/order";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getOrdersForCurrentUser();
      setOrders(response.data.data);
    };

    fetchOrders();
  }, []);

  return (
    <React.Fragment>
      <h1> Orders: </h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Order Date</th>
            <th>Order Total</th>
            <th>Order Total Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.uuid}>
                <td> {order.uuid} </td>
                <td> {order.createdAt} </td>
                <td> {order.totalSum} </td>
                <td> {order.totalQty} </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default OrdersPage;
