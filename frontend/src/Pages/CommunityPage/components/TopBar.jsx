import { Link } from 'react-router-dom';
import useScrollTop from '@/hooks/useScroll';

const TopBar = () => {
  const scrolled = useScrollTop();

  return (
    <div className="flex items-center flex-wrap justify-center">
      <div
        className={`mx-auto flex bg-brand1/80 text-white fixed w-full z-[9999] transition-all duration-300 items-center justify-between h-16 p-5 ${scrolled
          ? 'top-6 max-w-[1300px] rounded-[77px] border border-violet-900 pt-[13px] pr-[25px] pb-[13px] pl-[25px]'
          : 'top-0 max-w-full border-violet-900'
          }`}
      >
        <div className="w-auto">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        <ul className="md:flex hidden items-center gap-4 font-semibold text-lg">

          <div id="connect-btn">
            <radix-connect-button />
          </div>
        </ul>
      </div>

    </div>
  );
};

export default TopBar;