/**
 * Test utilities for ButtonsCustomizationDataLoader
 * This file can be used for debugging and testing the data loader functionality
 */

import { ButtonsCustomizationDataLoader } from './ButtonsCustomizationDataLoader';

export class ButtonsCustomizationDataLoaderTest {
    private dataLoader: ButtonsCustomizationDataLoader;

    constructor() {
        this.dataLoader = ButtonsCustomizationDataLoader.getInstance();
    }

    /**
     * Test basic data loading functionality
     */
    async testBasicLoading(): Promise<boolean> {
        try {
            const data = await this.dataLoader.loadButtonsCustomizationList();
            return Array.isArray(data);
        } catch {
            return false;
        }
    }

    /**
     * Test caching functionality
     */
    async testCaching(): Promise<boolean> {
        try {
            // First load
            const data1 = await this.dataLoader.loadButtonsCustomizationList();
            
            // Second load (should use cache)
            const data2 = await this.dataLoader.loadButtonsCustomizationList();
            
            // Should return the same reference (cached)
            return data1 === data2;
        } catch {
            return false;
        }
    }

    /**
     * Test refresh functionality
     */
    async testRefresh(): Promise<boolean> {
        try {
            // Load initial data
            await this.dataLoader.loadButtonsCustomizationList();
            
            // Check if has data
            const hasDataBefore = this.dataLoader.hasData();
            
            // Refresh data
            const refreshedData = await this.dataLoader.refreshButtonsCustomizationList();
            
            // Should still have data after refresh
            const hasDataAfter = this.dataLoader.hasData();
            
            return hasDataBefore === hasDataAfter && Array.isArray(refreshedData);
        } catch {
            return false;
        }
    }

    /**
     * Test utility methods
     */
    testUtilityMethods(): boolean {
        try {
            // Test loading state
            const isLoading = this.dataLoader.isLoading();
            
            // Test data count
            const count = this.dataLoader.getDataCount();
            
            // Test has data
            const hasData = this.dataLoader.hasData();
            
            return typeof isLoading === 'boolean' && 
                   typeof count === 'number' && 
                   typeof hasData === 'boolean';
        } catch {
            return false;
        }
    }

    /**
     * Test sorting functionality
     */
    async testSorting(): Promise<boolean> {
        try {
            await this.dataLoader.loadButtonsCustomizationList();
            const sortedButtons = this.dataLoader.getSortedButtons();
            return Array.isArray(sortedButtons);
        } catch {
            return false;
        }
    }

    /**
     * Test button retrieval by ID
     */
    async testButtonRetrieval(): Promise<boolean> {
        try {
            const buttons = await this.dataLoader.loadButtonsCustomizationList();
            if (buttons.length === 0) {
                return true; // No buttons to test, but that's valid
            }
            
            const firstButton = buttons[0];
            if (firstButton && firstButton.id) {
                const retrievedButton = this.dataLoader.getButtonById(firstButton.id());
                return retrievedButton !== null;
            }
            
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Run all tests
     */
    async runAllTests(): Promise<{ [key: string]: boolean }> {
        const results = {
            basicLoading: await this.testBasicLoading(),
            caching: await this.testCaching(),
            refresh: await this.testRefresh(),
            utilityMethods: this.testUtilityMethods(),
            sorting: await this.testSorting(),
            buttonRetrieval: await this.testButtonRetrieval()
        };

        return results;
    }

    /**
     * Get test summary
     */
    async getTestSummary(): Promise<string> {
        const results = await this.runAllTests();
        const passed = Object.values(results).filter(Boolean).length;
        const total = Object.keys(results).length;
        
        return `ButtonsCustomizationDataLoader Tests: ${passed}/${total} passed\n` +
               Object.entries(results)
                   .map(([test, result]) => `  ${result ? '✅' : '❌'} ${test}`)
                   .join('\n');
    }
}
