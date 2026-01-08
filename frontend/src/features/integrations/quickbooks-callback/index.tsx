import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Card, Spin, Result, Typography } from "antd";
import { useQuickBooksCallback } from "@entities/quickbooks/hooks/useQuickBooksConnect";
import type { ApiError } from "@shared/types/api-error.type";
import "./styles.scss";

const { Text } = Typography;

export const QuickBooksCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const callbackMutation = useQuickBooksCallback();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get('code');
    const realmId = searchParams.get('realmId');
    const state = searchParams.get('state');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError(`Authorization denied: ${searchParams.get('error_description') || errorParam}`);
      return;
    }

    if (!code || !realmId) {
      setError('Missing authorization code or realm ID');
      return;
    }

    // Verify state matches (security)
    const storedState = localStorage.getItem('quickbooks_oauth_state');
    if (storedState && state !== storedState) {
      setError('State mismatch - possible security issue');
      return;
    }

    // Exchange code for tokens
    callbackMutation.mutate(
      { code, realmId, state: state || undefined },
      {
        onSuccess: () => {
          // Redirect to integrations page after 2 seconds
          setTimeout(() => {
            navigate('/settings/integrations', { replace: true });
          }, 2000);
        },
        onError: (err: ApiError) => {
          setError(err?.data?.friendlyMessage || err?.data?.developerMessage || 'Failed to connect to QuickBooks');
        },
      }
    );
  }, [searchParams]);

  if (error) {
    return (
      <div className="quickbooks-callback-container">
        <Card>
          <Result
            status="error"
            title="Connection Failed"
            subTitle={error}
            extra={
              <a href="/settings/integrations">Return to Integrations</a>
            }
          />
        </Card>
      </div>
    );
  }

  if (callbackMutation.isSuccess) {
    return (
      <div className="quickbooks-callback-container">
        <Card>
          <Result
            status="success"
            title="Connected Successfully!"
            subTitle="Your QuickBooks account has been connected. Redirecting..."
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="quickbooks-callback-container">
      <Card>
        <div className="loading-content">
          <Spin size="large" />
          <Text style={{ marginTop: 16 }}>Connecting to QuickBooks...</Text>
        </div>
      </Card>
    </div>
  );
};

export default QuickBooksCallback;

