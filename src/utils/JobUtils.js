module.exports = {
    remainingDays(job) {
        const remainingDays = (job.total_hours / job.daily_hours).toFixed();
    
        const createdDate = new Date(job.created_at);
        const dueDay = createdDate.getDate() + Number(remainingDays);
        const dueDate = createdDate.setDate(dueDay);
    
        const timeDiffMs = dueDate -  Date.now();
        const dayDiff = Math.ceil(timeDiffMs / 86400000);
    
        return dayDiff;
    },
    calculateBudget: (job, valueHour) => valueHour * job.total_hours
}