import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    // Your expense object for this point
    const expense = payload[0].payload;
    return (
      <div className="bg-[#2A1850] border border-[#7F42F9]/50 rounded-lg p-4 min-w-[220px]">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={expense.image_url}
            alt={expense.user_name}
            className="w-8 h-8 rounded-full object-cover border border-brand5"
          />
          <span className="text-white font-semibold">{expense.user_name}</span>
        </div>
        <div className="text-gray-200 text-xs mb-1">{expense.info}</div>
        <div className="text-xs text-gray-400 mb-1">
          {new Date(expense.date).toLocaleString()}
        </div>
        <div className="text-xs text-[#86efac]">
          +{expense.xrd_added} XRD
        </div>
        <div className="text-xs text-[#7c3aed]">
          Current: {expense.current_xrd} XRD
        </div>
        {/* <div className="text-xs text-gray-400 truncate mt-1">
          Tx: {expense.tx_hash}
        </div> */}
      </div>
    );
  }
  return null;
};
const FundHistoryGraph = () => {
  const [expenses, setExpenses] = useState([]);
  const params = useParams();

  // Fetch activity data from the backend
  const fetchActivity = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/community/funds-history/${params.id}`
      );

      if (res.status === 200) {
        setExpenses(res.data);
      }
    } catch (error) {
      console.error("Error fetching funds history data:", error);
    }
  };

  // Call fetchActivity when the component mounts
  useEffect(() => {
    fetchActivity();
  }, [params.id]);

  return (
    <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] px-10 pt-10 overflow-hidden backdrop-blur-[6.7px]">
      {/* Header */}
      <div className="bg-[#39246b]  px-4 flex items-center w-full h-[53px] absolute left-0 top-0">
        <div className="text-white text-xl md:text-2xl font-medium ">
          Fund History:
        </div>
      </div>
      <div className="mt-10">

        {expenses.length === 0 ? (
          <div className="text-center text-gray-200  py-5">No transactions found.</div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={[...expenses].reverse()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="xrd_added"
                stroke="#86efac"
                name="XRD Added"
              />
              <Line
                type="monotone"
                dataKey="current_xrd"
                stroke="#7c3aed"
                name="Current XRD"
              />
            </LineChart>
          </ResponsiveContainer>
        )}

      </div>
    </div>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: PropTypes.shape({
      image_url: PropTypes.string,
      user_name: PropTypes.string,
      info: PropTypes.string,
      date: PropTypes.string,
      xrd_added: PropTypes.number,
      current_xrd: PropTypes.number,
      // tx_hash: PropTypes.string, // Uncomment if used
    }),
  })),
  label: PropTypes.any,
};

export default FundHistoryGraph;
