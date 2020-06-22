const fs = require("fs");
const data = require("../data.json");
const {age, date} = require("../utils")
// post

// VALIDACAO
exports.post = function (req, res) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") return res.send("Please fill all fields");
  }
  // TRATAMENTO DOS DADOS
  req.body.birth = Date.parse(req.body.birth);
  req.body.created_at = Date.now();
  req.body.id = Number(data.instructors.length + 1);

  // DADOS QUE SERAO ENVIADOS
  let { avatar, birth, created_at, id, name, services, gender } = req.body;

  data.instructors.push({
    id,
    avatar,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
    return res.redirect("/instructors");
  });

  // return res.send(req.body)
};

// Edit
exports.edit = function(req, res){

  const { id } = req.params

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })
  if (!foundInstructor) return res.send("instructor not found")
  const instructor ={
    ... foundInstructor,
    birth:date(foundInstructor.birth).iso
  }


  return res.render("instructors/edit",{instructor})
}

//Show

exports.show = function (req, res) {
  //req.query.id
  //req.body
  //req.params

  const { id } = req.params

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })
  if (!foundInstructor) return res.send("instructor not found")


  const instructor ={
    ...foundInstructor,
    age: age(foundInstructor.birth),
    gender:"",
    services: foundInstructor.services.split(","),
    created_at:new Intl.DateTimeFormat("pt-Br").format(foundInstructor.created_at),
  }
  return res.render('instructors/show',{instructor:instructor})
};

// Put

exports.put=function(req,res){
  const { id } = req.body
  let index = 0

  const foundInstructor = data.instructors.find(function (instructor,foundIndex) {
    if( instructor.id == id){
      index = foundIndex
      return true
    }
  })
  if (!foundInstructor) return res.send("instructor not found")

  const instructor ={
    ...foundInstructor,
    ...req.body,
    birth:Date.parse(req.body.birth),
    id:Number(req.body.id)
  }
  data.instructors[index] = instructor

  fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
    if(err) return res.send("Write error!!")
    return res.redirect(`instructors/${id}`)
  })
}


// delete
exports.delete = function(req,res){
  const { id }= req.body

  const filteredInstructors = data.instructors.filter(function(instructor){
    return instructor.id != id
  })

  data.instructors = filteredInstructors

  fs.writeFile("data.json",JSON.stringify(data, null, 2),function(err){
    if(err) return res.send("write file error!!!")

    return res.redirect("/instructors")
  })
}

exports.index = function(req,res){
  return res.render("instructors/index",{instructors:data.instructors})
}