import Link from "next/link";
import "./footer.css";

export default function NeurezFooter() {
  return (
    <div className="footer-root">

      {/* ── DARK FOOTER PANEL ── */}
      <footer className="footer-dark">
        <div className="footer-meta">
          <div className="footer-contact">
            <span className="footer-contact-label">Have an idea? Say Hi!</span>
            <span className="footer-email">Hi@neurezstudio.com</span>
          </div>
          <nav className="footer-nav">
            {["Works", "Services", "Process", "Articles"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="footer-nav-link">
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="brand-text-wrap">
          <span className="brand-text">sadia</span>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">Copyright &copy; 2025 neurezstudio</span>
          <div className="footer-legal">
            <Link href="/privacy" className="footer-legal-link">Privacy &amp; Policy</Link>
            <Link href="/terms" className="footer-legal-link">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}