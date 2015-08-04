/**
 * Created by sijiehao on 26/07/2015.
 */
$(function(){
    $("#search_button").button({
        disabled: false,
        icons:{
            primary:  "ui-icon-search",
            secondary: "ui-icon-triangle-1-s"
        }
    });
	
	//ask question check if user is logged in
	$("#question_button").button({
		icons: {
			primary: "ui-icon-lightbulb"
		}
	}).click(function(){
		if($.cookie("user")){
			$("#question").dialog("open");
		}else{
			$("#error").dialog("open");
			setTimeout(function(){
				$("#error").dialog("close");
				$("#login").dialog("open");
			}, 1000);
		}
	});
	
	$("#error").dialog({
		autoOpen: false,
		modal: true,
		width: 230,
		height: 50
	}).parent().find(".ui-dialog-titlebar").hide();
	
	
	//aks question
	$("#question").dialog({
        title: "Quoran Log-in",
        height: 380,
        width: 500,
        hide: true,
        autoOpen: false,
        draggable: true,
        modal:true,
        buttons:{
            "Post": function(){
				//alert($("#expires").is(":checked"));
                $(this).submit();
            },
            "Cancel" : function(){
                $(this).dialog("close");
            }
        }
    });
	
	//import uEditor
	$(" .uEditorCustom").uEditor();
	
	$("#member, #sign-out").hide();
	
	//check if cookie exsits
	if($.cookie("user")){
		//display link
		$("#member, #sign-out").show();
		$("#reg_a, #login_a").hide();
		$("#member").html($.cookie("user"));
	}else{
		$("#reg_a, #login_a").show();
		$("#member, #sign-out").hide();
	}
	
	//logout remove cookie
	$("#sign-out").click(function(){
		$.removeCookie("user");
		window.location.href = "/zhihu/";
	});
		
    $("#loading").dialog({
		autoOpen: false,
		modal: true,
		width: 230,
		height: 50
	}).parent().find(".ui-dialog-titlebar").hide();

    $("#reg_a").click(function() {
        $("#reg").dialog("open");
    });

    $("#reg").dialog({
        title: "Quoran Sign-Up",
        height: 400,
        width: 400,
        show: "puff",
        hide: true,
        autoOpen: false,
        draggable: true,
        modal:true,
        buttons:{
            "Sign-Up": function(){
                $(this).submit();
            },
            "Cancel" : function(){
                $(this).dialog("close");
            }
        }
    }).buttonset().validate({
        submitHandler: function(form){
           $(form).ajaxSubmit({
				url: "add.php",
				type: "POST",
				beforeSubmit: function(formData, jqForm, options){
					$("#loading").dialog("open");
					$("#reg").dialog("widget").find("button").eq(1).button("disable");
				},
				success: function(response, status){
					$("#reg").dialog("widget").find("button").eq(1).button("enable");
					$("#loading").css("background", "url(images/success.gif) no-repeat 30px center").html("Sign-up completed");
					
					//generate cookie for login user
					$.cookie("user", $("#user").val());
					setTimeout(function(){
						$("#loading").dialog("close");
						$("#reg").dialog("close");
						$("#reg").resetForm();
						$("#loading").css("background", "url(images/loading.gif) no-repeat 30px center").html("Processing");
						//display link
						$("#member, #sign-out").show();
						$("#reg_a, #login_a").hide();
						$("#member").html($.cookie("user"));
						
					},1000);
				}
				
		   });
        },	
        errorLabelContainer: "ol.reg_error",
        wrapper: "li",
        showErrors: function(errorMap, errorList){
            var errors = this.numberOfInvalids();
            if(errors > 0){
                $("#reg").dialog("option", "height", errors * 20 + 400);
            }else{
                $("#reg").dialog("option", "height", 400);
            }
            this.defaultShowErrors();
        },

        highlight: function(element, errorClass){
            $(element).css("border", "1px solid red");
        },

        unhighlight: function(element, errorClass){
            $(element).css("border", "1px solid #ccc");
            $(element).parent().find("span").html("");
        },
        rules: {
            user: {
                required: true,
                minlength: 5,
				remote:{
					url: "user_exists.php",
					type: "POST"
				}
            },
            pass: {
                required: true,
                minlength: 6
            },
            email:{
                required: true,
                email: true
            },
            date:{
                date: true
            }
        },
        messages : {
            user: {
                required: "Username cannot be empty!",
                minlength: jQuery.validator.format("Username must not be less than {0} characters!"),
				remote: "Username already exists"
            },
            pass: {
                required: "Password cannot be empty!",
                minlength: jQuery.validator.format("Password must not be less than {0} characters!")
            },
            email:{
                required: "Email cannot be empty!",
                email: ("Please enter a valid email address!")
            },
            date:{
                date: "Date invalid!"
            }
        }

    });
	
	//login window
	$("#login_a").click(function() {
        $("#login").dialog("open");
    });
	
	$("#login").dialog({
        title: "Quoran Log-in",
        height: 270,
        width: 400,
        show: "puff",
        hide: true,
        autoOpen: false,
        draggable: true,
        modal:true,
        buttons:{
            "Log-In": function(){
				//alert($("#expires").is(":checked"));
                $(this).submit();
            },
            "Cancel" : function(){
                $(this).dialog("close");
            }
        }
    }).validate({
        submitHandler: function(form){
           $(form).ajaxSubmit({
				url: "login.php",
				type: "POST",
				beforeSubmit: function(formData, jqForm, options){
					$("#loading").dialog("open");
					$("#login").dialog("widget").find("button").eq(1).button("disable");
				},
				success: function(response, status){
					$("#login").dialog("widget").find("button").eq(1).button("enable");
					$("#loading").css("background", "url(images/success.gif) no-repeat 30px center").html("Sign-in successfully");
					if($("#expires").is(":checked")){
					
					//generate cookie lasting for a week 
						$.cookie("user", $("#login_user").val(), {
							expires: 7
						});
					}else{
						//normal cookie 
						$.cookie("user", $("#login_user").val());
					}
					
					setTimeout(function(){
						$("#loading").dialog("close");
						$("#login").dialog("close");
						$("#login").resetForm();
						$("#loading").css("background", "url(images/loading.gif) no-repeat 30px center").html("Processing");
						//display link
						$("#member, #sign-out").show();
						$("#reg_a, #login_a").hide();
						$("#member").html($.cookie("user"));		
					},1000);
				}
				
		   });
        },	
        errorLabelContainer: "ol.login_error",
        wrapper: "li",
        showErrors: function(errorMap, errorList){
            var errors = this.numberOfInvalids();
            if(errors > 0){
                $("#login").dialog("option", "height", errors * 20 + 270);
            }else{
                $("#login").dialog("option", "height", 270);
            }
            this.defaultShowErrors();
        },

        highlight: function(element, errorClass){
            $(element).css("border", "1px solid red");
        },

        unhighlight: function(element, errorClass){
            $(element).css("border", "1px solid #ccc");
            $(element).parent().find("span").html("");
        },
        rules: {
            login_user: {
                required: true,
                minlength: 5,
            },
            login_pass: {
                required: true,
                minlength: 6,
				remote:{
					url: "login.php",
					type: "POST",
					data: {
						login_user: function(){
							return $("#login_user").val();
						}
					}
				}
            }
        },
        messages : {
            login_user: {
                required: "Username cannot be empty!",
                minlength: jQuery.validator.format("Username must not be less than {0} characters!"),
            },
            login_pass: {
                required: "Password cannot be empty!",
                minlength: jQuery.validator.format("Password must not be less than {0} characters!"),
				remote: "Username or password incorrect!"
            }
        }

    });

    $("#date").datepicker({
        showWeek: true,
		dateFormat : 'yy-mm-dd',
        //beforeShowDay: $.datepicker.noWeekends,
        /*onChangeMonthYear : function(y, m, inst){
            alert(inst.id);
        },
        onSelect : function(dateText, inst){
            alert(dateText);
        } */
    });

    $("#reg input[title]").tooltip();

    $("[title]").tooltip({
        items: "input",
        position:{
            my: 'left center',
            at: 'right+20 center'
        },
        show: {effect: "blind", duration: 100},
        hide: true
    });

    $("#email").autocomplete({
        delay: 0,
        source: function(request, response){
            var hosts = ["gmail.com","yahoo.com","hotmail.com","qq.com", "163.com", "sina.com.cn"],
                term = request.term,    //retrieve user input
                name = term,            //email username
                host = "",              //domain operator @
                ix = term.indexOf("@"), //position of @
                result = [];            //final email list

            //reorganize username and @ when @ exists
            if(ix > -1){
                name = term.slice(0, ix);
                host = term.slice(ix + 1);
            }
            if(name){
             //- if user already enter email including chunk after @, prompt the domain names that match his input
             //- if user has not yet reach chunk after @, prompt all domain names
                var foundHosts = [];
                if(host){
                    foundHosts = $.grep(hosts,function(value, index){
                        return value.indexOf(host) > -1;
                    });
                }else{
                    foundHosts = hosts;
                }
                var foundResults = $.map(foundHosts, function(value, index){
                    return name + "@" + value;
                });

                result = foundResults;
            }
            response(result);
        }
    });
	
	//content tabs
	$("#tabs").tabs({
		collapsible: true,
		event: "mouseover",
		active: false,
		heightStyle: "auto",  
		beforeActivate: function( event, ui ) {
			//alert(" ");
		},
		beforeLoad: function(evt, ui){
			//alert("trigger when load remote tabs");
			ui.jqXHR.success(function(responseText){
				//alert(responseText);
			});
			//ui.ajaxSettings.url = "tab3.html";
		}
	});
	
	/*
	$("#button").click(function(){
		$("#tabs").tabs("load", 1);
	});
	*/
	$("#accordion").accordion({
		collapsible: true,
		active: 0,
		active: true,
		heightStyle: "content",
		icons: {
			"header": "ui-icon-plus", 
			"activeHeader": "ui-icon-minus"
		},
		activate: function(event, ui){
			//alert($(ui.newHeader.get()).html());
		}
	});
	
});



