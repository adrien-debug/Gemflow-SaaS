import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivateRoute from "./PrivateRoute.tsx";
import { lazy } from "react";
import DashboardOutlet from "@app/router/DashboardOutlet.tsx";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";
import { UserRoute } from "@app/router/UserRoute.tsx";
import { getLoginWithRedirectBackUrl } from "@shared/utils/url-helper.ts";

const Administration = lazy(() => import("@pages/administration"));
const Authorization = lazy(() => import("@pages/authorization"));
const CAD = lazy(() => import("@pages/cad"));
const Diamonds = lazy(() => import("@pages/diamonds"));
const Orders = lazy(() => import("@pages/orders"));
const Settings = lazy(() => import("@pages/settings"));
const PreCasting = lazy(() => import("@pages/pre-casting"));
const Printing = lazy(() => import("@pages/3d-printing"));
const Profile = lazy(() => import("@pages/profile"));
const Gemstones = lazy(() => import("@pages/gemstones"));
const Stock = lazy(() => import("@pages/stock"));
const Metals = lazy(() => import("@pages/metals"));
const Casting = lazy(() => import("@pages/casting"));
const TimeTracker = lazy(() => import("@pages/time-tracker"));

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="login/*" element={<Authorization />} />

      <Route
        path="/"
        element={
          <PrivateRoute redirectTo={getLoginWithRedirectBackUrl()}>
            <DashboardOutlet />
          </PrivateRoute>
        }>
        <Route index element={<Navigate to="/orders" />} />
        <Route
          path="settings"
          element={
            <UserRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]} redirectTo="/">
              <Settings />
            </UserRoute>
          }
        />
        <Route
          path="diamonds"
          element={
            <UserRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]} redirectTo="/">
              <Diamonds />
            </UserRoute>
          }
        />
        <Route path="orders/*" element={<Orders />} />
        <Route path="cad" element={<CAD />} />
        <Route path="3d-printing" element={<Printing />} />
        <Route path="pre-casting" element={<PreCasting />} />
        <Route path="casting/*" element={<Casting />} />
        <Route
          path="stock/*"
          element={
            <UserRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]} redirectTo="/">
              <Stock />
            </UserRoute>
          }
        />
        <Route
          path="administration/*"
          element={
            <UserRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]} redirectTo="/">
              <Administration />
            </UserRoute>
          }
        />
        <Route path="profile" element={<Profile />} />
        <Route
          path="gemstones/*"
          element={
            <UserRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]} redirectTo="/">
              <Gemstones />
            </UserRoute>
          }
        />
        <Route
          path="metals/*"
          element={
            <UserRoute allowedRoles={[UserRoleEnum.ADMIN, UserRoleEnum.SUPER_ADMIN]} redirectTo="/">
              <Metals />
            </UserRoute>
          }
        />
      </Route>

      <Route
        path="orders/:id/time-tracker"
        element={
          <PrivateRoute redirectTo={getLoginWithRedirectBackUrl()}>
            <TimeTracker />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<p>There's nothing here: 404!</p>} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
