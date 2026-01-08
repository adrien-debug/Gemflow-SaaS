import { useRef } from "react";
import Modal from "antd/es/modal";
import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { QRCodeSVG } from "qrcode.react";
import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import { brandingColorPalette } from "@shared/constants/branding";

interface OrderQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: number;
  orderName?: string;
}

const OrderQRCodeModal = ({ isOpen, onClose, orderId, orderName }: OrderQRCodeModalProps) => {
  const qrRef = useRef<HTMLDivElement>(null);
  
  const timeTrackerUrl = `${window.location.origin}/orders/${orderId}/time-tracker`;

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `order-${orderId}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>QR Code - Order #${orderId}</title>
          <style>
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
            }
            h2 { margin-bottom: 20px; }
            .qr-container { margin: 20px 0; }
            p { color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <h2>Order #${orderId}${orderName ? ` - ${orderName}` : ""}</h2>
          <div class="qr-container">${svgData}</div>
          <p>Scan to start time tracking</p>
          <script>window.onload = () => { window.print(); window.close(); }</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Modal
      title={`QR Code - Order #${orderId}`}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
    >
      <Flex vertical align="center" gap={24} style={{ padding: "20px 0" }}>
        <div ref={qrRef}>
          <QRCodeSVG
            value={timeTrackerUrl}
            size={200}
            level="H"
            includeMargin
            fgColor={brandingColorPalette.brand6}
          />
        </div>

        <Typography.Text type="secondary" style={{ textAlign: "center" }}>
          Scan this QR code to start time tracking for this order
        </Typography.Text>

        <Flex gap={12}>
          <Button icon={<DownloadOutlined />} onClick={handleDownload}>
            Download
          </Button>
          <Button icon={<PrinterOutlined />} onClick={handlePrint}>
            Print
          </Button>
        </Flex>

        <Typography.Text
          copyable={{ text: timeTrackerUrl }}
          style={{ fontSize: 12, color: "#999" }}
        >
          {timeTrackerUrl}
        </Typography.Text>
      </Flex>
    </Modal>
  );
};

export default OrderQRCodeModal;

