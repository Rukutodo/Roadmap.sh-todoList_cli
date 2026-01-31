import {readFile, writeFile} from 'fs/promises';
import path from 'path';

const DATA_FILE = path.resolve("./todo.json");
const dash = ("-").repeat(20);
const dateTime = new Date().toLocaleString("en-IN", {
  timeZone: "Asia/Kolkata"
}); 
console.log(`${dash} Task Tracker ${dash}`);
console.log(dateTime);
const arg = process.argv[2];
const pos = process.argv[3]
const description = process.argv[4];

operation(arg,pos,description);


async function operation(operation,pos,description) {
  if(!operation){
    console.log("Please enter a command");
    return;
  }
  else if(operation === 'add') {
    console.log("Calling Add Operation");  
    add(pos);
  }
  else if(operation === 'update') {
    update(pos,description);
  }
  else if(operation === 'delete') {
    console.log("Calling Delete Operation");
    del(pos);
  }
  else if(operation === 'find'){
    find(pos);
  }
  else if(operation === 'list'){
    
    try {
     displayList() 
    } catch (error) {
      console.error(error);
    }
  
  }
  else{
    console.log("Enter valid operation");
    return;
  }
}


async function displayList() {
  const data = await readFile(DATA_FILE,'utf8');
  const parsed = JSON.parse(data);
  console.table(parsed.todos);
}

async function add(description) {

  const data =  await readFile(DATA_FILE,'utf8');
  const json = JSON.parse(data);


  json.todos.push({
    id: json.todos.at(-1)?.id+1 || 1,
    description: description,
    status:'in progress',
    createdAt:dateIndia(),
    modifiedAt:dateIndia(),
  });

  await writeFile(DATA_FILE,JSON.stringify(json,null,2));
  console.log(`${description} added`);
  displayList();
}

async function update(pos,status){

  const data = await readFile(DATA_FILE,'utf8');
  const json = JSON.parse(data);
  const time = dateIndia();
  const todo = json.todos.find(t =>t.id === Number(pos));

  Object.assign(todo,{
    status:status,
    modifiedAt:time,
  });
  await writeFile(DATA_FILE,JSON.stringify(json,null,2));
  displayList();
}
function dateIndia() {
  return new Date().toLocaleString("en-In",{
    timeZone:"Asia/Kolkata"
  });
}

async function del(pos){

  const data = await readFile(DATA_FILE,'utf8');
  const json = JSON.parse(data);

  json.todos = json.todos.filter(t => t.id !== Number(pos));

  await writeFile(DATA_FILE,JSON.stringify(json,null,2));
  displayList();
}

async function find(pos) {
  const data = await readFile(DATA_FILE,'utf8');
  const json = JSON.parse(data);
  let field = "";
  let status = pos;
  if (status?.includes("=")) {
    const[attr, value] = status.split("=");
    field = attr;
    status = value;
  }
  console.log(field,status);
  const display = json.todos.filter(t => t[field] === status );
  console.table(display);
}
