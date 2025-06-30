import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRdt } from '@/hooks/useRdt';
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ handleClose }) => {
  const rdt = useRdt();
  const navigate = useNavigate();
  const params = useParams();
  const [slug, setSlug] = useState("");

  // Handle wallet connect callback (wrapped in useEffect to avoid multiple registrations)
  useEffect(() => {
    const unregister = rdt.walletApi.provideConnectResponseCallback(async (result) => {
      if (result.isErr()) {
        console.log('Wallet Connect Error');
      } else {
        try {
          const address = result.value.accounts[0].address;
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/user/check-signup/${address}`
          );
          if (!response.data.exist) {
            navigate('/signup');
          } else {
            navigate('/userDashboard');
          }
        } catch (error) {
          console.error('API Error:', error);
        }
      }
    });

    return () => {
      unregister?.(); // clean up listener if supported
    };
  }, [rdt, navigate]);

  // Fetch slug on mount
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/community/detail/${params.id}`
        );
        if (res.status === 200) {
          setSlug(res.data.blueprint_slug);
        }
      } catch (error) {
        console.error('Error fetching blueprint data:', error);
      }
    };
    fetchDetails();
  }, [params.id]);

  // Navigation items based on blueprint
  const getNavItems = () => {
    const baseItems = [
      { icon: '/2.svg', label: 'Dashboard', path: `/community/detail/${params.id}` },
      { icon: '/3.svg', label: 'Members', path: `/community/detail/${params.id}/members` },
      { icon: '/4.svg', label: 'Discussion', path: `/community/detail/${params.id}/discussion` },
      { icon: '/5.svg', label: 'Vote Power', path: `/community/detail/${params.id}/tokenDistribution` },
      { icon: '/5.svg', label: 'Withdraw', path: `/community/detail/${params.id}/tokenWithdraw` },
      { icon: '/6.svg', label: 'Activity', path: `/community/detail/${params.id}/activity` },
      { icon: '/7.svg', label: 'Proposals', path: `/community/detail/${params.id}/proposals` },
    ];

    const conditionalItems = slug === 'Insurance'
      ? [
          { icon: '/2.svg', label: 'ANN Issue', path: `/community/detail/${params.id}/annissue` },
          { icon: '/2.svg', label: 'ANN Issued', path: `/community/detail/${params.id}/AnnIssued` },
        ]
      : [
          { icon: '/2.svg', label: 'Bond Issue', path: `/community/detail/${params.id}/bondissue` },
          { icon: '/8.svg', label: 'Bond Report', path: `/community/detail/${params.id}/bondrecipt` },
        ];

    const restItems = [
      { icon: '/2.svg', label: 'Purchased Bond', path: `/community/detail/${params.id}/purchasedbond` },
      { icon: '/1.svg', label: 'Back', path: '/' },
    ];

    return [...baseItems, ...conditionalItems, ...restItems];
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative  md:bg-[rgba(169,126,255,0.08)] md:border md:border-[#5228A4] rounded-[20px] text-white md:py-6 py-10 px-[5px] md:px-[20px] w-[300px] overflow-y-auto">
      {getNavItems().map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          onClick={handleClose}
          className={({ isActive }) =>
            `flex flex-row items-center justify-start my-0 md:my-3 cursor-pointer transition-all rounded-lg ${
              isActive ? 'bg-brand3 text-white' : 'text-purple-100'
            }`
          }
          end
        >
          {({ isActive }) => (
            <motion.div
              className="flex items-center w-full px-2 py-2"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="shrink-0 w-10 h-10 px-2"
              />
              <motion.span
                className="font-medium text-lg"
                animate={{ opacity: isActive ? 1 : 0.85 }}
              >
                {item.label}
              </motion.span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default Sidebar;
