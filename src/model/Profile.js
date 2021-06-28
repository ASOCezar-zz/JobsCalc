const Database = require('../db/config')

module.exports = {
     async get(){
        const db =  await Database();

        const data = await db.get(`SELECT * FROM profile`);

        await db.close();

        return data;
    },

    async update(newData) {
        
        const db =  await Database();

        db.run(`UPDATE profile SET
            name = "${newData.name}",
            avatar = "${newData.avatar}",
            monthly_budget = ${Number(newData.monthly_budget)},
            days_per_week = ${Number(newData.days_per_week)},
            hours_per_day = ${Number(newData.hours_per_day)},
            vacation_per_year = ${Number(newData.vacation_per_year)},
            value_hour = ${Number(newData.value_hour)}
            `)

        await db.close();
    }
}