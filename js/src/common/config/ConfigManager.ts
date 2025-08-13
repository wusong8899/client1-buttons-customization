import defaultConfig from './defaults';
import { ButtonsCustomizationConfig } from './types';

/**
 * Configuration manager for buttons customization extension
 * Provides centralized configuration management with validation and overrides
 */
export class ConfigManager {
    private static instance: ConfigManager;
    private config: ButtonsCustomizationConfig;
    private overrides: Partial<ButtonsCustomizationConfig> = {};

    private constructor() {
        this.config = { ...defaultConfig };
    }

    /**
     * Get singleton instance
     */
    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    /**
     * Get complete configuration
     */
    getConfig(): ButtonsCustomizationConfig {
        return this.mergeConfig(this.config, this.overrides);
    }

    /**
     * Get specific configuration section
     */
    getSection<K extends keyof ButtonsCustomizationConfig>(section: K): ButtonsCustomizationConfig[K] {
        const config = this.getConfig();
        return config[section];
    }

    /**
     * Set configuration overrides
     */
    setOverrides(overrides: Partial<ButtonsCustomizationConfig>): void {
        this.overrides = { ...this.overrides, ...overrides };
    }

    /**
     * Get API resource name
     */
    getApiResource(): string {
        return this.getSection('data').apiResources.buttonsCustomizationList;
    }

    /**
     * Get API endpoint
     */
    getApiEndpoint(endpoint: keyof ButtonsCustomizationConfig['api']['endpoints']): string {
        return this.getSection('api').endpoints[endpoint];
    }

    /**
     * Get UI class name
     */
    getUIClass(className: keyof ButtonsCustomizationConfig['ui']['classes']): string {
        return this.getSection('ui').classes[className];
    }

    /**
     * Get container ID
     */
    getContainerId(containerId: keyof ButtonsCustomizationConfig['ui']['containerIds']): string {
        return this.getSection('ui').containerIds[containerId];
    }

    /**
     * Get responsive configuration for current screen size
     */
    getResponsiveConfig(): ButtonsCustomizationConfig['layout']['responsive'][keyof ButtonsCustomizationConfig['layout']['responsive']] {
        const screenSize = this.getCurrentScreenSize();
        return this.getSection('layout').responsive[screenSize];
    }

    /**
     * Get current screen size category
     */
    private getCurrentScreenSize(): keyof ButtonsCustomizationConfig['layout']['responsive'] {
        const width = window.innerWidth;
        
        if (width < 576) {
            return 'xs';
        } else if (width < 768) {
            return 'sm';
        } else if (width < 992) {
            return 'md';
        } else if (width < 1200) {
            return 'lg';
        } else {
            return 'xl';
        }
    }

    /**
     * Get behavior setting
     */
    getBehaviorSetting<K extends keyof ButtonsCustomizationConfig['behavior']>(
        setting: K
    ): ButtonsCustomizationConfig['behavior'][K] {
        return this.getSection('behavior')[setting];
    }

    /**
     * Get styling setting
     */
    getStyleSetting<K extends keyof ButtonsCustomizationConfig['styling']>(
        setting: K
    ): ButtonsCustomizationConfig['styling'][K] {
        return this.getSection('styling')[setting];
    }

    /**
     * Check if debug mode is enabled
     */
    isDebugEnabled(): boolean {
        return this.getSection('debug').enableLogging;
    }

    /**
     * Get debug log level
     */
    getLogLevel(): ButtonsCustomizationConfig['debug']['logLevel'] {
        return this.getSection('debug').logLevel;
    }

    /**
     * Validate configuration
     */
    validateConfig(): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];
        const config = this.getConfig();

        // Validate required fields
        if (!config.app.extensionId) {
            errors.push('Extension ID is required');
        }

        if (!config.data.apiResources.buttonsCustomizationList) {
            errors.push('API resource name is required');
        }

        // Validate numeric values
        if (config.behavior.refreshInterval < 1000) {
            errors.push('Refresh interval must be at least 1000ms');
        }

        if (config.behavior.loadTimeout < 1000) {
            errors.push('Load timeout must be at least 1000ms');
        }

        if (config.behavior.retryAttempts < 0) {
            errors.push('Retry attempts must be non-negative');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Reset configuration to defaults
     */
    resetToDefaults(): void {
        this.config = { ...defaultConfig };
        this.overrides = {};
    }

    /**
     * Merge configuration objects deeply
     */
    private mergeConfig(
        base: ButtonsCustomizationConfig, 
        overrides: Partial<ButtonsCustomizationConfig>
    ): ButtonsCustomizationConfig {
        const result = { ...base };

        for (const key in overrides) {
            if (overrides.hasOwnProperty(key)) {
                const value = overrides[key as keyof ButtonsCustomizationConfig];
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    result[key as keyof ButtonsCustomizationConfig] = {
                        ...result[key as keyof ButtonsCustomizationConfig],
                        ...value
                    } as any;
                } else {
                    result[key as keyof ButtonsCustomizationConfig] = value as any;
                }
            }
        }

        return result;
    }

    /**
     * Export configuration as JSON
     */
    exportConfig(): string {
        return JSON.stringify(this.getConfig(), null, 2);
    }

    /**
     * Import configuration from JSON
     */
    importConfig(configJson: string): { success: boolean; error?: string } {
        try {
            const importedConfig = JSON.parse(configJson);
            this.setOverrides(importedConfig);
            
            const validation = this.validateConfig();
            if (!validation.isValid) {
                return {
                    success: false,
                    error: `Configuration validation failed: ${validation.errors.join(', ')}`
                };
            }

            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: `Failed to parse configuration: ${error}`
            };
        }
    }
}
