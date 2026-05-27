import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import { Nullable } from "@shared/types/nullable.type.ts";
import { User } from "@entities/user/models/user.model.ts";
import "./styles.scss";

interface MaisonSiderProps {
  topItems?: MenuItem[];
  bottomItems?: MenuItem[];
  collapsed: boolean;
  onToggle: () => void;
  hideToggle?: boolean;
  brandTitle?: string;
  brandEmphasized?: string;
  brandSubtitle?: string;
  user?: Nullable<User>;
}

const isMenuItemArray = (children: unknown): children is MenuItem[] =>
  Array.isArray(children) &&
  children.length > 0 &&
  typeof children[0] === "object" &&
  children[0] !== null &&
  "key" in (children[0] as object);

const MaisonSider: FC<MaisonSiderProps> = ({
  topItems,
  bottomItems,
  collapsed,
  onToggle,
  hideToggle = false,
  brandTitle = "Gem",
  brandEmphasized = "flow",
  brandSubtitle = "Atelier Intelligence",
  user,
}) => {
  const location = useLocation();
  const selectedKey = useMemo(() => location.pathname.split("/").slice(0, 2).join("/"), [location.pathname]);

  const initials = useMemo(() => {
    if (!user) return "";
    const f = (user.firstName ?? "").trim().charAt(0);
    const l = (user.lastName ?? "").trim().charAt(0);
    const fallback = (user.fullName ?? user.email ?? "").trim().charAt(0);
    return (f + l || fallback).toUpperCase();
  }, [user]);

  const avatarUrl = user?.photos?.[0]?.file?.downloadUrl;

  const renderItem = (item: MenuItem, depth = 0, index?: number): ReactNode => {
    const key = String(item.key);
    const itemAny = item as MenuItem & {
      icon?: ReactNode;
      label?: ReactNode;
      children?: MenuItem[] | ReactNode;
    };

    if (isMenuItemArray(itemAny.children)) {
      return (
        <MaisonSiderGroup
          key={key}
          item={itemAny}
          itemKey={key}
          depth={depth}
          collapsed={collapsed}
          selectedKey={selectedKey}
          renderItem={renderItem}
          index={index}
        />
      );
    }

    const isActive = selectedKey === key || location.pathname === key;
    const showNumber = depth === 0 && typeof index === "number";

    return (
      <div key={key} className={`gf-maison-sider__link${isActive ? " is-active" : ""}${depth > 0 ? " is-child" : ""}`}>
        {showNumber ? (
          <span className="gf-maison-sider__number" aria-hidden>
            <span className="gf-maison-sider__number-mark" />
            <span className="gf-maison-sider__number-value">{String(index + 1).padStart(2, "0")}</span>
          </span>
        ) : itemAny.icon ? (
          <span className="gf-maison-sider__icon" aria-hidden>
            {itemAny.icon}
          </span>
        ) : (
          <span className="gf-maison-sider__bullet" aria-hidden />
        )}
        <span className="gf-maison-sider__text">{itemAny.label}</span>
      </div>
    );
  };

  return (
    <aside className={`gf-maison-sider${collapsed ? " is-collapsed" : ""}`} data-collapsed={collapsed}>
      <div className="gf-maison-sider__brand">
        <div className="gf-maison-sider__brand-title">
          {collapsed ? (
            <>
              {brandTitle.charAt(0)}
              <em>·</em>
            </>
          ) : (
            <>
              {brandTitle}
              <em>{brandEmphasized}</em>
            </>
          )}
        </div>
        {!collapsed ? <div className="gf-maison-sider__brand-sub">{brandSubtitle}</div> : null}
        {!hideToggle ? (
          <button
            type="button"
            className="gf-maison-sider__toggle"
            onClick={onToggle}
            aria-label={collapsed ? "Déplier le menu" : "Replier le menu"}
            aria-expanded={!collapsed}
          />
        ) : null}
      </div>

      <nav className="gf-maison-sider__nav">
        {topItems?.length ? (
          <div className="gf-maison-sider__group">
            {topItems.map((item, idx) => renderItem(item, 0, idx))}
          </div>
        ) : null}
        {bottomItems?.length ? (
          <div className="gf-maison-sider__group gf-maison-sider__group--bottom">
            {bottomItems.map((item, idx) => renderItem(item, 0, (topItems?.length ?? 0) + idx))}
          </div>
        ) : null}
      </nav>

      {user ? (
        <Link to="/profile" className="gf-maison-sider__profile" aria-label="Profil utilisateur">
          <span className="gf-maison-sider__profile-avatar" aria-hidden>
            {avatarUrl ? <img src={avatarUrl} alt="" /> : <span className="gf-maison-sider__profile-initials">{initials}</span>}
            <span className="gf-maison-sider__profile-dot" />
          </span>
          <span className="gf-maison-sider__profile-meta">
            <span className="gf-maison-sider__profile-name">{user.fullName || `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()}</span>
            <span className="gf-maison-sider__profile-role">{user.role?.name ?? user.role?.code ?? ""}</span>
          </span>
        </Link>
      ) : null}
    </aside>
  );
};

interface MaisonSiderGroupProps {
  item: MenuItem & { icon?: ReactNode; label?: ReactNode; children?: MenuItem[] | ReactNode };
  itemKey: string;
  depth: number;
  collapsed: boolean;
  selectedKey: string;
  renderItem: (item: MenuItem, depth?: number, index?: number) => ReactNode;
  index?: number;
}

const MaisonSiderGroup: FC<MaisonSiderGroupProps> = ({ item, itemKey, depth, collapsed, selectedKey, renderItem, index }) => {
  const children = (item.children ?? []) as MenuItem[];
  const containsActive = children.some((c) => String(c.key) === selectedKey);
  const [open, setOpen] = useState<boolean>(containsActive);
  useEffect(() => {
    if (containsActive) setOpen(true);
  }, [containsActive]);
  const isOpen = collapsed ? false : open;
  const showNumber = depth === 0 && typeof index === "number";

  return (
    <div
      key={itemKey}
      className={`gf-maison-sider__group-block${isOpen ? " is-open" : ""}${containsActive ? " has-active" : ""}`}>
      <button
        type="button"
        className="gf-maison-sider__link gf-maison-sider__group-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={isOpen}>
        {showNumber ? (
          <span className="gf-maison-sider__number" aria-hidden>
            <span className="gf-maison-sider__number-mark" />
            <span className="gf-maison-sider__number-value">{String((index ?? 0) + 1).padStart(2, "0")}</span>
          </span>
        ) : item.icon ? (
          <span className="gf-maison-sider__icon" aria-hidden>
            {item.icon}
          </span>
        ) : (
          <span className="gf-maison-sider__bullet" aria-hidden />
        )}
        <span className="gf-maison-sider__text">{item.label}</span>
        {!collapsed ? (
          <span className="gf-maison-sider__chevron" aria-hidden>
            ›
          </span>
        ) : null}
      </button>
      {isOpen && !collapsed ? (
        <div className="gf-maison-sider__group-children">{children.map((c) => renderItem(c, depth + 1))}</div>
      ) : null}
    </div>
  );
};

export default MaisonSider;
