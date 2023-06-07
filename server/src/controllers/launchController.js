const knex = require('../config/connection');

class launchController {

    async launchExpense(req, res) {
        try {
            if (!req.body.value || !req.body.type || !req.body.id_expense || !req.body.user) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }
            const data = {
                value: req.body.value,
                type: req.body.type,
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
                user: req.body.user,
                fixed: req.body.fixed,
                id_expense: req.body.id_expense,
                fixedRodam: req.body.fixedRodam,
                ParcRodam: req.body.ParcRodam,
                parc: req.body.parc,
                data: req.body.data,
                sequenFixo: req.body.sequenFixo
            }
            await knex('launchExpense').insert(data);
            return res.status(201).json(data);
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async launchRevenue(req, res) {
        try {
            if (!req.body.value || !req.body.type || !req.body.id_revenue || !req.body.user) {
                return res.status(400).json({ error: 'Todos os campos são obrigatorio' });
            }
            const data = {
                value: req.body.value,
                type: req.body.type,
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
                user: req.body.user,
                fixed: req.body.fixed,
                id_revenue: req.body.id_revenue,
                fixedRodam: req.body.fixedRodam,
                ParcRodam: req.body.ParcRodam,
                parc: req.body.parc,
                data: req.body.data,
                sequenFixo: req.body.sequenFixo
            }
            await knex('launchRevenue').insert(data);
            return res.status(201).json(data);
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async removeLaunchExpense(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchExpense').where({ id: id }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async removelaunchRevenue(req, res) {
        const id = req.params.id;
        try {
            if (!id) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchRevenue').where({ id: id }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }
    async removelaunchRevenuefixedRodam(req, res) {
        const fixedRodam = req.params.fixedRodam;
        try {
            if (!fixedRodam) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchRevenue').where({ fixedRodam: fixedRodam }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }
    async removeLaunchExpensefixedRodam(req, res) {
        const fixedRodam = req.params.fixedRodam;
        try {
            if (!fixedRodam) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchExpense').where({ fixedRodam: fixedRodam }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }




    async removelaunchRevenueParcRodam(req, res) {
        const ParcRodam = req.params.ParcRodam;
        try {
            if (!ParcRodam) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchRevenue').where({ ParcRodam: ParcRodam }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }



    async removeLaunchExpenseParcRodam(req, res) {
        const ParcRodam = req.params.ParcRodam;
        try {
            if (!ParcRodam) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchExpense').where({ ParcRodam: ParcRodam }).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }



    async removeLaunchExpenseApartirDesde(req, res) {

        const fixedRodam = req.params.fixedRodam;
        const sequenFixo = req.params.sequenFixo;
  
        try {
            if (!fixedRodam) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchExpense').whereRaw(`launchExpense.fixedRodam >= ${fixedRodam} and launchExpense.sequenFixo >= ${sequenFixo} `).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async removeLaunchRevenueApartirDesde(req, res) {
        const fixedRodam = req.params.fixedRodam;
        const sequenFixo = req.params.sequenFixo;
        try {
            if (!fixedRodam) {
                return res.status(400).json({ error: 'É preciso informar o lançamento' });
            }
            await knex('launchRevenue').whereRaw(`launchRevenue.fixedRodam >= ${fixedRodam} and launchRevenue.sequenFixo >= ${sequenFixo}`).del();
            return res.status(200).json({ ok: 'ok' });
        } catch (error) {         
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async AllLaunchRevenue(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let dados = await knex.raw('select launchRevenue.*, revenue.description from revenue join launchRevenue on revenue.id = launchRevenue.id_revenue WHERE launchRevenue.month = ' + month + ' AND launchRevenue.year = ' + year);
          
            return res.status(200).json(dados);
        } catch (error) {       
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async AllLaunchExpense(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let dados = await knex.raw('select launchExpense.*, expense.description from  expense join launchExpense on expense.id = launchExpense.id_expense WHERE launchExpense.month = ' + month + ' AND launchExpense.year = ' + year);
            return res.status(200).json(dados);
        } catch (error) {         
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }


    async SumLaunchExpense(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let dados = await knex.raw('select sum(launchExpense.value) as value from launchExpense where launchExpense.month = ' + month + ' and launchExpense.year = ' + year);

            if (dados[0].value == null) {
                var dadosZerado = [];
                dadosZerado.push({ value: 0.00 })
                return res.status(200).json(dadosZerado);
            } else {
                return res.status(200).json(dados);
            }
        } catch (error) {          
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async SumLaunchRevenue(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let dados = await knex.raw('select sum(launchRevenue.value) as value from launchRevenue where launchRevenue.month = ' + month + ' and launchRevenue.year = ' + year);
            if (dados[0].value == null) {
                var dadosZerado = [];
                dadosZerado.push({ value: 0.00 })
                return res.status(200).json(dadosZerado);
            } else {
                return res.status(200).json(dados);
            }
        } catch (error) {        
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async allLaunchExpenseUser(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let user = req.params.user;
            let dados = await knex.raw(`select launchExpense.id, launchExpense.fixed, launchExpense.fixedRodam, launchExpense.sequenFixo, launchExpense.parc, launchExpense.ParcRodam, expense.description, launchExpense.value from launchExpense 
            join expense on expense.id = launchExpense.id_expense
            where launchExpense.month = ${month} and launchExpense.year = ${year}  and launchExpense.user = "${user}"`);
            return res.status(200).json(dados);
        } catch (error) {       
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async allLaunchRevenueUser(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let user = req.params.user;
            let dados = await knex.raw(`select launchRevenue.id, launchRevenue.fixed, launchRevenue.fixedRodam, launchRevenue.sequenFixo, launchRevenue.parc, launchRevenue.ParcRodam, revenue.description, launchRevenue.value from launchRevenue 
            join revenue on revenue.id = launchRevenue.id_revenue
            where launchRevenue.month = ${month} and launchRevenue.year = ${year}  and launchRevenue.user = "${user}"`);
            return res.status(200).json(dados);
        } catch (error) {        
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }


    async SumLaunchExpenseUser(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let user = req.params.user;
            let dados = await knex.raw(`select sum(launchExpense.value) as value from launchExpense where launchExpense.month = ${month} 
            and launchExpense.year = ${year} and launchExpense.user  = "${user}"`);

            if (dados[0].value == null) {
                var dadosZerado = [];
                dadosZerado.push({ value: 0.00 })
                return res.status(200).json(dadosZerado);
            } else {
                return res.status(200).json(dados);
            }
        } catch (error) {          
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

    async SumLaunchRevenueUser(req, res) {
        try {
            let month = req.params.month;
            let year = req.params.year;
            let user = req.params.user;
            let dados = await knex.raw(`select sum(launchRevenue.value) as value from launchRevenue where launchRevenue.month = ${month}
             and launchRevenue.year = ${year} and launchRevenue.user  = "${user}"`);
            if (dados[0].value == null) {
                var dadosZerado = [];
                dadosZerado.push({ value: 0.00 })
                return res.status(200).json(dadosZerado);
            } else {
                return res.status(200).json(dados);
            }
        } catch (error) {        
            return res.status(400).json({ error: 'Ops aconteceu um erro! chama o Fabio' });
        }
    }

}
module.exports = launchController;