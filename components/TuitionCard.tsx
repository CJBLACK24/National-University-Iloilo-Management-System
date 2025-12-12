"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TuitionCard = () => {
  // Mock data based on the user's uploaded receipt image
  const balance = 18150.76;
  const currency = "PHP";

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white w-full">
      <CardHeader>
        <CardTitle className="text-lg">Tuition Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-red-400">
          {currency} {balance.toLocaleString()}
        </div>
        <p className="text-sm text-zinc-400 mt-2">
          Assessment for 2nd Semester 2025-2026
        </p>
      </CardContent>
    </Card>
  );
};

export default TuitionCard;
