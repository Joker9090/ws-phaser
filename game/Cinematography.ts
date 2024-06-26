import Phaser from "phaser";

class Cinematography extends Phaser.Scene {
  ticker: Ticker;
  constructor() {
    super({ key: "Cinematography" });

    const tickerMS = 100;
    this.ticker = new Ticker(tickerMS);
  }

  preload(this: Phaser.Scene) {
   
  }

  scaleImage(image: Phaser.GameObjects.Image) {
    image.displayHeight = this.cameras.main.displayHeight
    image.displayWidth = this.cameras.main.displayWidth
    image.y = this.cameras.main.displayHeight / 2
    image.x = this.cameras.main.displayWidth / 2
  }

  
  create(this: Cinematography, { level }: any) {
    console.log("BARTO, Cinematography");
    
    // START ticker
    this.time.addEvent({
      delay: this.ticker.ms,
      callback: this.ticker.runTicker,
      // callbackScope: this,
      loop: true,
    });


    const middlePoint = {
      x: this.cameras.main.displayWidth / 2,
      y: this.cameras.main.displayHeight / 2,
    };
    const image1 = this.add.image(middlePoint.x, middlePoint.y, 'cine_background').setOrigin(0.5, 0.5);

    const image2 = this.add.image(middlePoint.x, middlePoint.y * 3, 'cine_capsula').setOrigin(0.5, 0.5);
   
    image2.scale = 3.5;
    this.scaleImage(image1);
    image1.scale += 2.5;


    // ADD JOBS
    this.ticker.addJob(new TickerJob(1, 100, (job) => {
      this.tweens.add({
        targets: image1,
        x: middlePoint.x + 100,
        y: middlePoint.x + 200,
        duration: 25000,
        ease: 'Linear'
      });
    }, false));

    this.ticker.addJob(new TickerJob(2, 500, (job) => {
      this.tweens.add({
        targets: image2,
        y: -200,
        angle: 300,
        duration: 25000,
        ease: 'Linear'
      });
    }, false));

    this.ticker.addJob(new TickerJob(3, 9000, (job) => {
      this.tweens.add({
        targets: [image1, image2],
        alpha: 0,
        duration: 1000,
        ease: 'Linear'
      });
    }, false));

  }


  update(this: Cinematography, delta: number) {
 
  }
}

export default Cinematography;


class TickerJob {
  id: number;
  status: string = "pending";
  time: number;
  callback: (job: TickerJob, ticker: Ticker) => void;
  repeat: boolean = false;
  killAfter: number = 0;

  constructor(id: number,time: number, callback: (job: TickerJob, ticker: Ticker) => void, repeat: boolean = false, killAfter: number = 0) {
    this.status = "pending";
    this.killAfter = killAfter;
    this.id = id;
    this.repeat = repeat;
    this.time = time;
    this.callback = callback;
  }
}

class Ticker {
  ms: number;
  time: number = 0;
  jobs: TickerJob[] = [];
  constructor(ms:number) {
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

  deleteJob(jobId: number) {
    this.jobs = this.jobs.filter((job) => job.id != jobId);
  }

  getDiffTime(job: TickerJob) {
    return this.time - job.time;
  }

  runJobs() {
    this.jobs.forEach((job) => {
      if (job.status == "done") {
        // DELETE JOBS
        this.deleteJob(job.id);        
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