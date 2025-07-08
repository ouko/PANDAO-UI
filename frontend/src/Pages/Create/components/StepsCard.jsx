import PropTypes from 'prop-types';
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

export const StepsCard = ({ step, title, icon: Icon, tooltip }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="relative w-64 md:w-72 flex-shrink-0"
    >
      <Card className="bg-[rgba(169,126,255,0.08)] z-10 w-full text-white md:mt-10 border-[#5228A4] mt-2 p-4 md:p-6 flex flex-col gap-2 md:gap-3 rounded-xl shadow-sm h-auto md:h-96 border-transparent hover:border-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-300">
        <div className="bg-[rgba(169,126,255,0.08)] rounded-md text-center border border-[#5228A4] flex items-center justify-center h-48 md:h-72 relative">
          <Icon className="h-20 w-20 md:h-28 md:w-28 text-purple-400" />
          {tooltip && (
            <div className="absolute bottom-2 text-xs text-gray-300 bg-black bg-opacity-50 px-2 py-1 rounded-md">{tooltip}</div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-2"
        >
          <div className="font-extrabold text-2xl md:text-3xl text-gray-300">{step}</div>
          <div className="font-semibold text-lg md:text-xl text-brand5">{title}</div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

// Define PropTypes for validation
StepsCard.propTypes = {
  step: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  tooltip: PropTypes.string,
};

export default StepsCard;