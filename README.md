![GitHub Workflow Status](https://img.shields.io/github/workflow/status/denstuk/traderius/hub-ci?label=@Traderius/Hub%20CI)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/denstuk/traderius/notifier-ci?label=@Traderius/Notifier%20CI)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/denstuk/traderius/trader-ci?label=@Traderius/Trader%20CI)
![Lines of code](https://img.shields.io/tokei/lines/github/denstuk/traderius?label=Total)
![GitHub language count](https://img.shields.io/github/languages/count/denstuk/traderius?label=Languages)

# Traderius

## Traderius is open-source software that provides instruments to analyse, predict and manipulate with stocks (crypto) market

### Project structure

As an architecture pattern selected Microservice Architecture.  

About Services:  

- trader (gateway between stocks(crypto) market and system)  
- predictor (data analysis and prediction for next solution)  
- notifier (notification system)  
- client (desktop application for monitoring) 

### Project conventions

- [Git commits convention](https://www.conventionalcommits.org/en/v1.0.0/)  

### How it is works?

Every selected period system analysed stocks market and makes prediction for better investment.
