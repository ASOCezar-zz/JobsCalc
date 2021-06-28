const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        res.render("profile", { profile: await Profile.get() })
    },
    
    async update(req, res) {
        const data = req.body; //pegar os dados 
        const weeksPerYear = 52; //semanas no ano
        const weeksPerMonth = (weeksPerYear - data.vacation_per_year) / 12; //remover as ferias do ano 
        const weekTotalHours = data.hours_per_day * data.days_per_week; //horas trabalhadas na semana 
        const monthlyTotalHours = weekTotalHours * weeksPerMonth; //total de horas trabalhadas no mês

        const valueHour = data.monthly_budget / monthlyTotalHours; // valor da hora

        await Profile.update({
            ... await Profile.get(),
            ...req.body,
            value_hour: valueHour,
        })
        
        return res.redirect('/profile');
    },
}