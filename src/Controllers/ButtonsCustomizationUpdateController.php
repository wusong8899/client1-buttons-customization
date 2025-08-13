<?php

namespace wusong8899\Client1ButtonsCustomization\Controllers;

use wusong8899\Client1ButtonsCustomization\Serializer\ButtonsCustomizationSerializer;
use wusong8899\Client1ButtonsCustomization\Model\ButtonsCustomization;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Illuminate\Support\Arr;

class ButtonsCustomizationUpdateController extends AbstractShowController
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

        // Get ID from route parameters (standard for PATCH requests)
        $buttonsCustomizationID = Arr::get($request->getQueryParams(), 'id');

        if (!$buttonsCustomizationID) {
            throw new ValidationException(['message' => $this->translator->trans('client1-buttons-customization.admin.save-error')]);
        }

        $buttonsCustomizationData = ButtonsCustomization::find($buttonsCustomizationID);

        if (!$buttonsCustomizationData) {
            throw new ValidationException(['message' => $this->translator->trans('client1-buttons-customization.admin.save-error')]);
        }

        // Get the request data from the standard JSON:API structure
        $requestData = Arr::get($request->getParsedBody(), 'data.attributes', []);

        // Update only the provided attributes
        if (array_key_exists('name', $requestData)) {
            $buttonsCustomizationData->name = $requestData['name'];
        }
        if (array_key_exists('url', $requestData)) {
            $buttonsCustomizationData->url = $requestData['url'];
        }
        if (array_key_exists('icon', $requestData)) {
            $buttonsCustomizationData->icon = $requestData['icon'];
        }
        if (array_key_exists('color', $requestData)) {
            $buttonsCustomizationData->color = $requestData['color'];
        }

        $buttonsCustomizationData->save();

        return $buttonsCustomizationData;
    }
}
