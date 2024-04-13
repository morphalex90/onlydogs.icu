export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__logo">OnlyDogs</div>
                <div className="footer__copyright">
                    &copy; {new Date().getFullYear()}  &nbsp;<a href="https://www.pieronanni.me" target="_blank" rel="noreferrer">Piero Nanni </a>
                    - <a href="https://www.buymeacoffee.com/morphalex90" target="_blank" rel="noreferrer">Buy me a 🍺</a>
                </div>
            </div>
        </footer>
    )
}
