"use client";

import { useEffect, useState } from "react";
import { LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";

import { ForecastItem } from "@/interfaces";

const chartConfig = {
  desktop: {
    label: "Time",
    color: "#666666",
  },
} satisfies ChartConfig;

interface LineWeatherChartProp {
  hourly: ForecastItem[];
}

interface AnimatedLabelProps {
  x: number;
  y: number;
  value: number;
}

const AnimatedLabel: React.FC<AnimatedLabelProps> = ({ x, y, value }) => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 640) {
        setFontSize(10);
      } else {
        setFontSize(16);
      }
    };

    updateFontSize();
    window.addEventListener("resize", updateFontSize);

    return () => window.removeEventListener("resize", updateFontSize);
  }, []);

  return (
    <motion.text
      x={x}
      y={y - 8}
      textAnchor="middle"
      fontSize={fontSize}
      fontFamily="Geologica"
      className="fill-foreground"
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {value} °C
    </motion.text>
  );
};

const LineWeatherChart: React.FC<LineWeatherChartProp> = ({ hourly }) => {
  return (
    <ChartContainer config={chartConfig} className="w-full h-[100%]">
      <LineChart
        data={hourly}
        margin={{ left: 30, right: 30, top: 20, bottom: 20 }}
        className="w-full h-full"
      >
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={4}
          tick={{
            dy: -10,
            fill: "#fff",
            fontSize: 18,
            fontFamily: "Geologica",
          }}
          tickFormatter={(value) => {
            return format(value, "HH:mm");
          }}
        />
        <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
        <Line
          dataKey="temperature"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
          isAnimationActive
          animationDuration={800}
        >
          <LabelList content={<AnimatedLabel x={0} y={0} value={0} />} />
        </Line>
      </LineChart>
    </ChartContainer>
  );
};

export default LineWeatherChart;
