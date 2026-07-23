"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const DATA = [
  { day: "1", vues: 42 }, { day: "3", vues: 58 }, { day: "5", vues: 51 },
  { day: "7", vues: 74 }, { day: "9", vues: 68 }, { day: "11", vues: 91 },
  { day: "13", vues: 83 }, { day: "15", vues: 107 }, { day: "17", vues: 98 },
  { day: "19", vues: 122 }, { day: "21", vues: 115 }, { day: "23", vues: 134 },
  { day: "25", vues: 128 }, { day: "27", vues: 149 }, { day: "29", vues: 142 },
];

export default function DashboardChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E9F2" vertical={false} />
        <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#5D7BA3" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#5D7BA3" }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ borderRadius: 4, borderColor: "#E2E9F2", fontSize: 13 }}
          labelFormatter={(l) => `Jour ${l}`}
        />
        <Area type="monotone" dataKey="vues" stroke="#B08F26" strokeWidth={2} fill="url(#goldFill)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
