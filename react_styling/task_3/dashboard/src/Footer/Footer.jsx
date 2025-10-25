import { getCurrentYear, getFooterCopy } from "../utils/utils";

function Footer() {
  return (
    <footer className="App-footer border-t-2 border-[var(--main-color)] mt-8 text-center py-2 text-sm text-gray-700">
      <p>
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  );
}

export default Footer;
