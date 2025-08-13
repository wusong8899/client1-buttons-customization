/**
 * Default configuration for client1-buttons-customization extension
 * Independent configuration for buttons customization functionality
 */

export default {
  app: {
    extensionId: 'wusong8899-client1-buttons-customization',
    name: 'Client1 Buttons Customization',
    version: '1.0.0',
  },
  api: {
    endpoints: {
      buttonsList: '/api/buttonsCustomizationList',
      buttonAdd: '/api/buttonsCustomizationList',
      buttonUpdate: '/api/buttonsCustomizationList/{id}',
      buttonDelete: '/api/buttonsCustomizationList/{id}',
      buttonSort: '/api/buttonsCustomizationList/order',
    },
  },
  data: {
    apiResources: {
      buttonsCustomizationList: 'buttonsCustomizationList',
    },
  },
  ui: {
    containerIds: {
      buttonsContainer: 'buttonCustomizationContainer',
      buttonsWrapper: 'buttons-customization-wrapper',
    },
    classes: {
      container: 'buttonCustomizationContainer',
      wrapper: 'buttons-customization-wrapper',
      header: 'buttons-customization-header',
      buttonItem: 'custom-button-item',
      buttonLink: 'custom-button-link',
      buttonContent: 'custom-button-content',
      buttonText: 'custom-button-text',
    },
    animation: {
      duration: 300,
      easing: 'ease',
      fadeInDelay: 100,
    },
  },
  layout: {
    responsive: {
      xs: { buttonsPerRow: 1, fontSize: '12px', padding: '6px 10px' },
      sm: { buttonsPerRow: 2, fontSize: '13px', padding: '7px 12px' },
      md: { buttonsPerRow: 3, fontSize: '14px', padding: '8px 14px' },
      lg: { buttonsPerRow: 4, fontSize: '15px', padding: '9px 16px' },
      xl: { buttonsPerRow: 5, fontSize: '16px', padding: '10px 18px' },
    },
    spacing: {
      containerPadding: '15px',
      buttonMargin: '8px',
      iconMargin: '8px',
    },
  },
  behavior: {
    autoRefresh: true,
    refreshInterval: 300000, // 5 minutes
    loadTimeout: 10000, // 10 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
  styling: {
    defaultColors: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      light: '#f8f9fa',
      dark: '#343a40',
    },
    buttonStyles: {
      borderRadius: '6px',
      transition: 'all 0.2s ease',
      fontWeight: '500',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  accessibility: {
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    focusOutlineColor: '#007bff',
    highContrastMode: false,
  },
  performance: {
    enableVirtualization: false,
    lazyLoading: true,
    debounceDelay: 250,
    cacheTimeout: 600000, // 10 minutes
  },
  debug: {
    enableLogging: false,
    logLevel: 'warn', // 'debug', 'info', 'warn', 'error'
    enablePerformanceMonitoring: false,
  },
};
