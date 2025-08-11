<?php

namespace wusong8899\Client1ButtonsCustomization\Controllers;

use wusong8899\Client1ButtonsCustomization\Serializer\ButtonsCustomizationSerializer;
use wusong8899\Client1ButtonsCustomization\Model\ButtonsCustomization;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class ButtonsCustomizationSortController extends AbstractListController
{
    public $serializer = ButtonsCustomizationSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();
        $buttonsCustomizationOrder = Arr::get($request->getParsedBody(), 'buttonsCustomizationOrder');

        foreach ($buttonsCustomizationOrder as $itemID => $order) {
            ButtonsCustomization::query()->where('id', $itemID)->update(['sort' => $order]);
        }
    }
}
