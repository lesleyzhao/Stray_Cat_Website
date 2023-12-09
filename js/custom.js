$(document).ready(function(){

    /*
	*/
     $(".navbar-brand").velocity("transition.expandIn", { stagger: 250 });
	 $(".intro").velocity("transition.expandIn", { stagger: 250 });
	 $(".stitle").velocity("transition.expandIn", { stagger: 250 });


     $(".about").css("margin-left", "90px");
     $(".about").css("margin-right", "90px"); 
     $("#btitle").css("display", "flex"); 
	 

	 $("#pic1").hide().fadeIn(1500); 
	 $("#clickme").click(function(){
	 	$("#show").html("<p id='content' style='text-align: center!important;font-size:20px !important;color: brown !important;display: flex !important;justify-content: space-around !important;'>&#128049; :Thank you again for your help and patience! </p><img src='https://media.tenor.com/uzTtjd6CtCAAAAAi/kitty-happy.gif' style='margin-left:500px'>");
	 })
   
    
});

/*
.dblclick()*/
