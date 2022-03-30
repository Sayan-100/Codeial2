// create a class to toggle likes when a link is clicked , using AJAX
class ToggleLike{
    constructor(toggleElement){
        // console.log(this);
        this.toggler = toggleElement;
        // console.log('hello',this.toggler);
        this.toggleLike();
    }
    

    toggleLike(){
        // console.log('hry',this.toggler);
        $(this.toggler).click(function(e){
            // console.log('hhhh',e);
            e.preventDefault();
            let self = this;
             console.log(self)

            //this is a new way of writing ajax 
            $.ajax({
                type:'POST',
                url:$(self).attr('href'),
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount+=1;
                }
                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} Likes`);
            })
            .fail(function(err){
                console.log('error in completing the request if toggleLike');
            });
        });
    }



}