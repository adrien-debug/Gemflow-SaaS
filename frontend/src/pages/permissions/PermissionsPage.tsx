import { PermissionsGrid } from '@features/permissions/permissions-grid';
import ActionBar from '@shared/ui/ActionBar';
import './styles.scss';

export const PermissionsPage = () => {
  return (
    <div className="page-permissions">
      <ActionBar title="Permissions" description="Manage role-based permissions for your team" />
      <PermissionsGrid />
    </div>
  );
};

export default PermissionsPage;

