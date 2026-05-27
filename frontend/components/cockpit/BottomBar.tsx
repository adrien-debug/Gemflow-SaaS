export function BottomBar() {
  return (
    <div className="ct-bottom-bar">
      <div className="ct-bottom-bar-inner">
        <span className="ct-bottom-label">Gemflow</span>

        <div className="ct-seg-track">
          <a href="/" className="ct-seg-btn active">Dashboard</a>
          <a href="/orders" className="ct-seg-btn">Orders</a>
          <a href="/atelier" className="ct-seg-btn">Atelier</a>
          <a href="/crm" className="ct-seg-btn">CRM</a>
        </div>

        <div className="ct-seg-track">
          <button className="ct-seg-btn primary">Lancer</button>
          <button className="ct-seg-btn">Voir</button>
        </div>
      </div>
    </div>
  );
}
