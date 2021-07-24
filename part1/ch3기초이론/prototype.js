function Student(name) {
  this.name = name;
}

Student.prototype.greet = function greet() {
  return `Hi, ${this.name}!`;
};

const me = new Student("Baek");
console.log(me);
console.log(me.name);
console.log(me.greet());
