import requests, sys
from decouple import config
API = 'https://financialmodelingprep.com/api/v3'
KEY = config('KEY')


def unlevered_free_cash_flow(income_statement, cash_flow, historical, projected_years, tax_rate):
    projected_income =  {}
    historical_income = []
    for i in range(0,historical):
        period = historical - i
        ebit = income_statement[i]['operatingIncome']
        tax = ebit * tax_rate
        dep_am = income_statement[i]['depreciationAndAmortization']
        capex = cash_flow[i]['capitalExpenditure']
        change_nwc = cash_flow[i]['changeInWorkingCapital']
        unlevered_fcf = ebit - tax + dep_am - change_nwc - capex
        historical_income.append({'period': period, 'ebit': ebit, 'tax': tax, 'dep_am': dep_am, 'change_nwc': change_nwc, 'capex': capex, 'unlevered_fcf': unlevered_fcf})
    income = {'projected_income':projected_income, 'historical_income':historical_income}
    return income

def project_balance_sheet(balance_sheet):
    cash = None
    ar = None
    inventory = None
    ppe = None
    goodwill = None
    short_term_debt = None
    ap = None
    ltd = None
    equity_capital = None
    retained_earnings = None



def run_dcf(ticker, historical = 5, projected_years = 5, tax_rate = 0.21):
    income_statement = requests.get(f'{API}/income-statement/{ticker.upper()}?apikey={KEY}').json()
    #balance_sheet = requests.get(f'{API}/balance-sheet-statement/{ticker.upper()}?apikey={KEY}').json()
    #cash_flow =requests.get(f'{API}/cash-flow-statement/{ticker.upper()}?apikey={KEY}').json()
    #return unlevered_free_cash_flow(income_statement, cash_flow, historical, projected_years, tax_rate)
    return income_statement[0]
    
print(run_dcf(sys.argv[1]))
