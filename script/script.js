

$(document).ready(function() {


    var max_fields = 30;
    var wrapper = $("#addons_container");
    var add_button = $("#add_addon_button");

    var x = 1;

    $(add_button).click(function(e) {
        e.preventDefault();

        if (x < max_fields) {
            x++;
            $(wrapper).append('<div><label for="product_id_' + x + '">Product ID:</label><input type="text" name="product_id_' + x + '" id="product_id_' + x + '"><label for="variant_' + x + '">Variant:</label><input type="text" name="variant_' + x + '" id="variant_' + x + '"><label for="name_' + x + '">Name:</label><input type="text" name="name_' + x + '" id="name_' + x + '"><input type="text" name="qty_'+ x +'" id="qty_'+ x +'"><a href="#" class="remove_addon_button"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div>');
        }
    });
//delete addons
    $(wrapper).on("click", ".remove_addon_button", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        
        x--;
    });
//add more form
    $("#add_form_button").click(function(e) {
        e.preventDefault();
        x++
        $("#form_container").append('<div class="Accordion"><input type="checkbox" class="inputAccordion" id="inputAccordion'+x+'"/><label for="inputAccordion'+x+'" class="labelAccordion">Title Here</label><div class="input_wrapper" ><input type="text" name="title[]" id="title[]" class="title" placeholder="Title" required><input type="text" name="note[]" id="note[]" class="note " placeholder="Note"><select name="type[]" class="type " id="type[]" required><option value="" disabled selected hidden>-Select Type-</option><option value="dropdown">Dropdown</option><option value="checkboxes">Checkboxes</option></select><label for="form-type">Please Select Form Type:</label><select name="form-type[]" id="form-type" class="form-type"required><option value="Addons">Addons</option><option value="Groups">Groups</option></select><div class="addons_container" id="addons-form"><div class="addons_data"><input type="text" name="product_id[]" id="product_id[]"class="product_id" placeholder="Product ID" required><input type="text" name="variant[]" class="variant" placeholder="Variant" ><input type="text" name="name[]" class="name" placeholder="Name"><input type="text" name="qty[]" class="qty" placeholder="Qty"><a href="#" class="remove_addon_button"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div></div><div class="grp" id="grp" style="display:none;"><div class="grp_wrapper" id="grp-form"><div class="grp-nav"><label class="grp-label" id="grp-label">Group Name: </label></div><div class="g_addons_container"><input type="text" placeholder="Group Name" name="g_name[]" class="g_name" id="g_name"><div class="adds_grp_data"><input type="text" name="g_product_id[]" class="g_product_id" placeholder="Product ID"><input type="text" name="g_variant[]" class="g_variant" placeholder="Variant"><input type="text" name="g_qty[]" class="g_qty" placeholder="Qty"><a href="#" class="remove_addon_button rmv-2"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div></div><a href="#" class="g_add_addon_button" id="g_add_addon_button">Add Addons</a> <a href="#" class="delete-grp">Delete Groups</a></div></div><div class="conditional-wrapper"></div><button class="add_addon_button" id="add_addon_button">Add More Addons</button><a hre="#" class="add_group_button" id="add_group_button" style="display: none;">Add More Groups</a><button class="add-conditional-logic">Add Conditional Logic</button><button onclick="deleteButton(this)" class="delete_form">Remove All</button><hr></div></div>');
        $.getScript('script/script-display.js', function() {
            
          });
          $.getScript('script/grp-name-display.js', function() {
            
          });

    });
//add more addons
    $("#form_container").on("click", ".add_addon_button", function(e) {
        e.preventDefault();

        var addons_container = $(this).siblings(".addons_container");
        var addon_count = $(addons_container).children("div").length;
        var new_addon_count = addon_count + 1;

        if (new_addon_count <= max_fields) {
            $(addons_container).append('<div class="addons_data"><input type="text" id="product_id[]" name="product_id[]" class="product_id" placeholder="Product ID" required> <input type="text" name="variant[]" class="variant" placeholder="Variant"> <input type="text" name="name[]" class="name" placeholder="Name"><input type="text" name="qty[]" class="qty" placeholder="Qty"> <a href="#" class="remove_addon_button"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div>');
        }
    });
//add conditional logic
    $("#form_container").on("click", ".add-conditional-logic", function(e) {
        e.preventDefault();

        var add_condition = $(this).siblings(".conditional-wrapper");
        var condition_count = $(add_condition).children("div").length;
        var new_condition_count = condition_count + 1;

        if (new_condition_count <= 1) {
            $(add_condition).append('<div class="condition-inputs"><p>Conditional Logic</p><div class="logic-type-action"><select name="logic_type[]" id="logic_type[]" class="logic_type" required><option value="" disabled selected hidden>--Select Logic--</option><option value="any">Any</option><option value="all">All</option></select><select name="logic_action[]" id="logic_action[]" class="logic_action" required><option value="" disabled selected hidden>--Select Action--</option><option value="show">Show</option><option value="hide">Hide</option></select></div><div class="logic-id"><select name="logic_property[]" id="logic_property[]" class="logic_property" required> <option value="" disabled selected hidden>--Select Property--</option><option value="ids">By IDs</option><option value="variants">By Variants</option></select><input type="text" name="logic_id[]" id="logic_id[]"  placeholder="Product ID or Variant ID" class="logic-input logic_id" required> <img src="img/info-ico.png" alt="" class="info-ico"><div class="condition-note"><section>for multiple Product ID or Variant we need to add "," for each IDs. Please follow this example: <strong> ID1,ID2,ID3,ID4,ID5</strong></section></div></div><a href="#" class="delete-conditional-logic">Cancel Conditional Logic</a></div>	');
        }
    });


//add conditional logic for grp
$("#form_container").on("click", ".g-add-conditional-logic", function(e) {
    e.preventDefault();

    var add_condition = $(this).siblings(".g-conditional-wrapper");
    var condition_count = $(add_condition).children("div").length;
    var new_condition_count = condition_count + 1;

    if (new_condition_count <= 1) {
        $(add_condition).append('<div class="condition-inputs"><p>Conditional Logic</p><div class="logic-type-action"><select name="logic_type[]" id="logic_type[]" class="logic_type g-logic-type" required><option value="" disabled selected hidden>--Select Logic--</option><option value="any">Any</option><option value="all">All</option></select><select name="logic_action[]" id="logic_action[]" class="logic_action g-logic-action" required><option value="" disabled selected hidden>--Select Action--</option><option value="show">Show</option><option value="hide">Hide</option></select></div><div class="logic-id"><select name="logic_property[]" id="logic_property[]" class="logic_property g-logic-property" required> <option value="" disabled selected hidden>--Select Property--</option><option value="ids">By IDs</option><option value="variants">By Variants</option></select><input type="text" name="logic_id[]" id="logic_id[]"  placeholder="Product ID or Variant ID" class="logic-input logic_id g-logic-id" required> <img src="img/info-ico.png" alt="" class="info-ico"><div class="condition-note"><section>for multiple Product ID or Variant we need to add "," for each IDs. Please follow this example: <strong> ID1,ID2,ID3,ID4,ID5</strong></section></div></div><a href="#" class="delete-conditional-logic">Cancel Conditional Logic</a></div>	');
    }
});


//addmore addons for groups
$("#form_container").on("click","#grpBtn, #g_add_addon_button", function(e) {
    e.preventDefault();

    var addons_container = $(this).siblings(".g_addons_container");
    var addon_count = $(addons_container).children(".adds_grp_data").length;
    var new_addon_count = addon_count + 1;

    if (new_addon_count <= max_fields) {
        $(addons_container).append('<div class="adds_grp_data"><input type="text" name="g_product_id[]" class="g_product_id" placeholder="Product ID" required><input type="text" name="g_variant[]" class="g_variant" placeholder="Variant"><input type="text" name="g_qty[]" class="g_qty" placeholder="Qty"><a href="#" class="remove_addon_button rmv-2"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div>');
    }
});
//add more groups
$("#form_container").on("click", ".add_group_button", function(e) {
    e.preventDefault();

    var addons_container = $(this).siblings(".grp");
    var addon_count = $(addons_container).children("div").length;
    var new_addon_count = addon_count + 1;

    if (new_addon_count <= max_fields) {
        $(addons_container).append('<div class="grp_wrapper" id="grp-form"><div class="grp-nav"><label class="grp-label" id="grp-label">Group Name: </label></div><div class="g_addons_container"><input type="text" placeholder="Group Name" name="g_name[]" class="g_name" id="g_name"><div class="adds_grp_data"><input type="text" name="g_product_id[]" class="g_product_id" placeholder="Product ID"><input type="text" name="g_variant[]" class="g_variant" placeholder="Variant"><input type="text" name="g_qty[]" class="g_qty" placeholder="Qty"><a href="#" class="remove_addon_button rmv-2"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div></div><a href="#" class="g_add_addon_button" id="g_add_addon_button">Add Addons</a> <a href="#" class="delete-grp">Delete Groups</a></div>');
        $.getScript('script/grp-name-display.js', function() {
            
        });
   
    }
});
// duplicate groups




//delete groups
$(document).on("click", ".delete-grp", function(e) {
    e.preventDefault();
    $(this).parent('div').remove();
    });

//delete form
    $(document).on("click", ".delete_form", function(e) {
e.preventDefault();
$(this).siblings('.Accordion').remove();
$(this)
});
//delete conditional logic
$(document).on("click", ".delete-conditional-logic", function(e) {
    e.preventDefault();
    $(this).parent('div').remove();
    });

//remove addons
$(document).on("click", ".remove_addon_button", function(e) {
    e.preventDefault();
    $(this).parent('div').remove();
    });
//generate function
$("form").submit(function(e) {
    e.preventDefault();

    var input_data = '';
    input_data +="[\n";
///generate groups 


   $(".title").each(function(index) {
    var dropdown = $(this).parent().find(".form-type").val();
    //addons
    if(dropdown ==='Addons'){
        input_data +="{\n";
        input_data +='\"title\":\"' + $(this).val() + '\",\n';

        var note = $(this).parent().find(".note").val();
        if (note) {
            input_data +='\"note\":\"' + note + '\",\n';
        }

        var type = $(this).parent().find(".type").val();
        if (type) {
            input_data +='\"type\":\"' + type + '\",\n';
        }

        var addons = '';


//addons
$(this).parent().find(".addons_container div").each(function() {
            var product_id = $(this).find(".product_id").val();
            let inputFields = document.querySelectorAll('.product_id');
            let inputCount = inputFields.length;
            let inputTitles =document.querySelectorAll('.title');
            let titleCounts =inputTitles.length;

            if (product_id) {
                addons += '{\n\"id\":' + product_id + '';
            }
           

            var variant = $(this).find(".variant").val();
            if (variant) {
                addons += ',\n\"variant\":' + variant + '';
            }

            var name = $(this).find(".name").val();
            if (name) {
                addons += ',\n\"name\":\"'  + name + '\"';
            }
           
            var qty = $(this).find(".qty").val();
            if (qty) {
                addons += ',\n\"qty\":'  + qty + '';
            }

            if (product_id || variant || name || qty) {
                addons += '\n}';
                
               
            }else{
            
            }
            
                if (inputCount > 1  ){
              
               addons +=',\n';
           }
          
           
        });
        if (addons) {
           
            input_data += '\"addons\": [\n' + addons + '';
            
            //if (input_data.charAt(input_data.length - 1) === ",") {
         //   input_data = input_data.slice(0, -1);
            
        //}
        if (input_data.endsWith(",\n")) {
                  input_data = input_data.slice(0, -2);
                }
        input_data += '\n]';

       
        //add logic condition
        $(this).parent().find(".conditional-wrapper").each(function() {
        var logic_type = $(this).find(".logic_type").val();
        if(logic_type){
            input_data += ',\n\"if\": {\n';
           input_data += '\"logic\":\"'  + logic_type + '\"';
        }

        var logic_property = $(this).find(".logic_property").val();
        if(logic_property){
           input_data += ',\n\"'  + logic_property + '\": [\n';
        }
        var logic_id = $(this).find(".logic_id").val();
        if(logic_id){
           input_data += ''  + logic_id + '\n]';
        }

        var logic_action = $(this).find(".logic_action").val();
        if(logic_action){
           input_data += ',\n\"action\":\"'  + logic_action + '\"\n}';
        }
   
        
        input_data += '\n},\n';

        
    });


        };
    }else{
           //genarate groups output
    input_data +="{\n";
    input_data +='\"title\":\"' + $(this).val() + '\",\n';

    var note = $(this).parent().find(".note").val();
    if (note) {
        input_data +='\"note\":\"' + note + '\",\n';
    }

    var type = $(this).parent().find(".type").val();
    if (type) {
        input_data +='\"type\":\"' + type + '\",\n';
    }

    var addons = '';
    $(this).parent().find(".g_addons_container").each(function() {

    var gname = $(this).find(".g_name").val();
    let gFields = document.querySelectorAll('.g_name');
    let gCounts = gFields.length;
    addons += '\n]\n},\n{';
           
                if (addons.startsWith("\n]\n},\n{")) {
                    addons = addons.slice(0, -7);
                   }
           
        if(gname){
          
            addons += '\"name\":\"' + gname + '\",\n';
        }

    addons +='\"addons\": [\n';
    

    $(this).parent().find(".g_addons_container div").each(function() {
        
        let inputFields = document.querySelectorAll('.g_product_id');
        let inputCount = inputFields.length;
        let inputTitles =document.querySelectorAll('.g_title');
        let titleCounts =inputTitles.length;

        var product_id = $(this).find(".g_product_id").val();
        if (product_id) {
            addons += '{\n\"id\":' + product_id + '';
        }
       

        var variant = $(this).find(".g_variant").val();
        if (variant) {
            addons += ',\n\"variant\":' + variant + '';
        }
       
        var qty = $(this).find(".g_qty").val();
        if (qty) {
            addons += ',\n\"qty\":'  + qty + '';
        }

        if (product_id || variant || gname || qty) {
            addons += '\n}';
            
           
        }else{
        
        }
        
            if (inputCount > 1  ){
                addons +=',\n';
           
       }
      
       
       
    });
    if (addons.endsWith(",\n")) {
        addons = addons.slice(0, -2);
       }
});
   


   
    if (addons) {
       
        input_data += '\"groups\": [{\n' + addons + '\n]\n}';
        
        //if (input_data.charAt(input_data.length - 1) === ",") {
     //   input_data = input_data.slice(0, -1);
        
    //}
   
    input_data += '\n]';

   
    //add logic condition
    //add logic condition
    $(this).parent().find(".conditional-wrapper").each(function() {
        var logic_type = $(this).find(".logic_type").val();
        if(logic_type){
            input_data += ',\n\"if\": {\n';
           input_data += '\"logic\":\"'  + logic_type + '\"';
        }

        var logic_property = $(this).find(".logic_property").val();
        if(logic_property){
           input_data += ',\n\"'  + logic_property + '\": [\n';
        }
        var logic_id = $(this).find(".logic_id").val();
        if(logic_id){
           input_data += ''  + logic_id + '\n]';
        }

        var logic_action = $(this).find(".logic_action").val();
        if(logic_action){
           input_data += ',\n\"action\":\"'  + logic_action + '\"\n}';
        }
   
        
        input_data += '\n},\n';

        
    });

    };

    }
});     
  






    if (input_data.charAt(input_data.length - 2) === ",") {
          input_data = input_data.slice(0, -2);
            input_data +='\n';
        }

input_data += ']\n';
    $("#output-json").val(input_data);
     
});

	
});

