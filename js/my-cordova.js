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
 
 