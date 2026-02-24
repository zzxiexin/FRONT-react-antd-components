// 工具函数

// 合并class名
export const clsx = (...args: any[]): string => {
  const classes = args.filter(Boolean).join(' ')
  return classes || ''
}

// 生成唯一的ID
export const generateId = (prefix = 'id'): string => {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`
}

// 判断是否为函数
export const isFunction = (value: any): value is Function => {
  return typeof value === 'function'
}

// 判断是否为对象
export const isObject = (value: any): value is object => {
  return value !== null && typeof value === 'object'
}

// 深度合并对象
export const deepMerge = <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
  const result = { ...target }
  
  for (const key in source) {
    if (source[key] && isObject(source[key]) && target[key] && isObject(target[key])) {
      result[key] = deepMerge(target[key], source[key] as any)
    } else if (source[key] !== undefined) {
      result[key] = source[key] as any
    }
  }
  
  return result
}

// 驼峰命名转短横线命名
export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}