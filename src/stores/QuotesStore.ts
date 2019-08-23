import {action, IObservableArray, observable} from 'mobx'

export interface Quote {
  highestBid: string,
  last: string,
  percentChange: string,
  ticker: string,
}

interface Json {
  [key: string]: Quote,
}

export class QuotesStore {

  public quotes = observable([]) as IObservableArray<Quote>

  @observable public loading: boolean = false

  @observable public loaded: boolean = false

  @observable public error: string | null = null

  @action
  public loadData = (withSpinner: boolean = false): void => {
    if (withSpinner) { this.loading = true }
    fetch('https://poloniex.com/public?command=returnTicker')
      .then(response => response.status === 200
        ? response.json()
        : Promise.reject(new Error(`${response.status.toString()} Server error`))
      )
      .then(json => json.error ? Promise.reject(new Error(json.error)) : json)
      .then(this.getQuotes)
      .then(action((quotes: Quote[]) => {
          this.quotes.replace(quotes)
          this.error = null
          this.loaded = true
          this.loading = false
        }),
        action((error: Error) => {
          this.error = error.toString()
          this.loading = false
          // tslint:disable-next-line:no-console
          console.log(error)
        }),
      )
  }

  private getQuotes = (quotes: Json): Quote[] => Object.entries(quotes).map(([key, obj]) => ({ ...obj, ticker: key }))
}

const store = new QuotesStore()

export default store
