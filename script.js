var date_string = null;
var left_part = null;
var right_part = null;
parse_dates()

function calculate_total(){
  var nodes = document.querySelectorAll(".calculated_input");
  var total_hours = 0;
  var total_minutes = 0;
  
  for (var i = 0; i < nodes.length; i++) {
    var value = nodes[i].value
    if (value && value.replace(/[^0-9]/ig, '')) {
      
      value = value.split(":");
      
      total_hours += +value[0].replace(/[^0-9]/ig, 0);
      total_minutes += +value[1].replace(/[^0-9]/ig, 0);
    }
  }
  
  total_hours += parseInt(total_minutes / 60);
  total_minutes = total_minutes % 60;
  
  var total_value = `${total_hours}:${total_minutes}`;
  
  document.querySelector(".total").value = total_value;

  
  
}

function parse_date_string(){
  var value = document.querySelector(".date_string").value
  
  var dates = value.split(',').filter(v => v);
  console.log(dates)
  for (var i = 0; i < dates.length; i++) {
    parse_dates(dates[i],true);
    calculate_dates()
    add_more_dates()
  }
  parse_dates();
  calculate_dates()

  
}

function parse_dates(value, bulk){
  console.log("value",value)
  value = value || document.querySelector(".dates_input").value || "00:00-00:00";
  
  var new_values = value.split('-').filter(v => v);
  left_part = new_values[0].replace(/[^0-9:]/ig, '')
  right_part = new_values.reverse()[0].replace(/[^0-9:]/ig, '')
  
  if (bulk) return;
  
  document.querySelector(".parsed_value").innerHTML = `'${left_part}-${right_part}'`;
}

function calculate_dates(){
  var final_value = "00:00"
  if (left_part && right_part) {
    
    var date1 = left_part.split(':')
    var date2 = right_part.split(':')
    
    var hours = date2[0]-date1[0];
    
    var minutes = date2[1]-date1[1];
    
    if (minutes < 0){
      minutes += 60;
      hours -= 1;
    }

    if (hours < 0){
      hours += 24;
    }
    
    final_value = `${hours}:${minutes}`;
  }
  
    
  
  document.querySelector(".calculated_input").value = final_value;
  
}

function add_more_dates(){
  var id = +new Date() + Math.floor(Math.random() * 1000000000) + '';
  var additional_input_string = `
<input class='calculated_input' id='calculated_input_${id}' value="${document.querySelector(".calculated_input").value}" >
<button onclick="this.parentNode.innerHTML='';javascript:additional_input_${id}.remove()">X</button>
`
  var additional_input = document.createElement("div");
  additional_input.innerHTML = additional_input_string;
  additional_input.id = "additional_input_" + id;
  
  document.querySelector(".stack").appendChild(additional_input);
}

