import { useState, useEffect } from 'react';
import { Table, Checkbox, Button, message, Spin, Card } from 'antd';
import Flex from 'antd/es/flex';
import Typography from 'antd/es/typography';
import { SaveOutlined } from '@ant-design/icons';
import { usePermissionsMatrix } from '@entities/permission/hooks/usePermissionsMatrix';
import { useUpdateRolePermissions } from '@entities/permission/hooks/useUpdateRolePermissions';
import type { Permission } from '@entities/permission/models/permission.model';
import type { UpdateRolePermissionsDto } from '@entities/permission/dto/update-role-permissions.dto';
import './styles.scss';

export const PermissionsGrid = () => {
  const tenantId = 1; // TODO: Get from context
  const { data: matrixData, isLoading } = usePermissionsMatrix(tenantId);
  const updateMutation = useUpdateRolePermissions(tenantId);
  
  // Local state for matrix changes
  const [localMatrix, setLocalMatrix] = useState<Record<number, Record<number, boolean>>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize local matrix when data loads
  useEffect(() => {
    if (matrixData && Object.keys(localMatrix).length === 0) {
      setLocalMatrix(matrixData.matrix);
    }
  }, [matrixData]);

  const handleToggle = (roleId: number, permissionId: number) => {
    setLocalMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: !prev[roleId]?.[permissionId],
      },
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!matrixData) return;

    try {
      // Save each role's permissions
      for (const role of matrixData.roles) {
        const permissions = matrixData.permissions.map((perm) => ({
          permissionId: perm.id,
          granted: localMatrix[role.id]?.[perm.id] || false,
        }));

        const dto: UpdateRolePermissionsDto = {
          roleId: role.id,
          permissions,
        };

        await updateMutation.mutateAsync(dto);
      }

      message.success('Permissions updated successfully');
      setHasChanges(false);
    } catch (error) {
      message.error('Failed to update permissions');
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: 400 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (!matrixData) {
    return <div>No data available</div>;
  }

  // Group permissions by category
  const permissionsByCategory = matrixData.permissions.reduce(
    (acc, perm) => {
      if (!acc[perm.category]) {
        acc[perm.category] = [];
      }
      acc[perm.category].push(perm);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  const columns = [
    {
      title: 'Permission',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (text: string, record: Permission) => (
        <Flex vertical gap={4}>
          <Typography.Text strong>{text}</Typography.Text>
          {record.description && (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {record.description}
            </Typography.Text>
          )}
        </Flex>
      ),
    },
    ...matrixData.roles.map((role) => ({
      title: role.name,
      dataIndex: role.id,
      key: role.id,
      width: 150,
      align: 'center' as const,
      render: (_: unknown, record: Permission) => (
        <Checkbox
          checked={localMatrix[role.id]?.[record.id] || false}
          onChange={() => handleToggle(role.id, record.id)}
        />
      ),
    })),
  ];

  return (
    <Flex vertical gap={20} className="permissions-grid">
      {hasChanges && (
        <Flex justify="flex-end">
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSave}
            loading={updateMutation.isPending}
            size="large"
          >
            Save Changes
          </Button>
        </Flex>
      )}

      {Object.entries(permissionsByCategory).map(([category, permissions]) => (
        <Card key={category} title={category} className="permission-category-card">
          <Table
            dataSource={permissions}
            columns={columns}
            rowKey="id"
            pagination={false}
            size="middle"
          />
        </Card>
      ))}
    </Flex>
  );
};

