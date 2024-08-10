import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./financial-record-form";
import { FinancialRecordList } from "./financial-record-list";
import "./financial-record.css";

import { useMemo } from "react";
import { useFinancialRecords } from "../../contexts/useFinancialRecords";

export const Dashboard = () => {
  const { user } = useUser();
  const { records } = useFinancialRecords();

  const totalExpenses = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);
  return (
    <div className="dashboard-container">
      <h1>Welcome {user?.firstName}! Here are Your Finances:</h1>
      <FinancialRecordForm />
      <div>Total Expenses: ₹ {totalExpenses}</div>
      <FinancialRecordList />
    </div>
  );
};
