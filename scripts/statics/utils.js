const truncateDecimals = (number) => {
    return Math.trunc(number * Math.pow(10, 0)) / Math.pow(10, 0)
}

export { truncateDecimals }