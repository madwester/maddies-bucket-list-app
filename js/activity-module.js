// ACTIVITY-MODULE

var activity = ( function(){
    var object = {};
    object.activityarray = [];
    
    object.add = function(activityname){
        let activityitem = new Activity(activityname);
        object.activityarray.push(activityitem);
    }
    object.changeStatus = function(id,status){
        let activitycount = object.activityarray.length;
        for(let i=0; i<activitycount; i++){
            let item = object.activityarray[i];
            if(item.id == id) {
                item.status = status;
                break;
                return true;
            }
        }
    }
    object.delete = function(id){
        let activitycount = object.activityarray.length;
        for(let i=0; i<activitycount; i++){
            let item = object.activityarray[i];
            if(item.id == id){
                object.activityarray.splice(i,1);
                uimodule.render();
                console.log("got called!");
                //break;
                return true;
            }
        }
    }
    return object;
}
());