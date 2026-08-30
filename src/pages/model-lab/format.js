const currency = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
})

const compactCurrency = new Intl.NumberFormat('en-IN', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export const formatValue = (value, format) => {
  if (value === null || value === undefined || Number.isNaN(value)) return '—'

  switch (format) {
    case 'currency':
      return `Rs. ${currency.format(Math.round(value))}`
    case 'compactCurrency':
      return `Rs. ${compactCurrency.format(value)}`
    case 'percent':
      return `${value.toFixed(2)}%`
    case 'signedPercent':
      return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`
    case 'factor':
      return value.toFixed(6)
    case 'years':
      return `${value.toFixed(2)} yrs`
    case 'integer':
      return currency.format(Math.round(value))
    default:
      return typeof value === 'number' ? currency.format(value) : String(value)
  }
}

export const toCsv = (columns, rows) => {
  const escape = (cell) => {
    const text = String(cell ?? '')
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }

  return [
    columns.map((column) => escape(column.label)).join(','),
    ...rows.map((row) => columns.map((column) => escape(row[column.key])).join(',')),
  ].join('\n')
}
