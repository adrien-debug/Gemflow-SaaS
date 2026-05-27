import type {
  SearchRequest,
  SearchResponse,
  OrderListItem,
  OrderSearchCriteria,
  CrmContact,
  CrmContactSearchCriteria,
  User,
  UserSearchCriteria,
  Role,
  Permission,
  LabourTracker,
  DashboardStats,
} from "./types";

// ─── Error type ───────────────────────────────────────────────────────────────

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

const BASE_URL = "/api/backend/v1";

async function get<TRes>(path: string): Promise<TRes> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "GET",
    headers: { accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = (await res.text()).slice(0, 200);
    throw new ApiError(text, res.status);
  }
  return res.json() as Promise<TRes>;
}

async function post<TReq, TRes>(path: string, body: TReq): Promise<TRes> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = (await res.text()).slice(0, 200);
    throw new ApiError(text, res.status);
  }
  return res.json() as Promise<TRes>;
}

// ─── Default helpers ─────────────────────────────────────────────────────────

function buildSearchRequest<C>(req?: Partial<SearchRequest<C>>): SearchRequest<C> {
  return {
    page: req?.page ?? 1,
    size: req?.size ?? 20,
    sorts: req?.sorts ?? [],
    searchCriteria: req?.searchCriteria ?? ({} as C),
  };
}

// ─── Public API object ────────────────────────────────────────────────────────

export const api = {
  dashboard: {
    stats(): Promise<DashboardStats> {
      return get<DashboardStats>("/dashboard/stats");
    },
  },

  orders: {
    search(req?: Partial<SearchRequest<OrderSearchCriteria>>): Promise<SearchResponse<OrderListItem>> {
      return post<SearchRequest<OrderSearchCriteria>, SearchResponse<OrderListItem>>(
        "/orders/search",
        buildSearchRequest(req),
      );
    },
  },

  crm: {
    contacts: {
      search(req?: Partial<SearchRequest<CrmContactSearchCriteria>>): Promise<SearchResponse<CrmContact>> {
        return post<SearchRequest<CrmContactSearchCriteria>, SearchResponse<CrmContact>>(
          "/crm/contacts/search",
          buildSearchRequest(req),
        );
      },
    },
  },

  users: {
    current(): Promise<User> {
      return get<User>("/users/current");
    },
    search(req?: Partial<SearchRequest<UserSearchCriteria>>): Promise<SearchResponse<User>> {
      return post<SearchRequest<UserSearchCriteria>, SearchResponse<User>>("/users/search", buildSearchRequest(req));
    },
  },

  roles: {
    list(): Promise<Role[]> {
      return get<Role[]>("/roles");
    },
  },

  permissions: {
    list(): Promise<Permission[]> {
      return get<Permission[]>("/permissions");
    },
  },

  labourTrackers: {
    active(): Promise<LabourTracker[]> {
      return get<LabourTracker[]>("/labour-trackers/active");
    },
  },
};
