var a = 'a';
{
  var a = 'b';
  console.log(a); //b
}
console.log(a); //b

const b = 'a';
{
  const b = 'b';
  console.log(b); //b
}
console.log(b); //a
