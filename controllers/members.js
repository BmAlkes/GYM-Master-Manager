const fs = require("fs");
const data = require("../data.json");
const {age, date} = require("../utils")


exports.index = function(req,res){
  return res.render("members/index",{members:data.members})
}
// CREATE
exports.post = function (req, res) {
  const keys = Object.keys(req.body);
  for (key of keys) {
    if (req.body[key] == "") return res.send("Please fill all fields");
  }
  // TRATAMENTO DOS DADOS
  req.body.birth = Date.parse(req.body.birth);
  req.body.created_at = Date.now();
  let id = 1;
  const lastId= data.members[data.members.length -1].id
 if(lastId){
   id =lastId +1
 }


  // DADOS QUE SERAO ENVIADOS
  let { avatar, birth, created_at, name, gender,email,blood,weight} = req.body;

  data.members.push({
    id,
    avatar,
    name,
    birth,
    gender,
    email,
    blood,
    weight,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("write file error");
    return res.redirect("/members");
  });

  // return res.send(req.body)
};
exports.create = function(req,res){
  return res.render("members/create")
}
// Edit
exports.edit = function(req, res){

  const { id } = req.params

  const foundMember = data.members.find(function (member) {
    return member.id == id
  })
  if (!foundMember) return res.send("member not found")
  const member ={
    ... foundMember,
    birth:date(foundMember.birth).iso,
    
  }


  return res.render("members/edit",{member})
}
//Show
exports.show = function (req, res) {
  //req.query.id
  //req.body
  //req.params

  const { id } = req.params

  const foundMember = data.members.find(function (member) {
    return member.id == id
  })
  if (!foundMember) return res.send("member not found")


  const member ={
    ...foundMember,
  birth: date(foundMember.birth).birthDay,
    gender:"", created_at:new Intl.DateTimeFormat("pt-Br").format(foundMember.created_at),
  }
  return res.render('members/show',{member:member})
};
// Put
exports.put=function(req,res){
  const { id } = req.body
  let index = 0

  const foundMember = data.members.find(function(member,foundIndex){
    if(id == member.id){
      index = foundIndex
      return true
    }
  })


  if (!foundMember) return res.send("Member not found")

  const member ={
    ...foundMember,
    ...req.body,
    birth:Date.parse(req.body.birth),
    id:Number(req.body.id)
  }
  data.members[index] = member

  fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
    if(err) return res.send("Write error!!")
    return res.redirect(`members/${id}`)
  })
}
// delete
exports.delete = function(req,res){
  const { id }= req.body

  const filteredMembers = data.members.filter(function(member){
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile("data.json",JSON.stringify(data, null, 2),function(err){
    if(err) return res.send("write file error!!!")

    return res.redirect("/members")
  })
}
