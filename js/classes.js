//CLASSES

class Activity {
    constructor(activity){
        this.name = activity;
        this.id = new Date().getTime(); //giving the activity an id of the time created
        this.status = 0; //not completed yet
        this.description = null;
        this.date = null;
        return this;
    }
}