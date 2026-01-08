import "./styles.scss";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Flex from "antd/es/flex";
import Segmented from "antd/es/segmented";
import InputNumber from "antd/es/input-number";
import Button from "antd/es/button";
import { useMemo, useState } from "react";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { BillingApi } from "@entities/billing/api/billing.api";

type BillingCycle = "monthly" | "annual";

const Billing = () => {
  const { messageApi } = useMessage();
  const [seats, setSeats] = useState<number>(5);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const [loading, setLoading] = useState(false);

  const unitPriceMonthly = seats <= 5 ? 25 : 20;

  const pricing = useMemo(() => {
    const monthlyTotal = seats * unitPriceMonthly;
    const annualTotal = monthlyTotal * 10; // 2 months free
    return { monthlyTotal, annualTotal };
  }, [seats, unitPriceMonthly]);

  const onSubscribe = async () => {
    setLoading(true);
    try {
      const tier = seats <= 5 ? "25" : "20";
      const priceKey = cycle === "annual" ? `standard-${tier}-yearly` : `standard-${tier}-monthly`;
      const session = await BillingApi.createCheckoutSession({
        priceKey,
        quantity: seats,
      });
      if (!session?.url) {
        messageApi.error("Stripe checkout URL is missing");
        return;
      }
      window.location.href = session.url;
    } catch (e) {
      messageApi.error(typeof e === "string" ? e : "Failed to create checkout session");
    } finally {
      setLoading(false);
    }
  };

  const isStandardEligible = seats >= 1 && seats <= 10;

  return (
    <div className="widget-billing">
      <div className="billing-grid">
        <Card title="Standard (Small Enterprise)">
          <Flex vertical gap={12}>
            <Typography.Text>
              Designed for small workshops & growing studios.
            </Typography.Text>

            <Flex align="center" gap={12} className="billing-controls">
              <Typography.Text strong>Seats</Typography.Text>
              <InputNumber
                min={1}
                max={10}
                value={seats}
                onChange={(v) => setSeats(typeof v === "number" ? v : 1)}
              />

              <Segmented
                value={cycle}
                onChange={(v) => setCycle(v as BillingCycle)}
                options={[
                  { label: "Monthly", value: "monthly" },
                  { label: "Annual (2 months free)", value: "annual" },
                ]}
              />
            </Flex>

            <Typography.Title level={3} style={{ margin: 0 }}>
              {cycle === "annual"
                ? `$${pricing.annualTotal}/year`
                : `$${pricing.monthlyTotal}/month`}
            </Typography.Title>
            <Typography.Text type="secondary">
              {cycle === "annual"
                ? `Billed annually. Equivalent ~$${((pricing.annualTotal / 12) || 0).toFixed(2)}/month.`
                : `$${unitPriceMonthly}/seat/month (${seats <= 5 ? "1–5 seats" : "6–10 seats"})`}
            </Typography.Text>

            <Button
              type="primary"
              onClick={onSubscribe}
              loading={loading}
              disabled={!isStandardEligible}
            >
              Subscribe
            </Button>

            <Typography.Text type="secondary" style={{ marginTop: 8 }}>
              Included: Orders & job management, production stages, Kanban + timeline, roles (Admin/User),
              basic reports, exports (CSV), secure cloud hosting.
            </Typography.Text>
          </Flex>
        </Card>

        <Card title="Enterprise — On Demand">
          <Flex vertical gap={12}>
            <Typography.Text>
              For multi-workshop manufacturers & high-volume brands.
            </Typography.Text>
            <Typography.Title level={3} style={{ margin: 0 }}>
              Custom pricing
            </Typography.Title>
            <Typography.Text type="secondary">
              Unlimited seats, multi-location, advanced planning, forecasting, QR/Barcode tracking, API & integrations, SLA.
            </Typography.Text>
            <Button disabled>Contact sales</Button>
          </Flex>
        </Card>
      </div>
    </div>
  );
};

export default Billing;


