
$(document).ready(function() {
    var max_fields = 20;
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

        $("#form_container").append('<div class="input_wrapper"><input type="text" name="title[]" id="title[]" placeholder="Title" class="title" required> <input type="text" name="note[]" id="note[]" class="note" placeholder="Note"> <select name="type[]" class="type" required><option value="" disabled selected hidden>-Select Type-</option><option value="dropdown">Dropdown</option><option value="checkboxes">Checkboxes</option></select><h2>Addons</h2><div class="addons_container"><div class="addons_data"><input type="text" name="product_id[]" class="product_id" placeholder="Product ID" required><input type="text" name="variant[]" class="variant" placeholder="Variant"><input type="text" placeholder="Name" name="name[]" class="name"><input type="text" name="qty[]" class="qty" placeholder="Qty"><a href="#" class="remove_addon_button"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div></div><div class="conditional-wrapper"></div><button class="add-conditional-logic">Add Conditional Logic</button><button class="add_addon_button">Add More Addons</button><a href="#" class="delete_form">Remove All Fields</a></div>');
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
            $(add_condition).append('<div class="condition-inputs"><p>Conditional Logic</p><div class="logic-type-action"><select name="logic_type[]" id="logic_type[]" class="logic_type" required><option value="" disabled selected hidden>--Select Logic--</option><option value="any">Any</option><option value="all">All</option></select><select name="logic_action[]" id="logic_action[]" class="logic_action" required><option value="" disabled selected hidden>--Select Action--</option><option value="show">Show</option><option value="hide">Hide</option></select></div><div class="logic-id"><select name="logic_property[]" id="logic_property[]" class="logic_property" required> <option value="" disabled selected hidden>--Select Property--</option><option value="ids">By IDs</option><option value="variants">By Variants</option></select><input type="text" name="logic_id[]" id="logic_id[]"  placeholder="Product ID or Variant ID" class="logic-input logic_id" required></div><a href="#" class="delete-conditional-logic">Cancel Conditional Logic</a></div>	');
        }
    });

    
//delete form
    $(document).on("click", ".delete_form", function(e) {
e.preventDefault();
$(this).parent('div').remove();
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

$("form").submit(function(e) {
    e.preventDefault();

    var input_data = '';
    input_data +="[\n";
    
    $(".title").each(function(index) {
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
