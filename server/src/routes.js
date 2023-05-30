const express = require('express');
const routes = express.Router();
const Revenue = require('./controllers/revenueController');
const Expense = require('./controllers/expenseController');
const Launch =  require('./controllers/launchController');
const Grafics = require('./controllers/graficsController');

const revenue = new Revenue();
const expense = new Expense();
const launch = new Launch();
const grafics = new Grafics();

routes.post('/revenue', revenue.create);
routes.get('/revenue', revenue.All);
routes.delete('/revenue/:id', revenue.remove);

routes.post('/expense', expense.create);
routes.get('/expense', expense.All);
routes.delete('/expense/:id', expense.remove);


routes.post('/launchExpense', launch.launchExpense);
routes.post('/launchRevenue', launch.launchRevenue);

routes.delete('/removeLaunchExpense/:id', launch.removeLaunchExpense);
routes.delete('/removeLaunchRevenue/:id', launch.removelaunchRevenue);

routes.delete('/removeLaunchExpenseFixedRodam/:fixedRodam', launch.removeLaunchExpensefixedRodam);
routes.delete('/removeLaunchRevenueFixedRodam/:fixedRodam', launch.removelaunchRevenuefixedRodam);

routes.delete('/removeLaunchExpenseApartirDesde/:fixedRodam/:ano', launch.removeLaunchExpenseApartirDesde);
routes.delete('/removeLaunchRevenueApartirDesde/:fixedRodam/:ano', launch.removeLaunchRevenueApartirDesde);

routes.get('/AllLaunchExpense/:month/:year', launch.AllLaunchExpense);
routes.get('/AllLaunchRevenue/:month/:year', launch.AllLaunchRevenue);

routes.get('/SumLaunchExpense/:month/:year', launch.SumLaunchExpense);
routes.get('/SumLaunchRevenue/:month/:year', launch.SumLaunchRevenue);

routes.get('/allLaunchRevenueUser/:month/:year/:user', launch.allLaunchRevenueUser);
routes.get('/allLaunchExpenseUser/:month/:year/:user', launch.allLaunchExpenseUser);

routes.get('/SumLaunchExpenseUser/:month/:year/:user', launch.SumLaunchExpenseUser);
routes.get('/SumLaunchRevenueUser/:month/:year/:user', launch.SumLaunchRevenueUser);

routes.get('/grafics/launchExpenseAnoMes/:mes/:ano/:usuario', grafics.launchExpenseAnoMes);
routes.get('/grafics/launchRevenueAnoMes/:mes/:ano/:usuario', grafics.launchRevenueAnoMes);
routes.get('/grafics/launchRevenueLaunchExpenseAnoMes/:mes/:ano/:usuario', grafics.launchRevenueLaunchExpenseAnoMes);
routes.get('/grafics/launchTotalAnoMes/:mes/:ano', grafics.launchTotalAnoMes);

module.exports = routes;