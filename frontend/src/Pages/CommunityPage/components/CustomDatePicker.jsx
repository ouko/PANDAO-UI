import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";
import PropTypes from "prop-types";

const CustomDatePicker = ({ value, onClick }) => {
  return (
    <div
      className="flex items-center gap-2 bg-[#1B0D37] border border-[#5228A4] rounded-md px-4 py-2 w-full text-white cursor-pointer"
      onClick={onClick}
    >
      <Input
        className="bg-transparent outline-none focus:outline-none ring-0 border-transparent shadow-none text-white w-full cursor-pointer p-0"
        type="text"
        value={value}
        readOnly
      />
      <Calendar className="text-white w-5 h-5" />
    </div>
  );
};

CustomDatePicker.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomDatePicker;
