import "./styles.scss";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import MetalTag from "@entities/metal/ui/MetalTag";
import { FC } from "react";

interface Props {
  cylinder: Cylinder;
}
const CylinderBlock: FC<Props> = ({ cylinder }) => {
  return (
    <div className="cylinder-block">
      {cylinder.name}
      <div className="cylinder-block-info">
        {cylinder?.metal?.name ? <MetalTag>{cylinder.metal.name}</MetalTag> : "Closed"}
      </div>
    </div>
  );
};

export default CylinderBlock;
