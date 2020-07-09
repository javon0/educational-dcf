import requests
from decouple import config
API = 'https://financialmodelingprep.com/api/v3'
KEY = config('KEY')
def run_dcf(ticker):
    response = requests.get(f'{API}/income-statement/{ticker.upper()}?apikey={KEY}').json()
    return response[0]['symbol']

print(run_dcf('goog'))
