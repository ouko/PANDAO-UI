import { Link } from 'react-router-dom';
import useScrollTop from '@/hooks/useScroll';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClockIcon, Activity } from 'lucide-react';

const Navbar = ({ userImage, userName, accounts, isAdmin }) => {
  const scrolled = useScrollTop();
  const [notifications, setNotifications] = useState([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    const fetchUserNotifications = async () => {
      if (accounts && accounts.length > 0 && accounts[0]?.address && !hasFetched) {
        await fetchNotifications(accounts[0].address);
        setHasFetched(true);
      }
    };
    fetchUserNotifications();
  }, [accounts, hasFetched]);

  const fetchNotifications = async (user_address) => {
    if (!user_address) {
      console.error('User address is not provided.');
      return;
    }

    try {
      const endpoint = `${import.meta.env.VITE_BACKEND_URL}/user/notification/all/${user_address}`;
      console.log(`Fetching notifications from: ${endpoint}`);

      const res = await axios.get(endpoint);
      console.log('Fetched Notifications:', res.data);

      if (Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="flex items-center flex-wrap justify-center">
      <div
        className={`mx-auto flex bg-brand1/80 text-white fixed w-full z-20 transition-all duration-300 items-center justify-between h-16 p-5 ${
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

        <ul className="md:flex hidden items-start gap-4 font-semibold text-lg ">
          {isAdmin && (
            <Popover className="ml-11">
              <PopoverTrigger asChild  >
                <button className="p-2 rounded-full transition group">
                  <img 
                    src="/BELL.svg" 
                    alt="Notifications" 
                    className="h-6 w-6 group-hover:animate-bell-wiggle"
                  />
                  
                </button>
              </PopoverTrigger>
              <PopoverContent className="max-w-[600px] bg-brand2 border-2 border-brand1 py-11 " align={"end"}>
                <div className="w-full mt-4 flex flex-col gap-2">
                  {notifications && notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <div key={index} className="p-4 border-2 rounded-lg group">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-2">
                            <Avatar className="h-8 w-8 mt-1">
                              <AvatarImage
                                src={notification.image}
                                className="h-8 w-8 object-cover"
                              />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span>{notification.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm ">
                                <span>{notification.text}</span>
                              </div>
                              <div className="text-sm flex items-center gap-1 font-light">
                                <ClockIcon className="h-3 w-3" />{' '}
                                <span>{notification.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="border-2 rounded-full p-2 group-hover:text-purple-600 group-hover:border-purple-600">
                            <Activity className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-500 p-4">
                      You currently have no notifications.
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          )}

      <div id="connect-btn">
      <radix-connect-button />
       </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;