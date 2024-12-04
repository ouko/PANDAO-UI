import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"; 
import { useParams } from "react-router-dom"; 
import { Card } from "@/components/ui/card";

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

  // Check if `expenses` is available and not empty
  if (!expenses || expenses.length === 0) {
    return (
      <Card className="w-full p-3 mb-5">
        <div className="text-2xl font-semibold py-3">All Funds History</div>
        <div className="text-center text-gray-500 py-5">No transactions found.</div>
      </Card>
    );
  }

  return (
    <Card className="w-full p-3 mb-5">
      <div className="text-2xl font-semibold py-3">All Funds History</div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={expenses}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(date) => new Date(date).toLocaleDateString()} // Format timestamp to a readable date
          />
          <YAxis />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Line type="monotone" dataKey="xrd_added" stroke="#82ca9d" name="XRD Added" />
          <Line type="monotone" dataKey="current_xrd" stroke="#8884d8" name="Current XRD" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default FundHistoryGraph;
