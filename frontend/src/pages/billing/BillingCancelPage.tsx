import { Card, Result } from "antd";

export const BillingCancelPage = () => {
  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <Card>
        <Result
          status="warning"
          title="Checkout cancelled"
          subTitle="No worries — you can start the checkout again anytime."
          extra={<a href="/settings?tab=BILLING">Back to Billing</a>}
        />
      </Card>
    </div>
  );
};

export default BillingCancelPage;


