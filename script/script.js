
$(document).ready(function() {
    var max_fields = 20;
    var wrapper = $("#addons_container");
    var add_button = $("#add_addon_button");

    var x = 1;

    $(add_button).click(function(e) {
        e.preventDefault();

        if (x < max_fields) {
            x++;
            $(wrapper).append('<div><label for="product_id_' + x + '">Product ID:</label><input type="text" name="product_id_' + x + '" id="product_id_' + x + '"><label for="variant_' + x + '">Variant:</label><input type="text" name="variant_' + x + '" id="variant_' + x + '"><label for="name_' + x + '">Name:</label><input type="text" name="name_' + x + '" id="name_' + x + '"><a href="#" class="remove_addon_button">Remove</a></div>');
        }
    });

    $(wrapper).on("click", ".remove_addon_button", function(e) {
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });

    $("#add_form_button").click(function(e) {
        e.preventDefault();

        $("#form_container").append('<div class="input_wrapper"><input type="text" name="title[]" id="title[]" placeholder="Title" class="title" required> <input type="text" name="note[]" id="note[]" class="note" placeholder="Note"> <select name="type[]" class="type" required><option value="" disabled selected hidden>-Select Type-</option><option value="dropdown">Dropdown</option><option value="checkboxes">Checkboxes</option></select><h2>Addons</h2><div class="addons_container"><div class="addons_data"><input type="text" name="product_id[]" class="product_id" placeholder="Product ID" required><input type="text" name="variant[]" class="variant" placeholder="Variant"><input type="text" placeholder="Name" name="name[]" class="name"><a href="#" class="remove_addon_button"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div></div><button class="add_addon_button">Add More Addons</button><a href="#" class="delete_form">Remove All Fields</a></div>');
    });

    $("#form_container").on("click", ".add_addon_button", function(e) {
        e.preventDefault();

        var addons_container = $(this).siblings(".addons_container");
        var addon_count = $(addons_container).children("div").length;
        var new_addon_count = addon_count + 1;

        if (new_addon_count <= max_fields) {
            $(addons_container).append('<div class="addons_data"><input type="text" id="product_id[]" name="product_id[]" class="product_id" placeholder="Product ID" required> <input type="text" name="variant[]" class="variant" placeholder="Variant"> <input type="text" name="name[]" class="name" placeholder="Name"> <a href="#" class="remove_addon_button"><img src="img/remove-ico.png" alt="" class="remove-img"></a></div>');
        }
    });

    

    $(document).on("click", ".delete_form", function(e) {
e.preventDefault();
$(this).parent('div').remove();
});
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
            }else{
                
            }
           
            

            if (product_id || variant || name) {
                addons += '\n}\n';
                
               
            }else{
            
            }
            
                if (inputCount > 1  ){
              
               addons +=',';
           }
          
           
        });
       
        if (addons) {
           
            input_data += '\"addons\": [\n' + addons + '';
            
            //if (input_data.charAt(input_data.length - 1) === ",") {
         //   input_data = input_data.slice(0, -1);
            
        //}
        if (input_data.endsWith(",")) {
                  input_data = input_data.slice(0, -1);
                }
        input_data += ']\n}\n,';

        
        }
    });
    
    if (input_data.charAt(input_data.length - 1) === ",") {
          input_data = input_data.slice(0, -1);
            
        }

input_data += ']\n';
    $("#output-json").val(input_data);
     
});
});
