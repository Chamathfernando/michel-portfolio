import { reveal } from '../utils/reveal';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__name" data-reveal-edge="" {...reveal('up', 0)}>
        Michel Nugawela
      </div>
      <div className="site-footer__credit" data-reveal-edge="" {...reveal('up', 1)}>
        Designed &amp; Developed by <a href="https://themoopoint.com/" target="_blank" rel="noopener noreferrer">The Moo Point</a>
      </div>
      <div className="site-footer__note" data-reveal-edge="" {...reveal('up', 2)}>
        Ideas continue . . .
      </div>
    </footer>
  );
}
