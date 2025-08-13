/**
 * Type definitions for client1-buttons-customization configuration
 */

export interface AppConfig {
  extensionId: string;
  name: string;
  version: string;
}

export interface ApiConfig {
  endpoints: {
    buttonsList: string;
    buttonAdd: string;
    buttonUpdate: string;
    buttonDelete: string;
    buttonSort: string;
  };
}

export interface DataConfig {
  apiResources: {
    buttonsCustomizationList: string;
  };
}

export interface UIConfig {
  containerIds: {
    buttonsContainer: string;
    buttonsWrapper: string;
  };
  classes: {
    container: string;
    wrapper: string;
    header: string;
    buttonItem: string;
    buttonLink: string;
    buttonContent: string;
    buttonText: string;
  };
  animation: {
    duration: number;
    easing: string;
    fadeInDelay: number;
  };
}

export interface ResponsiveBreakpoint {
  buttonsPerRow: number;
  fontSize: string;
  padding: string;
}

export interface LayoutConfig {
  responsive: {
    xs: ResponsiveBreakpoint;
    sm: ResponsiveBreakpoint;
    md: ResponsiveBreakpoint;
    lg: ResponsiveBreakpoint;
    xl: ResponsiveBreakpoint;
  };
  spacing: {
    containerPadding: string;
    buttonMargin: string;
    iconMargin: string;
  };
}

export interface BehaviorConfig {
  autoRefresh: boolean;
  refreshInterval: number;
  loadTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}

export interface StylingConfig {
  defaultColors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
  };
  buttonStyles: {
    borderRadius: string;
    transition: string;
    fontWeight: string;
    textDecoration: string;
    display: string;
    alignItems: string;
    justifyContent: string;
  };
}

export interface AccessibilityConfig {
  enableKeyboardNavigation: boolean;
  enableScreenReader: boolean;
  focusOutlineColor: string;
  highContrastMode: boolean;
}

export interface PerformanceConfig {
  enableVirtualization: boolean;
  lazyLoading: boolean;
  debounceDelay: number;
  cacheTimeout: number;
}

export interface DebugConfig {
  enableLogging: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  enablePerformanceMonitoring: boolean;
}

export interface ButtonsCustomizationConfig {
  app: AppConfig;
  api: ApiConfig;
  data: DataConfig;
  ui: UIConfig;
  layout: LayoutConfig;
  behavior: BehaviorConfig;
  styling: StylingConfig;
  accessibility: AccessibilityConfig;
  performance: PerformanceConfig;
  debug: DebugConfig;
}

export interface ButtonData {
  id?: string;
  name: string;
  icon?: string;
  color?: string;
  url: string;
  sort?: number;
}

export interface ButtonsCustomizationState {
  isLoading: boolean;
  hasData: boolean;
  dataCount: number;
  lastUpdated: Date | null;
  error: string | null;
}

export interface UIManagerOptions {
  autoInit?: boolean;
  targetContainer?: string;
  enableAnimation?: boolean;
  responsive?: boolean;
}

export interface DataLoaderOptions {
  enableCache?: boolean;
  cacheTimeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
