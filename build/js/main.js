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
// FORM-MODULE TO HANDLE THE FORM

var formmodule = (
    function() {
      var formobject = {};
      const formelement = document.getElementById("form-input"); // MY FORM ID
      const inputelement = document.getElementById("add-input"); // MY INPUT ID
      
      //function to get the value of the new activity
      formobject.getValue = function() {
        inputvalue = inputelement.value;
        formobject.val = inputvalue;
        return inputvalue;
      }
      return formobject;
    }()
  );
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
                //break;
                return true;
            }
        }
    }
    return object;
}
());
// STORAGE

var storage = ( function(){
    var storageobject = {};
    storageobject.store = function(arr){
        let data = JSON.stringify(arr)
        storageobject.data = data;
        window.localStorage.setItem("data", data);
    }
    storageobject.read = function(){
        if(window.localStorage.getItem("data")){
            try{
                if(JSON.parse(localStorage.getItem("data"))){
                    let data = JSON.parse(localStorage.getItem("data"));
                }
            }
            catch(error){
                console.log("Something is not working.." + error);
            }
            let data = window.localStorage.getItem("data");
            return JSON.parse(data);
        }
        else{
            return false;
        }
    }
    return storageobject;
}());



//TEMPLATE

var template = ( function(){
    var templateobject = {};
    window.addEventListener('load', () => {
        addCordovaEvents();
            const template1 = document.querySelector("#not-completed-template");
            const template2 = document.querySelector("#completed-template");
            templateobject.template = template1; 
            templateobject.template2 = template2;
    });
    templateobject.create = function(activityobject,status){
        let templatehtml;
        //importing the content of the template
        if(status == 0){
            let template = document.importNode(templateobject.template.content, true);
            templatehtml = template.querySelector('li');
        }
        else{
            let template = document.importNode(templateobject.template2.content, true);
            templatehtml = template.querySelector('li');
        }
        //and now filling the template with data from the activity object
        templatehtml.setAttribute('data-id', activityobject.id);
        templatehtml.setAttribute('data-status', activityobject.status);
        templatehtml.setAttribute('data-name', activityobject.name);
        templatehtml.setAttribute('data-date', activityobject.date);
        templatehtml.setAttribute('data-description', activityobject.description);
        templatehtml.querySelector('.activity-title').innerText = activityobject.name;
        templatehtml.querySelector('button[data-function="done"]').setAttribute('data-id', activityobject.id);
        templatehtml.querySelector('button[data-function="delete"]').setAttribute('data-id', activityobject.id); 
        templatehtml.querySelector('button[data-function="edit"]').setAttribute('data-id', activityobject.id);
        return templatehtml;
    }
    return templateobject;
}());


// UI


var uimodule = ( function(){
    var module = {};
        //status = 0
        const listelement = document.getElementById('activity-list'); //activity-list = my ul id#
        //status = 1
        const listelement2 = document.getElementById('completed-activity-list');
        
        module.render = function(){
            let activities = activity.activityarray;
            listelement.innerHTML = "";
            listelement2.innerHTML = "";
            for(var i=0; i<activities.length; i++){
                let item = activities[i];
                //creating a new template to show in html
                if(item.status == 0){
                    let liitem = template.create(item,0);
                    listelement.appendChild(liitem);
                }
                if(item.status == 1){
                    let liitem2 = template.create(item,1);
                    listelement2.appendChild(liitem2);
                }
            }
        }
        
        module.bindListener = function(){
            listelement.addEventListener('click', (event) => {
                //getting the id of the activity
                if(event.target.getAttribute('data-function') == 'done'){
                    itemid = event.target.getAttribute('data-id');
                    activity.changeStatus(itemid,1);
                }
                if(event.target.getAttribute('data-function') == 'delete'){
                    itemid = event.target.getAttribute('data-id'); 
                    activity.delete(itemid);
                }
                module.render();
                storage.store(activity.activityarray);
            });
        }
        return module;
    }() );

// MAIN MODULE

var app = ( function (){
    //initializing a varible of the form input ID in the html
    const form = document.getElementById('form-input');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let newActivity = formmodule.getValue();
        if(newActivity){
            activity.add(newActivity);
            storage.store(activity.activityarray);
            uimodule.render();
        }
        form.reset();
    });
    uimodule.bindListener(); 
    window.addEventListener('load', () => {
        if(storage.read()){
            activity.activityarray = storage.read();
        }
        uimodule.render();
        addCordovaEvents();
    });
}());

// MODAL.JS

//setting the values
$(document).ready(function(){
    $("#completed-activity-list").click(function(event){
        //data-id of button
        console.log(event.target);
        let id = $(event.target).data('id');
        let len = activity.activityarray.length;
        for( let i=0; i<len ; i++ ){
            let item = activity.activityarray[i];
            if(item.id == id){
                //fill modal with data
                $('.modal-title').text(item.name);
                $('.add-date').val(item.date);
                $('.add-description').val(item.description);
                $('.btn-save').attr('data-id', id);
                $('.btn-delete2').attr('data-id', id);
            }
        }
        //show popup
        $("#popup").modal('show');
    }); 
});

$(document).ready(function(){
    $(".btn-save").click(function(event){
        let inputDescription = $('.add-description').val();
        let inputDate = $('.add-date').val();
        let id = $(event.target).data('id');
        let len = activity.activityarray.length;
        for ( let i=0; i<len; i++){
            let item = activity.activityarray[i];
            if( item.id == id ){
                item.description = inputDescription;
                item.date = inputDate;
                storage.store(activity.activityarray);
            }
        }
    });
});

$(document).ready(function(){
    $(".btn-delete2").click(function(event){
        let id = $(event.target).data('id');
        let len = activity.activityarray.length;
        for ( let i=0; i<len; i++){
            let item = activity.activityarray[i];
            if( item.id == id ){
                activity.delete(id);
                storage.store(activity.activityarray);
            }
        }
    });
});
//MY CORDOVA

function addCordovaEvents(){
  document.addEventListener("deviceready",onDeviceReady,false);
}
//save list
function onDeviceReady(){
  document.addEventListener("pause",function(){
    //when app is paused (eg home button pressed) save list
    storage.store(activity.activityarray);
  },false);
  
  
//pause list
document.addEventListener("resume",function(){
    //when app is resumed (brought back from sleep) load list
    storage.read(activity.activityarray);
  },false);
}  
 
 