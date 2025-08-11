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

class ButtonsCustomizationUpdateController extends AbstractCreateController
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
            $errorMessage = 'client1-buttons-customization.admin.save-error';
        } else {
            $buttonsCustomizationSaveData = Arr::get($request->getParsedBody(), 'data', null);
            $errorMessage = "";
            $buttonsCustomizationData = ButtonsCustomization::find($buttonsCustomizationID);

            if (!isset($buttonsCustomizationData)) {
                $errorMessage = 'client1-buttons-customization.admin.save-error';
            } else {
                if (Arr::has($buttonsCustomizationSaveData, "attributes.name")) {
                    $buttonsCustomizationData->name = Arr::get($buttonsCustomizationSaveData, "attributes.name", null);
                }
                if (Arr::has($buttonsCustomizationSaveData, "attributes.url")) {
                    $buttonsCustomizationData->url = Arr::get($buttonsCustomizationSaveData, "attributes.url", null);
                }
                if (Arr::has($buttonsCustomizationSaveData, "attributes.icon")) {
                    $buttonsCustomizationData->icon = Arr::get($buttonsCustomizationSaveData, "attributes.icon", null);
                }
                if (Arr::has($buttonsCustomizationSaveData, "attributes.color")) {
                    $buttonsCustomizationData->color = Arr::get($buttonsCustomizationSaveData, "attributes.color", null);
                }

                $buttonsCustomizationData->save();

                return $buttonsCustomizationData;
            }
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
