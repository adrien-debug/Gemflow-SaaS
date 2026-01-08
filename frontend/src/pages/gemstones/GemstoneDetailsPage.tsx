import ViewGemstoneHeader from "@features/gemstones/view-gemstone-header/ui/ViewGemstoneHeader";
import GemstoneDetails from "@features/gemstones/gemstone-details/ui/GemstoneDetails";
import CommonLayout from "@shared/ui/layouts/CommonLayout";

const GemstoneDetailsPage = () => {
  return (
    <CommonLayout>
      <ViewGemstoneHeader />
      <GemstoneDetails />
    </CommonLayout>
  );
};

export default GemstoneDetailsPage;
