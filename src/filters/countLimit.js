export default (num, max = 99, symbol = '+') => {
  num = parseInt(num)
  return num > max ? `${max}${symbol}` : num
}
