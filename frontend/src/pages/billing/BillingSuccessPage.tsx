import { Card, Result } from "antd";

export const BillingSuccessPage = () => {
  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 16px" }}>
      <Card>
        <Result
          status="success"
          title="Subscription activated"
          subTitle="Thanks! Your subscription was created successfully."
          extra={<a href="/settings?tab=BILLING">Go to Billing</a>}
        />
      </Card>
    </div>
  );
};

export default BillingSuccessPage;


