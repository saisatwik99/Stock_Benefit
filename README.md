# Stock_Benefit
* Stock Benefit is an app that shows share price of stocks which the user wishes to know and invest. <br> <br>
  **Link to the Web App-** https://afternoon-bayou-02898.herokuapp.com/ <br>
  FOR NOW- Search for a stock with exact stock name- like for google, their stock name is **"GOOG".**
  **You are advised-** to open the link in a PC/Laptop for better User experience and Design as only beginning part of the web App is responsive whereas the rest is not ( as the app has been constructed in a very less time ). <br>
  **You are also advised-** to read this entire readme file to understand the importance and efficiency of the app and hurdles faced during the journey. 

**NOTE:** <br>
* This Web App has been designed as part of an internal hackathon organised by a technical club named IOTA of our institute. <br>
* The idea that is part of a hackathon which we chose is to make a **web application that uses an external API.**<br>
* As part of the idea we are asked to use the data from the external API. ( The results page of the web app uses the data to show the stock prices in a tabular form which includes Opening value, Closing value, High value, Low value and Volume of that particular Stock, which are the data received from the external API ).
* Also, we are asked to provide additional insights that are not directly available through the API. So, we created a seperate User authentication and also a watchlist feature in which a user can add his favourite stock into his watchlist.
# Impact 
* The web app aims to help those middle class of people to analyse stocks, shares and the actual market. 
* Thus, enabling them to intelligently invest their savings and make good profits.
# Features
- Good looking UI
- Web Application made using an external API ( Alpha vantage API ) to get the information.
- Complete Application for stock trading and analysis. 
- Provides basic information without any login. Furthermore, asking for a login if the user wishes to add a particular stock to his watchlist.
- A Watchlist feature in which user can add some stocks into his watchlist so that it becomes easier to watch them again later.
- The stock prices are shown with statistics of daily, weekly and monthly basis. Thus, giving a broad overview to the user whether to invest in a particular stock or not.
- Separate User login for different users helping them have an eye on their interested stocks. 
# Implementation
* HOME PAGE- A good looking scrolling home page is designed with good stock related suggestions and quotes.
![Home Page](/images/homepage.png "Home Page")
* SEARCH PAGE- A user can search for his stock to analyse and later invest.
![Search Page](/images/searchpage.png "Search Page")
* RESULTS PAGE- The price of that particular stock user searches appears here as a result.
![Results Page](/images/resultspage.png "Results Page")
* LOGIN PAGE- If the user wishes to add the stock to his watchlist the user is asked to login.
![Login Page](/images/loginpage.png "Login Page")
* SIGNUP PAGE- If the user is a new user, the user is asked to sign up and then login.
![Signup Page](/images/signuppage.png "Signup Page")
* WATCHLIST PAGE- The stock is now added to your watchlist and watch it as frequently as the userr wishes to.
![Watchlist Page](/images/watchlistpage.png "Watchlist Page")
* **Local Implementation**
In case, you want to download the code from our repo and watch things locally, you are first advised to
* install node and mongo
* Then create and use your local data base.(Since, we used a cloud based server- Mongo Atlas)
* Open node command prompt and go to the directory of this downloaded Stock_Benefit folder.
* Use **npm init** to initialise npm
* You can install the required modules using **npm install modulename --save**
* You can go through all the modules we useed in the package.json file.
# Tests/Exception Handling
- The exception case was what if the user searches for a keyword that is not a part of API. Then wee came up with a solution of showing a page of **NO RESULT**
![No result Page](/images/noresultpage.png "No-result Page")
# Support
If you have questions about the Project or just want to interact, you can contact us.

* [Sai Satwik](mailto:saisatwik99@gmail.com) 
* [Aravind Challa](mailto:aravind.challa1823@gmail.com) 
* [Sathwik Veeramaneni](mailto:sathwikrao2001@gmail.com) 

Don't forget that we are open to suggestions, extensions or adaptations. Feel free to discuss or propose new ideas for the project!
