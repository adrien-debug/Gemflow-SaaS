import { FC, useRef, useState } from "react";
import "./styles.scss";
import TechnicalSheetCard from "@features/orders/technical-sheet/ui/TechnicalSheetCard";
import Flex from "antd/es/flex";
import useCadDetails from "@entities/order/hooks/useCadDetails.ts";
import EditFormController from "@shared/ui/EditFormController";
import TechnicalSheetCardForm from "features/orders/technical-sheet/ui/TechnicalSheetCardForm";
import MountingCardForm from "@features/orders/technical-sheet/ui/MountingCardForm";
import SettingCardForm from "@features/orders/technical-sheet/ui/SettingCardForm";
import { useForm } from "antd/es/form/Form";
import RealDiamondsUsage from "@features/orders/technical-sheet/ui/RealDiamondsUsage";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import useTechnicalSheet from "@entities/order/hooks/useTechnicalSheet.ts";
import useUpdateTechnicalSheet from "@entities/order/hooks/useUpdateTechnicalSheet.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { TechnicalSheetMetadata } from "@entities/order/models/technical-sheet.model.ts";
import Form from "antd/es/form";
import EditTechnicalSheetConverter from "@features/orders/technical-sheet/utils/edit-technical-sheet.converter.ts";

interface Props {
  orderId: number;
  dimension?: number;
  isRing?: boolean;
  disabled?: boolean;
  isEditBlocked?: boolean;
}

const TechnicalSheet: FC<Props> = ({ orderId, dimension, isRing, disabled, isEditBlocked }) => {
  const { data: cadDetails } = useCadDetails(orderId);

  const { data: technicalSheet } = useTechnicalSheet(orderId);

  const mutation = useUpdateTechnicalSheet();

  const { messageApi } = useMessage();

  const [form] = useForm();

  const [isEditing, setIsEditing] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const toPrint = useReactToPrint({
    contentRef,
    pageStyle: `@page {
         size: A4 !important;
         margin: 0 !important;
        }`,
  });

  const [imageLoading, setImageLoading] = useState(false);

  const onStartImageLoad = () => setImageLoading(true);
  const onEndImageLoad = () => setImageLoading(false);

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleFinish = async (values: TechnicalSheetMetadata) => {
    const convertedValues = EditTechnicalSheetConverter.convert(values);

    mutation.mutate(
      { orderTechnicalSheetId: technicalSheet?.id as number, orderId: orderId, dto: convertedValues },
      {
        onSuccess: () => {
          void messageApi.success("Technical sheet updated successfully");
        },
        onError: () => {
          void messageApi.error("Failed to update technical sheet");
        },
        onSettled: () => {
          handleCancel();
        },
      },
    );
  };

  return (
    <>
      <EditFormController
        id="technical-sheet-controller"
        title="Technical sheet"
        editing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={() => form.submit()}
        onCancel={handleCancel}
        loading={imageLoading || mutation.isPending}
        isEditBlocked={isEditBlocked}
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
          icon: null,
          disabled: disabled,
          id: "edit-technical-sheet",
        }}
        additionalControls={
          !isEditing && (
            <Button size="large" icon={<PrinterOutlined />} onClick={toPrint}>
              Print sheet
            </Button>
          )
        }
      />
      <div ref={contentRef}>
        <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
          <Flex gap={16} wrap>
            <TechnicalSheetCard orderId={orderId} title="Technical sheet" pageNumber={1}>
              <TechnicalSheetCardForm
                cadDetails={cadDetails}
                technicalSheet={technicalSheet}
                editing={isEditing}
                dimension={dimension}
                isRing={isRing}
              />
            </TechnicalSheetCard>

            <TechnicalSheetCard orderId={orderId} title="Mounting" pageNumber={2}>
              <MountingCardForm
                variant="first"
                editing={isEditing}
                technicalSheet={technicalSheet}
                onStartImageLoad={onStartImageLoad}
                onEndImageLoad={onEndImageLoad}
              />
            </TechnicalSheetCard>

            <TechnicalSheetCard orderId={orderId} title="Mounting" pageNumber={3}>
              <MountingCardForm
                variant="second"
                technicalSheet={technicalSheet}
                editing={isEditing}
                onStartImageLoad={onStartImageLoad}
                onEndImageLoad={onEndImageLoad}
              />
            </TechnicalSheetCard>

            <TechnicalSheetCard orderId={orderId} title="Setting" pageNumber={4}>
              <SettingCardForm editing={isEditing} cadDetails={cadDetails} technicalSheet={technicalSheet} />
            </TechnicalSheetCard>

            <TechnicalSheetCard orderId={orderId} title="Real diamonds used" pageNumber={5}>
              <RealDiamondsUsage orderId={orderId} />
            </TechnicalSheetCard>
          </Flex>
        </Form>
      </div>
    </>
  );
};

export default TechnicalSheet;
