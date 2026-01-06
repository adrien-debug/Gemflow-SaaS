import { globalTheme } from "./theme/global-theme.ts";
import { MessageProvider } from "@shared/providers/MessageProvider.tsx";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@shared/providers/ModalProvider.tsx";
import ConfigProvider from "antd/es/config-provider";
import AppRouter from "@app/router/AppRouter.tsx";
import Loading from "@shared/ui/Loading";
import { Suspense } from "react";

dayjs.extend(customParseFormat);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ConfigProvider theme={globalTheme}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <MessageProvider>
            <Suspense fallback={<Loading />}>
              <AppRouter />
            </Suspense>
          </MessageProvider>
        </ModalProvider>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
