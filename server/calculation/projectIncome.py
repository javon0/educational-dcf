import sys
import json
# income = json.loads(sys.argv[1])
# rates = json.loads(sys.argv[2])
# da = json.loads(sys.argv[3])
income = {
'date': "2019-09-28",
'symbol': "AAPL",
'revenue': 260174000000,
'costOfRevenue': 161782000000,
'grossProfit': 98392000000,
'operatingExpenses': 34462000000,
'operatingIncome': 63930000000,
'depreciationAndAmortization': 12547000000,
'finalLink': "https://www.sec.gov/Archives/edgar/data/320193/000032019319000119/a10-k20199282019.htm"}
rates = [0.05,0.05,0.05,0.05,0.05]
da = 0.05
cogs_percent = income['costOfRevenue'] / income['revenue']
oe_less_da = income['operatingExpenses'] - income['depreciationAndAmortization']
oe_percent = oe_less_da / income['revenue']

py1_revenue = income['revenue'] * (1 + rates[0])
py1_cogs = cogs_percent * py1_revenue
py1_gross = py1_revenue - py1_cogs
py1_oe = oe_percent * py1_revenue
py1_da = income['depreciationAndAmortization'] * (1 + da['da1'])
py1_ebit = py1_gross - py1_oe
py1_date = int(income['date'][:4]) + 1

py1_data = {'date': str(py1_date),'revenue':py1_revenue, 'costOfRevenue': py1_cogs, 'grossProfit': py1_gross,'depreciationAndAmortization': py1_da,'operatingExpenses': py1_oe, 'operatingIncome': py1_ebit, 'growth_rate': rates[0]}

data = [py1_data]
for i in range(1,5):
    revenue = data[i - 1]['revenue'] * (1 + rates[i])
    costOfRevenue = cogs_percent * revenue
    grossProfit = revenue - costOfRevenue
    operatingExpenses = oe_percent * revenue
    operatingIncome = grossProfit - operatingExpenses
    date = int(income['date'][:4]) + i + 1
    data.append({'date': str(date),'revenue': revenue, 'costOfRevenue': costOfRevenue, 'grossProfit': grossProfit,'operatingExpenses': operatingExpenses, 'operatingIncome': operatingIncome, 'growth_rate': rates[i]})




print(json.dumps(data))
