import { FC, useMemo, useState } from "react";
import { Link } from "react-router";
import "./styles.scss";

export interface OrdersBoardRow {
  id: number | string;
  initial: string;
  thumbVariant?: "pearl" | "gold" | "marine" | "emerald" | "default";
  pieceName: string;
  pieceSignature?: string;
  collection: string;
  material: string;
  status: string;
  statusTone?: "setting" | "casting" | "polished" | "mounting" | "qc" | "invoice" | "cad" | "proto";
  artisan: string;
  estimatedValue: number;
  currency?: string;
}

interface OrdersBoardProps {
  rows: OrdersBoardRow[];
  total?: number;
  pageSize?: number;
  selectedId?: number | string | null;
}

const formatCurrency = (n: number, currency: string) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);

const OrdersBoard: FC<OrdersBoardProps> = ({ rows, total, pageSize = 7, selectedId = null }) => {
  const [page, setPage] = useState(1);
  const totalCount = total ?? rows.length;
  const pageCount = Math.max(1, Math.ceil(totalCount / pageSize));
  const visible = rows.slice(0, pageSize);
  const start = visible.length === 0 ? 0 : 1;
  const end = visible.length;

  const pages = useMemo(() => {
    const out: number[] = [];
    const maxVisible = Math.min(pageCount, 4);
    for (let i = 1; i <= maxVisible; i++) out.push(i);
    return out;
  }, [pageCount]);

  return (
    <div className="gf-orders-board">
      <header className="gf-orders-board__head">
        <span className="gf-orders-board__head-cell gf-orders-board__head-cell--piece">Pièce / Maison</span>
        <span className="gf-orders-board__head-cell">Statut</span>
        <span className="gf-orders-board__head-cell">Artisan assigné</span>
        <span className="gf-orders-board__head-cell gf-orders-board__head-cell--right">Valeur estimée</span>
      </header>

      <ul className="gf-orders-board__list">
        {visible.map((row) => {
          const isSelected = selectedId === row.id;
          const variant = row.thumbVariant ?? "default";
          const tone = row.statusTone ?? "setting";
          return (
            <li key={row.id} className={`gf-orders-board__row${isSelected ? " is-selected" : ""}`}>
              <Link to={`/orders/${row.id}`} className="gf-orders-board__link">
                <span className="gf-orders-board__cell gf-orders-board__cell--piece">
                  <span className={`gf-orders-board__thumb gf-orders-board__thumb--${variant}`} aria-hidden>
                    {row.initial}
                  </span>
                  <span className="gf-orders-board__piece">
                    <span className="gf-orders-board__piece-name">
                      {row.pieceSignature ? (
                        <em className="gf-orders-board__piece-signature">{row.pieceSignature} </em>
                      ) : null}
                      {row.pieceName}
                    </span>
                    <span className="gf-orders-board__piece-sub">
                      {row.collection}
                      <span className="gf-orders-board__piece-sep" aria-hidden> · </span>
                      {row.material}
                    </span>
                  </span>
                </span>

                <span className="gf-orders-board__cell">
                  <span className={`gf-orders-board__status gf-orders-board__status--${tone}`}>
                    {row.status}
                  </span>
                </span>

                <span className="gf-orders-board__cell gf-orders-board__cell--artisan">
                  {row.artisan}
                </span>

                <span className="gf-orders-board__cell gf-orders-board__cell--right gf-orders-board__amount">
                  {formatCurrency(row.estimatedValue, row.currency ?? "EUR")}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <footer className="gf-orders-board__foot">
        <span className="gf-orders-board__count">
          Affichage {start} — {end} sur {totalCount}
        </span>
        <div className="gf-orders-board__pages">
          <button
            type="button"
            className="gf-orders-board__page"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Page précédente"
          >
            ‹
          </button>
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              className={`gf-orders-board__page${p === page ? " is-active" : ""}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            type="button"
            className="gf-orders-board__page"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            aria-label="Page suivante"
          >
            ›
          </button>
        </div>
      </footer>
    </div>
  );
};

export default OrdersBoard;
