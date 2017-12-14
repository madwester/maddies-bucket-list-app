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
