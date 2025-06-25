import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import useScrollTop from '@/hooks/useScroll';
import { Menu } from 'lucide-react';

const TopBar = ({ onOpenSheet }) => {
  const scrolled = useScrollTop();

  console.log(scrolled, 'scrolled');

  return (
    <div className="flex items-center flex-wrap justify-center">
      <div
        className={`mx-auto flex bg-brand1/80 text-white fixed w-full z-[99] transition-all duration-300 items-center justify-between h-14 p-5 ${
          scrolled
            ? 'top-6 max-w-[1300px] rounded-[77px] border border-violet-900 pt-[13px] pr-[25px] pb-[13px] pl-[25px]'
            : 'top-0 max-w-full border-violet-900'
        }`}
      >
        <div className="w-auto">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-12" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div id="connect-btn">
            <radix-connect-button />
          </div>
          <div className="lg:hidden flex items-center">
            <button
              onClick={onOpenSheet}
              className="p-2 text-white bg-brand3 rounded-md hover:bg-brand4 transition-all"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TopBar.propTypes = {
  onOpenSheet: PropTypes.func.isRequired,
};

export default TopBar;
