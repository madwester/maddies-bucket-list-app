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