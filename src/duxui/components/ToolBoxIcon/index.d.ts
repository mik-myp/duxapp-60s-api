import { ComponentType, CSSProperties } from 'react';

interface names {
  wangyou;
  wenjian;
  zhexiantu;
  yingyong;
}

interface ToolBoxIconProps {
  /** 图标名称 */
  name?: keyof names;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 图标尺寸
   */
  size?: number;
  /**
   * class
   */
  className?: string;
  /**
   * 样式
   */
  style?: CSSProperties;
  /**
   * 点击事件
   * @returns
   */
  onClick?: () => void;
}

/**
 * ToolBoxIcon 图标库
 */
export const ToolBoxIcon: ComponentType<ToolBoxIconProps>;
