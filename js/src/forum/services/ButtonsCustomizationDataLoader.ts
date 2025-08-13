import app from 'flarum/forum/app';

/**
 * ButtonsCustomizationDataLoader - Handles loading and caching of buttons customization data
 * Migrated from client1-header-adv extension for independent operation
 */
export class ButtonsCustomizationDataLoader {
    private static instance: ButtonsCustomizationDataLoader;

    // Loading states
    private buttonsCustomizationListLoading = false;

    // Data storage
    private buttonsCustomizationList: any[] | null = null;

    private constructor() { }

    /**
     * Get singleton instance
     */
    static getInstance(): ButtonsCustomizationDataLoader {
        if (!ButtonsCustomizationDataLoader.instance) {
            ButtonsCustomizationDataLoader.instance = new ButtonsCustomizationDataLoader();
        }
        return ButtonsCustomizationDataLoader.instance;
    }

    /**
     * Load buttons customization data
     * @returns {Promise<any[]>} Promise resolving to buttons customization data
     */
    async loadButtonsCustomizationList(): Promise<any[]> {
        if (this.buttonsCustomizationListLoading) {
            return this.waitForButtonsCustomizationList();
        }

        if (this.buttonsCustomizationList !== null) {
            return this.buttonsCustomizationList;
        }

        this.buttonsCustomizationListLoading = true;

        try {
            const results = await app.store.find('buttonsCustomizationList').catch(() => []);
            this.buttonsCustomizationList = [];
            
            if (Array.isArray(results)) {
                this.buttonsCustomizationList.push(...results);
            } else if (results) {
                // Handle single item response
                this.buttonsCustomizationList.push(results);
            }
            
            return this.buttonsCustomizationList;
        } catch {
            // Silently handle errors and return empty array
            this.buttonsCustomizationList = [];
            return this.buttonsCustomizationList;
        } finally {
            this.buttonsCustomizationListLoading = false;
        }
    }

    /**
     * Get cached buttons customization list
     */
    getButtonsCustomizationList(): any[] | null {
        return this.buttonsCustomizationList;
    }

    /**
     * Clear cached data
     */
    clearCache(): void {
        this.buttonsCustomizationList = null;
    }

    /**
     * Refresh buttons customization data
     */
    async refreshButtonsCustomizationList(): Promise<any[]> {
        this.clearCache();
        return this.loadButtonsCustomizationList();
    }

    /**
     * Check if data is currently loading
     */
    isLoading(): boolean {
        return this.buttonsCustomizationListLoading;
    }

    /**
     * Check if data is available
     */
    hasData(): boolean {
        return this.buttonsCustomizationList !== null && this.buttonsCustomizationList.length > 0;
    }

    /**
     * Get data count
     */
    getDataCount(): number {
        return this.buttonsCustomizationList ? this.buttonsCustomizationList.length : 0;
    }

    /**
     * Force reload data (bypass cache)
     */
    async forceReload(): Promise<any[]> {
        this.buttonsCustomizationListLoading = false; // Reset loading state
        this.clearCache();
        return this.loadButtonsCustomizationList();
    }

    /**
     * Get button by ID
     */
    getButtonById(id: string): any | null {
        if (!this.buttonsCustomizationList) {
            return null;
        }
        return this.buttonsCustomizationList.find(button => button.id && button.id() === id) || null;
    }

    /**
     * Get buttons sorted by sort order
     */
    getSortedButtons(): any[] {
        if (!this.buttonsCustomizationList) {
            return [];
        }
        return [...this.buttonsCustomizationList].sort((a, b) => {
            const sortA = a.sort ? a.sort() : 0;
            const sortB = b.sort ? b.sort() : 0;
            return sortA - sortB;
        });
    }

    /**
     * Helper method for waiting for data to load
     */
    private async waitForButtonsCustomizationList(): Promise<any[]> {
        return new Promise((resolve) => {
            const checkInterval = setInterval(() => {
                if (!this.buttonsCustomizationListLoading && this.buttonsCustomizationList !== null) {
                    clearInterval(checkInterval);
                    resolve(this.buttonsCustomizationList);
                }
            }, 100);
            
            // Add timeout to prevent infinite waiting
            setTimeout(() => {
                clearInterval(checkInterval);
                resolve(this.buttonsCustomizationList || []);
            }, 10000); // 10 second timeout
        });
    }
}
