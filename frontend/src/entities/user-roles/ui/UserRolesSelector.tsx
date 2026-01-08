import Select from "antd/es/select";
import useUserRoles from "@entities/user-roles/hooks/useUserRoles";

const UserRolesSelector = ({ ...rest }) => {
  const roles = useUserRoles();

  return (
    <Select
      {...rest}
      id="administration-page-role"
      size="large"
      placeholder="Choose role"
      options={roles?.data}
      fieldNames={{ value: "id", label: "name" }}
    />
  );
};

export default UserRolesSelector;
