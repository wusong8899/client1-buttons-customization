<?php

namespace wusong8899\Client1ButtonsCustomization\Controllers;

use wusong8899\Client1ButtonsCustomization\Serializer\ButtonsCustomizationSerializer;
use wusong8899\Client1ButtonsCustomization\Model\ButtonsCustomization;

use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class ButtonsCustomizationAddController extends AbstractCreateController
{
    public $serializer = ButtonsCustomizationSerializer::class;
    protected $settings;
    protected $translator;

    public function __construct(Translator $translator, SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
        $this->translator = $translator;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $actor->assertAdmin();

        $requestData = $request->getParsedBody()['data']['attributes'];
        $errorMessage = "";

        if (!isset($requestData)) {
            $errorMessage = 'wusong8899-guaguale.admin.guaguale-add-error';
        } else {
            $buttonsCustomization = new ButtonsCustomization();
            $buttonsCustomization->name = $requestData['name'];
            $buttonsCustomization->url = $requestData['url'];
            $buttonsCustomization->icon = $requestData['icon'];
            $buttonsCustomization->color = $requestData['color'];
            $buttonsCustomization->save();

            return $buttonsCustomization;
        }

        if ($errorMessage !== "") {
            throw new ValidationException(['message' => $this->translator->trans($errorMessage)]);
        }
    }
}
