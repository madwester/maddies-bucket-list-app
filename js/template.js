
//TEMPLATE

var template = ( function(){
    var templateobject = {};
    window.addEventListener('load', () => {
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

