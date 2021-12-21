function prod(a, b) {
  return a * b;
}
function sub(a, b) {
  return a - b;
}

function sum(...arr) {
  let result = 0;
  for (let i of arr) {
    result = sum(result, i);
  }
  return result;
}
sum(1,5,7,8,10, 1129)


function div(a, b) {
  return a / b;
}
const pi = Math.PI;

export { sum, prod, sub };
