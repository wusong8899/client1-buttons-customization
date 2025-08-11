<?php

namespace wusong8899\Client1ButtonsCustomization\Controllers;

use wusong8899\Client1ButtonsCustomization\Serializer\ButtonsCustomizationSerializer;
use wusong8899\Client1ButtonsCustomization\Model\ButtonsCustomization;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class ButtonsCustomizationDeleteController extends AbstractCreateController
{
    public $serializer = ButtonsCustomizationSerializer::class;
    protected $translator;

    public function __construct(Translator $translator)
    {
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();
        $buttonsCustomizationID = Arr::get($request->getQueryParams(), 'id');

        if (!isset($buttonsCustomizationID)) {
            $errorMessage = 'client1-buttons-customization.admin.delete-error';
        } else {
            $errorMessage = "";
            $buttonsCustomizationData = ButtonsCustomization::find($buttonsCustomizationID);

            if (!isset($buttonsCustomizationData)) {
                $errorMessage = 'client1-buttons-customization.admin.delete-error';
            } else {
                $buttonsCustomizationData->delete();
                return $buttonsCustomizationData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
