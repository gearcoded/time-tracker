const version = "1.4";
document.querySelector(".version").innerHTML = 'v' + version;

let date_string = null;
let left_part = null;
let right_part = null;
parse_dates()

function calculate_total(){
  let nodes = document.querySelectorAll(".calculated_input");
  let total_hours = 0;
  let total_minutes = 0;
  
  for (let i = 0; i < nodes.length; i++) {
    let value = nodes[i].value
    if (value && value.replace(/[^0-9]/ig, '')) {
      
      value = value.split(":");
      
      total_hours += +value[0].replace(/[^0-9]/ig, 0);
      total_minutes += +value[1].replace(/[^0-9]/ig, 0);
    }
  }
  
  total_hours += parseInt(total_minutes / 60);
  total_minutes = total_minutes % 60;

  if (total_minutes < 10) total_minutes = "0" + total_minutes;
  
  let total_value = `${total_hours}:${total_minutes}`;
  
  document.querySelector(".total").value = total_value;

  
  
}

function parse_date_string(){
  let value = document.querySelector(".date_string").value
  
  let dates = value.split(',').filter(v => v);
  console.log(dates)
  for (let i = 0; i < dates.length; i++) {
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
  
  let new_values = value.split('-').filter(v => v);
  left_part = new_values[0].replace(/[^0-9:]/ig, '')
  right_part = new_values.reverse()[0].replace(/[^0-9:]/ig, '')
  
  if (bulk) return;
  
  let parsed_value = `'${left_part}-${right_part}'`;
  if (left_part === right_part) parsed_value = left_part;

  document.querySelector(".parsed_value").innerHTML = parsed_value;
}

function calculate_dates(){
  let final_value = "00:00"
  if (left_part && right_part) {

    // already calculated value, not a time interval
    if (left_part === right_part) {
      final_value = left_part;
    }
    // time interval
    else {
    
      let date1 = left_part.split(':')
      let date2 = right_part.split(':')
      
      let hours = date2[0]-date1[0];
      
      let minutes = date2[1]-date1[1];
      
      if (minutes < 0){
        minutes += 60;
        hours -= 1;
      }
      if (minutes < 10) minutes = "0" + minutes;
      
      if (hours < 0){
        hours += 24;
      }

      final_value = `${hours}:${minutes}`;
    }

  }
  
  document.querySelector(".calculated_input").value = final_value;
  
}

function add_more_dates(){
  let id = +new Date() + Math.floor(Math.random() * 1000000000) + '';
  let additional_input_string = `
<input class='calculated_input' id='calculated_input_${id}' value="${document.querySelector(".calculated_input").value}" >
<button onclick="this.parentNode.innerHTML='';javascript:additional_input_${id}.remove()">X</button>
`
  let additional_input = document.createElement("div");
  additional_input.innerHTML = additional_input_string;
  additional_input.id = "additional_input_" + id;
  
  document.querySelector(".stack").appendChild(additional_input);
}

