import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
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
}) => {
  const location = useLocation();
  const selectedKey = useMemo(() => location.pathname.split("/").slice(0, 2).join("/"), [location.pathname]);

  const renderItem = (item: MenuItem, depth = 0): ReactNode => {
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
        />
      );
    }

    const isActive = selectedKey === key || location.pathname === key;

    return (
      <div key={key} className={`gf-maison-sider__link${isActive ? " is-active" : ""}${depth > 0 ? " is-child" : ""}`}>
        {itemAny.icon ? (
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
          <div className="gf-maison-sider__group">{topItems.map((item) => renderItem(item))}</div>
        ) : null}
        {bottomItems?.length ? (
          <div className="gf-maison-sider__group gf-maison-sider__group--bottom">
            {bottomItems.map((item) => renderItem(item))}
          </div>
        ) : null}
      </nav>
    </aside>
  );
};

interface MaisonSiderGroupProps {
  item: MenuItem & { icon?: ReactNode; label?: ReactNode; children?: MenuItem[] | ReactNode };
  itemKey: string;
  depth: number;
  collapsed: boolean;
  selectedKey: string;
  renderItem: (item: MenuItem, depth?: number) => ReactNode;
}

const MaisonSiderGroup: FC<MaisonSiderGroupProps> = ({ item, itemKey, depth, collapsed, selectedKey, renderItem }) => {
  const children = (item.children ?? []) as MenuItem[];
  const containsActive = children.some((c) => String(c.key) === selectedKey);
  const [open, setOpen] = useState<boolean>(containsActive);
  useEffect(() => {
    if (containsActive) setOpen(true);
  }, [containsActive]);
  const isOpen = collapsed ? false : open;

  return (
    <div
      key={itemKey}
      className={`gf-maison-sider__group-block${isOpen ? " is-open" : ""}${containsActive ? " has-active" : ""}`}>
      <button
        type="button"
        className="gf-maison-sider__link gf-maison-sider__group-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={isOpen}>
        {item.icon ? (
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
