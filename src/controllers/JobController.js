const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile =  require('../model/Profile');

module.exports = {
    create(req, res) {
        res.render("job")
    },

    async save(req, res) {

        await Job.save({
            name: req.body.name,
            daily_hours: req.body.daily_hours,
            total_hours: req.body.total_hours,
            created_at: Date.now(), //atribuir a data de criação do projeto
        })
        return res.redirect('/');
    },

    async show(req, res) {

        const jobs = await Job.get();
        const jobId = req.params.id;
        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if (!job) res.send('Job not found');

        const profiles = await Profile.get();

        job.budget = JobUtils.calculateBudget(job, profiles.value_hour)

        return res.render("job-edit", { job }) 
    },

    async update(req, res) {

        
        const jobId = req.params.id;


        const updatedJob = {
            name: req.body.name,
            total_hours: req.body.total_hours,
            daily_hours: req.body.daily_hours,
        }

        await Job.update(updatedJob, jobId);

        res.redirect('/job/' + jobId);
    },

    async delete(req, res) {

        const jobId = req.params.id;

        await Job.delete(jobId);

        return res.redirect('/');
    },
}