//const { ensureAuthenticated } = require(path.join(__basedir,'/helpers/auth'));
//const plaidController = require(path.join(__basedir,'/controllers/*.js'));
const PlaidController = require(__basedir + '/api/controllers/plaidController');
exports.register = (express) => {

    const plaidRouter = express.Router();

    plaidRouter.post("/api/get_access_token", function(request, response, next) {
        global.__plaidClient = new PlaidController();
        __plaidClient.publicToken = request.body.public_token;
        __plaidClient.getAccessToken().then(link => response.json(link));
    });

    plaidRouter.get("/api/accounts", function(request, response, next) {
        // Retrieve high-level account information and account and routing numbers
        // for each account associated with the Item.
        __plaidClient
            .getAccountInfo(__plaidClient.accessToken)
            .then(accountinfo => response.json(accountinfo));
    });

    plaidRouter.post("/api/item", function(request, response, next) {
        __plaidClient
            .getItem(__plaidClient.accessToken)
            .then(itemInfo => response.json(itemInfo));
    });

    plaidRouter.post("/api/transactions", function(request, response, next) {
        __plaidClient.transactionDaysAgo = 30;
        __plaidClient
            .getTransactions()
            .then(transactions => response.json(transactions));
    });

    return plaidRouter;
};