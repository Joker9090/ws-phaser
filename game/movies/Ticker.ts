class Ticker {
    ms: number;
    time: number = 0;
    jobs: TickerJob[] = [];
    constructor(ms: number) {
        this.ms = ms;
        this.runTicker = this.runTicker.bind(this);
    }

    _runTicker() {
        this.time += this.ms;
        this.runJobs();
    }

    runTicker() {
        this._runTicker();
    }

    addJob(job: TickerJob) {
        this.jobs.push(job);
    }

    addNextJob(job: TickerJob) {
        job.time += this.time + this.ms;
        this.jobs.push(job);
    }


    deleteJob(jobId: number) {
        const find = this.jobs.find((job) => job.id == jobId);
        if (find && find.onDeleted) {
            find.onDeleted(find, this);
        }
        this.jobs = this.jobs.filter((job) => job.id != jobId);
    }

    deleteAllJobs(){
        this.jobs = []
    }

    getDiffTime(job: TickerJob) {
        return this.time - job.time;
    }

    runJobs() {
        this.jobs.forEach((job) => {
            if (job.status == "done") {
                // DELETE JOBS
                if(!job.keepAlive) this.deleteJob(job.id);
            } else if (this.time % job.time == 0 && (job.status == "pending" || job.repeat)) {
                // RUN JOB
                job.status = "running";
                job.callback(job, this);
            } else if (job.status == "running" && !job.repeat) {
                // MARK DONE JOBS
                job.status = "done";
            }

            // KILL JOBS AFTER
            if (job.killAfter > 0 && this.getDiffTime(job) > job.killAfter) {
                this.deleteJob(job.id);
            }
        });
    }

    getTime() {
        return this.time;
    }
}

export default Ticker;

export class TickerJob {
    id: number;
    status: string = "pending";
    time: number;
    callback: (job: TickerJob, ticker: Ticker) => void;
    repeat: boolean = false;
    killAfter: number = 0;
    keepAlive: boolean = false;
    onDeleted?: (job: TickerJob, ticker: Ticker) => void;

    constructor(id: number, time: number, callback: (job: TickerJob, ticker: Ticker) => void,repeat: boolean = false, killAfter: number = 0, keepAlive: boolean, onDeleted?: (job: TickerJob, ticker: Ticker) => void) {
        this.status = "pending";
        this.killAfter = killAfter;
        this.id = id;
        this.repeat = repeat;
        this.time = time;
        this.keepAlive = keepAlive;
        this.callback = callback;
        this.onDeleted = onDeleted;
    }
}