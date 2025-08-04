// 声明LESS模块类型
declare module '*.less' {
  const classes: { [key: string]: string };
  export default classes;
}

// 声明CSS模块类型（如果需要）
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// 声明SCSS模块类型（如果需要）
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}