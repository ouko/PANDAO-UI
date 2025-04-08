import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ChartComponent } from "@/components/ui/myComponents/test-char";

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
    <div className="bg-[rgba(169,126,255,0.08)] rounded-lg border border-[#5228A4] p-6 overflow-hidden backdrop-blur-[6.7px]">
      {/* Header */}
      <div className="bg-[#39246b]  px-4 flex items-center w-full h-[53px] absolute left-0 top-0">
        <div className="text-white text-2xl font-medium font-[ClashDisplayVariable-Medium, sans-serif]">
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
            <Tooltip
              formatter={(value, name) => [`${value.toLocaleString()} XRD`, name]}
              labelFormatter={(label) => `Date: ${new Date(label).toLocaleDateString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="xrd_added"
              stroke="#9268E4"
              name="XRD Added"
            />
            <Line
              type="monotone"
              dataKey="current_xrd"
              stroke="#B59AEC"
              name="Current XRD"
            />
          </LineChart>
        </ResponsiveContainer>
      )}

</div>
    </div>
  );
};

export default FundHistoryGraph;
