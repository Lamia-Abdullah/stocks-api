export function upsertstockController(stocks: any[], new_stock: any) {
  const stocksIndex = stocks.findIndex((el) => el.id === new_stock.id);
  if (stocksIndex === -1) {
    stocks.push(new_stock);
  } else {
    stocks[stocksIndex] = {
      ...stocks[stocksIndex],
      ...new_stock,
    };
  }
  return stocks;
}
