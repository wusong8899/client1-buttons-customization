<?php

namespace wusong8899\Client1ButtonsCustomization\Controllers;

use wusong8899\Client1ButtonsCustomization\Serializer\ButtonsCustomizationSerializer;
use wusong8899\Client1ButtonsCustomization\Model\ButtonsCustomization;

use Flarum\Api\Controller\AbstractListController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ListButtonsCustomizationController extends AbstractListController
{
    public $serializer = ButtonsCustomizationSerializer::class;

    protected function data(ServerRequestInterface $request, Document $document)
    {
        return ButtonsCustomization::orderBy('sort', 'asc')->get();
    }
}
