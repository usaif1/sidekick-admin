// Helper function to compute date variables for the transaction query
export const getDatesForActiveTab = (tab: "This Month" | "Last Month") => {
  const now = new Date();
  if (tab === "This Month") {
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
      _gte: firstDay.toISOString(),
      _lte: now.toISOString(),
    };
  } else {
    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1
    );
    const lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return {
      _gte: firstDayLastMonth.toISOString(),
      _lte: lastDayLastMonth.toISOString(),
    };
  }
};
