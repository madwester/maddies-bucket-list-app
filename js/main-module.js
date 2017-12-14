
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
    });
}());