import { CreateOrderPage } from "@pages/orders/CreateOrderPage.tsx";
import { OrdersPage } from "@pages/orders/OrdersPage.tsx";
import { OrderDetailsPage } from "@pages/orders/OrderDetailsPage.tsx";
import { Route, Routes } from "react-router";

const Orders = () => {
  return (
    <Routes>
      <Route index element={<OrdersPage />} />
      <Route path="/create" element={<CreateOrderPage />} />
      <Route path="/:id" element={<OrderDetailsPage />} />
    </Routes>
  );
};

export default Orders;
