<?php

use Flarum\Extend;
use wusong8899\Client1ButtonsCustomization\Controllers\ListButtonsCustomizationController;
use wusong8899\Client1ButtonsCustomization\Controllers\ButtonsCustomizationDeleteController;
use wusong8899\Client1ButtonsCustomization\Controllers\ButtonsCustomizationAddController;
use wusong8899\Client1ButtonsCustomization\Controllers\ButtonsCustomizationUpdateController;
use wusong8899\Client1ButtonsCustomization\Controllers\ButtonsCustomizationSortController;

$extend = [
    (new Extend\Frontend('admin'))->js(__DIR__ . '/js/dist/admin.js'),
    (new Extend\Frontend('forum'))->js(__DIR__ . '/js/dist/forum.js')->css(__DIR__ . '/less/forum.less'),

    (new Extend\Locales(__DIR__ . '/locale')),

    (new Extend\Routes('api'))
        ->get('/buttonsCustomizationList', 'buttonCustomization.get', ListButtonsCustomizationController::class)
        ->patch('/buttonsCustomizationList/{id}', 'buttonCustomization.update', ButtonsCustomizationUpdateController::class)
        ->delete('/buttonsCustomizationList/{id}', 'buttonsCustomizationList.delete', ButtonsCustomizationDeleteController::class)
        ->post('/buttonsCustomizationList', 'buttonCustomization.add', ButtonsCustomizationAddController::class)
        ->post('/buttonsCustomizationList/order', 'buttonCustomization.order', ButtonsCustomizationSortController::class),
];

return $extend;