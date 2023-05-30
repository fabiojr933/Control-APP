const knex = require('../config/connection');

class GraficsController {

    async launchExpenseAnoMes(req, res) {
        var lista = [];
        try {
            if (!req.params.ano || !req.params.mes) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }
            let dados = await knex.raw(`select expense.description, sum(launchExpense.value) as valor from launchExpense
            join expense on launchExpense.id_expense = expense.id where launchExpense.month = ${req.params.mes} and launchExpense.year = ${req.params.ano}
            and launchExpense.user = '${req.params.usuario}' group by 1`);
            if (dados[0] === [] || !dados[0] || dados[0] == null || dados[0] == undefined) {
                lista.push({ 'description': 'Sem dados', 'valor': 0 });
                return res.status(200).json(lista);
            } else {
                return res.status(200).json(dados);
            }
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async launchRevenueAnoMes(req, res) {
        var lista = [];
        try {
            if (!req.params.ano || !req.params.mes) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }
            let dados = await knex.raw(`select revenue.description, sum(launchRevenue.value) as valor from launchRevenue join revenue on launchRevenue.id_revenue = revenue.id
            where launchRevenue.month = ${req.params.mes} and launchRevenue.year = ${req.params.ano} and launchRevenue.user = '${req.params.usuario}' group by 1`);
            console.log(dados[0])
            if (dados[0] === [] || !dados[0] || dados[0] == null || dados[0] == undefined) {
                lista.push({ 'description': 'Sem dados', 'valor': 0 });
                return res.status(200).json(lista);
            } else {
                return res.status(200).json(dados);
            }

        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }


    async launchRevenueLaunchExpenseAnoMes(req, res) {
        var lista = [];
        try {
            if (!req.params.ano || !req.params.mes || !req.params.usuario) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }
            let despesaFabio = await knex.raw(`select DISTINCT sum(launchExpense.value) as valor from launchExpense 
            where launchExpense.month = ${req.params.mes} and launchExpense.year = ${req.params.ano} and launchExpense.user = '${req.params.usuario}'`);

            if (despesaFabio[0].valor == null) {
                despesaFabio[0].valor = 0.00
            }

            var valorDepesa = despesaFabio[0].valor;
            lista.push({ 'despesa': 'despesa', 'valor': valorDepesa });

            let receitaFabio = await knex.raw(`select DISTINCT sum(launchRevenue.value) as valor from launchRevenue 
            where launchRevenue.month = ${req.params.mes} and launchRevenue.year = ${req.params.ano} and launchRevenue.user = '${req.params.usuario}'`);

            if (receitaFabio[0].valor == null) {
                receitaFabio[0].valor = 0.00
            }

            var valorReceita = receitaFabio[0].valor;
            lista.push({ 'despesa': 'receita', 'valor': valorReceita });

            return res.status(200).json(lista);
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async launchTotalAnoMes(req, res) {
        var lista = [];
        try {
            if (!req.params.ano || !req.params.mes) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }


            let despesaFabio = await knex.raw(`select DISTINCT sum(launchExpense.value) as valor from launchExpense 
            where launchExpense.month = ${req.params.mes} and launchExpense.year = ${req.params.ano} and launchExpense.user = 'Fabio'`);

            let despesaFlavia = await knex.raw(`select DISTINCT sum(launchExpense.value) as valor from launchExpense 
            where launchExpense.month = ${req.params.mes} and launchExpense.year = ${req.params.ano} and launchExpense.user = 'Flavia'`);

            if (despesaFabio[0].valor == null) {
                despesaFabio[0].valor = 0.00
            }
            if (despesaFlavia[0].valor == null) {
                despesaFlavia[0].valor = 0.00
            }
            var valorDepesa = despesaFabio[0].valor + despesaFlavia[0].valor;
            lista.push({ 'despesa': 'despesa', 'valor': valorDepesa });

            let receitaFabio = await knex.raw(`select DISTINCT sum(launchRevenue.value) as valor from launchRevenue 
            where launchRevenue.month = ${req.params.mes} and launchRevenue.year = ${req.params.ano} and launchRevenue.user = 'Fabio'`);

            let receitaFlavia = await knex.raw(`select DISTINCT sum(launchRevenue.value) as valor from launchRevenue 
            where launchRevenue.month = ${req.params.mes} and launchRevenue.year = ${req.params.ano} and launchRevenue.user = 'Flavia'`);

            if (receitaFabio[0].valor == null) {
                receitaFabio[0].valor = 0.00
            }
            if (receitaFlavia[0].valor == null) {
                receitaFlavia[0].valor = 0.00
            }
            var valorReceita = receitaFabio[0].valor + receitaFlavia[0].valor;
            lista.push({ 'despesa': 'receita', 'valor': valorReceita });

            return res.status(200).json(lista);
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

}
module.exports = GraficsController


