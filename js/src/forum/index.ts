import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import HeaderPrimary from 'flarum/forum/components/HeaderPrimary';
import ButtonsCustomization from './model/ButtonsCustomization';
import { ButtonsCustomizationUIManager } from './components/ButtonsCustomizationUIManager';
import { ButtonsCustomizationDataLoader } from './services/ButtonsCustomizationDataLoader';
import { ConfigManager } from '../common/config/ConfigManager';

/**
 * Initialize the ButtonsCustomization extension for the forum frontend
 */
app.initializers.add('wusong8899-client1-buttons-customization', () => {
  // Register the ButtonsCustomization model with the store
  app.store.models.buttonsCustomizationList = ButtonsCustomization;

  // Initialize configuration manager
  const configManager = ConfigManager.getInstance();

  // Initialize UI manager and data loader
  const uiManager = new ButtonsCustomizationUIManager();
  const dataLoader = ButtonsCustomizationDataLoader.getInstance();

  // Extend HeaderPrimary to add buttons customization UI
  extend(HeaderPrimary.prototype, 'view', function (_vnode) {
    // Check if we're on an appropriate page for buttons display
    if (this.shouldShowButtons()) {
      // Initialize buttons UI components with delay to ensure DOM is ready
      setTimeout(() => {
        uiManager.initialize().catch(() => {
          // Silently handle initialization errors
        });
      }, 200);
    }
  });

  // Add helper method to check if buttons should be shown
  HeaderPrimary.prototype.shouldShowButtons = function () {
    const currentPath = window.location.pathname;

    // Show buttons on main pages (customize as needed)
    const allowedPaths = ['/', '/tags', '/d/', '/u/'];

    return allowedPaths.some(path =>
      currentPath === path || currentPath.startsWith(path)
    );
  };

  // Auto-refresh buttons periodically if enabled
  if (configManager.getBehaviorSetting('autoRefresh')) {
    const refreshInterval = configManager.getBehaviorSetting('refreshInterval');

    setInterval(() => {
      if (uiManager.areButtonsVisible()) {
        dataLoader.refreshButtonsCustomizationList().catch(() => {
          // Silently handle refresh errors
        });
      }
    }, refreshInterval);
  }

  // Add global methods for external access (optional)
  (window as any).ButtonsCustomization = {
    uiManager,
    dataLoader,
    configManager,

    // Public API methods
    refreshButtons: () => uiManager.refreshButtons(),
    hideButtons: () => uiManager.hideButtons(),
    showButtons: () => uiManager.showButtons(),
    getButtonsData: () => dataLoader.getButtonsCustomizationList(),

    // Debug methods (only in debug mode)
    ...(configManager.isDebugEnabled() && {
      debug: {
        getConfig: () => configManager.getConfig(),
        getState: () => ({
          isLoading: dataLoader.isLoading(),
          hasData: dataLoader.hasData(),
          dataCount: dataLoader.getDataCount(),
          areButtonsVisible: uiManager.areButtonsVisible()
        }),
        forceReload: () => dataLoader.forceReload(),
        exportConfig: () => configManager.exportConfig()
      }
    })
  };

  // Initialize extension (debug logging removed for production)
});