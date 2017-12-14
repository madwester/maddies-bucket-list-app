
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
